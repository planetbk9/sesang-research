"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { useVoting } from "@/context/VotingContext";
import IssueCard from "./IssueCard";
import DistrictFilter from "./DistrictFilter";

// ── Category pill data (matches IssueCategory in types/issue.ts) ─────────────
const CATEGORY_FILTERS = [
  "전체",
  "주차",
  "불법투기",
  "소음",
  "교통신호",
  "침수",
  "도로파손",
  "가로등",
  "공원시설",
  "대중교통",
  "환경오염",
  "안전시설",
  "기타",
] as const;

type CategoryFilter = (typeof CATEGORY_FILTERS)[number];

const CATEGORY_ICONS: Record<string, string> = {
  전체: "🗂️",
  주차: "🚗",
  불법투기: "🗑️",
  소음: "🔊",
  교통신호: "🚦",
  침수: "🌊",
  도로파손: "⚠️",
  가로등: "💡",
  공원시설: "🌳",
  대중교통: "🚌",
  환경오염: "🌫️",
  안전시설: "🛡️",
  기타: "📋",
};

// ── Sort options ─────────────────────────────────────────────────────────────
type SortOption = "votes" | "recent";
const SORT_LABELS: Record<SortOption, string> = {
  votes: "공감 순",
  recent: "최신 순",
};

// ── Component ────────────────────────────────────────────────────────────────
export default function CitizenView() {
  const { issues } = useVoting();

  const [selectedGu, setSelectedGu] = useState("전체");
  const [selectedDong, setSelectedDong] = useState("전체");
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("votes");
  const [showDistrictFilter, setShowDistrictFilter] = useState(false);

  // Ref for category pill scroll container — scroll active pill into view
  const pillScrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = pillScrollRef.current;
    if (!container) return;
    const activeBtn = container.querySelector<HTMLButtonElement>(
      `[data-category="${selectedCategory}"]`
    );
    activeBtn?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [selectedCategory]);

  // ── Derived: filtered → sorted issues ────────────────────────────────────
  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      if (selectedGu !== "전체" && issue.district.gu !== selectedGu) return false;
      if (selectedDong !== "전체" && issue.district.dong !== selectedDong) return false;
      if (selectedCategory !== "전체" && issue.category !== selectedCategory) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matches =
          issue.title.toLowerCase().includes(q) ||
          issue.description.toLowerCase().includes(q) ||
          issue.district.gu.includes(q) ||
          issue.district.dong.includes(q) ||
          issue.category.includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [issues, selectedGu, selectedDong, selectedCategory, searchQuery]);

  const sortedIssues = useMemo(() => {
    return [...filteredIssues].sort((a, b) => {
      if (sortBy === "votes") return b.voteCount - a.voteCount;
      return new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime();
    });
  }, [filteredIssues, sortBy]);

  // Count active non-search filters
  const activeFilterCount = [
    selectedGu !== "전체",
    selectedDong !== "전체",
    selectedCategory !== "전체",
  ].filter(Boolean).length;

  const handleClearAll = () => {
    setSelectedGu("전체");
    setSelectedDong("전체");
    setSelectedCategory("전체");
    setSearchQuery("");
  };

  // ── Header height for sticky offset: ~72px (header) + toolbar ─────────────
  const HEADER_H = "72px";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ══════════════════════════════════════════════════════════
          HEADER
      ══════════════════════════════════════════════════════════ */}
      <header className="bg-yellow-400 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Branding */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 bg-yellow-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm"
              aria-hidden="true"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path
                  fillRule="evenodd"
                  d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0 0 1.5h.007a.75.75 0 0 0 0-1.5H12Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <div className="text-xs font-semibold text-yellow-800 leading-none mb-0.5 tracking-wide">
                인천광역시
              </div>
              <div className="text-lg font-bold text-yellow-950 leading-tight">
                스마트시티 민원 투표
              </div>
            </div>
          </div>

          {/* Admin link */}
          <Link
            href="/admin"
            className="text-sm font-semibold text-yellow-900 bg-yellow-300 hover:bg-yellow-200 active:bg-yellow-100 px-4 py-2 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-1"
          >
            관리자 →
          </Link>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════
          FILTER TOOLBAR  (sticky, below header)
      ══════════════════════════════════════════════════════════ */}
      <div
        className="bg-white border-b border-gray-100 sticky z-20 shadow-sm"
        style={{ top: HEADER_H }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* ── Row 1: Search + District filter toggle + Sort ────── */}
          <div className="flex items-center gap-2 sm:gap-3 py-3">
            {/* Search input */}
            <div className="relative flex-1 min-w-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input
                type="search"
                placeholder="민원 제목, 지역, 내용 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-9 py-2.5 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                aria-label="민원 검색"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="검색어 지우기"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* District filter toggle */}
            <button
              type="button"
              onClick={() => setShowDistrictFilter((v) => !v)}
              aria-expanded={showDistrictFilter}
              aria-label="지역 필터 열기/닫기"
              className={`relative flex-shrink-0 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                showDistrictFilter || (selectedGu !== "전체" || selectedDong !== "전체")
                  ? "bg-yellow-400 border-yellow-400 text-yellow-900 shadow-sm"
                  : "bg-white border-gray-200 text-gray-600 hover:border-yellow-300"
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <span className="hidden sm:inline">지역</span>
              {(selectedGu !== "전체" || selectedDong !== "전체") && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-yellow-700 text-white text-xs font-bold flex items-center justify-center leading-none">
                  {[selectedGu !== "전체", selectedDong !== "전체"].filter(Boolean).length}
                </span>
              )}
            </button>

            {/* Sort selector */}
            <div className="relative flex-shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-white border border-gray-200 rounded-xl pl-3 pr-7 py-2.5 text-sm font-medium text-gray-600 hover:border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition cursor-pointer"
                aria-label="정렬 기준"
              >
                {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
                  <option key={key} value={key}>{SORT_LABELS[key]}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center" aria-hidden="true">
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* ── Row 2: Category pills (horizontal scroll) ─────────── */}
          <div
            ref={pillScrollRef}
            className="flex gap-2 overflow-x-auto pb-3"
            role="group"
            aria-label="카테고리 필터"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {CATEGORY_FILTERS.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  data-category={cat}
                  onClick={() => setSelectedCategory(cat)}
                  aria-pressed={isActive}
                  className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1 ${
                    isActive
                      ? "bg-yellow-400 text-yellow-900 shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-yellow-50 hover:text-yellow-800"
                  }`}
                >
                  <span aria-hidden="true">{CATEGORY_ICONS[cat]}</span>
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Expandable district filter panel ─────────────────────── */}
        {showDistrictFilter && (
          <div className="border-t border-gray-100 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
              <DistrictFilter
                selectedGu={selectedGu}
                selectedDong={selectedDong}
                onGuChange={(gu) => { setSelectedGu(gu); setSelectedDong("전체"); }}
                onDongChange={setSelectedDong}
              />
            </div>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════════════════════════ */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
        {/* ── Results summary row ──────────────────────────────────── */}
        <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-base text-gray-500">
              총{" "}
              <span className="font-bold text-gray-900 text-lg">
                {sortedIssues.length}
              </span>
              건
            </p>

            {/* Active filter chips */}
            {(selectedGu !== "전체" || selectedDong !== "전체") && (
              <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 text-sm font-medium px-2.5 py-1 rounded-full">
                📍 {selectedGu !== "전체" ? selectedGu : ""}
                {selectedDong !== "전체" ? ` · ${selectedDong}` : ""}
                <button
                  type="button"
                  onClick={() => { setSelectedGu("전체"); setSelectedDong("전체"); }}
                  className="ml-0.5 hover:text-yellow-900 transition-colors"
                  aria-label="지역 필터 제거"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-sm font-medium px-2.5 py-1 rounded-full">
                🔍 &ldquo;{searchQuery}&rdquo;
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="ml-0.5 hover:text-gray-900 transition-colors"
                  aria-label="검색어 제거"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
          </div>

          {(activeFilterCount > 0 || searchQuery) && (
            <button
              type="button"
              onClick={handleClearAll}
              className="text-sm font-medium text-gray-400 hover:text-gray-700 transition-colors underline underline-offset-2"
            >
              전체 초기화
            </button>
          )}
        </div>

        {/* ── Issues grid: 1-col (mobile) → 2-col (sm) → 3-col (lg) ── */}
        {sortedIssues.length > 0 ? (
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            role="list"
            aria-label="민원 목록"
          >
            {sortedIssues.map((issue) => (
              <li key={issue.id} className="flex flex-col">
                <IssueCard issue={issue} />
              </li>
            ))}
          </ul>
        ) : (
          /* ── Empty state ──────────────────────────────────────── */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5 text-4xl" aria-hidden="true">
              📭
            </div>
            <p className="text-lg font-semibold text-gray-700 mb-1">
              해당 조건의 민원이 없습니다
            </p>
            <p className="text-base text-gray-400 mb-6">
              {searchQuery
                ? `'${searchQuery}'에 대한 검색 결과가 없어요`
                : "다른 지역이나 카테고리를 선택해보세요"}
            </p>
            <button
              type="button"
              onClick={handleClearAll}
              className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold px-5 py-2.5 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              필터 초기화
            </button>
          </div>
        )}
      </main>

      {/* ══════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════ */}
      <footer className="mt-12 border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-400">
          <p>
            <span className="font-semibold text-gray-600">인천광역시 스마트시티 민원 투표</span>
            {" · "}제안 데모 프로토타입
          </p>
          <p className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400" aria-hidden="true" />
            모든 데이터는 시연용 가상 데이터입니다
          </p>
        </div>
      </footer>
    </div>
  );
}

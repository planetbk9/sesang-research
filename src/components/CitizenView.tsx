"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useVoting } from "@/context/VotingContext";
import IssueCard from "./IssueCard";
import DistrictFilter from "./DistrictFilter";

export default function CitizenView() {
  const { issues } = useVoting();
  const [selectedGu, setSelectedGu] = useState("전체");
  const [selectedDong, setSelectedDong] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      const guMatch = selectedGu === "전체" || issue.district.gu === selectedGu;
      const dongMatch =
        selectedDong === "전체" || issue.district.dong === selectedDong;
      const searchMatch =
        searchQuery === "" ||
        issue.title.includes(searchQuery) ||
        issue.description.includes(searchQuery) ||
        issue.category.includes(searchQuery);
      return guMatch && dongMatch && searchMatch;
    });
  }, [issues, selectedGu, selectedDong, searchQuery]);

  const sortedIssues = useMemo(() => {
    return [...filteredIssues].sort((a, b) => b.voteCount - a.voteCount);
  }, [filteredIssues]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="bg-yellow-400 shadow-sm sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-yellow-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0 0 1.5h.007a.75.75 0 0 0 0-1.5H12Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <div className="text-xs font-medium text-yellow-800 leading-none mb-0.5">
                인천광역시
              </div>
              <div className="text-base font-bold text-yellow-950 leading-tight">
                스마트시티 민원 투표
              </div>
            </div>
          </div>
          <Link
            href="/admin"
            className="text-xs font-semibold text-yellow-900 bg-yellow-300 hover:bg-yellow-200 active:bg-yellow-100 px-3 py-2 rounded-xl transition-colors"
          >
            관리자 →
          </Link>
        </div>
      </header>

      {/* ── Filters ────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 sticky top-[68px] z-10 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 space-y-3">
          {/* Search */}
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input
              type="search"
              placeholder="민원 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              aria-label="민원 검색"
            />
          </div>

          <DistrictFilter
            selectedGu={selectedGu}
            selectedDong={selectedDong}
            onGuChange={setSelectedGu}
            onDongChange={setSelectedDong}
          />
        </div>
      </div>

      {/* ── Issue list ─────────────────────────────────────────── */}
      <main className="max-w-2xl mx-auto px-4 py-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            총{" "}
            <span className="font-semibold text-gray-800">
              {sortedIssues.length}
            </span>
            건의 민원
          </p>
          <span className="text-xs text-gray-400">공감 순 정렬</span>
        </div>

        {sortedIssues.length > 0 ? (
          <ul className="flex flex-col gap-3" role="list">
            {sortedIssues.map((issue) => (
              <li key={issue.id}>
                <IssueCard issue={issue} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-300 text-5xl mb-4" aria-hidden="true">
              📭
            </div>
            <p className="text-gray-500 text-base font-medium">
              해당 조건의 민원이 없습니다
            </p>
            <p className="text-gray-400 text-sm mt-1">
              다른 지역이나 검색어를 시도해보세요
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import { useVoting } from "@/context/VotingContext";
import { CATEGORY_COLORS } from "@/types/issue";
import DistrictFilter from "./DistrictFilter";

const RANK_BADGE = [
  "bg-yellow-400 text-yellow-900",  // 1st
  "bg-gray-300 text-gray-700",      // 2nd
  "bg-amber-600 text-white",         // 3rd
];

const STATUS_LABELS: Record<string, string> = {
  "접수됨": "접수됨",
  "검토중": "검토중",
  "처리중": "처리중",
  "완료": "완료",
};

const STATUS_COLORS: Record<string, string> = {
  "접수됨": "bg-gray-100 text-gray-600",
  "검토중": "bg-blue-100 text-blue-700",
  "처리중": "bg-orange-100 text-orange-700",
  "완료": "bg-green-100 text-green-700",
};

export default function AdminDashboard() {
  const { issues } = useVoting();
  const [selectedGu, setSelectedGu] = useState("전체");
  const [selectedDong, setSelectedDong] = useState("전체");

  const filtered = useMemo(() => {
    return issues.filter((issue) => {
      const guMatch = selectedGu === "전체" || issue.district.gu === selectedGu;
      const dongMatch =
        selectedDong === "전체" || issue.district.dong === selectedDong;
      return guMatch && dongMatch;
    });
  }, [issues, selectedGu, selectedDong]);

  const ranked = useMemo(
    () => [...filtered].sort((a, b) => b.voteCount - a.voteCount),
    [filtered]
  );

  const totalVotes = ranked.reduce((sum, i) => sum + i.voteCount, 0);
  const maxVotes = ranked[0]?.voteCount ?? 1;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="bg-yellow-400 shadow-sm sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-yellow-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
              </svg>
            </div>
            <div>
              <div className="text-xs font-medium text-yellow-800 leading-none mb-0.5">
                인천광역시
              </div>
              <div className="text-base font-bold text-yellow-950 leading-tight">
                관리자 대시보드
              </div>
            </div>
          </div>
          <a
            href="/"
            className="text-xs font-semibold text-yellow-900 bg-yellow-300 hover:bg-yellow-200 active:bg-yellow-100 px-3 py-2 rounded-xl transition-colors"
          >
            ← 시민 화면
          </a>
        </div>
      </header>

      {/* ── Stats ──────────────────────────────────────────────── */}
      <div className="bg-yellow-50 border-b border-yellow-100">
        <div className="max-w-3xl mx-auto px-4 py-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-yellow-100">
            <div className="text-xs text-gray-400 mb-1">총 민원 수</div>
            <div className="text-2xl font-bold text-gray-900 tabular-nums">
              {ranked.length}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-yellow-100">
            <div className="text-xs text-gray-400 mb-1">총 공감 수</div>
            <div className="text-2xl font-bold text-yellow-600 tabular-nums">
              {totalVotes.toLocaleString()}
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1 bg-white rounded-2xl p-4 shadow-sm border border-yellow-100">
            <div className="text-xs text-gray-400 mb-1">최다 공감 민원</div>
            <div className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2">
              {ranked[0]?.title ?? "—"}
            </div>
          </div>
        </div>
      </div>

      {/* ── Filters ────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 sticky top-[68px] z-10 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <DistrictFilter
            selectedGu={selectedGu}
            selectedDong={selectedDong}
            onGuChange={(gu) => {
              setSelectedGu(gu);
              setSelectedDong("전체");
            }}
            onDongChange={setSelectedDong}
          />
        </div>
      </div>

      {/* ── Rankings ───────────────────────────────────────────── */}
      <main className="max-w-3xl mx-auto px-4 py-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700">
            우선순위 목록
          </h2>
          <span className="text-xs text-gray-400">공감 수 기준 내림차순</span>
        </div>

        {ranked.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {ranked.map((issue, index) => {
              const barWidth = Math.round((issue.voteCount / maxVotes) * 100);
              const categoryColor =
                CATEGORY_COLORS[issue.category] ?? "bg-gray-100 text-gray-700";
              const statusColor =
                STATUS_COLORS[issue.status] ?? "bg-gray-100 text-gray-600";

              return (
                <div
                  key={issue.id}
                  className="flex items-start gap-3 px-4 py-4 border-b border-gray-50 last:border-b-0 hover:bg-amber-50/40 transition-colors"
                >
                  {/* Rank badge */}
                  <div
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                      index < 3 ? RANK_BADGE[index] : "bg-gray-100 text-gray-500"
                    }`}
                    aria-label={`순위 ${index + 1}위`}
                  >
                    {index + 1}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3 className="text-sm font-semibold text-gray-900 leading-snug">
                        {issue.title}
                      </h3>
                      <span className="flex-shrink-0 text-base font-bold text-yellow-600 tabular-nums">
                        {issue.voteCount.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-yellow-50 text-yellow-700 font-medium">
                        {issue.district.gu} · {issue.district.dong}
                      </span>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${categoryColor}`}
                      >
                        {issue.category}
                      </span>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColor}`}
                      >
                        {STATUS_LABELS[issue.status] ?? issue.status}
                      </span>
                    </div>

                    {/* Vote bar */}
                    <div
                      className="h-1.5 bg-gray-100 rounded-full overflow-hidden"
                      role="progressbar"
                      aria-valuenow={barWidth}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`공감 비율 ${barWidth}%`}
                    >
                      <div
                        className="h-full bg-yellow-400 rounded-full transition-all duration-700"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-300 text-5xl mb-4" aria-hidden="true">
              📊
            </div>
            <p className="text-gray-500 text-base font-medium">
              해당 지역의 민원이 없습니다
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

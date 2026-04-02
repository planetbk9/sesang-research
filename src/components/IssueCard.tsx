"use client";

import { useState, useEffect } from "react";
import { Issue, CATEGORY_COLORS } from "@/types/issue";
import { useVoting } from "@/context/VotingContext";

interface IssueCardProps {
  issue: Issue;
}

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

export default function IssueCard({ issue }: IssueCardProps) {
  const { votedIssues, recentlyVoted, castVote, clearRecentVote } = useVoting();
  const hasVoted = votedIssues.has(issue.id);
  const justVoted = recentlyVoted === issue.id;
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (justVoted) {
      setShowConfirmation(true);
      const timer = setTimeout(() => {
        setShowConfirmation(false);
        clearRecentVote();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [justVoted, clearRecentVote]);

  const handleVote = () => {
    if (!hasVoted) {
      castVote(issue.id);
    }
  };

  const categoryColorClass =
    CATEGORY_COLORS[issue.category] ?? "bg-gray-100 text-gray-700";
  const statusColorClass =
    STATUS_COLORS[issue.status] ?? "bg-gray-100 text-gray-600";

  return (
    <article className="h-full flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-shadow hover:shadow-md">
      <div className="flex flex-col flex-1 p-5">
        {/* ── Badges row ─────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColorClass}`}
          >
            {issue.category}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700">
            {issue.district.gu} · {issue.district.dong}
          </span>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColorClass}`}
          >
            {STATUS_LABELS[issue.status] ?? issue.status}
          </span>
        </div>

        {/* ── Title ──────────────────────────────────────────────── */}
        <h3 className="text-base font-semibold text-gray-900 mb-2 leading-snug">
          {issue.title}
        </h3>

        {/* ── Description ────────────────────────────────────────── */}
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4 flex-1">
          {issue.description}
        </p>

        {/* ── Footer: vote count + button ─────────────────────────── */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-50 mt-auto">
          {/* Vote count */}
          <div className="flex items-center gap-1.5 text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-yellow-500 flex-shrink-0"
            >
              <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
            </svg>
            <span className="text-sm font-semibold tabular-nums">
              {issue.voteCount.toLocaleString()}
            </span>
            <span className="text-xs text-gray-400">명 공감</span>
          </div>

          {/* ── Vote button / states ─────────────────────────────── */}
          <div className="relative min-w-[100px] flex justify-end">
            {showConfirmation ? (
              /* ── 투표 완료 확인 메시지 ──────────────────────────── */
              <div
                role="status"
                aria-live="polite"
                className="flex items-center gap-1.5 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold animate-fade-in border border-green-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 flex-shrink-0"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                    clipRule="evenodd"
                  />
                </svg>
                투표 완료
              </div>
            ) : hasVoted ? (
              /* ── Already voted ──────────────────────────────────── */
              <div
                className="flex items-center gap-1.5 bg-gray-100 text-gray-400 px-4 py-2 rounded-full text-sm font-medium cursor-default select-none"
                aria-label="이미 투표한 민원입니다"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                    clipRule="evenodd"
                  />
                </svg>
                투표함
              </div>
            ) : (
              /* ── Vote button ─────────────────────────────────────── */
              <button
                type="button"
                onClick={handleVote}
                className="flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-yellow-900 px-4 py-2 rounded-full text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                aria-label={`'${issue.title}' 에 공감하기`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                </svg>
                공감하기
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

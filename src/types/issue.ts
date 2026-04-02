// ============================================================
// Incheon Smart City – Citizen Voting System
// TypeScript type definitions
// ============================================================

export type IssueCategory =
  | "주차"        // Parking
  | "불법투기"    // Illegal dumping
  | "소음"        // Noise pollution
  | "교통신호"    // Traffic signals
  | "침수"        // Flooding
  | "도로파손"    // Road damage
  | "가로등"      // Street lighting
  | "공원시설"    // Park facilities
  | "대중교통"    // Public transportation
  | "환경오염"    // Environmental pollution
  | "안전시설"    // Safety facilities
  | "기타";       // Other

export type IssueStatus = "접수됨" | "검토중" | "처리중" | "완료";

export interface District {
  /** 구 (gu) name, e.g. "부평구" */
  gu: string;
  /** 동 (dong) name, e.g. "부평동" */
  dong: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  /** Administrative district */
  district: District;
  /** Total accumulated votes */
  voteCount: number;
  /** ISO 8601 date string when the issue was reported */
  reportedAt: string;
  status: IssueStatus;
}

// ── Helper types used by UI components ──────────────────────

export interface DistrictFilter {
  gu: string | null;
  dong: string | null;
}

export interface RankedIssue extends Issue {
  rank: number;
}

export const CATEGORY_LABELS: Record<IssueCategory, string> = {
  주차: "주차 문제",
  불법투기: "불법 투기",
  소음: "소음 공해",
  교통신호: "교통 신호",
  침수: "침수 피해",
  도로파손: "도로 파손",
  가로등: "가로등",
  공원시설: "공원 시설",
  대중교통: "대중교통",
  환경오염: "환경 오염",
  안전시설: "안전 시설",
  기타: "기타",
};

export const CATEGORY_COLORS: Record<IssueCategory, string> = {
  주차: "bg-orange-100 text-orange-800",
  불법투기: "bg-red-100 text-red-800",
  소음: "bg-purple-100 text-purple-800",
  교통신호: "bg-blue-100 text-blue-800",
  침수: "bg-cyan-100 text-cyan-800",
  도로파손: "bg-stone-100 text-stone-800",
  가로등: "bg-yellow-100 text-yellow-800",
  공원시설: "bg-green-100 text-green-800",
  대중교통: "bg-indigo-100 text-indigo-800",
  환경오염: "bg-emerald-100 text-emerald-800",
  안전시설: "bg-pink-100 text-pink-800",
  기타: "bg-gray-100 text-gray-800",
};

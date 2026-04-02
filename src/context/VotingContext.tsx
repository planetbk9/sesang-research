"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useSyncExternalStore,
} from "react";
import { Issue } from "@/types/issue";
import { ISSUES } from "@/data/issues";

// ── localStorage keys ────────────────────────────────────────
const LS_VOTE_COUNTS = "icsc_vote_counts";
const LS_VOTED_ISSUES = "icsc_voted_issues";

/** Load persisted vote deltas from localStorage */
function loadVoteDeltas(): Record<string, number> {
  try {
    const raw = localStorage.getItem(LS_VOTE_COUNTS);
    return raw ? (JSON.parse(raw) as Record<string, number>) : {};
  } catch {
    return {};
  }
}

/** Load persisted voted-issue IDs from localStorage */
function loadVotedIssues(): Set<string> {
  try {
    const raw = localStorage.getItem(LS_VOTED_ISSUES);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

/** Apply persisted vote deltas to the base issue list */
function applyDeltas(base: Issue[], deltas: Record<string, number>): Issue[] {
  return base.map((issue) =>
    deltas[issue.id]
      ? { ...issue, voteCount: issue.voteCount + deltas[issue.id] }
      : issue
  );
}

// ── Hydration detection via useSyncExternalStore ─────────────
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

function useHydrated() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// ── Context type ─────────────────────────────────────────────
interface VotingContextType {
  issues: Issue[];
  votedIssues: Set<string>;
  castVote: (issueId: string) => void;
}

const VotingContext = createContext<VotingContextType | undefined>(undefined);

// ── Provider ─────────────────────────────────────────────────
export function VotingProvider({ children }: { children: React.ReactNode }) {
  const hydrated = useHydrated();

  const [issues, setIssues] = useState<Issue[]>(() => {
    if (typeof window === "undefined") return ISSUES;
    return applyDeltas(ISSUES, loadVoteDeltas());
  });
  const [votedIssues, setVotedIssues] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    return loadVotedIssues();
  });

  const castVote = useCallback(
    (issueId: string) => {
      if (votedIssues.has(issueId)) return;

      setIssues((prev) =>
        prev.map((issue) =>
          issue.id === issueId
            ? { ...issue, voteCount: issue.voteCount + 1 }
            : issue
        )
      );

      const nextVoted = new Set([...votedIssues, issueId]);
      setVotedIssues(nextVoted);

      // Persist to localStorage
      try {
        const deltas = loadVoteDeltas();
        deltas[issueId] = (deltas[issueId] ?? 0) + 1;
        localStorage.setItem(LS_VOTE_COUNTS, JSON.stringify(deltas));
        localStorage.setItem(
          LS_VOTED_ISSUES,
          JSON.stringify([...nextVoted])
        );
      } catch {
        // localStorage unavailable — silently continue
      }
    },
    [votedIssues]
  );

  // Use base data during SSR, hydrated data on client
  const contextValue = hydrated
    ? { issues, votedIssues, castVote }
    : { issues: ISSUES, votedIssues: new Set<string>(), castVote };

  return (
    <VotingContext.Provider value={contextValue}>
      {children}
    </VotingContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────────────────────
export function useVoting() {
  const context = useContext(VotingContext);
  if (!context) {
    throw new Error("useVoting must be used within a VotingProvider");
  }
  return context;
}

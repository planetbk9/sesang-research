"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Issue } from "@/types/issue";
import { ISSUES } from "@/data/issues";

// ── localStorage keys ────────────────────────────────────────
const LS_VOTE_COUNTS = "icsc_vote_counts";
const LS_VOTED_ISSUES = "icsc_voted_issues";

/** Load persisted vote deltas from localStorage (issue id → extra votes added by user) */
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

// ── Context type ─────────────────────────────────────────────
interface VotingContextType {
  issues: Issue[];
  votedIssues: Set<string>;
  recentlyVoted: string | null;
  castVote: (issueId: string) => void;
  clearRecentVote: () => void;
}

const VotingContext = createContext<VotingContextType | undefined>(undefined);

// ── Provider ─────────────────────────────────────────────────
export function VotingProvider({ children }: { children: React.ReactNode }) {
  // Initialise from localStorage (client-side only)
  const [issues, setIssues] = useState<Issue[]>(ISSUES);
  const [votedIssues, setVotedIssues] = useState<Set<string>>(new Set());
  const [recentlyVoted, setRecentlyVoted] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount (client only)
  useEffect(() => {
    const deltas = loadVoteDeltas();
    const voted = loadVotedIssues();
    setIssues(applyDeltas(ISSUES, deltas));
    setVotedIssues(voted);
    setHydrated(true);
  }, []);

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
      setRecentlyVoted(issueId);

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
        // localStorage unavailable — silently continue (state still updated)
      }
    },
    [votedIssues]
  );

  const clearRecentVote = useCallback(() => {
    setRecentlyVoted(null);
  }, []);

  // Suppress first-render mismatch by not rendering children until hydrated
  if (!hydrated) {
    return (
      <VotingContext.Provider
        value={{ issues: ISSUES, votedIssues: new Set(), recentlyVoted: null, castVote, clearRecentVote }}
      >
        {children}
      </VotingContext.Provider>
    );
  }

  return (
    <VotingContext.Provider
      value={{ issues, votedIssues, recentlyVoted, castVote, clearRecentVote }}
    >
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

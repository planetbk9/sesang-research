"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Issue } from "@/types/issue";
import { ISSUES } from "@/data/issues";

interface VotingContextType {
  issues: Issue[];
  votedIssues: Set<string>;
  recentlyVoted: string | null;
  castVote: (issueId: string) => void;
  clearRecentVote: () => void;
}

const VotingContext = createContext<VotingContextType | undefined>(undefined);

export function VotingProvider({ children }: { children: React.ReactNode }) {
  const [issues, setIssues] = useState<Issue[]>(ISSUES);
  const [votedIssues, setVotedIssues] = useState<Set<string>>(new Set());
  const [recentlyVoted, setRecentlyVoted] = useState<string | null>(null);

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

      setVotedIssues((prev) => new Set([...prev, issueId]));
      setRecentlyVoted(issueId);
    },
    [votedIssues]
  );

  const clearRecentVote = useCallback(() => {
    setRecentlyVoted(null);
  }, []);

  return (
    <VotingContext.Provider
      value={{ issues, votedIssues, recentlyVoted, castVote, clearRecentVote }}
    >
      {children}
    </VotingContext.Provider>
  );
}

export function useVoting() {
  const context = useContext(VotingContext);
  if (!context) {
    throw new Error("useVoting must be used within a VotingProvider");
  }
  return context;
}

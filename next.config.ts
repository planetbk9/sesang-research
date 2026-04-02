import type { NextConfig } from "next";

/**
 * Next.js production configuration
 * Incheon Smart City Citizen Voting — Proposal Demo
 *
 * This is a static, mockup-only prototype (no backend/auth/database).
 * All data is client-side; no real API routes are used.
 */

// When deploying to GitHub Pages, the app lives under a sub-path.
// Set NEXT_PUBLIC_BASE_PATH at build time (e.g. /sesang-research) to enable this.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Catch common React mistakes early in both dev and production builds
  reactStrictMode: true,

  // ── Static export (GitHub Pages / any CDN) ────────────────────────────────
  // All pages are fully client-side; no server features are used.
  output: "export",

  // Sub-path when hosted on GitHub Pages (<username>.github.io/<repo>)
  basePath,
  assetPrefix: basePath,

  // ── Environment variables ──────────────────────────────────────────────────
  // These are baked into the static bundle at build time.
  // Prefix with NEXT_PUBLIC_ to expose them to the browser.
  env: {
    NEXT_PUBLIC_APP_NAME: "인천 스마트시티 민원 투표",
    NEXT_PUBLIC_APP_VERSION: "0.1.0",
    NEXT_PUBLIC_DEMO_MODE: "true",
  },

  // ── Compiler / build ───────────────────────────────────────────────────────
  // Remove console.log statements in production bundles to keep output clean
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
};

export default nextConfig;

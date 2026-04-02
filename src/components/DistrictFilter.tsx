"use client";

import { useCallback } from "react";
import { GU_LIST, getDongList } from "@/data/issues";

// ─── Props ─────────────────────────────────────────────────────────────────

interface DistrictFilterProps {
  /** Currently selected 구 — "전체" means no filter */
  selectedGu: string;
  /** Currently selected 동 — "전체" means no filter */
  selectedDong: string;
  onGuChange: (gu: string) => void;
  onDongChange: (dong: string) => void;
  /** Optional extra classes for the outer wrapper */
  className?: string;
}

// ─── Component ─────────────────────────────────────────────────────────────

export default function DistrictFilter({
  selectedGu,
  selectedDong,
  onGuChange,
  onDongChange,
  className = "",
}: DistrictFilterProps) {
  // Resolve dong list from the selected gu (derived from actual issue data)
  const dongs = selectedGu !== "전체" ? getDongList(selectedGu) : [];

  const guIsFiltered = selectedGu !== "전체";
  const dongIsFiltered = selectedDong !== "전체";
  const hasFilter = guIsFiltered || dongIsFiltered;

  // When 구 changes, reset 동 to 전체
  const handleGuChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onGuChange(e.target.value);
      onDongChange("전체");
    },
    [onGuChange, onDongChange]
  );

  const handleDongChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onDongChange(e.target.value);
    },
    [onDongChange]
  );

  const handleReset = useCallback(() => {
    onGuChange("전체");
    onDongChange("전체");
  }, [onGuChange, onDongChange]);

  return (
    <section
      aria-label="지역 필터"
      className={`rounded-2xl border border-yellow-200 bg-white shadow-sm p-4 ${className}`}
    >
      {/* ── Header ────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="text-lg leading-none">📍</span>
          <h2 className="text-base font-semibold text-gray-800">지역 필터</h2>
        </div>

        {hasFilter && (
          <button
            type="button"
            onClick={handleReset}
            className="text-sm font-medium text-yellow-600 hover:text-yellow-800 underline underline-offset-2 transition-colors"
            aria-label="지역 필터 전체 초기화"
          >
            초기화
          </button>
        )}
      </div>

      {/* ── Dropdowns ─────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        {/* 구 selector */}
        <div className="flex-1 flex flex-col gap-1.5">
          <label
            htmlFor="gu-select"
            className="text-sm font-medium text-gray-500"
          >
            구 선택
          </label>
          <SelectWrapper active={guIsFiltered}>
            <select
              id="gu-select"
              value={selectedGu}
              onChange={handleGuChange}
              className={selectClass(guIsFiltered)}
            >
              <option value="전체">전체 구</option>
              {GU_LIST.map((gu) => (
                <option key={gu} value={gu}>
                  {gu}
                </option>
              ))}
            </select>
            <ChevronIcon active={guIsFiltered} />
          </SelectWrapper>
        </div>

        {/* 동 selector */}
        <div className="flex-1 flex flex-col gap-1.5">
          <label
            htmlFor="dong-select"
            className={`text-sm font-medium transition-colors ${
              guIsFiltered ? "text-gray-500" : "text-gray-300"
            }`}
          >
            동 선택
          </label>
          <SelectWrapper active={dongIsFiltered}>
            <select
              id="dong-select"
              value={selectedDong}
              onChange={handleDongChange}
              disabled={!guIsFiltered}
              className={selectClass(dongIsFiltered, !guIsFiltered)}
              aria-disabled={!guIsFiltered}
            >
              <option value="전체">전체 동</option>
              {dongs.map((dong) => (
                <option key={dong} value={dong}>
                  {dong}
                </option>
              ))}
            </select>
            <ChevronIcon active={dongIsFiltered} />
          </SelectWrapper>
        </div>
      </div>

      {/* ── Active filter badges ───────────────────────────── */}
      {hasFilter && (
        <div
          className="mt-3 flex flex-wrap gap-2"
          aria-label="활성 필터"
          role="list"
        >
          {guIsFiltered && (
            <FilterBadge
              label={selectedGu}
              onRemove={handleReset}
              aria-label={`구 필터 '${selectedGu}' 제거`}
            />
          )}
          {dongIsFiltered && (
            <FilterBadge
              label={selectedDong}
              onRemove={() => onDongChange("전체")}
              aria-label={`동 필터 '${selectedDong}' 제거`}
            />
          )}
        </div>
      )}
    </section>
  );
}

// ─── Helpers ───────────────────────────────────────────────────────────────

/** Tailwind classes for the <select> element */
function selectClass(active: boolean, disabled = false): string {
  const base =
    "w-full appearance-none rounded-xl border px-4 py-3 pr-10 text-base font-medium bg-white transition-all duration-150 outline-none";

  if (disabled) {
    return `${base} border-gray-100 text-gray-300 bg-gray-50 cursor-not-allowed`;
  }
  if (active) {
    return `${base} border-yellow-400 text-gray-900 ring-2 ring-yellow-100 cursor-pointer`;
  }
  return `${base} border-gray-200 text-gray-500 hover:border-yellow-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 cursor-pointer`;
}

/** Wrapper that provides relative positioning for the custom arrow icon */
function SelectWrapper({
  children,
  active,
}: {
  children: React.ReactNode;
  active: boolean;
}) {
  void active; // used by child icon
  return <div className="relative">{children}</div>;
}

/** Custom dropdown chevron */
function ChevronIcon({ active }: { active: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
      <svg
        className={`w-4 h-4 transition-colors ${active ? "text-yellow-500" : "text-gray-400"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}

/** Yellow pill badge shown below the dropdowns when a filter is active */
function FilterBadge({
  label,
  onRemove,
  "aria-label": ariaLabel,
}: {
  label: string;
  onRemove: () => void;
  "aria-label"?: string;
}) {
  return (
    <span
      role="listitem"
      className="inline-flex items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800"
    >
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={ariaLabel ?? `'${label}' 필터 제거`}
        className="rounded-full p-0.5 hover:bg-yellow-200 transition-colors"
      >
        <svg
          className="w-3 h-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </span>
  );
}

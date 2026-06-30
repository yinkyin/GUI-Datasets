import { Filter, LayoutGrid, List, Search, X } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useRef, useState } from "react";
import type { GuiDataset, Platform } from "@/types/dataset";
import { platformOrder } from "@/data/datasets";
import { getAccessTypes, getRegions, getTasks } from "@/data/selectors";
import type { FilterState, SortKey } from "@/data/selectors";
import { platformLabels } from "@/lib/theme";
import { Pill } from "@/components/Pill";
import { DatasetCard } from "@/components/DatasetCard";
import { EmptyState } from "@/components/EmptyState";

const sortLabels: Record<SortKey, string> = {
  importance: "Importance",
  scale: "Largest scale",
  year: "Newest",
  name: "Name (A–Z)"
};

export type ViewMode = "grid" | "list";

export function Catalog({
  filters,
  setFilters,
  view,
  setView,
  results,
  total,
  compareIds,
  onOpen,
  onCompare,
  onClear
}: {
  filters: FilterState;
  setFilters: Dispatch<SetStateAction<FilterState>>;
  view: ViewMode;
  setView: (v: ViewMode) => void;
  results: GuiDataset[];
  total: number;
  compareIds: string[];
  onOpen: (dataset: GuiDataset) => void;
  onCompare: (id: string) => void;
  onClear: () => void;
}) {
  const searchRef = useRef<HTMLInputElement>(null);
  const [queryInput, setQueryInput] = useState(filters.query);
  const tasks = getTasks();
  const accessTypes = getAccessTypes();
  const regions = getRegions();

  useEffect(() => {
    // Keep local input in sync when filters.query is changed externally (clear all / chip remove).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQueryInput(filters.query);
  }, [filters.query]);

  useEffect(() => {
    if (queryInput === filters.query) return;
    const id = window.setTimeout(() => {
      setFilters((f) => ({ ...f, query: queryInput }));
    }, 200);
    return () => window.clearTimeout(id);
  }, [queryInput, filters.query, setFilters]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const activeChips: Array<{ label: string; onRemove: () => void }> = [];
  if (filters.platform !== "All") activeChips.push({ label: platformLabels[filters.platform as Platform], onRemove: () => setFilters((f) => ({ ...f, platform: "All" })) });
  if (filters.task !== "All") activeChips.push({ label: filters.task, onRemove: () => setFilters((f) => ({ ...f, task: "All" })) });
  if (filters.access !== "All") activeChips.push({ label: filters.access, onRemove: () => setFilters((f) => ({ ...f, access: "All" })) });
  if (filters.region !== "All") activeChips.push({ label: filters.region, onRemove: () => setFilters((f) => ({ ...f, region: "All" })) });
  if (filters.query.trim()) activeChips.push({ label: `“${filters.query.trim()}”`, onRemove: () => setFilters((f) => ({ ...f, query: "" })) });

  return (
    <section id="catalog" className="mx-auto mt-12 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">Catalog</p>
          <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-foreground">Find the right GUI dataset faster.</h2>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span className="tabular-nums">{results.length}</span> of <span className="tabular-nums">{total}</span> shown
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-4 shadow-soft sm:p-5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            ref={searchRef}
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            placeholder="Search datasets, tasks, annotations, sources…  (press / to focus)"
            className="w-full rounded-2xl border border-input bg-background py-3 pl-12 pr-10 text-sm font-medium text-foreground outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-4 focus:ring-ring/20"
          />
          {queryInput && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                setQueryInput("");
                setFilters((f) => ({ ...f, query: "" }));
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Pill active={filters.platform === "All"} onClick={() => setFilters((f) => ({ ...f, platform: "All" }))}>
            All platforms
          </Pill>
          {platformOrder.map((item) => (
            <Pill key={item} active={filters.platform === item} onClick={() => setFilters((f) => ({ ...f, platform: item }))}>
              {platformLabels[item]}
            </Pill>
          ))}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <select value={filters.task} onChange={(e) => setFilters((f) => ({ ...f, task: e.target.value }))} className="input-control cursor-pointer">
            <option value="All">All tasks</option>
            {tasks.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <select value={filters.access} onChange={(e) => setFilters((f) => ({ ...f, access: e.target.value }))} className="input-control cursor-pointer">
            <option value="All">All access channels</option>
            {accessTypes.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <select value={filters.region} onChange={(e) => setFilters((f) => ({ ...f, region: e.target.value }))} className="input-control cursor-pointer">
            <option value="All">All regions</option>
            {regions.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <select value={filters.sort} onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value as SortKey }))} className="input-control cursor-pointer">
            {(Object.keys(sortLabels) as SortKey[]).map((key) => (
              <option key={key} value={key}>Sort: {sortLabels[key]}</option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {activeChips.length > 0 && (
            <>
              {activeChips.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={chip.onRemove}
                  className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-foreground transition hover:bg-border"
                >
                  {chip.label}
                  <X className="h-3 w-3" />
                </button>
              ))}
              <button type="button" onClick={onClear} className="text-xs font-semibold text-accent transition hover:underline">
                Clear all
              </button>
            </>
          )}
          <div className="ml-auto inline-flex items-center gap-0.5 rounded-full border border-border bg-background p-1">
            <button
              type="button"
              aria-label="Grid view"
              aria-pressed={view === "grid"}
              onClick={() => setView("grid")}
              className={`flex h-8 w-8 items-center justify-center rounded-full transition ${view === "grid" ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="List view"
              aria-pressed={view === "list"}
              onClick={() => setView("list")}
              className={`flex h-8 w-8 items-center justify-center rounded-full transition ${view === "list" ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="mt-6">
          <EmptyState onClear={onClear} />
        </div>
      ) : (
        <div className={`mt-6 grid gap-5 ${view === "grid" ? "lg:grid-cols-2" : "grid-cols-1"}`}>
          {results.map((dataset, index) => (
            <DatasetCard
              key={dataset.id}
              dataset={dataset}
              index={index}
              compared={compareIds.includes(dataset.id)}
              onOpen={() => onOpen(dataset)}
              onCompare={() => onCompare(dataset.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

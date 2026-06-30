import { useEffect, useState } from "react";
import type { FilterState, SortKey } from "@/data/selectors";
import type { Platform } from "@/types/dataset";
import type { ViewMode } from "@/sections/Catalog";

const VIEW_KEY = "gui-datasets:view";

const defaults: FilterState = {
  query: "",
  platform: "All",
  task: "All",
  access: "All",
  region: "All",
  sort: "importance"
};

function readFromUrl(): { filters: FilterState; compareIds: string[] } {
  if (typeof window === "undefined") return { filters: defaults, compareIds: [] };
  const params = new URLSearchParams(window.location.search);
  const filters: FilterState = {
    query: params.get("q") ?? "",
    platform: (params.get("platform") as Platform | "All") ?? "All",
    task: params.get("task") ?? "All",
    access: params.get("access") ?? "All",
    region: params.get("region") ?? "All",
    sort: (params.get("sort") as SortKey) ?? "importance"
  };
  const compare = params.get("compare");
  return { filters, compareIds: compare ? compare.split(",").filter(Boolean) : [] };
}

export function useCatalogState() {
  const [filters, setFilters] = useState<FilterState>(() => readFromUrl().filters);
  const [compareIds, setCompareIds] = useState<string[]>(() => readFromUrl().compareIds);
  const [view, setView] = useState<ViewMode>(() => {
    if (typeof window === "undefined") return "grid";
    return (window.localStorage.getItem(VIEW_KEY) as ViewMode) ?? "grid";
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.query.trim()) params.set("q", filters.query.trim());
    if (filters.platform !== "All") params.set("platform", filters.platform);
    if (filters.task !== "All") params.set("task", filters.task);
    if (filters.access !== "All") params.set("access", filters.access);
    if (filters.region !== "All") params.set("region", filters.region);
    if (filters.sort !== "importance") params.set("sort", filters.sort);
    if (compareIds.length) params.set("compare", compareIds.join(","));
    const query = params.toString();
    const next = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`;
    window.history.replaceState(null, "", next);
  }, [filters, compareIds]);

  useEffect(() => {
    window.localStorage.setItem(VIEW_KEY, view);
  }, [view]);

  function clearFilters() {
    setFilters(defaults);
  }

  function toggleCompare(id: string) {
    setCompareIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length >= 4) return [...current.slice(1), id];
      return [...current, id];
    });
  }

  return { filters, setFilters, compareIds, setCompareIds, view, setView, clearFilters, toggleCompare };
}

import { datasets, platformOrder } from "@/data/datasets";
import { datasetsZh } from "@/data/datasets.zh";
import type { GuiDataset, Platform } from "@/types/dataset";

const numberFormatter = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });

export function formatScale(value: number) {
  return numberFormatter.format(value);
}

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

export function getTasks() {
  return uniqueSorted(datasets.flatMap((dataset) => dataset.tasks));
}

export function getAccessTypes() {
  return uniqueSorted(datasets.map((dataset) => dataset.access));
}

export function getRegions() {
  return uniqueSorted(datasets.map((dataset) => dataset.region));
}

export function getLanguages() {
  return uniqueSorted(datasets.map((dataset) => dataset.language));
}

export function getById(id: string) {
  return datasets.find((dataset) => dataset.id === id);
}

export function getPrimaryUrl(dataset: GuiDataset) {
  return dataset.links.find((link) => link.type === "download")?.url ?? dataset.links[0]?.url ?? "#";
}

export function platformDistribution() {
  return platformOrder.map((platform) => ({
    platform: platform as Platform,
    name: platform,
    value: datasets.filter((dataset) => dataset.platform === platform).length
  }));
}

export function taskDistribution(limit = 8) {
  const counts = new Map<string, number>();
  datasets.forEach((dataset) => dataset.tasks.forEach((item) => counts.set(item, (counts.get(item) ?? 0) + 1)));
  return Array.from(counts.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
}

export function catalogTotals() {
  const totalScale = datasets.reduce((sum, dataset) => sum + dataset.scaleValue, 0);
  const hfCount = datasets.filter((dataset) => dataset.access === "Hugging Face").length;
  const chinaCount = datasets.filter((dataset) => dataset.region === "China-focused").length;
  const downloadableCount = datasets.filter((dataset) => dataset.downloadable).length;
  return { totalScale, hfCount, chinaCount, downloadableCount, count: datasets.length };
}

export type SortKey = "importance" | "scale" | "year" | "name";

export interface FilterState {
  query: string;
  platform: Platform | "All";
  task: string;
  access: string;
  region: string;
  sort: SortKey;
}

export function filterAndSort(state: FilterState) {
  const q = state.query.trim().toLowerCase();
  return datasets
    .filter((dataset) => state.platform === "All" || dataset.platform === state.platform)
    .filter((dataset) => state.task === "All" || dataset.tasks.includes(state.task))
    .filter((dataset) => state.access === "All" || dataset.access === state.access)
    .filter((dataset) => state.region === "All" || dataset.region === state.region)
    .filter((dataset) => {
      if (!q) return true;
      const zh = datasetsZh[dataset.id];
      const haystack = [
        dataset.name,
        dataset.shortName,
        dataset.source,
        dataset.summary,
        dataset.platform,
        dataset.access,
        ...dataset.tasks,
        ...dataset.annotations,
        ...dataset.bestFor,
        zh?.source,
        zh?.summary,
        ...(zh?.tasks ?? []),
        ...(zh?.annotations ?? []),
        ...(zh?.bestFor ?? []),
        ...(zh?.surfaces ?? []),
        ...(zh?.modalities ?? []),
        ...(zh?.strengths ?? []),
        ...(zh?.caveats ?? [])
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    })
    .sort((a, b) => {
      switch (state.sort) {
        case "scale":
          return b.scaleValue - a.scaleValue || b.stars - a.stars;
        case "year":
          return (b.year ?? 0) - (a.year ?? 0) || b.stars - a.stars;
        case "name":
          return a.name.localeCompare(b.name);
        case "importance":
        default:
          return b.stars - a.stars || b.scaleValue - a.scaleValue || a.name.localeCompare(b.name);
      }
    });
}

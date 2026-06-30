import type { GuiDataset } from "@/types/dataset";
import type { Lang } from "@/i18n/strings";
import { datasetsZh } from "@/data/datasets.zh";

export interface LocalizedDataset {
  summary: string;
  scaleLabel: string;
  source: string;
  bestFor: string[];
  tasks: string[];
  surfaces: string[];
  annotations: string[];
  modalities: string[];
  strengths: string[];
  caveats: string[];
}

/**
 * Returns display fields for a dataset in the active language.
 * Filtering/keys still use the English originals (see selectors.ts);
 * this view object is for rendering only. Falls back to English when a
 * Chinese mirror is missing.
 */
export function localizeDataset(dataset: GuiDataset, lang: Lang): LocalizedDataset {
  const zh = lang === "zh" ? datasetsZh[dataset.id] : undefined;
  return {
    summary: zh?.summary ?? dataset.summary,
    scaleLabel: zh?.scaleLabel ?? dataset.scaleLabel,
    source: zh?.source ?? dataset.source,
    bestFor: zh?.bestFor ?? dataset.bestFor,
    tasks: zh?.tasks ?? dataset.tasks,
    surfaces: zh?.surfaces ?? dataset.surfaces,
    annotations: zh?.annotations ?? dataset.annotations,
    modalities: zh?.modalities ?? dataset.modalities,
    strengths: zh?.strengths ?? dataset.strengths,
    caveats: zh?.caveats ?? dataset.caveats
  };
}

import { GitCompare, X } from "lucide-react";
import type { GuiDataset } from "@/types/dataset";
import { useLanguage } from "@/i18n/useLanguage";

export function CompareBar({
  selected,
  onRemove,
  onClear,
  onView
}: {
  selected: GuiDataset[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onView: () => void;
}) {
  const { t } = useLanguage();
  if (selected.length === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-4">
      <div className="flex w-full max-w-3xl animate-slide-up flex-wrap items-center gap-3 rounded-3xl border border-border bg-secondary px-4 py-3 text-secondary-foreground shadow-soft-lg">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <GitCompare className="h-4 w-4 text-primary" />
          <span className="tabular-nums">{selected.length}/4</span>
          <span className="hidden sm:inline">{t("compare.selected")}</span>
        </div>
        <div className="flex min-w-0 flex-1 flex-wrap gap-1.5">
          {selected.map((dataset) => (
            <button
              key={dataset.id}
              type="button"
              onClick={() => onRemove(dataset.id)}
              className="inline-flex items-center gap-1 rounded-full bg-secondary-foreground/10 px-2.5 py-1 text-xs font-semibold transition hover:bg-secondary-foreground/20"
            >
              {dataset.shortName}
              <X className="h-3 w-3" />
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={onClear}
            className="rounded-full px-3 py-1.5 text-xs font-semibold text-secondary-foreground/70 transition hover:text-secondary-foreground"
          >
            {t("compare.clear")}
          </button>
          <button
            type="button"
            onClick={onView}
            className="rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground transition hover:opacity-90"
          >
            {t("compare.compare")}
          </button>
        </div>
      </div>
    </div>
  );
}

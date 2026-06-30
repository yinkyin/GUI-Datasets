import { ArrowUpRight, Check, Plus, Star } from "lucide-react";
import type { GuiDataset } from "@/types/dataset";
import { getPrimaryUrl } from "@/data/selectors";
import { useIsDark } from "@/hooks/use-theme";
import { getPlatformColors } from "@/lib/theme";

export function DatasetCard({
  dataset,
  compared,
  onOpen,
  onCompare,
  index
}: {
  dataset: GuiDataset;
  compared: boolean;
  onOpen: () => void;
  onCompare: () => void;
  index: number;
}) {
  const isDark = useIsDark();
  const platformColor = getPlatformColors(isDark)[dataset.platform];

  return (
    <article
      className="group flex h-full animate-slide-up flex-col rounded-3xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-soft-lg"
      style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="rounded-full px-2.5 py-1 text-xs font-bold text-white"
            style={{ backgroundColor: platformColor }}
          >
            {dataset.platform}
          </span>
          <span className="rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
            {dataset.access}
          </span>
          {dataset.region === "China-focused" && (
            <span className="rounded-full border border-accent/40 bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent">
              China-focused
            </span>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-0.5 text-primary" aria-label={`Importance ${dataset.stars} of 3`}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < dataset.stars ? "fill-current" : "opacity-25"}`} />
          ))}
        </div>
      </div>

      <button type="button" onClick={onOpen} className="mt-4 text-left">
        <h3 className="font-display text-xl font-bold tracking-tight text-foreground transition group-hover:text-foreground">
          {dataset.name}
        </h3>
      </button>
      <p className="mt-1 text-sm font-medium text-muted-foreground">{dataset.source}</p>

      <div className="mt-4 flex items-center justify-between rounded-2xl bg-muted px-4 py-3">
        <div>
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">Scale</p>
          <p className="mt-0.5 text-base font-bold tabular-nums text-foreground">{dataset.scaleLabel}</p>
        </div>
        {dataset.year && (
          <span className="rounded-lg border border-border bg-card px-2 py-1 text-xs font-semibold tabular-nums text-muted-foreground">
            {dataset.year}
          </span>
        )}
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">{dataset.summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {dataset.tasks.slice(0, 4).map((task) => (
          <span key={task} className="rounded-full bg-primary/15 px-2.5 py-1 text-xs font-semibold text-foreground">
            {task}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2 pt-1">
        <a
          href={getPrimaryUrl(dataset)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground transition hover:opacity-90"
        >
          Open <ArrowUpRight className="h-4 w-4" />
        </a>
        <button
          type="button"
          onClick={onOpen}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition hover:border-foreground/30 hover:bg-muted"
        >
          Details
        </button>
        <button
          type="button"
          onClick={onCompare}
          aria-pressed={compared}
          className={`ml-auto inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition ${
            compared
              ? "border-primary bg-primary/20 text-foreground"
              : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-primary/10"
          }`}
        >
          {compared ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {compared ? "Added" : "Compare"}
        </button>
      </div>
    </article>
  );
}

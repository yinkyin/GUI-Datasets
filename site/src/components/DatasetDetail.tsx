import { useEffect, useRef } from "react";
import { ArrowUpRight, Check, CheckCircle2, Globe2, Languages, Plus, ShieldAlert, Star, X } from "lucide-react";
import type { GuiDataset } from "@/types/dataset";
import { getPrimaryUrl } from "@/data/selectors";
import { useIsDark } from "@/hooks/use-theme";
import { getPlatformColors } from "@/lib/theme";
import { LinkPill } from "@/components/LinkPill";

export function DatasetDetail({
  dataset,
  compared,
  onClose,
  onCompare
}: {
  dataset: GuiDataset | null;
  compared: boolean;
  onClose: () => void;
  onCompare: (id: string) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const isDark = useIsDark();

  useEffect(() => {
    if (!dataset) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [dataset, onClose]);

  if (!dataset) return null;
  const platformColor = getPlatformColors(isDark)[dataset.platform];

  const meta = [
    { label: "Region", value: dataset.region, icon: Globe2 },
    { label: "Language", value: dataset.language, icon: Languages },
    { label: "Access", value: dataset.access },
    { label: "License", value: dataset.license ?? "Verify before use" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-label={`${dataset.name} details`}>
      <div className="absolute inset-0 animate-fade-in bg-foreground/40 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative z-10 max-h-[92vh] w-full max-w-2xl animate-slide-up overflow-y-auto rounded-t-4xl border border-border bg-card shadow-soft-lg outline-none sm:rounded-4xl"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border/70 bg-card/95 px-6 py-5 backdrop-blur">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full px-2.5 py-1 text-xs font-bold text-white" style={{ backgroundColor: platformColor }}>
                {dataset.platform}
              </span>
              <div className="flex items-center gap-0.5 text-primary" aria-label={`Importance ${dataset.stars} of 3`}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <Star key={i} className={`h-3.5 w-3.5 ${i < dataset.stars ? "fill-current" : "opacity-25"}`} />
                ))}
              </div>
            </div>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground">{dataset.name}</h2>
            <p className="mt-0.5 text-sm font-medium text-muted-foreground">{dataset.source}</p>
          </div>
          <button
            type="button"
            aria-label="Close details"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6 px-6 py-6">
          <div className="rounded-2xl bg-muted px-4 py-3">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">Scale</p>
            <p className="mt-0.5 text-lg font-bold tabular-nums text-foreground">{dataset.scaleLabel}</p>
          </div>

          <p className="text-sm leading-7 text-foreground/90">{dataset.summary}</p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {meta.map((item) => (
              <div key={item.label} className="rounded-2xl border border-border bg-background/60 p-3">
                <p className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">{item.label}</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{item.value}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="font-display text-sm font-bold text-foreground">Best for</p>
            <ul className="mt-2 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              {dataset.bestFor.map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <p className="font-display text-sm font-bold text-foreground">Annotations</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {dataset.annotations.map((item) => (
                  <span key={item} className="rounded-lg bg-muted px-2 py-1 text-xs font-medium text-foreground/80">{item}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="font-display text-sm font-bold text-foreground">Modalities</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {dataset.modalities.map((item) => (
                  <span key={item} className="rounded-lg bg-muted px-2 py-1 text-xs font-medium text-foreground/80">{item}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-success/25 bg-success/10 p-4">
              <p className="flex items-center gap-1.5 font-display text-sm font-bold text-foreground">
                <CheckCircle2 className="h-4 w-4 text-success" /> Strengths
              </p>
              <ul className="mt-2 space-y-1.5 text-sm text-foreground/80">
                {dataset.strengths.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-accent/25 bg-accent/10 p-4">
              <p className="flex items-center gap-1.5 font-display text-sm font-bold text-foreground">
                <ShieldAlert className="h-4 w-4 text-accent" /> Watch-outs
              </p>
              <ul className="mt-2 space-y-1.5 text-sm text-foreground/80">
                {dataset.caveats.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {dataset.links.map((link) => (
              <LinkPill key={`${dataset.id}-${link.label}`} link={link} />
            ))}
          </div>
        </div>

        <div className="sticky bottom-0 flex flex-wrap items-center gap-2 border-t border-border/70 bg-card/95 px-6 py-4 backdrop-blur">
          <a
            href={getPrimaryUrl(dataset)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition hover:opacity-90"
          >
            Open dataset <ArrowUpRight className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={() => onCompare(dataset.id)}
            aria-pressed={compared}
            className={`inline-flex items-center gap-1.5 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
              compared
                ? "border-primary bg-primary/20 text-foreground"
                : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-primary/10"
            }`}
          >
            {compared ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {compared ? "In comparison" : "Add to compare"}
          </button>
        </div>
      </div>
    </div>
  );
}

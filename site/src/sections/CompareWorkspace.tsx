import { GitBranch, X } from "lucide-react";
import type { GuiDataset } from "@/types/dataset";
import { ComparePanel } from "@/components/ComparePanel";

export function CompareWorkspace({ selected, onRemove }: { selected: GuiDataset[]; onRemove: (id: string) => void }) {
  return (
    <section id="compare" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="rounded-3xl border border-border bg-secondary p-6 text-secondary-foreground shadow-soft">
          <div className="rounded-2xl bg-secondary-foreground/10 p-2.5 w-fit">
            <GitBranch className="h-7 w-7 text-primary" />
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold">Comparison workspace</h2>
          <p className="mt-3 text-sm leading-6 text-secondary-foreground/80">
            Keep this as a decision aid: compare scale, labels and caveats before choosing a training mix or benchmark suite.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {selected.length === 0 ? (
              <p className="text-sm text-secondary-foreground/60">Add datasets from the catalog to start comparing.</p>
            ) : (
              selected.map((dataset) => (
                <button
                  key={dataset.id}
                  type="button"
                  onClick={() => onRemove(dataset.id)}
                  className="inline-flex items-center gap-1 rounded-full bg-secondary-foreground/10 px-3 py-1.5 text-xs font-bold transition hover:bg-secondary-foreground/20"
                >
                  {dataset.shortName} <X className="h-3 w-3" />
                </button>
              ))
            )}
          </div>
        </div>
        <ComparePanel selected={selected} />
      </div>
    </section>
  );
}

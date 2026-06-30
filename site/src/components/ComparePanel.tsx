import type { GuiDataset } from "@/types/dataset";

export function ComparePanel({ selected }: { selected: GuiDataset[] }) {
  if (selected.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-border bg-card/60 p-6 text-sm text-muted-foreground">
        Pick up to four datasets from the catalog to build a side-by-side research plan.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border text-left text-sm">
          <thead className="bg-muted text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-bold">Dataset</th>
              <th className="px-4 py-3 font-bold">Scale</th>
              <th className="px-4 py-3 font-bold">Tasks</th>
              <th className="px-4 py-3 font-bold">Annotations</th>
              <th className="px-4 py-3 font-bold">Primary risk</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/70">
            {selected.map((dataset) => (
              <tr key={dataset.id} className="align-top transition hover:bg-muted/50">
                <td className="px-4 py-4 font-bold text-foreground">{dataset.shortName}</td>
                <td className="px-4 py-4 tabular-nums text-muted-foreground">{dataset.scaleLabel}</td>
                <td className="px-4 py-4 text-muted-foreground">{dataset.tasks.slice(0, 3).join(", ")}</td>
                <td className="px-4 py-4 text-muted-foreground">{dataset.annotations.slice(0, 3).join(", ")}</td>
                <td className="px-4 py-4 text-muted-foreground">{dataset.caveats[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

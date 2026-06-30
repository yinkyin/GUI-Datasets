import { SearchX } from "lucide-react";

export function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/60 px-6 py-16 text-center">
      <div className="rounded-2xl bg-muted p-4 text-muted-foreground">
        <SearchX className="h-7 w-7" />
      </div>
      <h3 className="mt-5 font-display text-xl font-bold text-foreground">No datasets match your filters</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        Try a broader search term or remove a filter. The catalog covers web, mobile, cross-platform, security, screenshot-to-code and Chinese GUI data.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-6 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition hover:opacity-90"
      >
        Clear all filters
      </button>
    </div>
  );
}

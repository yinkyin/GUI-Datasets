import type { Database } from "lucide-react";

export function StatCard({
  label,
  value,
  note,
  icon: Icon
}: {
  label: string;
  value: string;
  note: string;
  icon: typeof Database;
}) {
  return (
    <div className="group rounded-3xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-soft-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 font-display text-3xl font-bold tabular-nums tracking-tight text-foreground">{value}</p>
        </div>
        <div className="rounded-2xl bg-primary/15 p-3 text-foreground transition group-hover:bg-primary/25">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">{note}</p>
    </div>
  );
}

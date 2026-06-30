import { Database, Globe2, Layers3, PieChart as PieIcon, ShieldCheck, Tags } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { StatCard } from "@/components/StatCard";
import { useIsDark } from "@/hooks/use-theme";
import { getChartAccent, getChartNeutrals, getPlatformColors } from "@/lib/theme";
import { catalogTotals, formatScale, platformDistribution, taskDistribution } from "@/data/selectors";

export function Overview() {
  const isDark = useIsDark();
  const colors = getPlatformColors(isDark);
  const neutrals = getChartNeutrals(isDark);
  const accent = getChartAccent(isDark);
  const totals = catalogTotals();
  const distribution = platformDistribution();
  const tasks = taskDistribution();

  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <StatCard label="Indexed datasets" value={`${totals.count}`} note="Structured from the repository into searchable, comparable records." icon={Database} />
        <StatCard label="Potential UI artifacts" value={`${formatScale(totals.totalScale)}+`} note="Approximate screenshots, pairs, traces and QA items represented in the catalog." icon={Layers3} />
        <StatCard label="HF-hosted entries" value={`${totals.hfCount}`} note="Hugging Face links are first-class because they are easiest to extend and mirror." icon={Globe2} />
        <StatCard label="China-focused entries" value={`${totals.chinaCount}`} note="Chinese app and mini-program data is highlighted as a strategic differentiation point." icon={ShieldCheck} />
      </section>

      <section id="overview" className="mx-auto mt-8 grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="rounded-3xl border border-border bg-secondary p-6 text-secondary-foreground shadow-soft">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Coverage</p>
              <h2 className="mt-1 font-display text-2xl font-bold">Dataset count by platform</h2>
            </div>
            <PieIcon className="h-6 w-6 text-primary" />
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={distribution} dataKey="value" nameKey="name" innerRadius={62} outerRadius={104} paddingAngle={3} stroke="none">
                  {distribution.map((entry) => (
                    <Cell key={entry.name} fill={colors[entry.platform]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            {distribution.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5 text-xs font-medium text-secondary-foreground/85">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: colors[item.platform] }} />
                {item.name} <span className="tabular-nums opacity-70">({item.value})</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">Task map</p>
              <h2 className="mt-1 font-display text-2xl font-bold text-foreground">Most common research tasks</h2>
            </div>
            <Tags className="h-6 w-6 text-accent" />
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tasks} layout="vertical" margin={{ left: 18, right: 16, top: 4, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={neutrals.grid} />
                <XAxis type="number" allowDecimals={false} stroke={neutrals.axis} tick={{ fontSize: 12, fill: neutrals.axis }} />
                <YAxis dataKey="name" type="category" width={124} tick={{ fontSize: 12, fill: neutrals.axis }} stroke={neutrals.axis} />
                <Tooltip cursor={{ fill: neutrals.grid }} />
                <Bar dataKey="value" fill={accent} radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </>
  );
}

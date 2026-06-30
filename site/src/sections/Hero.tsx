import { ArrowUpRight, BarChart3, Sparkles, Zap } from "lucide-react";
import { useIsDark } from "@/hooks/use-theme";
import { getPlatformColors, platformLabels } from "@/lib/theme";
import { platformDistribution } from "@/data/selectors";

export function Hero({ count }: { count: number }) {
  const isDark = useIsDark();
  const colors = getPlatformColors(isDark);
  const distribution = platformDistribution();
  const max = Math.max(...distribution.map((d) => d.value), 1);

  return (
    <section id="top" className="relative mx-auto max-w-7xl px-4 pb-12 pt-12 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="animate-slide-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-sm font-semibold text-foreground shadow-xs">
            <Sparkles className="h-4 w-4 text-primary" />
            A public map of GUI data for agents, grounding, VQA & screenshot-to-code
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Turn a dataset list into a research-grade GUI data platform.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Explore GUI datasets by platform, annotation, task, region and access channel. The goal is not only to list links, but to help researchers decide what to use, how to combine it, and where the gaps are.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#catalog"
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-bold text-secondary-foreground shadow-soft transition hover:-translate-y-0.5 hover:shadow-soft-lg"
            >
              Browse catalog <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#classifier"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-bold text-foreground transition hover:border-foreground/30 hover:bg-muted"
            >
              Test auto classification <Zap className="h-4 w-4 text-primary" />
            </a>
          </div>
        </div>

        <div className="animate-fade-in rounded-4xl border border-border bg-card/80 p-4 shadow-soft-lg backdrop-blur">
          <div className="rounded-3xl bg-secondary p-5 text-secondary-foreground">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-primary">Live catalog snapshot</p>
                <p className="font-display text-3xl font-extrabold tabular-nums">{count} datasets</p>
              </div>
              <div className="rounded-2xl bg-secondary-foreground/10 p-2.5">
                <BarChart3 className="h-7 w-7 text-primary" />
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              {distribution.map((item) => (
                <div key={item.name}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-secondary-foreground/85">{platformLabels[item.platform]}</span>
                    <span className="font-bold tabular-nums">{item.value}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-secondary-foreground/10">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${Math.max(6, (item.value / max) * 100)}%`, backgroundColor: colors[item.platform] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

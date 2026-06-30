import { BookOpen } from "lucide-react";
import { strategicUseCases } from "@/data/datasets";
import { strategicUseCasesZh } from "@/data/datasets.zh";
import { useLanguage } from "@/i18n/useLanguage";

export function UseCases() {
  const { t, lang } = useLanguage();
  return (
    <section id="roadmap" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="rounded-4xl border border-border bg-card p-6 shadow-soft lg:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-2xl bg-primary/15 p-3 text-foreground">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">{t("usecases.kicker")}</p>
            <h2 className="font-display text-3xl font-bold text-foreground">{t("usecases.title")}</h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {strategicUseCases.map((item) => {
            const zh = lang === "zh" ? strategicUseCasesZh[item.label] : undefined;
            return (
              <div key={item.label} className="flex flex-col rounded-3xl border border-border bg-background/60 p-5 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft">
                <h3 className="font-display text-lg font-bold text-foreground">{zh?.label ?? item.label}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.datasets.map((dataset) => (
                    <span key={dataset} className="rounded-full bg-card px-2.5 py-1 text-xs font-bold text-foreground shadow-xs">{dataset}</span>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{zh?.note ?? item.note}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

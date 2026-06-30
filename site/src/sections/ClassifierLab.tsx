import { useMemo, useState } from "react";
import { BadgeCheck } from "lucide-react";
import { classifyCandidate, toDatasetYaml } from "@/lib/classifier";
import { useLanguage } from "@/i18n/useLanguage";
import { accessLabel, regionLabel, taskLabel } from "@/i18n/strings";

export function ClassifierLab() {
  const { t, lang } = useLanguage();
  const [candidate, setCandidate] = useState({
    url: "https://huggingface.co/datasets/openbmb/CAGUI",
    title: "CAGUI",
    description: "Chinese Android GUI grounding and agent traces with bilingual instructions across mainstream apps."
  });

  const result = useMemo(() => classifyCandidate(candidate), [candidate]);
  const yaml = useMemo(() => toDatasetYaml(candidate, result), [candidate, result]);

  const rationale =
    lang === "zh"
      ? [
          `来源识别为 ${accessLabel(result.access, lang)}。`,
          result.tasks.length
            ? `推断的可能任务标签：${result.tasks.map((tk) => taskLabel(tk, lang)).join("、")}。`
            : "任务标签需查看数据集卡片后人工确认。",
          `区域推断为 ${regionLabel(result.region, lang)}，合并前请人工核实事实。`
        ]
      : result.rationale;

  return (
    <section id="classifier" className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-6 rounded-4xl border border-border bg-card p-6 shadow-soft lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">{t("classifier.kicker")}</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground">
            {t("classifier.title")}
          </h2>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            {t("classifier.desc")}
          </p>
          <div className="mt-6 grid gap-3">
            <label className="text-sm font-bold text-foreground" htmlFor="candidate-url">{t("classifier.url")}</label>
            <input id="candidate-url" value={candidate.url} onChange={(e) => setCandidate({ ...candidate, url: e.target.value })} className="input-control" />
            <label className="text-sm font-bold text-foreground" htmlFor="candidate-title">{t("classifier.titleField")}</label>
            <input id="candidate-title" value={candidate.title} onChange={(e) => setCandidate({ ...candidate, title: e.target.value })} className="input-control" />
            <label className="text-sm font-bold text-foreground" htmlFor="candidate-description">{t("classifier.descField")}</label>
            <textarea id="candidate-description" value={candidate.description} onChange={(e) => setCandidate({ ...candidate, description: e.target.value })} className="input-control min-h-28" />
          </div>
        </div>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-border bg-background/60 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-muted-foreground">{t("classifier.inferred")}</p>
                <h3 className="mt-1 font-display text-2xl font-bold text-foreground">{result.platform}</h3>
              </div>
              <div className="rounded-2xl bg-success/15 px-3 py-2 text-sm font-bold tabular-nums text-success">
                {Math.round(result.confidence * 100)}%
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-muted p-4">
                <p className="text-xs font-bold uppercase text-muted-foreground">{t("classifier.access")}</p>
                <p className="mt-1 font-bold text-foreground">{accessLabel(result.access, lang)}</p>
              </div>
              <div className="rounded-2xl bg-muted p-4">
                <p className="text-xs font-bold uppercase text-muted-foreground">{t("classifier.region")}</p>
                <p className="mt-1 font-bold text-foreground">{regionLabel(result.region, lang)}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {result.tasks.map((item) => (
                <span key={item} className="rounded-full bg-primary/15 px-3 py-1.5 text-xs font-bold text-foreground">{taskLabel(item, lang)}</span>
              ))}
              {result.annotations.map((item) => (
                <span key={item} className="rounded-full bg-accent/15 px-3 py-1.5 text-xs font-bold text-accent">{item}</span>
              ))}
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {rationale.map((item) => (
                <li key={item} className="flex gap-2">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <pre className="overflow-x-auto rounded-3xl border border-border bg-secondary p-5 font-mono text-xs leading-6 text-secondary-foreground">
            <code>{yaml}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}

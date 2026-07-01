import type { GuiDataset } from "@/types/dataset";
import { localizeDataset } from "@/data/localize";
import { useLanguage } from "@/i18n/useLanguage";

export function ComparePanel({ selected }: { selected: GuiDataset[] }) {
  const { t, lang } = useLanguage();

  if (selected.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-border bg-card/60 p-6 text-sm text-muted-foreground">
        {t("compare.panelEmpty")}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border text-left text-sm">
          <thead className={`bg-muted text-xs text-muted-foreground ${lang === "zh" ? "" : "uppercase tracking-wider"}`}>
            <tr>
              <th className="px-4 py-3 font-bold">{t("compare.col.dataset")}</th>
              <th className="px-4 py-3 font-bold">{t("compare.col.scale")}</th>
              <th className="px-4 py-3 font-bold">{t("compare.col.tasks")}</th>
              <th className="px-4 py-3 font-bold">{t("compare.col.annotations")}</th>
              <th className="px-4 py-3 font-bold">{t("compare.col.risk")}</th>
            </tr>
          </thead>
          <tbody className={`divide-y divide-border/70 ${lang === "zh" ? "leading-6" : ""}`}>
            {selected.map((dataset) => {
              const local = localizeDataset(dataset, lang);
              return (
                <tr key={dataset.id} className="align-top transition hover:bg-muted/50">
                  <td className="px-4 py-4 font-bold text-foreground">{dataset.shortName}</td>
                  <td className="px-4 py-4 tabular-nums text-muted-foreground">{local.scaleLabel}</td>
                  <td className="px-4 py-4 text-muted-foreground">{local.tasks.slice(0, 3).join(lang === "zh" ? "、" : ", ")}</td>
                  <td className="px-4 py-4 text-muted-foreground">{local.annotations.slice(0, 3).join(lang === "zh" ? "、" : ", ")}</td>
                  <td className="px-4 py-4 text-muted-foreground">{local.caveats[0]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

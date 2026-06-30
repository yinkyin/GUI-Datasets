import { Database, Github } from "lucide-react";
import { useLanguage } from "@/i18n/useLanguage";

export function Footer({ count }: { count: number }) {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-border/70 bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-secondary p-2 text-secondary-foreground">
                <Database className="h-5 w-5" />
              </div>
              <p className="font-display text-base font-bold text-foreground">{t("nav.brand")}</p>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">{t("footer.desc", { n: count })}</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{t("footer.explore")}</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li><a className="text-foreground/80 transition hover:text-foreground" href="#catalog">{t("nav.catalog")}</a></li>
                <li><a className="text-foreground/80 transition hover:text-foreground" href="#overview">{t("nav.overview")}</a></li>
                <li><a className="text-foreground/80 transition hover:text-foreground" href="#roadmap">{t("nav.roadmap")}</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{t("footer.contribute")}</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li><a className="text-foreground/80 transition hover:text-foreground" href="#classifier">{t("nav.classifier")}</a></li>
                <li>
                  <a
                    className="text-foreground/80 transition hover:text-foreground"
                    href="https://github.com/yinkyin/GUI-Datasets/issues/new?template=add-dataset.yml"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("footer.addDataset")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{t("footer.project")}</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a
                    className="inline-flex items-center gap-1.5 text-foreground/80 transition hover:text-foreground"
                    href="https://github.com/yinkyin/GUI-Datasets"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github className="h-3.5 w-3.5" /> {t("footer.repository")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>{t("footer.note")}</p>
          <p>{t("footer.built")}</p>
        </div>
      </div>
    </footer>
  );
}

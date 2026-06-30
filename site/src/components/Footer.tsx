import { Database, Github } from "lucide-react";

export function Footer({ count }: { count: number }) {
  return (
    <footer className="border-t border-border/70 bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-secondary p-2 text-secondary-foreground">
                <Database className="h-5 w-5" />
              </div>
              <p className="font-display text-base font-bold text-foreground">GUI Datasets</p>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              A curated, research-grade map of {count} GUI screenshot datasets across web, mobile, cross-platform agents, security and Chinese app automation.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Explore</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li><a className="text-foreground/80 transition hover:text-foreground" href="#catalog">Catalog</a></li>
                <li><a className="text-foreground/80 transition hover:text-foreground" href="#overview">Overview</a></li>
                <li><a className="text-foreground/80 transition hover:text-foreground" href="#roadmap">Use cases</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Contribute</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li><a className="text-foreground/80 transition hover:text-foreground" href="#classifier">Auto classify</a></li>
                <li>
                  <a
                    className="text-foreground/80 transition hover:text-foreground"
                    href="https://github.com/yinkyin/GUI-Datasets/issues/new?template=add-dataset.yml"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Add a dataset
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Project</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a
                    className="inline-flex items-center gap-1.5 text-foreground/80 transition hover:text-foreground"
                    href="https://github.com/yinkyin/GUI-Datasets"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github className="h-3.5 w-3.5" /> Repository
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Open data index for the research community. Always verify each dataset's license before use.</p>
          <p>Built with React, Vite & Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}

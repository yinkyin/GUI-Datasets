import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Database,
  ExternalLink,
  Filter,
  GitBranch,
  Globe2,
  Layers3,
  LineChart as LineChartIcon,
  Link as LinkIcon,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Tags,
  X,
  Zap
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import "./App.css";
import { datasets, platformOrder, strategicUseCases } from "@/data/datasets";
import { classifyCandidate, toDatasetYaml } from "@/lib/classifier";
import type { GuiDataset, Platform } from "@/types/dataset";

const platformColors: Record<Platform, string> = {
  Web: "#2563eb",
  Mobile: "#0f766e",
  "Cross-platform": "#7c3aed",
  Security: "#dc2626",
  "Screenshot-to-code": "#d97706",
  "Chinese GUI": "#be123c"
};

const platformLabels: Record<Platform, string> = {
  Web: "Web",
  Mobile: "Mobile",
  "Cross-platform": "Cross-platform",
  Security: "Security",
  "Screenshot-to-code": "Screenshot-to-code",
  "Chinese GUI": "Chinese GUI"
};

const numberFormatter = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });

function formatScale(value: number) {
  return numberFormatter.format(value);
}

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

function getPrimaryUrl(dataset: GuiDataset) {
  return dataset.links.find((link) => link.type === "download")?.url ?? dataset.links[0]?.url ?? "#";
}

function StatCard({ label, value, note, icon: Icon }: { label: string; value: string; note: string; icon: typeof Database }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">{value}</p>
        </div>
        <div className="rounded-2xl bg-blue-50 p-3 text-blue-700">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">{note}</p>
    </div>
  );
}

function Pill({ children, active = false, onClick }: { children: React.ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-200"
          : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
      }`}
    >
      {children}
    </button>
  );
}

function LinkPill({ link }: { link: GuiDataset["links"][number] }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
    >
      <LinkIcon className="h-3.5 w-3.5" />
      {link.label}
    </a>
  );
}

function DatasetCard({
  dataset,
  expanded,
  compared,
  onExpand,
  onCompare
}: {
  dataset: GuiDataset;
  expanded: boolean;
  compared: boolean;
  onExpand: () => void;
  onCompare: () => void;
}) {
  return (
    <article className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full px-2.5 py-1 text-xs font-bold text-white" style={{ backgroundColor: platformColors[dataset.platform] }}>
              {dataset.platform}
            </span>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600">{dataset.access}</span>
            {dataset.region === "China-focused" && <span className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700">China-focused</span>}
          </div>
          <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-950">{dataset.name}</h3>
          <p className="mt-1 text-sm font-medium text-slate-500">{dataset.source}</p>
        </div>
        <div className="flex shrink-0 items-center gap-0.5 text-amber-500" aria-label={`${dataset.stars} star importance`}>
          {Array.from({ length: dataset.stars }).map((_, index) => (
            <Star key={index} className="h-4 w-4 fill-current" />
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Scale</p>
        <p className="mt-1 text-lg font-bold text-slate-950">{dataset.scaleLabel}</p>
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">{dataset.summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {dataset.tasks.slice(0, 4).map((task) => (
          <span key={task} className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">{task}</span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <a
          href={getPrimaryUrl(dataset)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Open dataset <ExternalLink className="h-4 w-4" />
        </a>
        <button
          type="button"
          onClick={onExpand}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
          aria-expanded={expanded}
        >
          Details <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
        <button
          type="button"
          onClick={onCompare}
          className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
            compared ? "border-amber-300 bg-amber-50 text-amber-800" : "border-slate-200 bg-white text-slate-700 hover:border-amber-300 hover:bg-amber-50"
          }`}
        >
          {compared ? "In compare" : "Compare"}
        </button>
      </div>

      {expanded && (
        <div className="mt-5 space-y-5 border-t border-slate-100 pt-5">
          <div>
            <p className="text-sm font-bold text-slate-950">Best for</p>
            <ul className="mt-2 grid gap-2 text-sm text-slate-600">
              {dataset.bestFor.map((item) => (
                <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />{item}</li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-bold text-slate-950">Annotations</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {dataset.annotations.map((item) => <span key={item} className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">{item}</span>)}
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-950">Modalities</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {dataset.modalities.map((item) => <span key={item} className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">{item}</span>)}
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-emerald-50 p-4">
              <p className="text-sm font-bold text-emerald-950">Strengths</p>
              <ul className="mt-2 space-y-1 text-sm text-emerald-800">
                {dataset.strengths.map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl bg-amber-50 p-4">
              <p className="text-sm font-bold text-amber-950">Watch-outs</p>
              <ul className="mt-2 space-y-1 text-sm text-amber-800">
                {dataset.caveats.map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {dataset.links.map((link) => <LinkPill key={`${dataset.id}-${link.label}`} link={link} />)}
          </div>
        </div>
      )}
    </article>
  );
}

function ComparePanel({ selected }: { selected: GuiDataset[] }) {
  if (selected.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-6 text-sm text-slate-600">
        Pick up to four datasets from the catalog to build a side-by-side research plan.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3 font-bold">Dataset</th>
              <th className="px-4 py-3 font-bold">Scale</th>
              <th className="px-4 py-3 font-bold">Tasks</th>
              <th className="px-4 py-3 font-bold">Annotations</th>
              <th className="px-4 py-3 font-bold">Primary risk</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {selected.map((dataset) => (
              <tr key={dataset.id} className="align-top transition hover:bg-blue-50/50">
                <td className="px-4 py-4 font-bold text-slate-950">{dataset.shortName}</td>
                <td className="px-4 py-4 text-slate-600">{dataset.scaleLabel}</td>
                <td className="px-4 py-4 text-slate-600">{dataset.tasks.slice(0, 3).join(", ")}</td>
                <td className="px-4 py-4 text-slate-600">{dataset.annotations.slice(0, 3).join(", ")}</td>
                <td className="px-4 py-4 text-slate-600">{dataset.caveats[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState<Platform | "All">("All");
  const [task, setTask] = useState("All");
  const [access, setAccess] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>("common-screens");
  const [compareIds, setCompareIds] = useState<string[]>(["websight", "mobileviews", "cmgui"]);
  const [candidate, setCandidate] = useState({
    url: "https://huggingface.co/datasets/openbmb/CAGUI",
    title: "CAGUI",
    description: "Chinese Android GUI grounding and agent traces with bilingual instructions across mainstream apps."
  });

  const tasks = useMemo(() => uniqueSorted(datasets.flatMap((dataset) => dataset.tasks)), []);
  const accessTypes = useMemo(() => uniqueSorted(datasets.map((dataset) => dataset.access)), []);

  const platformData = useMemo(
    () => platformOrder.map((item) => ({ name: platformLabels[item], value: datasets.filter((dataset) => dataset.platform === item).length, color: platformColors[item] })),
    []
  );


  const taskData = useMemo(() => {
    const counts = new Map<string, number>();
    datasets.forEach((dataset) => dataset.tasks.forEach((item) => counts.set(item, (counts.get(item) ?? 0) + 1)));
    return Array.from(counts.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return datasets
      .filter((dataset) => platform === "All" || dataset.platform === platform)
      .filter((dataset) => task === "All" || dataset.tasks.includes(task))
      .filter((dataset) => access === "All" || dataset.access === access)
      .filter((dataset) => {
        if (!q) return true;
        const haystack = [dataset.name, dataset.shortName, dataset.source, dataset.summary, dataset.platform, dataset.access, ...dataset.tasks, ...dataset.annotations, ...dataset.bestFor].join(" ").toLowerCase();
        return haystack.includes(q);
      })
      .sort((a, b) => b.stars - a.stars || b.scaleValue - a.scaleValue || a.name.localeCompare(b.name));
  }, [access, platform, query, task]);

  const candidateResult = useMemo(() => classifyCandidate(candidate), [candidate]);
  const candidateYaml = useMemo(() => toDatasetYaml(candidate, candidateResult), [candidate, candidateResult]);
  const compared = useMemo(() => compareIds.map((id) => datasets.find((dataset) => dataset.id === id)).filter((dataset): dataset is GuiDataset => Boolean(dataset)), [compareIds]);

  const totals = useMemo(() => {
    const totalScale = datasets.reduce((sum, dataset) => sum + dataset.scaleValue, 0);
    const hfCount = datasets.filter((dataset) => dataset.access === "Hugging Face").length;
    const chinaCount = datasets.filter((dataset) => dataset.region === "China-focused").length;
    return { totalScale, hfCount, chinaCount };
  }, []);

  function toggleCompare(id: string) {
    setCompareIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      return [...current.slice(-3), id];
    });
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="aurora-bg" />
      <header className="sticky top-0 z-30 border-b border-white/80 bg-white/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#top" className="flex cursor-pointer items-center gap-3">
            <div className="rounded-2xl bg-blue-700 p-2 text-white shadow-lg shadow-blue-200">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-700">GUI Datasets</p>
              <p className="text-xs font-medium text-slate-500">curated research portal</p>
            </div>
          </a>
          <div className="hidden items-center gap-2 md:flex">
            <a className="nav-link" href="#catalog">Catalog</a>
            <a className="nav-link" href="#classifier">Auto classify</a>
            <a className="nav-link" href="#roadmap">Use cases</a>
            <a className="nav-link" href="https://github.com/yinkyin/GUI-Datasets" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </nav>
      </header>

      <section id="top" className="relative mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 lg:px-8 lg:pb-16 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-semibold text-blue-800 shadow-sm">
              <Sparkles className="h-4 w-4" />
              A public map of GUI data for agents, grounding, VQA and screenshot-to-code
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Turn a dataset list into a research-grade GUI data platform.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Explore GUI datasets by platform, annotation, task, region and access channel. The goal is not only to list links, but to help researchers decide what to use, how to combine it, and where the gaps are.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#catalog" className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-800">
                Browse catalog <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="#classifier" className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700">
                Test auto classification <Zap className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-4 shadow-2xl shadow-blue-100 backdrop-blur">
            <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-200">Live catalog snapshot</p>
                  <p className="text-3xl font-black">{datasets.length} datasets</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-300" />
              </div>
              <div className="mt-6 grid gap-3">
                {platformData.map((item) => (
                  <div key={item.name}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>{item.name}</span>
                      <span className="font-bold">{item.value}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full" style={{ width: `${Math.max(8, item.value * 11)}%`, backgroundColor: item.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <StatCard label="Indexed datasets" value={`${datasets.length}`} note="Structured from the repository README into searchable records." icon={Database} />
        <StatCard label="Potential UI artifacts" value={`${formatScale(totals.totalScale)}+`} note="Approximate screenshots, pairs, traces and QA items represented in the catalog." icon={Layers3} />
        <StatCard label="HF-hosted entries" value={`${totals.hfCount}`} note="Hugging Face links are first-class because they are easiest to extend and mirror." icon={Globe2} />
        <StatCard label="China-focused entries" value={`${totals.chinaCount}`} note="Chinese app and mini-program data is highlighted as a strategic differentiation point." icon={ShieldCheck} />
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-700">Coverage</p>
              <h2 className="mt-1 text-2xl font-black text-slate-950">Dataset count by platform</h2>
            </div>
            <LineChartIcon className="h-6 w-6 text-blue-700" />
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={platformData} dataKey="value" nameKey="name" innerRadius={65} outerRadius={105} paddingAngle={3}>
                  {platformData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-700">Task map</p>
              <h2 className="mt-1 text-2xl font-black text-slate-950">Most common research tasks</h2>
            </div>
            <Tags className="h-6 w-6 text-blue-700" />
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={taskData} layout="vertical" margin={{ left: 18, right: 12, top: 4, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" allowDecimals={false} stroke="#64748b" />
                <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12 }} stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section id="classifier" className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 rounded-[2rem] border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-6 shadow-sm lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-700">Auto classification lab</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Paste a Hugging Face, Kaggle, GitHub or paper link.</h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              The repository can grow by treating every new URL as a candidate record: infer host, platform, tasks, annotation style and a starter YAML block, then manually verify facts before merge.
            </p>
            <div className="mt-6 grid gap-3">
              <label className="text-sm font-bold text-slate-700" htmlFor="candidate-url">Dataset URL</label>
              <input id="candidate-url" value={candidate.url} onChange={(event) => setCandidate({ ...candidate, url: event.target.value })} className="input-control" />
              <label className="text-sm font-bold text-slate-700" htmlFor="candidate-title">Title</label>
              <input id="candidate-title" value={candidate.title} onChange={(event) => setCandidate({ ...candidate, title: event.target.value })} className="input-control" />
              <label className="text-sm font-bold text-slate-700" htmlFor="candidate-description">Short description</label>
              <textarea id="candidate-description" value={candidate.description} onChange={(event) => setCandidate({ ...candidate, description: event.target.value })} className="input-control min-h-28" />
            </div>
          </div>
          <div className="grid gap-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-slate-500">Inferred record</p>
                  <h3 className="mt-1 text-2xl font-black text-slate-950">{candidateResult.platform}</h3>
                </div>
                <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-black text-emerald-700">{Math.round(candidateResult.confidence * 100)}%</div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase text-slate-500">Access</p><p className="mt-1 font-bold text-slate-950">{candidateResult.access}</p></div>
                <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase text-slate-500">Region</p><p className="mt-1 font-bold text-slate-950">{candidateResult.region}</p></div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {candidateResult.tasks.map((item) => <span key={item} className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">{item}</span>)}
                {candidateResult.annotations.map((item) => <span key={item} className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">{item}</span>)}
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {candidateResult.rationale.map((item) => <li key={item} className="flex gap-2"><BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />{item}</li>)}
              </ul>
            </div>
            <pre className="overflow-x-auto rounded-3xl border border-slate-900 bg-slate-950 p-5 text-xs leading-6 text-blue-100"><code>{candidateYaml}</code></pre>
          </div>
        </div>
      </section>

      <section id="catalog" className="mx-auto mt-10 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-700">Catalog</p>
            <h2 className="mt-2 text-4xl font-black tracking-tight text-slate-950">Find the right GUI dataset faster.</h2>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600">
            <Filter className="h-4 w-4" />
            {filtered.length} of {datasets.length} shown
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search datasets, tasks, annotations, sources..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm font-medium outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Pill active={platform === "All"} onClick={() => setPlatform("All")}>All platforms</Pill>
            {platformOrder.map((item) => <Pill key={item} active={platform === item} onClick={() => setPlatform(item)}>{platformLabels[item]}</Pill>)}
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <select value={task} onChange={(event) => setTask(event.target.value)} className="input-control cursor-pointer">
              <option value="All">All tasks</option>
              {tasks.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <select value={access} onChange={(event) => setAccess(event.target.value)} className="input-control cursor-pointer">
              <option value="All">All access channels</option>
              {accessTypes.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {filtered.map((dataset) => (
            <DatasetCard
              key={dataset.id}
              dataset={dataset}
              expanded={expandedId === dataset.id}
              compared={compareIds.includes(dataset.id)}
              onExpand={() => setExpandedId((current) => current === dataset.id ? null : dataset.id)}
              onCompare={() => toggleCompare(dataset.id)}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
            <GitBranch className="h-8 w-8 text-blue-300" />
            <h2 className="mt-4 text-3xl font-black">Comparison workspace</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">Keep this as a decision aid: compare scale, labels and caveats before choosing a training mix or benchmark suite.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {compared.map((dataset) => (
                <button key={dataset.id} type="button" onClick={() => toggleCompare(dataset.id)} className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-white/20">
                  {dataset.shortName} <X className="h-3 w-3" />
                </button>
              ))}
            </div>
          </div>
          <ComparePanel selected={compared} />
        </div>
      </section>

      <section id="roadmap" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl bg-blue-50 p-3 text-blue-700"><BookOpen className="h-6 w-6" /></div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-700">Research paths</p>
              <h2 className="text-3xl font-black text-slate-950">Recommended combinations by use case</h2>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-5">
            {strategicUseCases.map((item) => (
              <div key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-200 hover:bg-blue-50/60">
                <h3 className="text-lg font-black text-slate-950">{item.label}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.datasets.map((dataset) => <span key={dataset} className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-blue-700 shadow-sm">{dataset}</span>)}
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;

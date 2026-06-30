import type { AccessType, ClassifierResult, Platform } from "@/types/dataset";
import rules from "@/data/classify-rules.json";

const platformRules = rules.platformRules as Array<{ platform: Platform; terms: string[] }>;
const taskRules = rules.taskRules as Array<{ label: string; terms: string[] }>;
const annotationRules = rules.annotationRules as Array<{ label: string; terms: string[] }>;

function scoreTerms(text: string, terms: string[]) {
  return terms.reduce((score, term) => score + (text.includes(term) ? 1 : 0), 0);
}

function uniqueTop(items: string[], fallback: string[]) {
  const out = Array.from(new Set(items)).slice(0, 5);
  return out.length > 0 ? out : fallback;
}

export function inferAccess(url: string): AccessType {
  const lower = url.toLowerCase();
  if (lower.includes("huggingface.co/datasets")) return "Hugging Face";
  if (lower.includes("kaggle.com/datasets")) return "Kaggle";
  if (lower.includes("github.com")) return "GitHub";
  if (lower.includes("roboflow.com")) return "Roboflow";
  if (lower.includes("opendatalab.com")) return "OpenDataLab";
  if (lower.includes("arxiv.org") || lower.includes("doi.org")) return "Paper";
  if (lower.includes("registry.opendata.aws") || lower.includes("aws")) return "Data Registry";
  return "Website";
}

export function classifyCandidate(input: { url: string; title: string; description: string }): ClassifierResult {
  const text = `${input.url} ${input.title} ${input.description}`.toLowerCase();
  const platformScores = platformRules.map((rule) => ({ ...rule, score: scoreTerms(text, rule.terms) }));
  const bestPlatform = platformScores.sort((a, b) => b.score - a.score)[0];
  const taskMatches = taskRules.flatMap((rule) => (scoreTerms(text, rule.terms) > 0 ? [rule.label] : []));
  const annotationMatches = annotationRules.flatMap((rule) => (scoreTerms(text, rule.terms) > 0 ? [rule.label] : []));
  const isChinese = scoreTerms(text, platformRules[0].terms) > 0;
  const hasMobile = scoreTerms(text, ["android", "mobile", "ios", "app", "view hierarchy"]) > 0;
  const hasWeb = scoreTerms(text, ["web", "website", "dom", "browser", "html", "css"]) > 0;
  const confidence = Math.min(0.94, 0.48 + bestPlatform.score * 0.12 + taskMatches.length * 0.05 + annotationMatches.length * 0.03);

  return {
    platform: bestPlatform.score > 0 ? bestPlatform.platform : hasMobile ? "Mobile" : hasWeb ? "Web" : "Cross-platform",
    access: inferAccess(input.url),
    tasks: uniqueTop(taskMatches, [hasMobile ? "UI understanding" : "Dataset curation"]),
    annotations: uniqueTop(annotationMatches, ["metadata to verify"]),
    modalities: uniqueTop(
      [
        text.includes("screenshot") || text.includes("screen") ? "screenshot" : "",
        text.includes("html") || text.includes("dom") ? "HTML/DOM" : "",
        text.includes("trace") || text.includes("trajectory") ? "trace" : "",
        text.includes("instruction") || text.includes("intent") ? "instruction" : ""
      ].filter(Boolean),
      ["screenshot", "metadata"]
    ),
    region: isChinese ? "China-focused" : "Global",
    confidence,
    rationale: [
      `Host classified as ${inferAccess(input.url)}.`,
      bestPlatform.score > 0
        ? `Matched ${bestPlatform.score} platform signal(s) for ${bestPlatform.platform}.`
        : "No strong platform signal, using conservative fallback.",
      taskMatches.length > 0
        ? `Detected likely task tags: ${uniqueTop(taskMatches, []).join(", ")}.`
        : "Task tags need manual confirmation after inspecting the dataset card."
    ]
  };
}

export function toDatasetYaml(input: { url: string; title: string; description: string }, result: ClassifierResult) {
  const id = (input.title || "new-dataset").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return `- id: ${id || "new-dataset"}\n  name: "${input.title || "New GUI Dataset"}"\n  platform: ${result.platform}\n  access: ${result.access}\n  region: ${result.region}\n  summary: "${input.description || "TODO: add factual 1-2 sentence summary."}"\n  tasks: [${result.tasks.map((item) => `"${item}"`).join(", ")}]\n  annotations: [${result.annotations.map((item) => `"${item}"`).join(", ")}]\n  links:\n    - label: Dataset\n      url: ${input.url || "https://"}\n      type: download`;
}

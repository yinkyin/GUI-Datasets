#!/usr/bin/env node

const [, , url = "", ...rest] = process.argv;
const text = `${url} ${rest.join(" ")}`.toLowerCase();

const platforms = [
  ["Chinese GUI", ["chinese", "中文", "china", "alibaba", "ant", "openbmb", "modelscope", "mini-program", "wechat", "taobao", "douyin"]],
  ["Security", ["phish", "security", "brand", "url", "fraud", "malware", "credential"]],
  ["Screenshot-to-code", ["screenshot-to-code", "design-to-code", "html", "css", "dsl", "code generation", "tailwind"]],
  ["Cross-platform", ["cross-platform", "desktop", "macos", "windows", "ios", "grounding", "screenspot", "groundui"]],
  ["Mobile", ["android", "mobile", "app", "view hierarchy", "rico", "vh", "ios"]],
  ["Web", ["web", "website", "dom", "browser", "page", "html"]]
];

const tasks = [
  ["Screenshot-to-code", ["code", "html", "css", "dsl", "design-to-code", "screenshot-to-code"]],
  ["Grounding", ["ground", "bbox", "box", "coordinate", "element", "click", "target"]],
  ["Agent training", ["agent", "trace", "trajectory", "instruction", "navigation", "operation"]],
  ["Object detection", ["yolo", "coco", "voc", "detect", "bbox", "bounding"]],
  ["Question answering", ["qa", "question", "answer", "vqa"]],
  ["Security classification", ["phish", "fraud", "security", "brand"]],
  ["Retrieval", ["retrieval", "search", "metadata", "category"]]
];

const annotations = [
  ["bounding boxes", ["bbox", "box", "coordinate", "yolo", "coco", "voc"]],
  ["view hierarchy", ["view hierarchy", "vh", "android tree", "hierarchy"]],
  ["DOM/CSS", ["dom", "css", "html", "browser"]],
  ["operation traces", ["trace", "trajectory", "operation", "action", "navigation"]],
  ["instructions", ["instruction", "intent", "task", "command"]],
  ["metadata", ["metadata", "category", "domain", "description"]],
  ["QA pairs", ["qa", "question", "answer"]]
];

function score(terms) {
  return terms.reduce((sum, term) => sum + (text.includes(term) ? 1 : 0), 0);
}

function accessFromUrl(value) {
  const lower = value.toLowerCase();
  if (lower.includes("huggingface.co/datasets")) return "Hugging Face";
  if (lower.includes("kaggle.com/datasets")) return "Kaggle";
  if (lower.includes("github.com")) return "GitHub";
  if (lower.includes("roboflow.com")) return "Roboflow";
  if (lower.includes("opendatalab.com")) return "OpenDataLab";
  if (lower.includes("arxiv.org") || lower.includes("doi.org")) return "Paper";
  if (lower.includes("registry.opendata.aws") || lower.includes("aws")) return "Data Registry";
  return "Website";
}

const rankedPlatforms = platforms.map(([platform, terms]) => ({ platform, score: score(terms) })).sort((a, b) => b.score - a.score);
const matchedTasks = tasks.filter(([, terms]) => score(terms) > 0).map(([label]) => label);
const matchedAnnotations = annotations.filter(([, terms]) => score(terms) > 0).map(([label]) => label);
const isChinese = score(platforms[0][1]) > 0;
const result = {
  url,
  inferred: {
    platform: rankedPlatforms[0].score > 0 ? rankedPlatforms[0].platform : "Cross-platform",
    access: accessFromUrl(url),
    region: isChinese ? "China-focused" : "Global",
    tasks: matchedTasks.length ? matchedTasks : ["Dataset curation"],
    annotations: matchedAnnotations.length ? matchedAnnotations : ["metadata to verify"],
    confidence: Math.min(0.94, 0.48 + rankedPlatforms[0].score * 0.12 + matchedTasks.length * 0.05 + matchedAnnotations.length * 0.03)
  },
  nextSteps: [
    "Verify dataset card, license, sample count and split protocol.",
    "Add a factual summary and caveats before merging.",
    "Run npm run build after updating the catalog."
  ]
};

console.log(JSON.stringify(result, null, 2));

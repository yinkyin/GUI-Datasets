#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rules = JSON.parse(readFileSync(resolve(__dirname, "../site/src/data/classify-rules.json"), "utf8"));

const platforms = rules.platformRules.map((r) => [r.platform, r.terms]);
const tasks = rules.taskRules.map((r) => [r.label, r.terms]);
const annotations = rules.annotationRules.map((r) => [r.label, r.terms]);

const [, , url = "", ...rest] = process.argv;
const text = `${url} ${rest.join(" ")}`.toLowerCase();

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

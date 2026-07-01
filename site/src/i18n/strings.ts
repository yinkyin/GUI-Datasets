export type Lang = "en" | "zh";

type Dict = Record<string, string>;

export const strings: Record<Lang, Dict> = {
  en: {
    "nav.catalog": "Catalog",
    "nav.overview": "Overview",
    "nav.classifier": "Auto classify",
    "nav.roadmap": "Use cases",
    "nav.github": "GitHub",
    "nav.brand": "GUI Datasets",
    "nav.tagline": "research data map",
    "nav.menu": "Toggle navigation menu",

    "hero.badge": "GUI data for agents, grounding, VQA, and screenshot-to-code",
    "hero.title": "Find the right GUI dataset for agents, grounding, VQA, and screenshot-to-code.",
    "hero.subtitle":
      "Explore GUI datasets by platform, task, annotation, region, and access channel. Compare scale, strengths, and caveats so you can choose training mixes, benchmarks, and missing data sources with confidence.",
    "hero.cta.browse": "Browse catalog",
    "hero.cta.classify": "Try link classification",
    "hero.snapshot": "Live catalog snapshot",
    "hero.datasets": "datasets",

    "overview.coverage": "Coverage",
    "overview.coverageTitle": "Dataset count by platform",
    "overview.taskMap": "Task map",
    "overview.taskTitle": "Most common research tasks",
    "stat.indexed.label": "Indexed datasets",
    "stat.indexed.note": "Structured from the repository into searchable, comparable records.",
    "stat.artifacts.label": "Potential UI artifacts",
    "stat.artifacts.note": "Approximate screenshots, pairs, traces and QA items represented in the catalog.",
    "stat.hf.label": "HF-hosted entries",
    "stat.hf.note": "Hugging Face links are first-class because they are easiest to extend and mirror.",
    "stat.china.label": "China-focused entries",
    "stat.china.note": "Chinese app and mini-program data is highlighted as a strategic differentiation point.",

    "classifier.kicker": "Link classification lab",
    "classifier.title": "Paste a Hugging Face, Kaggle, GitHub, or paper link.",
    "classifier.desc":
      "Use each new URL as a candidate record: infer host, platform, tasks, annotation style, and a starter YAML block, then verify license, scale, and released modalities before merge.",
    "classifier.url": "Dataset URL",
    "classifier.titleField": "Title",
    "classifier.descField": "Short description",
    "classifier.inferred": "Inferred record",
    "classifier.access": "Access",
    "classifier.region": "Region",

    "catalog.kicker": "Catalog",
    "catalog.title": "Compare GUI datasets by task, platform, and evidence.",
    "catalog.shownOf": "of",
    "catalog.shown": "shown",
    "catalog.search": "Search datasets, tasks, annotations, sources… (press / to focus)",
    "catalog.clearSearch": "Clear search",
    "catalog.allPlatforms": "All platforms",
    "catalog.allTasks": "All tasks",
    "catalog.allAccess": "All access channels",
    "catalog.allRegions": "All regions",
    "catalog.sortPrefix": "Sort:",
    "catalog.clearAll": "Clear all",
    "catalog.gridView": "Grid view",
    "catalog.listView": "List view",

    "card.open": "Open",
    "card.details": "Details",
    "card.compare": "Compare",
    "card.added": "Added",
    "card.inCompare": "In comparison",
    "card.addCompare": "Add to compare",
    "card.openDataset": "Open dataset",
    "card.scale": "Scale",
    "card.bestFor": "Best for",
    "card.annotations": "Annotations",
    "card.modalities": "Modalities",
    "card.strengths": "Strengths",
    "card.watchouts": "Watch-outs",
    "card.region": "Region",
    "card.language": "Language",
    "card.access": "Access",
    "card.license": "License",
    "card.licenseFallback": "Verify before use",
    "card.chinaFocused": "China-focused",
    "card.close": "Close details",
    "card.importance": "Importance {n} of 3",

    "empty.title": "No datasets match your filters",
    "empty.desc":
      "Try a broader search term or remove a filter. The catalog covers web, mobile, cross-platform, security, screenshot-to-code and Chinese GUI data.",
    "empty.clear": "Clear all filters",

    "compare.selected": "selected",
    "compare.clear": "Clear",
    "compare.compare": "Compare",
    "compare.title": "Dataset comparison",
    "compare.desc": "Use this as a decision aid: compare scale, labels, strengths, and caveats before choosing a training mix or benchmark suite.",
    "compare.emptyHint": "Add datasets from the catalog to start comparing.",
    "compare.col.dataset": "Dataset",
    "compare.col.scale": "Scale",
    "compare.col.tasks": "Tasks",
    "compare.col.annotations": "Annotations",
    "compare.col.risk": "Primary risk",
    "compare.panelEmpty": "Pick up to four datasets from the catalog to build a side-by-side research plan.",

    "usecases.kicker": "Research paths",
    "usecases.title": "Recommended combinations by use case",

    "footer.desc": "A curated, research-grade map of {n} GUI screenshot datasets across web, mobile, cross-platform agents, security and Chinese app automation.",
    "footer.explore": "Explore",
    "footer.contribute": "Contribute",
    "footer.project": "Project",
    "footer.addDataset": "Add a dataset",
    "footer.repository": "Repository",
    "footer.note": "Open data index for the research community. Always verify each dataset's license before use.",
    "footer.built": "Built with React, Vite & Tailwind CSS.",

    "lang.toggle": "Switch language"
  },
  zh: {
    "nav.catalog": "数据目录",
    "nav.overview": "总览",
    "nav.classifier": "自动分类",
    "nav.roadmap": "应用场景",
    "nav.github": "GitHub",
    "nav.brand": "GUI 数据集",
    "nav.tagline": "研究数据地图",
    "nav.menu": "切换导航菜单",

    "hero.badge": "面向智能体、定位、VQA 与截图转代码的 GUI 数据地图",
    "hero.title": "一站式梳理 GUI 数据集，快速找到适合研究与训练的数据。",
    "hero.subtitle":
      "按平台、任务、标注、地区和获取方式筛选 GUI 数据集，对比规模、优势与使用风险，帮助你更快确定训练组合、评测基准和补充数据来源。",
    "hero.cta.browse": "浏览数据目录",
    "hero.cta.classify": "识别新链接",
    "hero.snapshot": "实时目录概览",
    "hero.datasets": "个数据集",

    "overview.coverage": "覆盖范围",
    "overview.coverageTitle": "各平台数据集数量",
    "overview.taskMap": "任务分布",
    "overview.taskTitle": "最常见的研究任务",
    "stat.indexed.label": "已收录数据集",
    "stat.indexed.note": "从仓库整理为可搜索、可对比的结构化记录。",
    "stat.artifacts.label": "潜在 UI 素材量",
    "stat.artifacts.note": "目录中所代表的截图、配对、操作轨迹与问答条目的大致总量。",
    "stat.hf.label": "Hugging Face 托管",
    "stat.hf.note": "Hugging Face 链接最易扩展与镜像，因此被优先呈现。",
    "stat.china.label": "中文场景数据集",
    "stat.china.note": "中文应用与小程序数据被作为一项战略差异化重点突出。",

    "classifier.kicker": "链接识别实验室",
    "classifier.title": "粘贴一个 Hugging Face、Kaggle、GitHub 或论文链接。",
    "classifier.desc":
      "粘贴数据集链接后，系统会先估计来源、平台、任务和标注形式，并生成一份 YAML 草稿；正式合入前仍需人工核实许可、规模和实际释放内容。",
    "classifier.url": "数据集链接",
    "classifier.titleField": "标题",
    "classifier.descField": "简要描述",
    "classifier.inferred": "推断结果",
    "classifier.access": "获取渠道",
    "classifier.region": "地区",

    "catalog.kicker": "数据目录",
    "catalog.title": "按任务、平台和证据筛出合适的数据集。",
    "catalog.shownOf": "/",
    "catalog.shown": "已显示",
    "catalog.search": "搜索数据集、任务、标注或来源，按 / 快速聚焦",
    "catalog.clearSearch": "清除搜索",
    "catalog.allPlatforms": "全部平台",
    "catalog.allTasks": "全部任务",
    "catalog.allAccess": "全部获取渠道",
    "catalog.allRegions": "全部地区",
    "catalog.sortPrefix": "排序：",
    "catalog.clearAll": "全部清除",
    "catalog.gridView": "网格视图",
    "catalog.listView": "列表视图",

    "card.open": "打开",
    "card.details": "详情",
    "card.compare": "对比",
    "card.added": "已加入",
    "card.inCompare": "已在对比中",
    "card.addCompare": "加入对比",
    "card.openDataset": "打开数据集",
    "card.scale": "规模",
    "card.bestFor": "适合场景",
    "card.annotations": "标注",
    "card.modalities": "模态",
    "card.strengths": "优势",
    "card.watchouts": "使用前注意",
    "card.region": "地区",
    "card.language": "语言",
    "card.access": "获取渠道",
    "card.license": "许可协议",
    "card.licenseFallback": "使用前请核实",
    "card.chinaFocused": "中文场景",
    "card.close": "关闭详情",
    "card.importance": "重要度 {n}/3",

    "empty.title": "没有匹配当前筛选的数据集",
    "empty.desc": "试试更宽泛的关键词或去掉一个筛选。目录涵盖 Web、移动端、跨平台、安全、截图转代码与中文 GUI 数据。",
    "empty.clear": "清除全部筛选",

    "compare.selected": "已选",
    "compare.clear": "清空",
    "compare.compare": "对比",
    "compare.title": "数据集对比",
    "compare.desc": "先把候选数据集放在一起，对比规模、标注、优势和使用风险，再决定训练组合或评测基准。",
    "compare.emptyHint": "从目录中加入数据集，即可开始并排比较。",
    "compare.col.dataset": "数据集",
    "compare.col.scale": "规模",
    "compare.col.tasks": "任务",
    "compare.col.annotations": "标注",
    "compare.col.risk": "主要风险",
    "compare.panelEmpty": "从目录中最多挑选四个数据集，快速搭建一份并排对比方案。",

    "usecases.kicker": "研究路径",
    "usecases.title": "按研究场景组合数据集",

    "footer.desc": "一份精选的研究级 GUI 截图数据地图，覆盖 {n} 个数据集，横跨 Web、移动端、跨平台智能体、安全与中文应用自动化。",
    "footer.explore": "探索",
    "footer.contribute": "贡献",
    "footer.project": "项目",
    "footer.addDataset": "提交数据集",
    "footer.repository": "代码仓库",
    "footer.note": "面向研究社区的开放数据索引。使用前请务必核实每个数据集的许可协议。",
    "footer.built": "基于 React、Vite 与 Tailwind CSS 构建。",

    "lang.toggle": "切换语言"
  }
};

import type { AccessType, GuiDataset, Platform } from "@/types/dataset";

const platformLabelsMap: Record<Lang, Record<Platform, string>> = {
  en: {
    Web: "Web",
    Mobile: "Mobile",
    "Cross-platform": "Cross-platform",
    Security: "Security",
    "Screenshot-to-code": "Screenshot-to-code",
    "Chinese GUI": "Chinese GUI"
  },
  zh: {
    Web: "Web",
    Mobile: "移动端",
    "Cross-platform": "跨平台",
    Security: "安全",
    "Screenshot-to-code": "截图转代码",
    "Chinese GUI": "中文 GUI"
  }
};

const regionLabelsMap: Record<Lang, Record<GuiDataset["region"], string>> = {
  en: { Global: "Global", "China-focused": "China-focused", Mixed: "Mixed" },
  zh: { Global: "全球", "China-focused": "中文场景", Mixed: "混合" }
};

const languageLabelsMap: Record<Lang, Record<GuiDataset["language"], string>> = {
  en: { English: "English", Chinese: "Chinese", Multilingual: "Multilingual", "N/A": "N/A" },
  zh: { English: "英文", Chinese: "中文", Multilingual: "多语言", "N/A": "不适用" }
};

export function platformLabel(platform: Platform, lang: Lang) {
  return platformLabelsMap[lang][platform];
}

export function regionLabel(region: GuiDataset["region"], lang: Lang) {
  return regionLabelsMap[lang][region];
}

export function languageLabel(language: GuiDataset["language"], lang: Lang) {
  return languageLabelsMap[lang][language];
}

export function accessLabel(access: AccessType, lang: Lang) {
  if (lang === "en") return access;
  const map: Partial<Record<AccessType, string>> = {
    "Project Page": "项目主页",
    Paper: "论文",
    Website: "官网",
    "Data Registry": "数据注册库"
  };
  return map[access] ?? access;
}

const taskLabelsZh: Record<string, string> = {
  "Screenshot-to-code": "截图转代码",
  "Layout generation": "布局生成",
  Classification: "分类",
  "Representation learning": "表征学习",
  "Web analysis": "网页分析",
  Retrieval: "检索",
  "Prototype generation": "原型生成",
  "Object detection": "目标检测",
  "Element classification": "元素分类",
  "Element detection": "元素检测",
  "Page understanding": "页面理解",
  "Transfer learning": "迁移学习",
  "Region detection": "区域检测",
  "Layout analysis": "布局分析",
  "UI understanding": "UI 理解",
  "Layout generation ": "布局生成",
  "Interaction mining": "交互挖掘",
  "Agent training": "智能体训练",
  "UI analysis": "UI 分析",
  Evaluation: "评测",
  "Instruction grounding": "指令定位",
  "Theme classification": "主题分类",
  "Design retrieval": "设计检索",
  "Layout modeling": "布局建模",
  "Question answering": "问答",
  "Screen understanding": "屏幕理解",
  "Element recognition": "元素识别",
  Grounding: "定位",
  "Referring expression": "指代表达",
  "Component grounding": "组件定位",
  "Benchmark evaluation": "基准评测",
  Navigation: "导航",
  "Intent following": "意图跟随",
  Dialogue: "对话",
  "Security classification": "安全分类",
  "Brand recognition": "品牌识别",
  "Multimodal detection": "多模态检测",
  "DSL generation": "DSL 生成"
};

export function taskLabel(task: string, lang: Lang) {
  if (lang === "en") return task;
  return taskLabelsZh[task] ?? task;
}

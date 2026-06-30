import type { DatasetZh } from "@/types/dataset";

/**
 * Chinese display mirrors keyed by dataset id. Proper nouns (Hugging Face, Rico,
 * WebSight, YOLO, DOM, CSS, HTML, etc.) intentionally stay in English. Term
 * conventions: grounding→定位, agent→智能体, screenshot-to-code→截图转代码,
 * view hierarchy→视图层级, trace→操作轨迹, annotation→标注, benchmark→基准.
 */
export const datasetsZh: Record<string, DatasetZh> = {
  websight: {
    summary:
      "合成网页截图与 Tailwind 风格 HTML/CSS 配对，适合让模型学习从视觉到代码的对齐，而不仅是视觉识别。",
    scaleLabel: "200 万对 HTML/CSS 截图配对",
    source: "HuggingFace M4 团队",
    bestFor: ["截图转代码", "UI 代码生成", "布局重建"],
    tasks: ["截图转代码", "布局生成"],
    surfaces: ["桌面网页"],
    annotations: ["HTML", "CSS", "截图配对"],
    modalities: ["截图", "代码"],
    strengths: ["规模大", "配对监督清晰", "许可宽松"],
    caveats: ["合成分布", "主要为英文网页"]
  },
  "common-screens": {
    summary:
      "覆盖多领域、多类别与多视口风格的超大网页截图语料并带元数据，最适合作为网页 UI 表征学习的规模锚点。",
    scaleLabel: "7000 万+ 网页截图",
    source: "AWS 开放数据注册库",
    bestFor: ["大规模网页分析", "网站分类", "预训练"],
    tasks: ["分类", "表征学习", "网页分析"],
    surfaces: ["桌面网页", "移动网页", "整页网页"],
    annotations: ["元数据", "域名", "类别"],
    modalities: ["截图", "元数据"],
    strengths: ["覆盖海量", "网站多样", "适合作基础数据集"],
    caveats: ["以元数据为主，缺细粒度 UI 标注", "存储与采样策略很关键"]
  },
  webui: {
    summary: "带 DOM 级语义、包围框与 CSS 属性的真实渲染网页，将视觉截图与浏览器结构连接起来。",
    scaleLabel: "40 万个渲染网页",
    source: "CMU 等 / CHI 2023",
    bestFor: ["网页 UI 理解", "元素检测", "DOM 感知建模"],
    tasks: ["元素检测", "页面理解", "迁移学习"],
    surfaces: ["网页"],
    annotations: ["DOM 包围框", "CSS 属性", "语义元数据"],
    modalities: ["截图", "DOM", "CSS"],
    strengths: ["基于真实网页", "浏览器语义丰富", "视觉与代码的有力桥梁"],
    caveats: ["需要 DOM 感知的预处理", "可能需按任务过滤"]
  },
  "1k-web-screenshots": {
    summary: "热门网站截图的精简集合并附描述性元数据，适合做原型与轻量搜索演示。",
    scaleLabel: "1000+ 热门网站",
    source: "Silatus",
    bestFor: ["原型检索", "元数据演示", "文本到 UI 实验"],
    tasks: ["检索", "原型生成", "分类"],
    surfaces: ["桌面网页"],
    annotations: ["描述", "类别", "配色"],
    modalities: ["截图", "元数据"],
    strengths: ["易于查看", "元数据完善", "演示门槛低"],
    caveats: ["规模小", "单独使用不足以稳健训练"]
  },
  "ui-elements-detection": {
    summary: "高分辨率网页截图，带 YOLO 风格的 UI 元素包围框与无障碍元数据，适合实用检测器训练。",
    scaleLabel: "300+ 站点，15 类元素",
    source: "YashJain / Hugging Face",
    bestFor: ["UI 元素检测", "目标检测基线", "无障碍感知建模"],
    tasks: ["目标检测", "元素分类"],
    surfaces: ["桌面网页"],
    annotations: ["YOLO 包围框", "15 类 UI 元素", "无障碍元数据"],
    modalities: ["截图", "包围框"],
    strengths: ["可直接训练检测器", "高分辨率", "UI 类别明确"],
    caveats: ["网站数量有限", "类别体系可能需归一化"]
  },
  "roboflow-web-ui-screenshots": {
    summary: "可导出为常见检测格式的开放网页 UI 标注，适合作小型基准或数据增强来源。",
    scaleLabel: "1800 张标注图像",
    source: "WebUIProject / Roboflow",
    bestFor: ["网页元素检测", "YOLO/VOC/COCO 实验"],
    tasks: ["目标检测"],
    surfaces: ["网页"],
    annotations: ["YOLO", "VOC", "COCO"],
    modalities: ["截图", "包围框"],
    strengths: ["多格式导出", "快速搭建检测器"],
    caveats: ["规模小且托管于 Roboflow", "合并前需检查类别体系"]
  },
  "visual-section-detection": {
    summary: "聚焦关键视觉区域的网页截图数据集，适合页面区块分割与布局摘要。",
    scaleLabel: "3452 张标注截图",
    source: "Roboflow",
    bestFor: ["区块检测", "布局区域抽取"],
    tasks: ["区域检测", "布局分析"],
    surfaces: ["网页"],
    annotations: ["视觉区域"],
    modalities: ["截图", "包围框"],
    strengths: ["区块级视角", "与元素级包围框互补"],
    caveats: ["基于 Roboflow 搜索发现", "需核实具体数据集版本"]
  },
  rico: {
    summary:
      "经典 Android UI 数据集，含截图、视图层级、应用类别、布局向量、操作轨迹与动画；至今仍是移动 UI 研究的参照基准。",
    scaleLabel: "72000+ Android 屏幕",
    source: "UIUC / Google Research",
    bestFor: ["移动 UI 理解", "布局建模", "设计挖掘"],
    tasks: ["UI 理解", "布局生成", "交互挖掘"],
    surfaces: ["Android"],
    annotations: ["视图层级", "UI 元数据", "布局向量", "交互轨迹"],
    modalities: ["截图", "视图层级", "操作轨迹"],
    strengths: ["权威基准", "层级数据丰富", "衍生数据集众多"],
    caveats: ["应用分布偏旧", "以 Android 为主"]
  },
  mobileviews: {
    summary:
      "现代大规模移动数据集，将数万款应用的截图与视图层级、操作轨迹配对，包含大量中文应用 UI。",
    scaleLabel: "120 万+ 截图-视图层级配对",
    source: "BUPT / CASIA / 清华 AIR",
    bestFor: ["移动智能体训练", "大规模截图理解", "视图层级建模"],
    tasks: ["智能体训练", "UI 分析", "表征学习"],
    surfaces: ["Android"],
    annotations: ["视图层级", "UI 轨迹"],
    modalities: ["截图", "视图层级", "操作轨迹"],
    strengths: ["规模很大", "覆盖现代应用", "适合智能体预训练"],
    caveats: ["数据处理成本高", "子集可能与完整版有差异"]
  },
  amex: {
    summary: "高分辨率 Android GUI 数据，带元素级、屏幕级与任务级标注，专为移动 GUI 智能体训练与评测设计。",
    scaleLabel: "104000+ 高清 Android 屏幕",
    source: "ACL Findings 2025",
    bestFor: ["移动 GUI 智能体", "指令定位", "多层级标注研究"],
    tasks: ["智能体训练", "评测", "指令定位"],
    surfaces: ["Android"],
    annotations: ["元素标注", "屏幕标注", "任务标注", "指令"],
    modalities: ["截图", "指令", "标注"],
    strengths: ["多层级标注", "高分辨率", "面向智能体"],
    caveats: ["较新，需核实划分协议", "仅限 Android"]
  },
  ui5k: {
    summary: "带类别元数据的中等规模 Android UI 截图集合，适合 UI 检索与设计搜索。",
    scaleLabel: "54987 个 Android 屏幕",
    source: "学术研究",
    bestFor: ["UI 检索", "设计搜索", "类别分析"],
    tasks: ["检索", "分类"],
    surfaces: ["Android"],
    annotations: ["元数据", "应用类别"],
    modalities: ["截图", "元数据"],
    strengths: ["应用类别多", "检索候选优良"],
    caveats: ["标注深度不及 Rico/MobileViews"]
  },
  enrico: {
    summary: "从 Rico 中人工标注移动设计主题类别的精选高质量子集，适合标注质量比规模更重要的场景。",
    scaleLabel: "1460 个精选屏幕",
    source: "阿尔托大学 / MobileHCI 2020",
    bestFor: ["UI 主题建模", "设计分类", "少样本评测"],
    tasks: ["主题分类", "设计检索"],
    surfaces: ["Android"],
    annotations: ["20 种设计主题", "人工标注"],
    modalities: ["截图", "主题标签"],
    strengths: ["人工标注", "设计分类体系清晰", "易于审核"],
    caveats: ["规模小", "衍生自 Rico"]
  },
  clay: {
    summary: "源自 Rico 的移动屏幕布局，带语义 UI 对象类别，适合布局去噪与元素类型识别。",
    scaleLabel: "59555 个屏幕布局",
    source: "Google Research / CHI 2022",
    bestFor: ["布局去噪", "元素类型识别", "语义布局建模"],
    tasks: ["元素分类", "布局建模"],
    surfaces: ["Android"],
    annotations: ["语义 UI 对象类型", "布局标注"],
    modalities: ["布局", "语义标签"],
    strengths: ["语义对象分类体系", "研究级标注"],
    caveats: ["衍生自 Rico", "直接的交互数据较少"]
  },
  screenqa: {
    summary: "针对移动屏幕的人工标注问答对，可用于以视觉问答方式评测屏幕内容理解。",
    scaleLabel: "3.5 万屏幕上的 8.6 万问答对",
    source: "Google Research",
    bestFor: ["屏幕视觉问答", "语义理解", "多模态问答"],
    tasks: ["问答", "屏幕理解"],
    surfaces: ["Android"],
    annotations: ["问答对", "人工标注"],
    modalities: ["截图", "问题", "答案"],
    strengths: ["自然语言监督", "基于真实屏幕"],
    caveats: ["衍生自 Rico", "问答未覆盖全部智能体动作"]
  },
  "screen-annotation": {
    summary: "与 Rico 截图配对的移动 UI 元素文本标注，帮助模型把可见 UI 组件与文本描述、位置关联起来。",
    scaleLabel: "与 Rico 配对的文本标注",
    source: "Google Research",
    bestFor: ["元素识别", "OCR 感知的 UI 理解", "组件定位"],
    tasks: ["元素识别", "定位"],
    surfaces: ["Android"],
    annotations: ["元素文本", "类型", "位置"],
    modalities: ["截图", "文本标注"],
    strengths: ["文本-元素对齐", "与 Rico 互补"],
    caveats: ["衍生语料", "需与截图做合并处理"]
  },
  "rico-sca": {
    summary: "在 Rico 衍生屏幕上的语义组件描述与指代表达，适合按描述定位组件。",
    scaleLabel: "7 万组件的 17 万条描述",
    source: "Roots Automation / Google Rico Semantics",
    bestFor: ["组件指代表达", "语义定位", "描述监督"],
    tasks: ["指代表达", "组件定位"],
    surfaces: ["Android"],
    annotations: ["组件描述", "语义描述"],
    modalities: ["截图", "文本", "组件标签"],
    strengths: ["描述数量大", "组件级语义"],
    caveats: ["衍生自 Rico", "描述风格可能需归一化"]
  },
  "mobile-icon-screenshots": {
    summary: "托管于 Kaggle 的移动界面截图集合，适合作为轻量 AI/ML 或 UX 任务的补充图像来源。",
    scaleLabel: "移动 UI 截图集合",
    source: "DataCluster Labs / Kaggle",
    bestFor: ["补充训练数据", "UX 示例", "视觉检索"],
    tasks: ["检索", "分类"],
    surfaces: ["移动端"],
    annotations: ["元数据"],
    modalities: ["截图"],
    strengths: ["Kaggle 易获取", "适合作增强来源"],
    caveats: ["标注深度不明", "需核实许可与类别"]
  },
  "screenspot-series": {
    summary: "跨平台 GUI 定位基准，覆盖 iOS、Android、macOS 与网页，并有 v2 与 Pro 变体用于更难的评测。",
    scaleLabel: "600+ 截图、1.2K 指令及多个变体",
    source: "南京大学 / 上海 AI Lab",
    bestFor: ["GUI 定位", "跨平台评测", "高分辨率基准"],
    tasks: ["定位", "基准评测"],
    surfaces: ["iOS", "Android", "macOS", "网页"],
    annotations: ["定位指令", "元素目标"],
    modalities: ["截图", "指令", "坐标"],
    strengths: ["多平台", "定位任务上广泛使用", "有更难的变体"],
    caveats: ["基准规模有限", "训练数据需另寻来源"]
  },
  "groundui-18k": {
    summary: "带 UI 元素标注与动作指令的跨平台截图，适合 GUI 智能体评测与定位。",
    scaleLabel: "18026 张 UI 截图",
    source: "AgentStudio / Voxel51",
    bestFor: ["GUI 智能体评测", "元素定位", "动作指令定位"],
    tasks: ["定位", "智能体评测"],
    surfaces: ["网页", "移动端", "桌面"],
    annotations: ["UI 元素包围框", "动作指令"],
    modalities: ["截图", "指令", "包围框"],
    strengths: ["跨平台", "面向智能体的标注", "Hugging Face 托管"],
    caveats: ["需检查训练/测试划分", "任务体系可能较宽泛"]
  },
  "circl-phishing": {
    summary: "聚焦钓鱼网站的截图集合，适合视觉安全基线与品牌仿冒研究。",
    scaleLabel: "460+ 张钓鱼截图",
    source: "CIRCL",
    bestFor: ["钓鱼检测", "安全基准", "品牌仿冒分析"],
    tasks: ["安全分类", "视觉钓鱼检测"],
    surfaces: ["网页"],
    annotations: ["钓鱼标签"],
    modalities: ["截图"],
    strengths: ["聚焦安全", "公开开放数据"],
    caveats: ["规模小", "需要正常网站负样本"]
  },
  "phishpedia-phish30k": {
    summary: "较大的钓鱼基准，含截图、URL、HTML 与品牌标注，对视觉与多模态安全模型很有价值。",
    scaleLabel: "3 万张钓鱼截图",
    source: "Phishpedia 项目",
    bestFor: ["钓鱼基准", "品牌检测", "URL+HTML+截图融合"],
    tasks: ["安全分类", "品牌识别", "多模态检测"],
    surfaces: ["网页"],
    annotations: ["品牌标签", "URL", "HTML"],
    modalities: ["截图", "HTML", "URL", "品牌标签"],
    strengths: ["多模态字段丰富", "更大的安全基准"],
    caveats: ["安全数据集易过时", "需合法合规地处理"]
  },
  "grega-phishing": {
    summary: "结合视觉与表格信号的钓鱼/正常网页数据集，适合安全特征工程基线。",
    scaleLabel: "钓鱼与正常网页特征",
    source: "GitHub",
    bestFor: ["钓鱼分类", "特征工程", "基线对比"],
    tasks: ["安全分类"],
    surfaces: ["网页"],
    annotations: ["钓鱼标签", "网页特征"],
    modalities: ["截图", "特征"],
    strengths: ["含正常网页对照数据", "良好的基线来源"],
    caveats: ["并非纯截图导向", "可能需清洗特征"]
  },
  pix2code: {
    summary:
      "经典的合成截图转 DSL 数据集，覆盖 iOS、Android 与网页，主要作为历史基线与简单的代码生成基准。",
    scaleLabel: "合成 GUI/代码配对",
    source: "Tony Beltramelli",
    bestFor: ["经典截图转代码基线", "DSL 生成", "教学实验"],
    tasks: ["截图转代码", "DSL 生成"],
    surfaces: ["iOS", "Android", "网页"],
    annotations: ["DSL 代码", "截图配对"],
    modalities: ["截图", "代码"],
    strengths: ["早期权威基线", "设置简单可控"],
    caveats: ["合成且陈旧", "无法代表现代应用的复杂度"]
  },
  cmgui: {
    summary:
      "经人工核验的中文移动 GUI 智能体数据集，含精确包围框、中文操作指令与覆盖主流真实应用的触控轨迹。",
    scaleLabel: "1.8 万条轨迹与 9.8 万单步屏幕",
    source: "阿里巴巴 / MobiZen-GUI / SecAgent",
    bestFor: ["中文应用智能体训练", "操作轨迹学习", "可定位的移动动作"],
    tasks: ["智能体训练", "定位", "轨迹建模"],
    surfaces: ["中文 Android 应用", "电商", "社交", "本地生活", "出行"],
    annotations: ["包围框", "中文指令", "触控轨迹", "单步截图"],
    modalities: ["截图", "指令", "操作轨迹", "包围框"],
    strengths: ["人工核验", "真实中文应用", "轨迹级监督"],
    caveats: ["应用专属分布较大", "需跟踪论文与数据集版本"]
  },
  "e-ant": {
    summary: "来自真实用户行为、覆盖小程序与网址的中文 GUI 导航数据集，聚焦从意图到动作的导航。",
    scaleLabel: "4 万条真实用户操作轨迹",
    source: "蚂蚁集团",
    bestFor: ["中文小程序导航", "真实行为建模", "意图跟随"],
    tasks: ["导航", "智能体训练", "意图跟随"],
    surfaces: ["小程序", "移动网页", "中文应用"],
    annotations: ["操作轨迹", "意图描述", "行为标注"],
    modalities: ["截图", "操作轨迹", "意图"],
    strengths: ["真实用户行为", "小程序覆盖广", "聚焦导航"],
    caveats: ["数据集通过论文获取", "需核实获取条件"]
  },
  cagui: {
    summary: "双语中文 Android GUI 基准与预训练数据集，覆盖主流应用，带定位标注与多步智能体轨迹。",
    scaleLabel: "30+ 主流中文应用",
    source: "OpenBMB / 清华 THUNLP",
    bestFor: ["中文 Android 智能体", "双语定位", "多步任务轨迹"],
    tasks: ["定位", "智能体训练", "基准评测"],
    surfaces: ["中文 Android 应用"],
    annotations: ["定位标注", "智能体轨迹", "双语指令"],
    modalities: ["截图", "指令", "操作轨迹"],
    strengths: ["双语设置", "主流中文应用", "OpenBMB 生态"],
    caveats: ["具体样本数需按版本核实", "任务覆盖因应用而异"]
  },
  "mogui-mocon": {
    summary: "从 Rico 抽取的中文移动 GUI 多模态对话与元素标注数据，把移动 UI 研究拓展到中文对话场景。",
    scaleLabel: "1 万+ 移动屏幕",
    source: "OpenDFM / 中科院等",
    bestFor: ["中文 GUI 对话", "元素标注", "多模态 UI 对话"],
    tasks: ["对话", "元素标注", "定位"],
    surfaces: ["移动端"],
    annotations: ["对话数据", "UI 元素标注"],
    modalities: ["截图", "对话", "元素标签"],
    strengths: ["中文对话视角", "与 Rico 衍生资源互补"],
    caveats: ["从 Rico 抽取", "可能不反映现代中文应用 UI"]
  },
  vision2ui: {
    summary:
      "使用 Common Crawl 真实网页设计截图并带布局信息的设计转代码数据集，包含中文网页截图。",
    scaleLabel: "2 万个网页设计样本",
    source: "华中科技大学 / 北京大学 / 重庆大学",
    bestFor: ["中文网页设计转代码", "布局重建", "网页截图转代码"],
    tasks: ["截图转代码", "布局生成"],
    surfaces: ["网页"],
    annotations: ["布局信息", "设计截图"],
    modalities: ["截图", "布局", "面向代码的标注"],
    strengths: ["真实网页设计分布", "覆盖中文网页", "以布局为中心"],
    caveats: ["通过论文获取", "需核实具体发布包"]
  }
};

/** Chinese mirrors for the strategic use-case recommendations (keyed by English label). */
export const strategicUseCasesZh: Record<string, { label: string; note: string }> = {
  "Screenshot to Code": {
    label: "截图转代码",
    note: "先用 WebSight 打规模，再用 Vision2UI 补中文网页设计，pix2code 留作历史基线。"
  },
  "Web Element Detection": {
    label: "网页元素检测",
    note: "把 DOM/CSS 语义与可直接训练的包围框结合，同时覆盖浏览器结构与视觉组件。"
  },
  "Mobile Agent Training": {
    label: "移动智能体训练",
    note: "用 MobileViews 打规模，AMEX 提供多层级指令标注，CMGUI 提供中文轨迹监督。"
  },
  "GUI Grounding Evaluation": {
    label: "GUI 定位评测",
    note: "把跨平台截图与中文应用任务混合，避免过拟合到单一 UI 界面。"
  },
  "Security and Phishing": {
    label: "安全与钓鱼检测",
    note: "从视觉演示走向生产级安全模型时，优先选择 URL/HTML/截图的多模态监督。"
  }
};

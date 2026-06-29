# GUI Datasets Collection

A curated collection of publicly available GUI screenshot datasets for research in UI understanding, GUI agent training, screenshot-to-code generation, element detection, and more. This list spans web, mobile, and cross-platform domains, including both English and Chinese-focused datasets.

**Key highlights:**
- **70M+** web screenshots (Common Screens)
- **1.2M+** mobile screenshot-VH pairs (MobileViews)
- **18K** operation traces from Chinese apps (CMGUI)
- Datasets for screenshot-to-code, phishing detection, UI grounding, and VQA

> Last updated: 2026-06-23 | Cross-platform, cross-system, cross-language, cross-app type

---

## 1. Web Screenshot Datasets

### 1.1 WebSight ⭐⭐
| Field | Details |
|-------|---------|
| **Source** | HuggingFace M4 Team |
| **Size** | v0.1: 823K pairs; v0.2: 2M pairs (HTML/CSS + screenshots) |
| **Content** | Synthetically generated English website HTML code (Tailwind CSS) with corresponding desktop screenshots |
| **Use Case** | Screenshot-to-code generation |
| **Download** | https://huggingface.co/datasets/HuggingFaceM4/WebSight |
| **Paper** | arxiv 2403.09029 |
| **License** | CC-BY-4.0 |

---

### 1.2 Common Screens Project ⭐⭐⭐
| Field | Details |
|-------|---------|
| **Source** | AWS Open Data Registry |
| **Size** | **70M+** website screenshots and metadata |
| **Content** | Desktop/mobile/full-page screenshots (JPEG/PNG) with CSV metadata including domain, category, etc. |
| **Use Case** | Large-scale web analysis, visual understanding, website classification |
| **Download** | https://www.kaggle.com/datasets/bpmtips/commonscreens |
| **Mirror** | https://dagshub.com/datasets/common-screens/ |

---

### 1.3 WebUI ⭐⭐
| Field | Details |
|-------|---------|
| **Source** | CHI 2023 Paper (CMU et al.) |
| **Size** | **400,000** rendered web pages + auto-extracted metadata |
| **Content** | Real web page screenshots with semantic annotations including DOM bounding boxes, CSS properties, etc. |
| **Use Case** | Web UI element detection, page understanding, transfer learning |
| **Paper** | CHI 2023 "WebUI: A Dataset for Enhancing Visual UI Understanding with Web Semantics" |
| **Download** | https://huggingface.co/datasets/ronantakizawa/webui |
| **Project Page** | https://uimodeling.github.io/ |

---

### 1.4 1k Website Screenshots and Metadata
| Field | Details |
|-------|---------|
| **Source** | Silatus |
| **Size** | 1000+ desktop screenshots of popular websites |
| **Content** | Screenshots + metadata (description, category, colors, etc.) |
| **Use Case** | Text-to-UI prototype generation training |
| **Download** | https://huggingface.co/datasets/silatus/1k_Website_Screenshots_and_Metadata |

---

### 1.5 UI-Elements-Detection-Dataset
| Field | Details |
|-------|---------|
| **Source** | YashJain (HuggingFace) |
| **Size** | 300+ popular websites, 15 UI element categories |
| **Content** | 1920x1080 hi-res web screenshots + YOLO-format annotations + accessibility metadata |
| **Use Case** | UI element object detection |
| **Download** | https://huggingface.co/datasets/YashJain/UI-Elements-Detection-Dataset |

---

### 1.6 Web UI Screenshots (Roboflow)
| Field | Details |
|-------|---------|
| **Source** | WebUIProject (Roboflow) |
| **Size** | 1,800 images |
| **Content** | Open-source web UI object annotations, multi-format export (YOLO/VOC/COCO) |
| **Use Case** | Web element object detection |
| **Download** | https://universe.roboflow.com/webuiproject/ui-screenshots |

---

### 1.7 Visual Section Detection Dataset
| Field | Details |
|-------|---------|
| **Source** | Roboflow |
| **Size** | 3,452 annotated screenshots |
| **Content** | Key region extraction annotations from web screenshots |
| **Use Case** | Web section detection, page layout analysis |
| **Download** | https://universe.roboflow.com/ (search "Visual Section Detection") |

---

## 2. Mobile App Screenshot Datasets

### 2.1 Rico ⭐⭐⭐
| Field | Details |
|-------|---------|
| **Source** | UIUC / Google Research (UIST 2017) |
| **Size** | **72,000+** Android UI screenshots from 9,700+ apps (27 categories) |
| **Content** | Screenshots + View Hierarchy + UI metadata + layout vectors + interaction traces + animations |
| **Use Case** | Data-driven design, UI layout generation, interaction mining, mobile UI understanding |
| **Download** | https://www.interactionmining.org/rico |
| **HF Mirror** | https://huggingface.co/datasets/Voxel51/rico |

---

### 2.2 MobileViews ⭐⭐⭐
| Field | Details |
|-------|---------|
| **Source** | BUPT & CASIA (arXiv 2024) |
| **Size** | v1: 600K pairs; **Full: 1.2M+** screenshot-View Hierarchy pairs from 30K+ apps |
| **Content** | Mobile screenshots + View Hierarchy + UI traces |
| **Use Case** | Mobile agent research, UI analysis, large-scale screenshot understanding |
| **Download** | https://huggingface.co/datasets/mllmTeam/MobileViews |
| **Paper** | arxiv 2409.14337 |

---

### 2.3 AMEX ⭐⭐
| Field | Details |
|-------|---------|
| **Source** | ACL 2025 Findings |
| **Size** | **104,000+** high-resolution Android screenshots |
| **Content** | Three-level annotations (element, screen, task) with instruction data |
| **Use Case** | Mobile GUI agent training and evaluation |
| **Download** | https://huggingface.co/datasets/Yuxiang007/AMEX |
| **Paper** | arxiv 2407.17490 |
| **Project Page** | https://www.yxchai.com/AMEX |

---

### 2.4 UI5k
| Field | Details |
|-------|---------|
| **Source** | Academic Research |
| **Size** | **54,987** UI screenshots from 7,748 Android apps (25 categories) |
| **Content** | Mobile UI screenshots + metadata |
| **Use Case** | UI design search, interface retrieval |
| **Download** | https://opendatalab.com/OpenDataLab/UI5k |

---

### 2.5 Enrico
| Field | Details |
|-------|---------|
| **Source** | Aalto University (MobileHCI 2020) |
| **Size** | **1,460** high-quality, manually annotated UI screenshots |
| **Content** | Screenshots filtered from Rico and manually labeled with 20 design theme categories |
| **Use Case** | UI theme modeling, design classification |
| **Download** | https://github.com/luileito/enrico |
| **HF Mirror** | https://huggingface.co/datasets/Leonardo6/enrico |

---

### 2.6 CLAY
| Field | Details |
|-------|---------|
| **Source** | Google Research (CHI 2022) |
| **Size** | **59,555** manually annotated screen layouts |
| **Content** | UI object semantic type annotations (BUTTON, IMAGE, CHECKBOX, etc.) based on Rico screenshots |
| **Use Case** | UI layout denoising, element type recognition |
| **Download** | https://github.com/google-research-datasets/clay |

---

### 2.7 ScreenQA
| Field | Details |
|-------|---------|
| **Source** | Google Research |
| **Size** | **86,000** QA pairs / ~35,000 screenshots (based on Rico) |
| **Content** | Mobile screenshots + human-annotated QA pairs |
| **Use Case** | Screen content understanding, visual question answering |
| **Download** | https://github.com/google-research-datasets/screen_qa |
| **Paper** | "ScreenQA: Large-Scale Question-Answer Pairs over Mobile App Screenshots" |

---

### 2.8 Screen Annotation (Google)
| Field | Details |
|-------|---------|
| **Source** | Google Research |
| **Size** | Paired annotations based on Rico screenshots |
| **Content** | Mobile screenshots + UI element text annotations (type, text content, position, etc.) |
| **Use Case** | UI element recognition and understanding |
| **Download** | https://github.com/google-research-datasets/screen_annotation |

---

### 2.9 RicoSCA (Semantic Components Annotation)
| Field | Details |
|-------|---------|
| **Source** | Google Research (based on Rico) |
| **Size** | **170K** captions covering 70K components across 18K screens |
| **Content** | Semantic descriptions (referring expressions) of UI components |
| **Use Case** | UI semantic understanding, component referring expression |
| **Download** | https://huggingface.co/datasets/rootsautomation/RICO-SCA |
| **GitHub** | https://github.com/google-research-datasets/rico_semantics |

---

### 2.10 Mobile Icon Screenshots Dataset
| Field | Details |
|-------|---------|
| **Source** | Kaggle (DataCluster Labs) |
| **Size** | Collection of mobile UI screenshots |
| **Content** | High-quality mobile UI screenshots |
| **Use Case** | AI/ML/UX research |
| **Download** | https://www.kaggle.com/datasets/dataclusterlabs/mobile-icon-mobile-screenshots-dataset |

---

## 3. Cross-platform GUI Screenshot Datasets

### 3.1 ScreenSpot Series ⭐⭐
| Field | Details |
|-------|---------|
| **Source** | Nanjing University & Shanghai AI Lab |
| **Size** | ScreenSpot: 600+ screenshots / 1,200 instructions; ScreenSpot-v2: extended version; ScreenSpot-Pro: hi-res version (3840×2160) |
| **Platform** | iOS, Android, macOS, Web |
| **Content** | Multi-platform screenshots + GUI element grounding instructions |
| **Use Case** | GUI grounding benchmark evaluation |
| **Download** | https://huggingface.co/datasets/benwiesel/ScreenSpot |
| **v2** | https://huggingface.co/datasets/Voxel51/ScreenSpot-v2 |
| **Pro** | https://github.com/likaixin2000/ScreenSpot-Pro-GUI-Grounding |

---

### 3.2 GroundUI-18k
| Field | Details |
|-------|---------|
| **Source** | AgentStudio / Voxel51 |
| **Size** | **18,026** cross-platform UI screenshots |
| **Platform** | Multi-platform (Web, Mobile, Desktop) |
| **Content** | Screenshots + UI element annotations with action instructions |
| **Use Case** | GUI agent evaluation, element grounding |
| **Download** | https://huggingface.co/datasets/Voxel51/GroundUI-18k |

---

## 4. Phishing / Security-related Screenshot Datasets

### 4.1 CIRCL Phishing Dataset
| Field | Details |
|-------|---------|
| **Source** | CIRCL (Luxembourg) |
| **Size** | 460+ phishing website screenshots |
| **Content** | Phishing web page screenshots |
| **Use Case** | Phishing detection |
| **Download** | https://www.circl.lu/opendata/circl-phishing-dataset-01/ |

---

### 4.2 Phishpedia / Phish30k
| Field | Details |
|-------|---------|
| **Source** | Phishpedia Project |
| **Size** | **30K** phishing website screenshots + URL + HTML + brand annotations |
| **Content** | Phishing benchmark dataset |
| **Download** | https://github.com/lindsey98/Phishpedia |

---

### 4.3 GregaVrbancic Phishing Dataset
| Field | Details |
|-------|---------|
| **Source** | GitHub |
| **Size** | Phishing/legitimate web page features and screenshots |
| **Content** | Phishing detection classification based on web screenshots |
| **Download** | https://github.com/GregaVrbancic/Phishing-Dataset |

---

## 5. Screenshot-to-Code Related Datasets

### 5.1 pix2code Training Data
| Field | Details |
|-------|---------|
| **Source** | Tony Beltramelli (2017) |
| **Size** | Synthetic GUI screenshots + corresponding DSL code |
| **Platform** | iOS, Android, Web |
| **Use Case** | Classic baseline for screenshot-to-code generation |
| **Download** | https://github.com/tonybeltramelli/pix2code |

---

## 6. Chinese-specific Screenshot Datasets 🇨🇳

### 6.1 CMGUI (Alibaba) ⭐⭐⭐
| Field | Details |
|-------|---------|
| **Source** | Alibaba Group (MobiZen-GUI / SecAgent project) |
| **Size** | **18,000 operation traces + 98,000 single-step screenshots** from 50+ real Chinese apps |
| **App Coverage** | E-commerce: Taobao, Pinduoduo, JD; Social: Xiaohongshu, Douyin, WeChat; Local Services: Meituan, Amap, Ele.me; Transportation: Didi, Ctrip, etc. |
| **Content** | Hi-res screenshots + precise bounding box annotations + Chinese operation instructions + touch traces |
| **Highlight** | Fully human-verified, the first large-scale open-source Chinese mobile GUI agent dataset |
| **Download** | https://huggingface.co/datasets/alibabagroup/CMGUI |
| **Project** | https://github.com/alibaba/MobiZen-GUI |
| **Paper** | SecAgent (arxiv 2603.08533) |

---

### 6.2 E-ANT (Ant Group) ⭐⭐⭐
| Field | Details |
|-------|---------|
| **Source** | Ant Group |
| **Size** | **~40,000 real user operation traces** covering 20,000+ mini-programs (tinyAPP) and URLs |
| **Content** | High-quality screenshots + human operation behavior annotations + natural language intent descriptions |
| **Highlight** | **First Chinese GUI navigation dataset**, collected from real user behavior (not scripts) |
| **Use Case** | Chinese UI auto-navigation, GUI agent training |
| **Download** | https://arxiv.org/abs/2406.14250 (paper includes data link) |
| **Paper** | arxiv 2406.14250 |

---

### 6.3 CAGUI (OpenBMB / Tsinghua) ⭐⭐
| Field | Details |
|-------|---------|
| **Source** | Tsinghua University THUNLP + Face Intelligence (OpenBMB) |
| **Size** | Screenshots covering 30+ mainstream Chinese Android apps |
| **App Coverage** | Amap, Dianping, Bilibili, Xiaohongshu, WeChat, QQ Music, etc. |
| **Content** | Screenshots + grounding annotations + agent multi-step task traces |
| **Highlight** | Bilingual (Chinese-English) Android data pre-training, first open-source GUI agent benchmark for Chinese app operations |
| **Download** | https://huggingface.co/datasets/openbmb/CAGUI |
| **Mirror** | https://www.modelscope.cn/datasets/OpenBMB/CAGUI |
| **Project** | https://github.com/OpenBMB/AgentCPM-GUI |

---

### 6.4 MoGUI & MoCon (CAS et al.)
| Field | Details |
|-------|---------|
| **Source** | OpenDFM (Chinese Academy of Sciences, et al.) |
| **Size** | 10,000+ mobile screens, extracted from Rico dataset |
| **Content** | MoGUI: multimodal dialogue data (GUI screenshots + Chinese dialogue); MoCon: UI element annotations |
| **Highlight** | Chinese-named mobile GUI multimodal dialogue data |
| **Download** | https://github.com/OpenDFM/MoGUI-and-MoCon |

---

### 6.5 Vision2UI (HUST et al.)
| Field | Details |
|-------|---------|
| **Source** | Huazhong University of Science & Technology, Peking University, Chongqing University |
| **Size** | **20,000** samples (training + test) |
| **Content** | Real web design screenshots extracted from Common Crawl + layout information |
| **Highlight** | Includes Chinese web screenshots, optimized for design-to-code tasks with complete layout annotations |
| **Download** | https://arxiv.org/abs/2404.06369 |
| **Paper** | arxiv 2404.06369 |

---

### 6.6 MobileViews (BUPT / Tsinghua)
| Field | Details |
|-------|---------|
| **Source** | Beijing University of Posts and Telecommunications & Tsinghua University AI Industry Research Institute |
| **Size** | 600K~1.2M screenshot-View Hierarchy pairs |
| **Content** | UI screenshots and VH from a large number of popular Chinese apps |
| **Note** | Also listed in the "Mobile App Screenshots" section; created by Chinese teams, contains extensive Chinese app UI data |

---

## 📊 Dataset Overview Comparison

| Dataset | Screenshots | Platform | Annotation Type | Downloadable |
|---------|-------------|----------|-----------------|--------------|
| Common Screens | 70M+ | Web | Metadata | ✅ |
| MobileViews | 1.2M+ | Android | VH + Traces | ✅ |
| WebSight | 2M | Web (synthetic) | HTML/CSS | ✅ |
| WebUI | 400K | Web | DOM + CSS | ✅ |
| AMEX | 104K | Android | Multi-level Instructions | ✅ |
| Rico | 72K | Android | VH + Interactions | ✅ |
| CLAY | 59K | Android | Element Semantics | ✅ |
| UI5k | 55K | Android | Metadata | ✅ |
| GroundUI-18k | 18K | Cross-platform | Element Grounding | ✅ |
| Phish30k | 30K | Web | Brand Annotations | ✅ |
| ScreenQA | 86K (QA) | Android | QA Pairs | ✅ |
| Enrico | 1,460 | Android | Theme Classification | ✅ |
| ScreenSpot | 600+ | Web/iOS/Android/macOS | Element Grounding | ✅ |
| pix2code | Synthetic | iOS/Android/Web | DSL Code | ✅ |

## 📊 Chinese Dataset Overview Comparison

| Dataset | Screenshots/Traces | Apps Covered | Annotation Type | Creator | Downloadable |
|---------|-------------------|--------------|-----------------|---------|--------------|
| CMGUI | 18K traces + 98K steps | 50+ | Traces + BBox + Chinese Instructions | Alibaba | ✅ |
| E-ANT | 40K traces | 20K+ mini-programs | Traces + Intent | Ant Group | ✅ Paper |
| CAGUI | Thousands of screenshots | 30+ | Grounding + Agent | OpenBMB/Tsinghua | ✅ |
| MoGUI+MoCon | 10K screens | Based on Rico | Dialogue + Element Annotations | CAS | ✅ |
| Vision2UI | 20K samples | Web | Layout Information | HUST | ✅ |
| MobileViews | 600K+ screenshots | 20K+ Apps | VH + Traces | BUPT/Tsinghua | ✅ |

---

## 🔍 Recommended Search Platforms

- **HuggingFace Datasets**: https://huggingface.co/datasets — search "screenshot", "UI", "GUI"
- **Kaggle**: https://www.kaggle.com/datasets — search "screenshots", "app UI"
- **Roboflow Universe**: https://universe.roboflow.com/ — search "UI", "screenshot"
- **OpenDataLab**: https://opendatalab.com/ — search "UI", "Rico"
- **Papers With Code**: https://paperswithcode.com/ — search "screenshot", "GUI"
- **Google Research Datasets**: https://github.com/google-research-datasets
- **ModelScope**: https://www.modelscope.cn/datasets

---

## 💡 Recommendations by Use Case

| Use Case | Recommended Datasets |
|----------|---------------------|
| **Screenshot → Code Generation** | WebSight, pix2code |
| **Web Element Detection** | WebUI, UI-Elements-Detection |
| **Large-scale Web Analysis** | Common Screens |
| **Mobile UI Element Recognition** | Rico, CLAY, Screen Annotation |
| **Mobile Agent Research** | MobileViews, AMEX |
| **Cross-platform GUI Grounding** | ScreenSpot, GroundUI-18k |
| **Screen QA** | ScreenQA |
| **UI Design Retrieval** | UI5k, Enrico |
| **Phishing Detection** | Phish30k, CIRCL Phishing |
| **⭐ Chinese App Agent Training** | CMGUI (preferred), E-ANT, CAGUI |
| **⭐ Chinese Mini-Program Navigation** | E-ANT |
| **⭐ Chinese Web Design → Code** | Vision2UI |
# Cute Obsidian Workbench

Cute Obsidian Workbench 是一个粉色狗狗手绘主题的 Obsidian Community Plugin 工作台。它提供总览、科研、阅读、健身、理财、目标管理和模块管理七个 Dashboard 页面，并通过统一的 Dashboard Section 系统管理模块、布局和持久化数据。

## 功能截图位置

视觉参考图放在 `references/`：

- `references/overview.png`
- `references/research.png`
- `references/reading.png`
- `references/fitness.png`
- `references/finance.png`
- `references/goals.png`
- `references/modules.png`

这些图片只作为视觉标准，插件 UI 使用 TypeScript、Obsidian API、HTML DOM 和 CSS 自行渲染。

## 安装步骤

1. 在 Obsidian vault 的 `.obsidian/plugins/` 下创建目录 `cute-obsidian-workbench`。
2. 将构建产物复制到该目录：
   - `main.js`
   - `manifest.json`
   - `styles.css`
3. 打开 Obsidian 设置。
4. 关闭安全模式或启用社区插件。
5. 启用 `Cute Obsidian Workbench`。
6. 点击左侧 Ribbon 的工作台按钮，或运行命令 `Open Cute Workbench`。

## 开发步骤

```bash
npm install
npm run build
```

发布检查：

```bash
npm run build:release
```

开发监听：

```bash
npm run dev
```

## 功能列表

- 原生 Obsidian `ItemView` 工作台视图。
- Ribbon 按钮：打开 Cute Workbench。
- 命令：`Open Cute Workbench`。
- 七个固定页面：总览、科研、阅读、健身、理财、目标管理、模块管理。
- 页面切换在同一个 Workbench View 内完成，不打开新笔记。
- 统一 Dashboard Section 配置：
  - 添加模块
  - 删除模块
  - 启用/关闭模块
  - 拖拽排序
  - 宽度、高度、顺序配置
- 使用 `loadData()` / `saveData()` 保存插件内部数据。
- 粉色狗狗主题、纸张纹理、圆角卡片、轻阴影和贴纸感 UI。

## 页面介绍

### 总览

包含本周完成率、待办任务、今日专注、连续打卡、今日焦点、打卡总览、本月进度、月度日历、最近笔记、快捷操作和年度贡献图。

### 科研

包含研究项目总览、论文阅读队列、本周科研打卡、实验计划、实验记录、数据分析任务、文献笔记、会议 / DDL 时间线和科研灵感 Memo。

### 阅读

包含当前阅读、书架、阅读计划、本周阅读打卡、阅读笔记、金句摘录、已读清单、想读清单、阅读进度统计、月度阅读热力图和 AI 阅读复盘占位卡。

### 健身

包含今日训练、训练计划、本周健身打卡、体重与围度记录、有氧 / 力量安排、饮水与睡眠习惯、热量消耗与运动时长、运动日志、健身目标进度、健康提醒和月度运动热力图。

### 理财

包含本月预算、支出分类、账户总览、储蓄目标、账单提醒、本周理财打卡、收支趋势、本月记账待办、投资观察和月度支出热力图。理财功能仅作为个人记录，不包含真实支付或交易能力。

### 目标管理

包含年度目标、季度 OKR、月度关键结果、目标拆解、里程碑时间线、优先级矩阵、本周目标打卡、复盘清单、风险与阻碍和长期进展。

### 模块管理

包含已启用模块概览、首页布局管理、模块开关与排序、Banner 背景设置、日历组件设置、Apex 打卡模块设置、快捷操作配置、主题与配色和数据源状态。

## 配置介绍

模块管理页可以控制：

- 首页布局：默认布局、紧凑布局、极简布局。
- 模块开关：启用或关闭任意 Dashboard Section。
- 模块排序：使用原生 Drag & Drop 排序并保存。
- Banner 背景：推荐壁纸、本地图片、背景位置、overlay 和透明度。
- 日历组件：笔记标记、任务标记、事件标记、一周起始日、日期高亮颜色。
- 打卡模块：首页显示、连续打卡、本周完成进度、自定义打卡项目。
- 快捷操作：新建笔记、打开今日笔记、搜索、打开模板、打开图谱、自定义入口。
- 主题变量：
  - `--cute-bg`
  - `--cute-card`
  - `--cute-primary`
  - `--cute-secondary`
  - `--cute-text`
  - `--cute-border`
  - `--cute-radius`
  - `--cute-shadow`

## 数据保存说明

所有插件内部数据统一保存在 `WorkbenchData` 中，并通过 Obsidian 插件 API：

- `loadData()`
- `saveData()`

保存内容包括：

- 当前页面
- Dashboard Section 布局
- 模块启用状态
- 模块排序
- Banner 设置
- 日历设置
- 打卡数据
- 主题设置
- 快捷操作配置
- 科研、阅读、健身、理财、目标管理示例数据

删除功能分区只会移除工作台布局配置，不会删除用户的 Markdown 文件。

## 目录结构

```text
.
├── assets/
│   ├── backgrounds/
│   ├── books/
│   └── dogs/
├── references/
├── src/
│   ├── components/
│   │   ├── finance/
│   │   ├── fitness/
│   │   ├── goals/
│   │   ├── modules/
│   │   ├── overview/
│   │   ├── reading/
│   │   └── research/
│   ├── core/
│   ├── pages/
│   ├── services/
│   ├── settings/
│   ├── styles/
│   ├── types/
│   └── views/
├── esbuild.config.mjs
├── main.js
├── manifest.json
├── package.json
├── styles.css              # 构建生成的完整发布样式，不依赖 src/styles
├── tsconfig.json
└── versions.json
```

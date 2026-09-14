/* Cute Obsidian Workbench */
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => CuteObsidianWorkbenchPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian34 = require("obsidian");

// src/core/DashboardStore.ts
var DASHBOARD_PAGES = [
  { id: "overview", label: "\u603B\u89C8", icon: "home", description: "\u4ECA\u65E5\u6982\u89C8\u4E0E\u5FEB\u6377\u5165\u53E3" },
  { id: "research", label: "\u79D1\u7814", icon: "flask-conical", description: "\u8BBA\u6587\u3001\u5B9E\u9A8C\u548C\u79D1\u7814\u8BB0\u5F55" },
  { id: "reading", label: "\u9605\u8BFB", icon: "book-open", description: "\u8BFB\u4E66\u961F\u5217\u4E0E\u6458\u5F55\u8FDB\u5EA6" },
  { id: "fitness", label: "\u5065\u8EAB", icon: "dumbbell", description: "\u8BAD\u7EC3\u3001\u6062\u590D\u548C\u4E60\u60EF\u6253\u5361" },
  { id: "finance", label: "\u7406\u8D22", icon: "coins", description: "\u9884\u7B97\u3001\u8D44\u4EA7\u548C\u6295\u8D44\u89C2\u5BDF" },
  { id: "goals", label: "\u76EE\u6807\u7BA1\u7406", icon: "target", description: "\u957F\u671F\u76EE\u6807\u4E0E\u9636\u6BB5\u8BA1\u5212" },
  { id: "modules", label: "\u6A21\u5757\u7BA1\u7406", icon: "layout-grid", description: "\u6A21\u5757\u542F\u7528\u3001\u5E03\u5C40\u548C\u6570\u636E\u7ED1\u5B9A" }
];
var AVAILABLE_MODULES = [
  { type: "weekly-completion", title: "\u672C\u5468\u5B8C\u6210\u7387", description: "\u7EDF\u8BA1\u4ECA\u65E5\u7126\u70B9\u548C\u4E60\u60EF\u7684\u672C\u5468\u5B8C\u6210\u7387\u3002", page: "overview", icon: "badge-percent", defaultWidth: "sm" },
  { type: "pending-tasks", title: "\u5F85\u529E\u4EFB\u52A1", description: "\u663E\u793A\u672A\u5B8C\u6210\u7684\u4ECA\u65E5\u7126\u70B9\u4EFB\u52A1\u3002", page: "overview", icon: "clipboard-list", defaultWidth: "sm" },
  { type: "today-focus-stat", title: "\u4ECA\u65E5\u4E13\u6CE8", description: "\u8BB0\u5F55\u4ECA\u65E5\u4E13\u6CE8\u65F6\u957F\u3002", page: "overview", icon: "headphones", defaultWidth: "sm" },
  { type: "checkin-streak", title: "\u8FDE\u7EED\u6253\u5361", description: "\u663E\u793A\u8FDE\u7EED\u5B8C\u6210\u4E60\u60EF\u7684\u5929\u6570\u3002", page: "overview", icon: "flame", defaultWidth: "sm" },
  { type: "today-focus", title: "\u4ECA\u65E5\u7126\u70B9", description: "\u79D1\u7814\u3001\u9605\u8BFB\u3001\u5065\u8EAB\u3001\u7406\u8D22\u548C\u4E2A\u4EBA\u4EFB\u52A1\u3002", page: "overview", icon: "target", defaultWidth: "md", defaultHeight: "md" },
  { type: "habit-overview", title: "\u6253\u5361\u603B\u89C8", description: "\u67E5\u770B\u5E76\u5207\u6362\u672C\u5468\u4E60\u60EF\u6253\u5361\u72B6\u6001\u3002", page: "overview", icon: "calendar-check", defaultWidth: "md", defaultHeight: "md" },
  { type: "monthly-progress", title: "\u672C\u6708\u8FDB\u5EA6", description: "\u6309\u9875\u9762\u8FFD\u8E2A\u672C\u6708\u5B8C\u6210\u7387\u3002", page: "overview", icon: "bar-chart-3", defaultWidth: "md" },
  { type: "monthly-calendar", title: "\u6708\u5EA6\u65E5\u5386", description: "\u72EC\u7ACB\u6708\u5386\uFF0C\u9884\u7559\u7B14\u8BB0\u3001\u4EFB\u52A1\u548C\u4E8B\u4EF6\u6807\u8BB0\u3002", page: "overview", icon: "calendar-days", defaultWidth: "md", defaultHeight: "md" },
  { type: "recent-notes", title: "\u6700\u8FD1\u7B14\u8BB0", description: "\u4E3A\u540E\u7EED NoteService \u9884\u7559\u7684\u6700\u8FD1\u6587\u4EF6\u5217\u8868\u3002", page: "overview", icon: "file-text", defaultWidth: "md" },
  { type: "quick-actions", title: "\u5FEB\u6377\u64CD\u4F5C", description: "\u65B0\u5EFA\u7B14\u8BB0\u3001\u6DFB\u52A0\u4EFB\u52A1\u3001\u6253\u5F00\u65E5\u5386\u7B49\u52A8\u4F5C\u5165\u53E3\u3002", page: "overview", icon: "zap", defaultWidth: "md" },
  { type: "contribution-heatmap", title: "\u5E74\u5EA6\u8D21\u732E\u56FE", description: "\u6309\u6708\u4EFD\u5C55\u793A Markdown \u521B\u5EFA\u6570\u91CF\u70ED\u529B\u56FE\u3002", page: "overview", icon: "activity", defaultWidth: "full", defaultHeight: "sm" },
  { type: "memo", title: "Memo", description: "\u968F\u624B\u8BB0\u5F55\u7075\u611F\u548C\u60F3\u6CD5\u3002", page: "overview", icon: "sticky-note", defaultWidth: "md" },
  { type: "todo", title: "Todo", description: "\u8F7B\u91CF\u6E05\u5355\u6A21\u5757\u3002", page: "overview", icon: "list-checks", defaultWidth: "md" },
  { type: "projects", title: "Projects", description: "\u9879\u76EE\u5361\u7247\u548C\u5173\u8054\u7B14\u8BB0\u3002", page: "overview", icon: "folder-kanban", defaultWidth: "md" },
  { type: "notes", title: "Notes", description: "\u7B14\u8BB0\u5165\u53E3\u96C6\u5408\u3002", page: "overview", icon: "notebook-tabs", defaultWidth: "md" },
  { type: "research-projects", title: "\u7814\u7A76\u9879\u76EE\u603B\u89C8", description: "\u79D1\u7814\u9879\u76EE\u4E0E\u9636\u6BB5\u72B6\u6001\u3002", page: "research", icon: "layers", defaultWidth: "md" },
  { type: "reading-queue", title: "\u8BBA\u6587\u9605\u8BFB\u961F\u5217", description: "\u8BBA\u6587\u9605\u8BFB\u72B6\u6001\u548C\u4F18\u5148\u7EA7\u3002", page: "research", icon: "book-marked", defaultWidth: "md" },
  { type: "research-checkin", title: "\u672C\u5468\u79D1\u7814\u6253\u5361", description: "\u8BBA\u6587\u3001\u5B9E\u9A8C\u3001\u5199\u4F5C\u548C\u7EC4\u4F1A\u51C6\u5907\u3002", page: "research", icon: "calendar-check", defaultWidth: "md" },
  { type: "experiment-plan", title: "\u5B9E\u9A8C\u8BA1\u5212", description: "\u8BA1\u5212\u4E2D\u7684\u5B9E\u9A8C\u4EFB\u52A1\u3002", page: "research", icon: "clipboard-check", defaultWidth: "md" },
  { type: "experiment-records", title: "\u5B9E\u9A8C\u8BB0\u5F55", description: "\u6700\u8FD1\u5B9E\u9A8C\u8BB0\u5F55\u4E0E\u7B14\u8BB0\u5165\u53E3\u3002", page: "research", icon: "file-clock", defaultWidth: "md" },
  { type: "data-analysis-tasks", title: "\u6570\u636E\u5206\u6790\u4EFB\u52A1", description: "\u6570\u636E\u5904\u7406\u3001\u5206\u6790\u548C\u56FE\u8868\u4EFB\u52A1\u3002", page: "research", icon: "bar-chart-3", defaultWidth: "md" },
  { type: "literature-notes", title: "\u6587\u732E\u7B14\u8BB0", description: "\u5DF2\u7ED1\u5B9A\u7684\u8BBA\u6587\u9605\u8BFB\u7B14\u8BB0\u3002", page: "research", icon: "notebook-text", defaultWidth: "md" },
  { type: "research-timeline", title: "\u4F1A\u8BAE / DDL \u65F6\u95F4\u7EBF", description: "\u91CD\u8981\u4F1A\u8BAE\u3001\u622A\u6B62\u65E5\u671F\u548C\u6C47\u62A5\u5B89\u6392\u3002", page: "research", icon: "calendar-clock", defaultWidth: "md" },
  { type: "research-memo", title: "\u79D1\u7814\u7075\u611F Memo", description: "\u8BB0\u5F55\u7A81\u7136\u5192\u51FA\u6765\u7684\u79D1\u7814\u60F3\u6CD5\u3002", page: "research", icon: "lightbulb", defaultWidth: "md" },
  { type: "current-reading", title: "\u5F53\u524D\u9605\u8BFB", description: "\u5F53\u524D\u6B63\u5728\u8BFB\u7684\u4E66\u548C\u8FDB\u5EA6\u3002", page: "reading", icon: "book-open-check", defaultWidth: "md" },
  { type: "bookshelf", title: "\u4E66\u67B6 Bookshelf", description: "\u4E66\u7C4D\u5361\u7247\u548C\u9605\u8BFB\u72B6\u6001\u3002", page: "reading", icon: "library", defaultWidth: "md" },
  { type: "reading-plan", title: "\u9605\u8BFB\u8BA1\u5212", description: "\u8FD1\u671F\u9605\u8BFB\u5B89\u6392\u3002", page: "reading", icon: "calendar-range", defaultWidth: "md" },
  { type: "reading-checkin", title: "\u672C\u5468\u9605\u8BFB\u6253\u5361", description: "\u672C\u5468\u9605\u8BFB\u4E60\u60EF\u6253\u5361\u3002", page: "reading", icon: "calendar-check", defaultWidth: "md" },
  { type: "reading-notes", title: "\u9605\u8BFB\u7B14\u8BB0", description: "\u9605\u8BFB\u7B14\u8BB0\u5165\u53E3\u3002", page: "reading", icon: "notebook-tabs", defaultWidth: "md" },
  { type: "reading-quotes", title: "\u91D1\u53E5\u6458\u5F55", description: "\u503C\u5F97\u53CD\u590D\u770B\u7684\u53E5\u5B50\u3002", page: "reading", icon: "quote", defaultWidth: "md" },
  { type: "finished-books", title: "\u5DF2\u8BFB\u6E05\u5355", description: "\u5DF2\u7ECF\u8BFB\u5B8C\u7684\u4E66\u3002", page: "reading", icon: "badge-check", defaultWidth: "md" },
  { type: "wishlist-books", title: "\u60F3\u8BFB\u6E05\u5355", description: "\u51C6\u5907\u5F00\u59CB\u7684\u4E66\u3002", page: "reading", icon: "bookmark-plus", defaultWidth: "md" },
  { type: "reading-stats", title: "\u9605\u8BFB\u8FDB\u5EA6\u7EDF\u8BA1", description: "\u9875\u6570\u3001\u5B8C\u6210\u7387\u548C\u9605\u8BFB\u6570\u91CF\u3002", page: "reading", icon: "pie-chart", defaultWidth: "md" },
  { type: "reading-heatmap", title: "\u6708\u5EA6\u9605\u8BFB\u70ED\u529B\u56FE", description: "\u6309\u65E5\u5C55\u793A\u672C\u6708\u9605\u8BFB\u6D3B\u52A8\u3002", page: "reading", icon: "activity", defaultWidth: "md" },
  { type: "ai-reading-review", title: "AI \u9605\u8BFB\u590D\u76D8", description: "AI \u590D\u76D8\u80FD\u529B\u5360\u4F4D\u5361\u3002", page: "reading", icon: "sparkles", defaultWidth: "md" },
  { type: "today-workout", title: "\u4ECA\u65E5\u8BAD\u7EC3", description: "\u4ECA\u5929\u7684\u8BAD\u7EC3\u5B89\u6392\u548C\u5B8C\u6210\u72B6\u6001\u3002", page: "fitness", icon: "dumbbell", defaultWidth: "md" },
  { type: "workout-plan", title: "\u8BAD\u7EC3\u8BA1\u5212", description: "\u8FD1\u671F\u8BAD\u7EC3\u8BA1\u5212\u3002", page: "fitness", icon: "clipboard-list", defaultWidth: "md" },
  { type: "fitness-checkin", title: "\u672C\u5468\u5065\u8EAB\u6253\u5361", description: "\u8BAD\u7EC3\u3001\u996E\u6C34\u3001\u7761\u7720\u548C\u6062\u590D\u6253\u5361\u3002", page: "fitness", icon: "calendar-check", defaultWidth: "md" },
  { type: "body-measurements", title: "\u4F53\u91CD\u4E0E\u56F4\u5EA6\u8BB0\u5F55", description: "\u4F53\u91CD\u3001BMI \u548C\u8EAB\u4F53\u56F4\u5EA6\u53D8\u5316\u3002", page: "fitness", icon: "ruler", defaultWidth: "md" },
  { type: "cardio-strength-plan", title: "\u6709\u6C27 / \u529B\u91CF\u5B89\u6392", description: "\u5E73\u8861\u6709\u6C27\u548C\u529B\u91CF\u8BAD\u7EC3\u3002", page: "fitness", icon: "heart-pulse", defaultWidth: "md" },
  { type: "water-sleep-habits", title: "\u996E\u6C34\u4E0E\u7761\u7720\u4E60\u60EF", description: "\u6062\u590D\u76F8\u5173\u4E60\u60EF\u8BB0\u5F55\u3002", page: "fitness", icon: "moon", defaultWidth: "md" },
  { type: "fitness-stats", title: "\u70ED\u91CF\u6D88\u8017\u4E0E\u8FD0\u52A8\u65F6\u957F", description: "\u7EDF\u8BA1\u672C\u5468\u8FD0\u52A8\u91CF\u3002", page: "fitness", icon: "flame", defaultWidth: "md" },
  { type: "workout-log", title: "\u8FD0\u52A8\u65E5\u5FD7", description: "\u6700\u8FD1\u5B8C\u6210\u7684\u8BAD\u7EC3\u8BB0\u5F55\u3002", page: "fitness", icon: "notebook-text", defaultWidth: "md" },
  { type: "fitness-goals", title: "\u5065\u8EAB\u76EE\u6807\u8FDB\u5EA6", description: "\u8FFD\u8E2A\u5065\u8EAB\u76EE\u6807\u5B8C\u6210\u5EA6\u3002", page: "fitness", icon: "target", defaultWidth: "md" },
  { type: "health-reminders", title: "\u5065\u5EB7\u63D0\u9192", description: "\u6062\u590D\u3001\u70ED\u8EAB\u548C\u4F11\u606F\u63D0\u9192\u3002", page: "fitness", icon: "bell-ring", defaultWidth: "md" },
  { type: "fitness-heatmap", title: "\u6708\u5EA6\u8FD0\u52A8\u70ED\u529B\u56FE", description: "\u6309\u65E5\u5C55\u793A\u8FD0\u52A8\u6D3B\u8DC3\u5EA6\u3002", page: "fitness", icon: "activity", defaultWidth: "md" },
  { type: "monthly-budget", title: "\u672C\u6708\u9884\u7B97", description: "\u9884\u7B97\u3001\u652F\u51FA\u548C\u5269\u4F59\u989D\u5EA6\u3002", page: "finance", icon: "wallet-cards", defaultWidth: "md" },
  { type: "expense-categories", title: "\u652F\u51FA\u5206\u7C7B", description: "\u672C\u6708\u5206\u7C7B\u652F\u51FA\u5360\u6BD4\u3002", page: "finance", icon: "chart-pie", defaultWidth: "md" },
  { type: "account-overview", title: "\u8D26\u6237\u603B\u89C8", description: "\u4E2A\u4EBA\u8D26\u6237\u4F59\u989D\u6982\u89C8\u3002", page: "finance", icon: "landmark", defaultWidth: "md" },
  { type: "saving-goals", title: "\u50A8\u84C4\u76EE\u6807", description: "\u50A8\u84C4\u76EE\u6807\u8FDB\u5EA6\u3002", page: "finance", icon: "piggy-bank", defaultWidth: "md" },
  { type: "bill-reminders", title: "\u8D26\u5355\u63D0\u9192", description: "\u5373\u5C06\u5230\u671F\u7684\u8D26\u5355\u3002", page: "finance", icon: "receipt", defaultWidth: "md" },
  { type: "finance-checkin", title: "\u672C\u5468\u7406\u8D22\u6253\u5361", description: "\u8BB0\u8D26\u3001\u590D\u76D8\u548C\u9884\u7B97\u68C0\u67E5\u3002", page: "finance", icon: "calendar-check", defaultWidth: "md" },
  { type: "income-expense-trend", title: "\u6536\u652F\u8D8B\u52BF", description: "\u672C\u6708\u6536\u5165\u548C\u652F\u51FA\u8D70\u52BF\u3002", page: "finance", icon: "line-chart", defaultWidth: "md" },
  { type: "finance-todos", title: "\u672C\u6708\u8BB0\u8D26\u5F85\u529E", description: "\u672C\u6708\u8D22\u52A1\u5F85\u529E\u4E8B\u9879\u3002", page: "finance", icon: "list-checks", defaultWidth: "md" },
  { type: "investment-watch", title: "\u6295\u8D44\u89C2\u5BDF", description: "\u4E2A\u4EBA\u6295\u8D44\u89C2\u5BDF\uFF0C\u4E0D\u6267\u884C\u4EA4\u6613\u3002", page: "finance", icon: "candlestick-chart", defaultWidth: "md" },
  { type: "expense-heatmap", title: "\u6708\u5EA6\u652F\u51FA\u70ED\u529B\u56FE", description: "\u6309\u65E5\u5C55\u793A\u652F\u51FA\u5BC6\u5EA6\u3002", page: "finance", icon: "activity", defaultWidth: "md" },
  { type: "yearly-goals", title: "\u5E74\u5EA6\u76EE\u6807", description: "\u5168\u5E74\u76EE\u6807\u548C\u5B8C\u6210\u8FDB\u5EA6\u3002", page: "goals", icon: "flag", defaultWidth: "md" },
  { type: "quarterly-okr", title: "\u5B63\u5EA6 OKR", description: "\u5B63\u5EA6 Objective \u4E0E KR\u3002", page: "goals", icon: "target", defaultWidth: "md" },
  { type: "monthly-key-results", title: "\u6708\u5EA6\u5173\u952E\u7ED3\u679C", description: "\u672C\u6708\u9700\u8981\u63A8\u8FDB\u7684 KR\u3002", page: "goals", icon: "list-checks", defaultWidth: "md" },
  { type: "goal-breakdown", title: "\u76EE\u6807\u62C6\u89E3", description: "\u628A\u76EE\u6807\u62C6\u5230\u884C\u52A8\u5C42\u3002", page: "goals", icon: "git-branch", defaultWidth: "md" },
  { type: "milestone-timeline", title: "\u91CC\u7A0B\u7891\u65F6\u95F4\u7EBF", description: "\u76EE\u6807\u91CC\u7A0B\u7891\u548C\u65E5\u671F\u3002", page: "goals", icon: "milestone", defaultWidth: "md" },
  { type: "priority-matrix", title: "\u4F18\u5148\u7EA7\u77E9\u9635", description: "\u91CD\u8981\u7D27\u6025\u56DB\u8C61\u9650\u3002", page: "goals", icon: "layout-dashboard", defaultWidth: "md" },
  { type: "goals-checkin", title: "\u672C\u5468\u76EE\u6807\u6253\u5361", description: "\u76EE\u6807\u63A8\u8FDB\u4E60\u60EF\u6253\u5361\u3002", page: "goals", icon: "calendar-check", defaultWidth: "md" },
  { type: "review-checklist", title: "\u590D\u76D8\u6E05\u5355", description: "\u5468\u590D\u76D8\u548C\u6708\u590D\u76D8\u4E8B\u9879\u3002", page: "goals", icon: "clipboard-check", defaultWidth: "md" },
  { type: "risks-blockers", title: "\u98CE\u9669\u4E0E\u963B\u788D", description: "\u8BC6\u522B\u98CE\u9669\u5E76\u8BB0\u5F55\u89E3\u51B3\u65B9\u6848\u3002", page: "goals", icon: "triangle-alert", defaultWidth: "md" },
  { type: "long-term-progress", title: "\u957F\u671F\u8FDB\u5C55", description: "\u76EE\u6807\u957F\u671F\u8D8B\u52BF\u548C\u5B8C\u6210\u7387\u3002", page: "goals", icon: "trending-up", defaultWidth: "md" },
  { type: "enabled-modules-overview", title: "\u5DF2\u542F\u7528\u6A21\u5757\u6982\u89C8", description: "\u7EDF\u8BA1\u5F53\u524D\u9875\u9762\u548C\u6574\u4E2A\u5DE5\u4F5C\u53F0\u542F\u7528\u6A21\u5757\u3002", page: "modules", icon: "panel-top", defaultWidth: "md" },
  { type: "home-layout-manager", title: "\u9996\u9875\u5E03\u5C40\u7BA1\u7406", description: "\u5207\u6362\u9ED8\u8BA4\u3001\u7D27\u51D1\u6216\u6781\u7B80\u5E03\u5C40\u3002", page: "modules", icon: "layout-template", defaultWidth: "md" },
  { type: "module-settings", title: "\u6A21\u5757\u5F00\u5173\u4E0E\u6392\u5E8F", description: "\u7BA1\u7406\u6A21\u5757\u542F\u7528\u72B6\u6001\u548C\u62D6\u52A8\u6392\u5E8F\u3002", page: "modules", icon: "sliders-horizontal", defaultWidth: "full" },
  { type: "banner-background-settings", title: "Banner \u80CC\u666F\u8BBE\u7F6E", description: "\u8BBE\u7F6E\u63A8\u8350\u58C1\u7EB8\u3001\u672C\u5730\u56FE\u7247\u3001\u7EAF\u8272\u80CC\u666F\u548C\u906E\u7F69\u3002", page: "modules", icon: "image", defaultWidth: "md" },
  { type: "calendar-widget-settings", title: "\u65E5\u5386\u7EC4\u4EF6\u8BBE\u7F6E", description: "\u63A7\u5236\u65E5\u671F\u6807\u8BB0\u3001\u5468\u8D77\u59CB\u65E5\u548C\u9AD8\u4EAE\u989C\u8272\u3002", page: "modules", icon: "calendar-days", defaultWidth: "md" },
  { type: "apex-habit-settings", title: "Apex \u6253\u5361\u6A21\u5757\u8BBE\u7F6E", description: "\u7BA1\u7406\u9996\u9875\u6253\u5361\u5C55\u793A\u548C\u81EA\u5B9A\u4E49\u6253\u5361\u9879\u76EE\u3002", page: "modules", icon: "calendar-check", defaultWidth: "md" },
  { type: "quick-action-settings", title: "\u5FEB\u6377\u64CD\u4F5C\u914D\u7F6E", description: "\u63A7\u5236\u5185\u7F6E\u5FEB\u6377\u64CD\u4F5C\u548C\u81EA\u5B9A\u4E49\u5165\u53E3\u3002", page: "modules", icon: "zap", defaultWidth: "md" },
  { type: "theme-color-settings", title: "\u4E3B\u9898\u4E0E\u914D\u8272", description: "\u8C03\u6574 CSS variables\u3001\u5706\u89D2\u548C\u5B57\u4F53\u5927\u5C0F\u3002", page: "modules", icon: "palette", defaultWidth: "md" },
  { type: "data-source-status", title: "\u6570\u636E\u6E90", description: "\u67E5\u770B\u7B14\u8BB0\u3001\u4EFB\u52A1\u3001\u65E5\u5386\u3001\u4E60\u60EF\u3001\u9605\u8BFB\u548C\u79D1\u7814\u662F\u5426\u542F\u7528\u3002", page: "modules", icon: "database", defaultWidth: "md" }
];
function createSection(page, type, title, order, width = "md", height = "md") {
  return {
    id: `${page}-${type}`,
    page,
    type,
    title,
    order,
    enabled: true,
    width,
    height
  };
}
var DEFAULT_DATA = {
  currentPage: "overview",
  sections: [
    {
      id: "overview-weekly-completion",
      page: "overview",
      type: "weekly-completion",
      title: "\u672C\u5468\u5B8C\u6210\u7387",
      order: 10,
      enabled: true,
      width: "sm",
      height: "sm"
    },
    {
      id: "overview-pending-tasks",
      page: "overview",
      type: "pending-tasks",
      title: "\u5F85\u529E\u4EFB\u52A1",
      order: 20,
      enabled: true,
      width: "sm",
      height: "sm"
    },
    {
      id: "overview-today-focus-stat",
      page: "overview",
      type: "today-focus-stat",
      title: "\u4ECA\u65E5\u4E13\u6CE8",
      order: 30,
      enabled: true,
      width: "sm",
      height: "sm"
    },
    {
      id: "overview-checkin-streak",
      page: "overview",
      type: "checkin-streak",
      title: "\u8FDE\u7EED\u6253\u5361",
      order: 40,
      enabled: true,
      width: "sm",
      height: "sm"
    },
    {
      id: "overview-today-focus",
      page: "overview",
      type: "today-focus",
      title: "\u4ECA\u65E5\u7126\u70B9",
      order: 50,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "overview-habit-overview",
      page: "overview",
      type: "habit-overview",
      title: "\u6253\u5361\u603B\u89C8",
      order: 60,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "overview-monthly-progress",
      page: "overview",
      type: "monthly-progress",
      title: "\u672C\u6708\u8FDB\u5EA6",
      order: 70,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "overview-monthly-calendar",
      page: "overview",
      type: "monthly-calendar",
      title: "\u6708\u5EA6\u65E5\u5386",
      order: 80,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "overview-recent-notes",
      page: "overview",
      type: "recent-notes",
      title: "\u6700\u8FD1\u7B14\u8BB0",
      order: 90,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "overview-quick-actions",
      page: "overview",
      type: "quick-actions",
      title: "\u5FEB\u6377\u64CD\u4F5C",
      order: 100,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "overview-contribution-heatmap",
      page: "overview",
      type: "contribution-heatmap",
      title: "\u5E74\u5EA6\u8D21\u732E\u56FE",
      order: 110,
      enabled: true,
      width: "full",
      height: "sm"
    },
    {
      id: "research-projects",
      page: "research",
      type: "research-projects",
      title: "\u7814\u7A76\u9879\u76EE\u603B\u89C8",
      order: 10,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "research-reading-queue",
      page: "research",
      type: "reading-queue",
      title: "\u8BBA\u6587\u9605\u8BFB\u961F\u5217",
      order: 20,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "research-checkin",
      page: "research",
      type: "research-checkin",
      title: "\u672C\u5468\u79D1\u7814\u6253\u5361",
      order: 30,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "research-experiment-plan",
      page: "research",
      type: "experiment-plan",
      title: "\u5B9E\u9A8C\u8BA1\u5212",
      order: 40,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "research-experiment-records",
      page: "research",
      type: "experiment-records",
      title: "\u5B9E\u9A8C\u8BB0\u5F55",
      order: 50,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "research-data-analysis",
      page: "research",
      type: "data-analysis-tasks",
      title: "\u6570\u636E\u5206\u6790\u4EFB\u52A1",
      order: 60,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "research-literature-notes",
      page: "research",
      type: "literature-notes",
      title: "\u6587\u732E\u7B14\u8BB0",
      order: 70,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "research-timeline",
      page: "research",
      type: "research-timeline",
      title: "\u4F1A\u8BAE / DDL \u65F6\u95F4\u7EBF",
      order: 80,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "research-memo",
      page: "research",
      type: "research-memo",
      title: "\u79D1\u7814\u7075\u611F Memo",
      order: 90,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "reading-current",
      page: "reading",
      type: "current-reading",
      title: "\u5F53\u524D\u9605\u8BFB",
      order: 10,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "reading-bookshelf",
      page: "reading",
      type: "bookshelf",
      title: "\u4E66\u67B6 Bookshelf",
      order: 20,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "reading-plan",
      page: "reading",
      type: "reading-plan",
      title: "\u9605\u8BFB\u8BA1\u5212",
      order: 30,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "reading-checkin",
      page: "reading",
      type: "reading-checkin",
      title: "\u672C\u5468\u9605\u8BFB\u6253\u5361",
      order: 40,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "reading-notes",
      page: "reading",
      type: "reading-notes",
      title: "\u9605\u8BFB\u7B14\u8BB0",
      order: 50,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "reading-quotes",
      page: "reading",
      type: "reading-quotes",
      title: "\u91D1\u53E5\u6458\u5F55",
      order: 60,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "reading-finished",
      page: "reading",
      type: "finished-books",
      title: "\u5DF2\u8BFB\u6E05\u5355",
      order: 70,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "reading-wishlist",
      page: "reading",
      type: "wishlist-books",
      title: "\u60F3\u8BFB\u6E05\u5355",
      order: 80,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "reading-stats",
      page: "reading",
      type: "reading-stats",
      title: "\u9605\u8BFB\u8FDB\u5EA6\u7EDF\u8BA1",
      order: 90,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "reading-heatmap",
      page: "reading",
      type: "reading-heatmap",
      title: "\u6708\u5EA6\u9605\u8BFB\u70ED\u529B\u56FE",
      order: 100,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "reading-ai-review",
      page: "reading",
      type: "ai-reading-review",
      title: "AI \u9605\u8BFB\u590D\u76D8",
      order: 110,
      enabled: true,
      width: "md",
      height: "md"
    },
    createSection("fitness", "today-workout", "\u4ECA\u65E5\u8BAD\u7EC3", 10),
    createSection("fitness", "workout-plan", "\u8BAD\u7EC3\u8BA1\u5212", 20),
    createSection("fitness", "fitness-checkin", "\u672C\u5468\u5065\u8EAB\u6253\u5361", 30),
    createSection("fitness", "body-measurements", "\u4F53\u91CD\u4E0E\u56F4\u5EA6\u8BB0\u5F55", 40),
    createSection("fitness", "cardio-strength-plan", "\u6709\u6C27 / \u529B\u91CF\u5B89\u6392", 50),
    createSection("fitness", "water-sleep-habits", "\u996E\u6C34\u4E0E\u7761\u7720\u4E60\u60EF", 60),
    createSection("fitness", "fitness-stats", "\u70ED\u91CF\u6D88\u8017\u4E0E\u8FD0\u52A8\u65F6\u957F", 70),
    createSection("fitness", "workout-log", "\u8FD0\u52A8\u65E5\u5FD7", 80),
    createSection("fitness", "fitness-goals", "\u5065\u8EAB\u76EE\u6807\u8FDB\u5EA6", 90),
    createSection("fitness", "health-reminders", "\u5065\u5EB7\u63D0\u9192", 100),
    createSection("fitness", "fitness-heatmap", "\u6708\u5EA6\u8FD0\u52A8\u70ED\u529B\u56FE", 110),
    createSection("finance", "monthly-budget", "\u672C\u6708\u9884\u7B97", 10),
    createSection("finance", "expense-categories", "\u652F\u51FA\u5206\u7C7B", 20),
    createSection("finance", "account-overview", "\u8D26\u6237\u603B\u89C8", 30),
    createSection("finance", "saving-goals", "\u50A8\u84C4\u76EE\u6807", 40),
    createSection("finance", "bill-reminders", "\u8D26\u5355\u63D0\u9192", 50),
    createSection("finance", "finance-checkin", "\u672C\u5468\u7406\u8D22\u6253\u5361", 60),
    createSection("finance", "income-expense-trend", "\u6536\u652F\u8D8B\u52BF", 70),
    createSection("finance", "finance-todos", "\u672C\u6708\u8BB0\u8D26\u5F85\u529E", 80),
    createSection("finance", "investment-watch", "\u6295\u8D44\u89C2\u5BDF", 90),
    createSection("finance", "expense-heatmap", "\u6708\u5EA6\u652F\u51FA\u70ED\u529B\u56FE", 100),
    createSection("goals", "yearly-goals", "\u5E74\u5EA6\u76EE\u6807", 10),
    createSection("goals", "quarterly-okr", "\u5B63\u5EA6 OKR", 20),
    createSection("goals", "monthly-key-results", "\u6708\u5EA6\u5173\u952E\u7ED3\u679C", 30),
    createSection("goals", "goal-breakdown", "\u76EE\u6807\u62C6\u89E3", 40),
    createSection("goals", "milestone-timeline", "\u91CC\u7A0B\u7891\u65F6\u95F4\u7EBF", 50),
    createSection("goals", "priority-matrix", "\u4F18\u5148\u7EA7\u77E9\u9635", 60),
    createSection("goals", "goals-checkin", "\u672C\u5468\u76EE\u6807\u6253\u5361", 70),
    createSection("goals", "review-checklist", "\u590D\u76D8\u6E05\u5355", 80),
    createSection("goals", "risks-blockers", "\u98CE\u9669\u4E0E\u963B\u788D", 90),
    createSection("goals", "long-term-progress", "\u957F\u671F\u8FDB\u5C55", 100),
    createSection("modules", "enabled-modules-overview", "\u5DF2\u542F\u7528\u6A21\u5757\u6982\u89C8", 10),
    createSection("modules", "home-layout-manager", "\u9996\u9875\u5E03\u5C40\u7BA1\u7406", 20),
    createSection("modules", "module-settings", "\u6A21\u5757\u5F00\u5173\u4E0E\u6392\u5E8F", 30, "full", "lg"),
    createSection("modules", "banner-background-settings", "Banner \u80CC\u666F\u8BBE\u7F6E", 40),
    createSection("modules", "calendar-widget-settings", "\u65E5\u5386\u7EC4\u4EF6\u8BBE\u7F6E", 50),
    createSection("modules", "apex-habit-settings", "Apex \u6253\u5361\u6A21\u5757\u8BBE\u7F6E", 60),
    createSection("modules", "quick-action-settings", "\u5FEB\u6377\u64CD\u4F5C\u914D\u7F6E", 70),
    createSection("modules", "theme-color-settings", "\u4E3B\u9898\u4E0E\u914D\u8272", 80),
    createSection("modules", "data-source-status", "\u6570\u636E\u6E90", 90)
  ],
  banner: {
    message: "\u8981\u6210\u529F\uFF0C\u5148\u53D1\u75AF\uFF0C\u4E0D\u987E\u4E00\u5207\u5411\u524D\u51B2\u3002",
    background: "pink-paper",
    backgroundPosition: "center",
    overlay: true,
    opacity: 0.88
  },
  habits: {},
  todayFocusTasks: [
    { id: "focus-research", label: "\u63A8\u8FDB\u8BBA\u6587\u6216\u5B9E\u9A8C\u8BB0\u5F55", category: "\u79D1\u7814", completed: true },
    { id: "focus-reading", label: "\u9605\u8BFB\u5E76\u6574\u7406\u4E00\u6761\u7B14\u8BB0", category: "\u9605\u8BFB", completed: true },
    { id: "focus-fitness", label: "\u5B8C\u6210\u4ECA\u65E5\u8BAD\u7EC3\u6216\u62C9\u4F38", category: "\u5065\u8EAB", completed: false },
    { id: "focus-finance", label: "\u68C0\u67E5\u9884\u7B97\u4E0E\u8D26\u5355", category: "\u7406\u8D22", completed: false },
    { id: "focus-personal", label: "\u590D\u76D8\u4ECA\u5929\u7684\u8BA1\u5212", category: "\u4E2A\u4EBA", completed: false }
  ],
  researchProjects: [
    {
      id: "project-medical-vlm",
      title: "\u591A\u6A21\u6001\u5927\u6A21\u578B\u5728\u533B\u5B66\u5F71\u50CF\u4E2D\u7684\u5E94\u7528",
      status: "\u8FDB\u884C\u4E2D",
      progress: 70,
      startDate: "2026-08-01",
      deadline: "2026-10-30",
      tags: ["VLM", "\u533B\u5B66\u5F71\u50CF"]
    },
    {
      id: "project-graph-drug",
      title: "\u57FA\u4E8E\u56FE\u795E\u7ECF\u7F51\u7EDC\u7684\u836F\u7269\u91CD\u5B9A\u4F4D\u7814\u7A76",
      status: "\u64B0\u5199\u4E2D",
      progress: 40,
      startDate: "2026-07-15",
      deadline: "2026-11-15",
      tags: ["GNN", "Drug"]
    },
    {
      id: "project-single-cell",
      title: "\u5355\u7EC6\u80DE\u65F6\u7A7A\u8F6C\u5F55\u7EC4\u6570\u636E\u5206\u6790\u65B9\u6CD5",
      status: "\u5DF2\u5B8C\u6210",
      progress: 100,
      startDate: "2026-06-10",
      deadline: "2026-09-01",
      tags: ["scRNA-seq"]
    }
  ],
  researchPapers: [
    { id: "paper-survey-llm", title: "A Survey on Multimodal LLMs", venue: "CVPR", year: 2024, status: "\u8FDB\u884C\u4E2D", readingProgress: 62 },
    { id: "paper-single-cell", title: "Single-cell foundation models", venue: "Nature", year: 2024, status: "\u672A\u5F00\u59CB", readingProgress: 0 },
    { id: "paper-gnn-drug", title: "Graph Neural Networks for Drug Discovery", venue: "ICLR", year: 2024, status: "\u8FDB\u884C\u4E2D", readingProgress: 45 }
  ],
  experimentPlans: [
    { id: "exp-cell-drug", title: "\u7EC6\u80DE\u7CFB\u4F20\u4EE3\u4E0E\u836F\u7269\u5904\u7406", date: "2026-09-14", status: "\u8FDB\u884C\u4E2D" },
    { id: "exp-western", title: "Western Blot \u5B9E\u9A8C", date: "2026-09-16", status: "\u672A\u5F00\u59CB" },
    { id: "exp-flow", title: "\u6D41\u5F0F\u7EC6\u80DE\u672F FACS", date: "2026-09-18", status: "\u8BA1\u5212\u4E2D" }
  ],
  experimentRecords: [
    { id: "record-drug", title: "\u7EC6\u80DE\u836F\u7269\u5904\u7406\u8BB0\u5F55", date: "2026-09-13", status: "\u5DF2\u5B8C\u6210" },
    { id: "record-wb", title: "WB \u6761\u5E26\u7ED3\u679C", date: "2026-09-12", status: "\u5DF2\u5B8C\u6210" },
    { id: "record-flow", title: "\u6D41\u5F0F\u6570\u636E\u5206\u6790", date: "2026-09-10", status: "\u8FDB\u884C\u4E2D" }
  ],
  researchDeadlines: [
    { id: "ddl-report", title: "\u7EC4\u4F1A\u5B9E\u9A8C\u8FDB\u5C55\u6C47\u62A5", date: "2026-09-18", type: "\u7EC4\u4F1A", priority: "medium" },
    { id: "ddl-dataset", title: "\u84DD\u91D1\u7533\u8BF7\u4E66\u63D0\u4EA4", date: "2026-10-05", type: "DDL", priority: "high" },
    { id: "ddl-neurips", title: "NeurIPS \u6295\u7A3F\u622A\u6B62", date: "2026-10-09", type: "DDL", priority: "high" }
  ],
  researchMemos: [
    "\u628A\u56FE\u795E\u7ECF\u7F51\u7EDC\u548C\u533B\u5B66\u5F71\u50CF\u9884\u8BAD\u7EC3\u7ED3\u5408\uFF0C\u770B\u770B\u80FD\u5426\u6539\u5584\u5C0F\u6837\u672C\u573A\u666F\u3002",
    "\u5BF9\u6BD4\u5B66\u4E60\u6846\u67B6\u4E5F\u8BB8\u53EF\u4EE5\u4F5C\u4E3A\u8BBA\u6587\u65B9\u6CD5\u90E8\u5206\u7684\u4E3B\u7EBF\u3002",
    "\u7EC4\u4F1A\u524D\u6574\u7406\u4E00\u6B21\u5931\u8D25\u5B9E\u9A8C\uFF0C\u53EF\u80FD\u6BD4\u53EA\u5C55\u793A\u6210\u529F\u7ED3\u679C\u66F4\u6709\u4EF7\u503C\u3002"
  ],
  books: [
    {
      id: "book-deep-work",
      title: "\u6DF1\u5EA6\u5DE5\u4F5C",
      author: "Cal Newport",
      totalPages: 304,
      currentPage: 188,
      status: "\u5728\u8BFB",
      rating: 4,
      startDate: "2026-09-01",
      tags: ["\u6548\u7387", "\u4E13\u6CE8"]
    },
    {
      id: "book-atomic-habits",
      title: "Atomic Habits",
      author: "James Clear",
      totalPages: 320,
      currentPage: 320,
      status: "\u5DF2\u8BFB",
      rating: 5,
      startDate: "2026-08-01",
      finishDate: "2026-08-21",
      tags: ["\u4E60\u60EF"]
    },
    {
      id: "book-thinking",
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      totalPages: 499,
      currentPage: 0,
      status: "\u60F3\u8BFB",
      tags: ["\u5FC3\u7406\u5B66"]
    }
  ],
  readingQuotes: [
    { id: "quote-1", text: "\u4E13\u6CE8\u4E0D\u662F\u62D2\u7EDD\u4E16\u754C\uFF0C\u800C\u662F\u9009\u62E9\u6B64\u523B\u771F\u6B63\u91CD\u8981\u7684\u4E8B\u3002", source: "\u6DF1\u5EA6\u5DE5\u4F5C" },
    { id: "quote-2", text: "\u5FAE\u5C0F\u4E60\u60EF\u4F1A\u5728\u65F6\u95F4\u91CC\u590D\u5229\u3002", source: "Atomic Habits" }
  ],
  workouts: [
    { id: "workout-1", date: "2026-09-14", type: "\u529B\u91CF", duration: 45, calories: 320, completed: false, note: "\u4E0B\u80A2\u529B\u91CF + \u6838\u5FC3" },
    { id: "workout-2", date: "2026-09-12", type: "\u6709\u6C27", duration: 35, calories: 260, completed: true, note: "\u692D\u5706\u673A\u4E2D\u7B49\u5F3A\u5EA6" },
    { id: "workout-3", date: "2026-09-10", type: "\u62C9\u4F38", duration: 20, calories: 80, completed: true, note: "\u80A9\u9888\u548C\u9ACB\u90E8\u653E\u677E" }
  ],
  bodyMeasurements: [
    { date: "2026-09-01", weight: 58.8, bmi: 21.6, waist: 70, chest: 84, hip: 91 },
    { date: "2026-09-08", weight: 58.2, bmi: 21.4, waist: 69, chest: 84, hip: 90 },
    { date: "2026-09-14", weight: 57.9, bmi: 21.3, waist: 68, chest: 84, hip: 90 }
  ],
  fitnessGoals: [
    { id: "fitness-goal-weight", title: "\u7A33\u5B9A\u4F53\u91CD", current: 57.9, target: 56.5, unit: "kg", deadline: "2026-12-31" },
    { id: "fitness-goal-cardio", title: "\u672C\u6708\u6709\u6C27", current: 210, target: 600, unit: "min", deadline: "2026-09-30" },
    { id: "fitness-goal-strength", title: "\u529B\u91CF\u8BAD\u7EC3", current: 6, target: 12, unit: "\u6B21", deadline: "2026-09-30" }
  ],
  transactions: [
    { id: "tx-1", type: "income", category: "\u5DE5\u8D44", amount: 12e3, date: "2026-09-01", note: "\u6708\u6536\u5165" },
    { id: "tx-2", type: "expense", category: "\u9910\u996E", amount: 860, date: "2026-09-03", note: "\u5916\u98DF\u4E0E\u5496\u5561" },
    { id: "tx-3", type: "expense", category: "\u4EA4\u901A", amount: 220, date: "2026-09-05", note: "\u901A\u52E4" },
    { id: "tx-4", type: "expense", category: "\u5B66\u4E60", amount: 399, date: "2026-09-08", note: "\u8BFE\u7A0B\u8BA2\u9605" },
    { id: "tx-5", type: "expense", category: "\u8D2D\u7269", amount: 520, date: "2026-09-12", note: "\u65E5\u7528\u54C1" }
  ],
  budgets: [
    { id: "budget-food", category: "\u9910\u996E", amount: 1800, spent: 860 },
    { id: "budget-transport", category: "\u4EA4\u901A", amount: 500, spent: 220 },
    { id: "budget-study", category: "\u5B66\u4E60", amount: 800, spent: 399 },
    { id: "budget-shopping", category: "\u8D2D\u7269", amount: 1200, spent: 520 }
  ],
  accounts: [
    { id: "account-cash", name: "\u73B0\u91D1\u94B1\u5305", type: "\u73B0\u91D1", balance: 800 },
    { id: "account-card", name: "\u50A8\u84C4\u5361", type: "\u50A8\u84C4\u5361", balance: 32600 },
    { id: "account-invest", name: "\u57FA\u91D1\u8D26\u6237", type: "\u6295\u8D44\u8D26\u6237", balance: 18800 }
  ],
  savingGoals: [
    { id: "saving-emergency", title: "\u5E94\u6025\u91D1", current: 18e3, target: 3e4, deadline: "2026-12-31" },
    { id: "saving-travel", title: "\u65C5\u884C\u57FA\u91D1", current: 3600, target: 8e3, deadline: "2026-10-31" }
  ],
  bills: [
    { id: "bill-rent", title: "\u623F\u79DF", amount: 3e3, dueDate: "2026-09-20", paid: false },
    { id: "bill-phone", title: "\u624B\u673A\u5957\u9910", amount: 89, dueDate: "2026-09-18", paid: false },
    { id: "bill-card", title: "\u4FE1\u7528\u5361\u8FD8\u6B3E", amount: 1260, dueDate: "2026-09-25", paid: false }
  ],
  goals: [
    {
      id: "goal-research",
      title: "\u5B8C\u6210\u4E00\u7BC7\u9AD8\u8D28\u91CF\u79D1\u7814\u8BBA\u6587",
      description: "\u5B8C\u6210\u5B9E\u9A8C\u3001\u64B0\u5199\u521D\u7A3F\u5E76\u8FDB\u5165\u6295\u7A3F\u51C6\u5907\u3002",
      category: "\u79D1\u7814",
      progress: 62,
      deadline: "2026-12-20",
      status: "\u8FDB\u884C\u4E2D"
    },
    {
      id: "goal-health",
      title: "\u5EFA\u7ACB\u7A33\u5B9A\u5065\u5EB7\u8282\u594F",
      description: "\u6BCF\u5468\u8BAD\u7EC3\u3001\u89C4\u5F8B\u7761\u7720\u3001\u4FDD\u6301\u80FD\u91CF\u3002",
      category: "\u5065\u5EB7",
      progress: 48,
      deadline: "2026-12-31",
      status: "\u8FDB\u884C\u4E2D"
    },
    {
      id: "goal-finance",
      title: "\u5B8C\u6210\u5E74\u5EA6\u50A8\u84C4\u8BA1\u5212",
      description: "\u63A7\u5236\u9884\u7B97\uFF0C\u63D0\u9AD8\u50A8\u84C4\u7387\u3002",
      category: "\u7406\u8D22",
      progress: 55,
      deadline: "2026-12-31",
      status: "\u8FDB\u884C\u4E2D"
    }
  ],
  objectives: [
    { id: "obj-q3-research", title: "Q3 \u5B8C\u6210\u8BBA\u6587\u65B9\u6CD5\u548C\u5B9E\u9A8C\u95ED\u73AF", quarter: "2026 Q3", progress: 72 },
    { id: "obj-q4-life", title: "Q4 \u5EFA\u7ACB\u53EF\u6301\u7EED\u5DE5\u4F5C\u751F\u6D3B\u7CFB\u7EDF", quarter: "2026 Q4", progress: 35 }
  ],
  keyResults: [
    { id: "kr-exp", objectiveId: "obj-q3-research", title: "\u5B8C\u6210 3 \u7EC4\u5173\u952E\u5B9E\u9A8C", progress: 80, completed: false },
    { id: "kr-draft", objectiveId: "obj-q3-research", title: "\u8BBA\u6587\u521D\u7A3F\u8FBE\u5230\u53EF\u5185\u5BA1\u72B6\u6001", progress: 60, completed: false },
    { id: "kr-training", objectiveId: "obj-q4-life", title: "\u8FDE\u7EED 8 \u5468\u8BAD\u7EC3\u4E0D\u5C11\u4E8E 3 \u6B21", progress: 45, completed: false }
  ],
  milestones: [
    { id: "mile-exp", goalId: "goal-research", title: "\u5B8C\u6210\u6838\u5FC3\u5B9E\u9A8C", date: "2026-09-30", status: "\u8FDB\u884C\u4E2D" },
    { id: "mile-draft", goalId: "goal-research", title: "\u5B8C\u6210\u8BBA\u6587\u521D\u7A3F", date: "2026-10-20", status: "\u672A\u5F00\u59CB" },
    { id: "mile-review", goalId: "goal-research", title: "\u5B8C\u6210\u7EC4\u5185\u53CD\u9988\u4FEE\u6539", date: "2026-11-10", status: "\u672A\u5F00\u59CB" }
  ],
  risks: [
    { id: "risk-time", title: "\u5B9E\u9A8C\u6392\u671F\u88AB\u538B\u7F29", level: "high", solution: "\u63D0\u524D\u9884\u7EA6\u8BBE\u5907\uFF0C\u51C6\u5907\u66FF\u4EE3\u5B9E\u9A8C\u65B9\u6848\u3002" },
    { id: "risk-energy", title: "\u7761\u7720\u4E0D\u8DB3\u5F71\u54CD\u6267\u884C", level: "medium", solution: "\u665A\u95F4\u56FA\u5B9A\u6536\u5C3E\uFF0C\u51CF\u5C11\u4E34\u7761\u524D\u8F93\u5165\u3002" }
  ],
  calendarSettings: {
    showNoteMarkers: true,
    showTaskMarkers: true,
    showEventMarkers: true,
    weekStartsOn: "monday",
    highlightColor: "#f23b8d"
  },
  apexHabitSettings: {
    showOnOverview: true,
    showStreak: true,
    showWeeklyProgress: true,
    customHabits: [
      { id: "custom-reading", label: "\u9605\u8BFB", enabled: true, order: 10 },
      { id: "custom-fitness", label: "\u5065\u8EAB", enabled: true, order: 20 },
      { id: "custom-finance", label: "\u7406\u8D22", enabled: true, order: 30 },
      { id: "custom-writing", label: "\u5199\u4F5C", enabled: true, order: 40 },
      { id: "custom-study", label: "\u5B66\u4E60", enabled: true, order: 50 }
    ]
  },
  quickActions: [
    { id: "quick-new-note", label: "\u65B0\u5EFA\u7B14\u8BB0", enabled: true, order: 10, type: "new-note" },
    { id: "quick-daily-note", label: "\u6253\u5F00\u4ECA\u65E5\u7B14\u8BB0", enabled: true, order: 20, type: "daily-note" },
    { id: "quick-search", label: "\u641C\u7D22", enabled: true, order: 30, type: "search" },
    { id: "quick-templates", label: "\u6253\u5F00\u6A21\u677F", enabled: true, order: 40, type: "templates" },
    { id: "quick-graph", label: "\u6253\u5F00\u56FE\u8C31", enabled: true, order: 50, type: "graph" }
  ],
  theme: {
    cuteBg: "#ffd1e2",
    cuteCard: "#fff7df",
    cutePrimary: "#f23b8d",
    cuteSecondary: "#ffd166",
    cuteText: "#4a1f19",
    cuteBorder: "rgba(242, 59, 141, 0.26)",
    cuteRadius: 18,
    cuteShadow: "0 10px 28px rgba(190, 66, 120, 0.16)",
    cardOpacity: 0.86,
    textureStrength: 0.5,
    fontSize: 14
  },
  userSettings: {
    showLeftSidebar: true,
    weekStartsOn: "monday",
    dateFormat: "YYYY-MM-DD",
    overviewLayout: "default"
  }
};
var DashboardStore = class {
  constructor(loadPluginData, savePluginData) {
    this.loadPluginData = loadPluginData;
    this.savePluginData = savePluginData;
    this.data = structuredClone(DEFAULT_DATA);
  }
  async load() {
    const savedData = await this.loadPluginData();
    this.data = this.mergeWithDefaults(savedData);
  }
  async save() {
    await this.savePluginData(this.data);
  }
  getData() {
    return this.data;
  }
  getPages() {
    return DASHBOARD_PAGES;
  }
  getAvailableModules(page) {
    return AVAILABLE_MODULES.filter((module2) => module2.page === "all" || module2.page === page);
  }
  getAllSections() {
    return [...this.data.sections].sort((left, right) => {
      if (left.page === right.page) return left.order - right.order;
      return left.page.localeCompare(right.page);
    });
  }
  getSectionsForPage(page) {
    return this.data.sections.filter((section) => section.page === page && section.enabled).sort((left, right) => left.order - right.order);
  }
  async setCurrentPage(page) {
    this.data.currentPage = page;
    await this.save();
  }
  async addSection(page, moduleType) {
    var _a, _b, _c;
    const moduleDefinition = this.getAvailableModules(page).find((module2) => module2.type === moduleType);
    const existingSections = this.data.sections.filter((section2) => section2.page === page);
    const nextOrder = existingSections.reduce((max, section2) => Math.max(max, section2.order), 0) + 10;
    const section = {
      id: `${page}-${moduleType}-${Date.now()}`,
      page,
      type: moduleType,
      title: (_a = moduleDefinition == null ? void 0 : moduleDefinition.title) != null ? _a : moduleType,
      order: nextOrder,
      enabled: true,
      width: (_b = moduleDefinition == null ? void 0 : moduleDefinition.defaultWidth) != null ? _b : "md",
      height: (_c = moduleDefinition == null ? void 0 : moduleDefinition.defaultHeight) != null ? _c : "sm",
      config: {}
    };
    this.data.sections.push(section);
    await this.save();
    return section;
  }
  async removeSection(sectionId) {
    this.data.sections = this.data.sections.filter((section) => section.id !== sectionId);
    await this.save();
  }
  async setSectionEnabled(sectionId, enabled) {
    const section = this.data.sections.find((item) => item.id === sectionId);
    if (!section) return;
    section.enabled = enabled;
    await this.save();
  }
  async reorderSections(page, orderedIds) {
    const orderMap = new Map(orderedIds.map((id, index) => [id, (index + 1) * 10]));
    this.data.sections.forEach((section) => {
      const order = orderMap.get(section.id);
      if (section.page === page && order !== void 0) {
        section.order = order;
      }
    });
    await this.save();
  }
  async setOverviewLayout(layout) {
    this.data.userSettings.overviewLayout = layout;
    await this.save();
  }
  async updateBanner(updates) {
    this.data.banner = { ...this.data.banner, ...updates };
    await this.save();
  }
  async updateBannerMessage(message) {
    this.data.banner.message = message;
    await this.save();
  }
  async updateCalendarSettings(updates) {
    this.data.calendarSettings = { ...this.data.calendarSettings, ...updates };
    this.data.userSettings.weekStartsOn = this.data.calendarSettings.weekStartsOn;
    await this.save();
  }
  async updateTheme(updates) {
    this.data.theme = { ...this.data.theme, ...updates };
    await this.save();
  }
  async updateApexHabitSettings(updates) {
    this.data.apexHabitSettings = { ...this.data.apexHabitSettings, ...updates };
    if (updates.showOnOverview !== void 0) {
      this.setSectionEnabledInMemory("overview-habit-overview", updates.showOnOverview);
    }
    if (updates.showStreak !== void 0) {
      this.setSectionEnabledInMemory("overview-checkin-streak", updates.showStreak);
    }
    if (updates.showWeeklyProgress !== void 0) {
      this.setSectionEnabledInMemory("overview-weekly-completion", updates.showWeeklyProgress);
    }
    await this.save();
  }
  async addCustomHabit(label) {
    const nextOrder = this.data.apexHabitSettings.customHabits.reduce((max, habit) => Math.max(max, habit.order), 0) + 10;
    this.data.apexHabitSettings.customHabits.push({
      id: `habit-${Date.now()}`,
      label,
      enabled: true,
      order: nextOrder
    });
    await this.save();
  }
  async updateCustomHabit(habitId, updates) {
    const habit = this.data.apexHabitSettings.customHabits.find((item) => item.id === habitId);
    if (!habit) return;
    Object.assign(habit, updates);
    await this.save();
  }
  async deleteCustomHabit(habitId) {
    this.data.apexHabitSettings.customHabits = this.data.apexHabitSettings.customHabits.filter((item) => item.id !== habitId);
    await this.save();
  }
  async reorderCustomHabits(orderedIds) {
    const orderMap = new Map(orderedIds.map((id, index) => [id, (index + 1) * 10]));
    this.data.apexHabitSettings.customHabits.forEach((habit) => {
      const order = orderMap.get(habit.id);
      if (order !== void 0) habit.order = order;
    });
    await this.save();
  }
  async updateQuickAction(actionId, updates) {
    const action = this.data.quickActions.find((item) => item.id === actionId);
    if (!action) return;
    Object.assign(action, updates);
    await this.save();
  }
  async addQuickAction(label, target) {
    const nextOrder = this.data.quickActions.reduce((max, action) => Math.max(max, action.order), 0) + 10;
    this.data.quickActions.push({
      id: `quick-${Date.now()}`,
      label,
      enabled: true,
      order: nextOrder,
      type: "custom",
      target
    });
    await this.save();
  }
  exportData() {
    return JSON.stringify(this.data, null, 2);
  }
  async importData(data) {
    this.data = this.mergeWithDefaults(data);
    await this.save();
  }
  async resetToDefaults() {
    this.data = structuredClone(DEFAULT_DATA);
    await this.save();
  }
  getTodayFocusTasks() {
    return this.data.todayFocusTasks;
  }
  async toggleTodayFocusTask(taskId) {
    const task = this.data.todayFocusTasks.find((item) => item.id === taskId);
    if (!task) {
      return;
    }
    task.completed = !task.completed;
    await this.save();
  }
  async addTodayFocusTask(label, category = "\u4E2A\u4EBA") {
    this.data.todayFocusTasks.push({
      id: `focus-${Date.now()}`,
      label,
      category,
      completed: false
    });
    await this.save();
  }
  getResearchProjects() {
    return this.data.researchProjects;
  }
  getResearchPapers() {
    return this.data.researchPapers;
  }
  getExperimentPlans() {
    return this.data.experimentPlans;
  }
  getExperimentRecords() {
    return this.data.experimentRecords;
  }
  getResearchDeadlines() {
    return this.data.researchDeadlines;
  }
  getResearchMemos() {
    return this.data.researchMemos;
  }
  getBooks() {
    return this.data.books;
  }
  getReadingQuotes() {
    return this.data.readingQuotes;
  }
  async addBook(book) {
    this.data.books.push(book);
    await this.save();
  }
  async updateBookPage(bookId, currentPage) {
    const book = this.data.books.find((item) => item.id === bookId);
    if (!book) {
      return;
    }
    book.currentPage = Math.max(0, Math.min(currentPage, book.totalPages));
    await this.save();
  }
  async completeBook(bookId) {
    const book = this.data.books.find((item) => item.id === bookId);
    if (!book) {
      return;
    }
    book.status = "\u5DF2\u8BFB";
    book.currentPage = book.totalPages;
    book.finishDate = formatDateKey(/* @__PURE__ */ new Date());
    await this.save();
  }
  getWorkouts() {
    return this.data.workouts;
  }
  getBodyMeasurements() {
    return this.data.bodyMeasurements;
  }
  getFitnessGoals() {
    return this.data.fitnessGoals;
  }
  getTransactions() {
    return this.data.transactions;
  }
  getBudgets() {
    return this.data.budgets;
  }
  getAccounts() {
    return this.data.accounts;
  }
  getSavingGoals() {
    return this.data.savingGoals;
  }
  getBills() {
    return this.data.bills;
  }
  getGoals() {
    return this.data.goals;
  }
  getObjectives() {
    return this.data.objectives;
  }
  getKeyResults() {
    return this.data.keyResults;
  }
  getMilestones() {
    return this.data.milestones;
  }
  getRisks() {
    return this.data.risks;
  }
  async addGoal(goal) {
    this.data.goals.push(goal);
    await this.save();
  }
  async updateGoal(goalId, updates) {
    const goal = this.data.goals.find((item) => item.id === goalId);
    if (!goal) {
      return;
    }
    Object.assign(goal, updates);
    goal.progress = Math.max(0, Math.min(100, goal.progress));
    await this.save();
  }
  async updateGoalProgress(goalId, progress) {
    await this.updateGoal(goalId, { progress });
  }
  async addKeyResult(keyResult) {
    this.data.keyResults.push(keyResult);
    await this.save();
  }
  async toggleKeyResult(keyResultId) {
    const keyResult = this.data.keyResults.find((item) => item.id === keyResultId);
    if (!keyResult) {
      return;
    }
    keyResult.completed = !keyResult.completed;
    keyResult.progress = keyResult.completed ? 100 : Math.min(keyResult.progress, 90);
    await this.save();
  }
  async addMilestone(milestone) {
    this.data.milestones.push(milestone);
    await this.save();
  }
  async addRisk(risk) {
    this.data.risks.push(risk);
    await this.save();
  }
  async addTransaction(transaction) {
    this.data.transactions.push(transaction);
    if (transaction.type === "expense") {
      const budget = this.data.budgets.find((item) => item.category === transaction.category);
      if (budget) {
        budget.spent += transaction.amount;
      }
    }
    await this.save();
  }
  getMonthlyIncome() {
    return this.getCurrentMonthTransactions().filter((transaction) => transaction.type === "income").reduce((sum, transaction) => sum + transaction.amount, 0);
  }
  getMonthlyExpense() {
    return this.getCurrentMonthTransactions().filter((transaction) => transaction.type === "expense").reduce((sum, transaction) => sum + transaction.amount, 0);
  }
  getBudgetRemaining() {
    return this.data.budgets.reduce((sum, budget) => sum + Math.max(0, budget.amount - budget.spent), 0);
  }
  getSavingRate() {
    const income = this.getMonthlyIncome();
    if (income <= 0) {
      return 0;
    }
    return Math.round((income - this.getMonthlyExpense()) / income * 100);
  }
  getCurrentMonthTransactions() {
    const now = /* @__PURE__ */ new Date();
    const prefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    return this.data.transactions.filter((transaction) => transaction.date.startsWith(prefix));
  }
  setSectionEnabledInMemory(sectionId, enabled) {
    const section = this.data.sections.find((item) => item.id === sectionId);
    if (section) {
      section.enabled = enabled;
    }
  }
  isHabitCompleted(habitId, date) {
    var _a;
    return Boolean((_a = this.data.habits[habitId]) == null ? void 0 : _a[date]);
  }
  async toggleHabit(habitId, date) {
    var _a;
    this.data.habits[habitId] = (_a = this.data.habits[habitId]) != null ? _a : {};
    this.data.habits[habitId][date] = !this.data.habits[habitId][date];
    await this.save();
  }
  getWeeklyCompletionRate() {
    const habitCompletion = [];
    this.getCurrentWeekDates().forEach((date) => {
      DEFAULT_HABITS.forEach((habit) => {
        habitCompletion.push(this.isHabitCompleted(habit.id, date));
      });
    });
    const focusCompletion = this.data.todayFocusTasks.map((task) => task.completed);
    const items = [...habitCompletion, ...focusCompletion];
    const done = items.filter(Boolean).length;
    return items.length === 0 ? 0 : Math.round(done / items.length * 100);
  }
  getPendingTaskCount() {
    return this.data.todayFocusTasks.filter((task) => !task.completed).length;
  }
  getCheckinStreakDays() {
    const today = /* @__PURE__ */ new Date();
    let streak = 0;
    for (let offset = 0; offset < 366; offset += 1) {
      const date = new Date(today);
      date.setDate(today.getDate() - offset);
      const key = formatDateKey(date);
      const allDone = DEFAULT_HABITS.every((habit) => this.isHabitCompleted(habit.id, key));
      if (!allDone) {
        break;
      }
      streak += 1;
    }
    return streak;
  }
  getCurrentWeekDates() {
    const today = /* @__PURE__ */ new Date();
    const day = today.getDay();
    const mondayOffset = day === 0 ? -6 : 1 - day;
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);
      return formatDateKey(date);
    });
  }
  mergeWithDefaults(savedData) {
    var _a, _b;
    if (!savedData || typeof savedData !== "object") {
      return structuredClone(DEFAULT_DATA);
    }
    const partial = savedData;
    const sections = Array.isArray(partial.sections) ? this.migrateSections(partial.sections) : structuredClone(DEFAULT_DATA.sections);
    return {
      ...structuredClone(DEFAULT_DATA),
      ...partial,
      banner: {
        ...DEFAULT_DATA.banner,
        ...partial.banner
      },
      userSettings: {
        ...DEFAULT_DATA.userSettings,
        ...partial.userSettings
      },
      sections,
      habits: (_a = partial.habits) != null ? _a : {},
      todayFocusTasks: Array.isArray(partial.todayFocusTasks) ? partial.todayFocusTasks : structuredClone(DEFAULT_DATA.todayFocusTasks),
      researchProjects: Array.isArray(partial.researchProjects) ? partial.researchProjects : structuredClone(DEFAULT_DATA.researchProjects),
      researchPapers: Array.isArray(partial.researchPapers) ? partial.researchPapers : structuredClone(DEFAULT_DATA.researchPapers),
      experimentPlans: Array.isArray(partial.experimentPlans) ? partial.experimentPlans : structuredClone(DEFAULT_DATA.experimentPlans),
      experimentRecords: Array.isArray(partial.experimentRecords) ? partial.experimentRecords : structuredClone(DEFAULT_DATA.experimentRecords),
      researchDeadlines: Array.isArray(partial.researchDeadlines) ? partial.researchDeadlines : structuredClone(DEFAULT_DATA.researchDeadlines),
      researchMemos: Array.isArray(partial.researchMemos) ? partial.researchMemos : structuredClone(DEFAULT_DATA.researchMemos),
      books: Array.isArray(partial.books) ? partial.books : structuredClone(DEFAULT_DATA.books),
      readingQuotes: Array.isArray(partial.readingQuotes) ? partial.readingQuotes : structuredClone(DEFAULT_DATA.readingQuotes),
      workouts: Array.isArray(partial.workouts) ? partial.workouts : structuredClone(DEFAULT_DATA.workouts),
      bodyMeasurements: Array.isArray(partial.bodyMeasurements) ? partial.bodyMeasurements : structuredClone(DEFAULT_DATA.bodyMeasurements),
      fitnessGoals: Array.isArray(partial.fitnessGoals) ? partial.fitnessGoals : structuredClone(DEFAULT_DATA.fitnessGoals),
      transactions: Array.isArray(partial.transactions) ? partial.transactions : structuredClone(DEFAULT_DATA.transactions),
      budgets: Array.isArray(partial.budgets) ? partial.budgets : structuredClone(DEFAULT_DATA.budgets),
      accounts: Array.isArray(partial.accounts) ? partial.accounts : structuredClone(DEFAULT_DATA.accounts),
      savingGoals: Array.isArray(partial.savingGoals) ? partial.savingGoals : structuredClone(DEFAULT_DATA.savingGoals),
      bills: Array.isArray(partial.bills) ? partial.bills : structuredClone(DEFAULT_DATA.bills),
      goals: Array.isArray(partial.goals) ? partial.goals : structuredClone(DEFAULT_DATA.goals),
      objectives: Array.isArray(partial.objectives) ? partial.objectives : structuredClone(DEFAULT_DATA.objectives),
      keyResults: Array.isArray(partial.keyResults) ? partial.keyResults : structuredClone(DEFAULT_DATA.keyResults),
      milestones: Array.isArray(partial.milestones) ? partial.milestones : structuredClone(DEFAULT_DATA.milestones),
      risks: Array.isArray(partial.risks) ? partial.risks : structuredClone(DEFAULT_DATA.risks),
      calendarSettings: {
        ...DEFAULT_DATA.calendarSettings,
        ...partial.calendarSettings
      },
      apexHabitSettings: {
        ...DEFAULT_DATA.apexHabitSettings,
        ...partial.apexHabitSettings,
        customHabits: Array.isArray((_b = partial.apexHabitSettings) == null ? void 0 : _b.customHabits) ? partial.apexHabitSettings.customHabits : structuredClone(DEFAULT_DATA.apexHabitSettings.customHabits)
      },
      quickActions: Array.isArray(partial.quickActions) ? partial.quickActions : structuredClone(DEFAULT_DATA.quickActions),
      theme: {
        ...DEFAULT_DATA.theme,
        ...partial.theme
      }
    };
  }
  migrateSections(sections) {
    const pages = ["overview", "research", "reading", "fitness", "finance", "goals", "modules"];
    const migrated = [...sections];
    pages.forEach((page) => {
      if (!sections.some((section) => section.page === page)) {
        migrated.push(...structuredClone(DEFAULT_DATA.sections.filter((section) => section.page === page)));
      }
    });
    const hasNewOverviewLayout = migrated.some((section) => section.type === "weekly-completion");
    if (!hasNewOverviewLayout) {
      return [
        ...structuredClone(DEFAULT_DATA.sections.filter((section) => section.page === "overview")),
        ...migrated.filter((section) => section.page !== "overview")
      ];
    }
    return migrated;
  }
};
var DEFAULT_HABITS = [
  { id: "reading", label: "\u9605\u8BFB" },
  { id: "fitness", label: "\u5065\u8EAB" },
  { id: "finance", label: "\u7406\u8D22" },
  { id: "writing", label: "\u5199\u4F5C" },
  { id: "study", label: "\u5B66\u4E60" }
];
var RESEARCH_HABITS = [
  { id: "research-reading-paper", label: "\u9605\u8BFB\u8BBA\u6587" },
  { id: "research-experiment", label: "\u5B9E\u9A8C" },
  { id: "research-writing", label: "\u5199\u4F5C" },
  { id: "research-data", label: "\u6574\u7406\u6570\u636E" },
  { id: "research-meeting", label: "\u7EC4\u4F1A\u51C6\u5907" }
];
var READING_HABITS = [
  { id: "reading-pages", label: "\u8BFB\u4E66" },
  { id: "reading-note", label: "\u5199\u7B14\u8BB0" },
  { id: "reading-quote", label: "\u6458\u5F55" },
  { id: "reading-review", label: "\u590D\u76D8" },
  { id: "reading-plan", label: "\u8BA1\u5212" }
];
var FITNESS_HABITS = [
  { id: "fitness-workout", label: "\u8BAD\u7EC3" },
  { id: "fitness-water", label: "\u996E\u6C34" },
  { id: "fitness-sleep", label: "\u7761\u7720" },
  { id: "fitness-stretch", label: "\u62C9\u4F38" },
  { id: "fitness-recovery", label: "\u6062\u590D" }
];
var FINANCE_HABITS = [
  { id: "finance-record", label: "\u8BB0\u8D26" },
  { id: "finance-budget", label: "\u9884\u7B97" },
  { id: "finance-review", label: "\u590D\u76D8" },
  { id: "finance-save", label: "\u50A8\u84C4" },
  { id: "finance-invest", label: "\u89C2\u5BDF" }
];
var GOAL_HABITS = [
  { id: "goals-plan", label: "\u8BA1\u5212" },
  { id: "goals-action", label: "\u884C\u52A8" },
  { id: "goals-review", label: "\u590D\u76D8" },
  { id: "goals-focus", label: "\u805A\u7126" },
  { id: "goals-adjust", label: "\u8C03\u6574" }
];
function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// src/settings/WorkbenchSettingTab.ts
var import_obsidian = require("obsidian");
var WorkbenchSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Cute Obsidian Workbench" });
    new import_obsidian.Setting(containerEl).setName("Banner \u6587\u6848").setDesc("\u663E\u793A\u5728\u5DE5\u4F5C\u53F0\u9876\u90E8 Banner \u4E2D\u7684\u6FC0\u52B1\u6587\u6848\u3002").addText((text) => {
      text.setValue(this.plugin.store.getData().banner.message).onChange(async (value) => {
        await this.plugin.store.updateBannerMessage(value.trim() || "\u8981\u6210\u529F\uFF0C\u5148\u53D1\u75AF\uFF0C\u4E0D\u987E\u4E00\u5207\u5411\u524D\u51B2\u3002");
      });
    });
  }
};

// src/views/WorkbenchView.ts
var import_obsidian33 = require("obsidian");

// src/core/DashboardRouter.ts
var ROUTE_CHANGED_EVENT = "route-changed";
var DashboardRouter = class {
  constructor(eventBus, currentPage) {
    this.eventBus = eventBus;
    this.currentPage = currentPage;
  }
  getCurrentPage() {
    return this.currentPage;
  }
  navigate(page) {
    if (this.currentPage === page) {
      return;
    }
    this.currentPage = page;
    this.eventBus.emit(ROUTE_CHANGED_EVENT, page);
  }
};

// src/core/EventBus.ts
var EventBus = class {
  constructor() {
    this.handlers = /* @__PURE__ */ new Map();
  }
  on(eventName, handler) {
    var _a;
    const eventHandlers = (_a = this.handlers.get(eventName)) != null ? _a : /* @__PURE__ */ new Set();
    eventHandlers.add(handler);
    this.handlers.set(eventName, eventHandlers);
    return () => this.off(eventName, handler);
  }
  off(eventName, handler) {
    var _a;
    (_a = this.handlers.get(eventName)) == null ? void 0 : _a.delete(handler);
  }
  emit(eventName, payload) {
    var _a;
    (_a = this.handlers.get(eventName)) == null ? void 0 : _a.forEach((handler) => handler(payload));
  }
  clear() {
    this.handlers.clear();
  }
};

// src/components/Sidebar.ts
var import_obsidian2 = require("obsidian");
var Sidebar = class {
  constructor(app, currentPage, actions) {
    this.app = app;
    this.currentPage = currentPage;
    this.actions = actions;
  }
  render(container) {
    const sidebar = container.createDiv({ cls: "cow-sidebar" });
    const profile = sidebar.createDiv({ cls: "cow-profile" });
    profile.createDiv({ cls: "cow-profile-avatar" }).createDiv({ cls: "cow-mini-dog" });
    profile.createEl("h2", { text: "\u6211\u7684\u5DE5\u4F5C\u53F0" });
    profile.createEl("p", { text: "\u8BB0\u5F55\u3001\u601D\u8003\u3001\u6210\u957F\u3001\u53EF\u7231\u5411\u524D" });
    this.clockEl = sidebar.createDiv({ cls: "cow-clock" });
    this.updateClock();
    this.timer = window.setInterval(() => this.updateClock(), 3e4);
    this.renderMiniCalendar(sidebar);
    this.renderActions(sidebar);
  }
  destroy() {
    if (this.timer) {
      window.clearInterval(this.timer);
    }
  }
  renderMiniCalendar(container) {
    const calendar = container.createDiv({ cls: "cow-mini-calendar" });
    const now = /* @__PURE__ */ new Date();
    calendar.createEl("h3", {
      text: `${now.getFullYear()}\u5E74${now.getMonth() + 1}\u6708`
    });
    const weekdays = ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"];
    const grid = calendar.createDiv({ cls: "cow-mini-calendar-grid" });
    weekdays.forEach((weekday) => grid.createSpan({ cls: "cow-weekday", text: weekday }));
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    for (let index = 0; index < firstDay.getDay(); index += 1) {
      grid.createSpan({ cls: "cow-empty-day" });
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      grid.createSpan({
        cls: `cow-day ${day === now.getDate() ? "is-today" : ""}`,
        text: String(day)
      });
    }
  }
  renderActions(container) {
    const actions = container.createDiv({ cls: "cow-sidebar-actions" });
    this.actions.forEach((action) => {
      const button = actions.createEl("button", {
        cls: "cow-sidebar-action",
        attr: { type: "button" }
      });
      (0, import_obsidian2.setIcon)(button.createSpan(), action.icon);
      button.createSpan({ text: action.label });
      button.addEventListener("click", action.onClick);
    });
    const fileHint = actions.createDiv({ cls: "cow-file-shortcut" });
    (0, import_obsidian2.setIcon)(fileHint.createSpan(), "folder-open");
    fileHint.createSpan({ text: `\u6587\u4EF6\u5E93\uFF1A${this.app.vault.getName()}` });
  }
  updateClock() {
    if (!this.clockEl) {
      return;
    }
    const now = /* @__PURE__ */ new Date();
    const dateText = now.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short"
    });
    const timeText = now.toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit"
    });
    this.clockEl.empty();
    this.clockEl.createEl("p", { text: dateText });
    this.clockEl.createEl("strong", { text: timeText });
    this.clockEl.createEl("span", { text: this.currentPage });
  }
};

// src/components/TopBanner.ts
var import_obsidian3 = require("obsidian");
var TopBanner = class {
  constructor(getData, onChangeBackground) {
    this.getData = getData;
    this.onChangeBackground = onChangeBackground;
  }
  render(container) {
    const banner = container.createDiv({ cls: "cow-top-banner" });
    const data = this.getData();
    banner.addClass(`cow-banner-bg-${data.banner.background}`);
    banner.style.backgroundPosition = data.banner.backgroundPosition;
    banner.style.opacity = String(data.banner.opacity);
    if (data.banner.imageDataUrl) {
      banner.style.backgroundImage = `linear-gradient(rgba(255, 224, 237, ${data.banner.overlay ? "0.45" : "0"}), rgba(255, 247, 223, ${data.banner.overlay ? "0.45" : "0"})), url("${data.banner.imageDataUrl}")`;
      banner.style.backgroundSize = "cover";
    }
    const dog = banner.createDiv({ cls: "cow-banner-dog", attr: { "aria-hidden": "true" } });
    dog.createDiv({ cls: "cow-dog-face" });
    const copy = banner.createDiv({ cls: "cow-banner-copy" });
    copy.createEl("p", { cls: "cow-banner-kicker", text: "\u51B2\u9E2D\uFF01" });
    copy.createEl("h2", { text: data.banner.message });
    copy.createEl("p", { text: "\u628A\u60F3\u6CD5\u53D8\u6210\u884C\u52A8\uFF0C\u8BA9\u6BCF\u4E00\u5929\u90FD\u66F4\u9760\u8FD1\u7406\u60F3\u7684\u81EA\u5DF1\u3002" });
    const button = banner.createEl("button", {
      cls: "cow-banner-button",
      attr: { type: "button" }
    });
    (0, import_obsidian3.setIcon)(button.createSpan(), "image");
    button.createSpan({ text: "\u66F4\u6362\u80CC\u666F" });
    button.addEventListener("click", this.onChangeBackground);
  }
};

// src/components/TopNavigation.ts
var import_obsidian4 = require("obsidian");
var TopNavigation = class {
  constructor(pages, getCurrentPage, onNavigate) {
    this.pages = pages;
    this.getCurrentPage = getCurrentPage;
    this.onNavigate = onNavigate;
  }
  render(container) {
    const nav = container.createDiv({ cls: "cow-top-nav" });
    this.pages.forEach((page) => {
      const button = nav.createEl("button", {
        cls: `cow-nav-button ${this.getCurrentPage() === page.id ? "is-active" : ""}`,
        attr: { type: "button", "aria-label": page.label }
      });
      const icon = button.createSpan({ cls: "cow-nav-icon" });
      (0, import_obsidian4.setIcon)(icon, page.icon);
      button.createSpan({ text: page.label });
      button.addEventListener("click", () => this.onNavigate(page.id));
    });
  }
};

// src/components/DashboardSection.ts
var import_obsidian30 = require("obsidian");

// src/components/overview/ContributionHeatmapSection.ts
var ContributionHeatmapSection = class {
  constructor(app) {
    this.app = app;
  }
  render(container) {
    var _a;
    const root = container.createDiv({ cls: "cow-contribution" });
    const counts = this.getDailyCreateCounts();
    for (let month = 0; month < 12; month += 1) {
      const monthEl = root.createDiv({ cls: "cow-contribution-month" });
      monthEl.createEl("strong", { text: `${month + 1}\u6708` });
      const grid = monthEl.createDiv({ cls: "cow-contribution-grid" });
      const days = new Date((/* @__PURE__ */ new Date()).getFullYear(), month + 1, 0).getDate();
      for (let day = 1; day <= days; day += 1) {
        const key = `${(/* @__PURE__ */ new Date()).getFullYear()}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const count = (_a = counts.get(key)) != null ? _a : 0;
        grid.createSpan({ cls: `level-${Math.min(4, count)}` });
      }
    }
  }
  getDailyCreateCounts() {
    const counts = /* @__PURE__ */ new Map();
    this.app.vault.getMarkdownFiles().forEach((file) => {
      var _a;
      const date = new Date(file.stat.ctime);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      counts.set(key, ((_a = counts.get(key)) != null ? _a : 0) + 1);
    });
    return counts;
  }
};

// src/components/overview/HabitOverviewSection.ts
var import_obsidian5 = require("obsidian");
var HabitOverviewSection = class {
  constructor(store, onDataChanged) {
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const dates = this.store.getCurrentWeekDates();
    const table = container.createDiv({ cls: "cow-habit-overview" });
    const header = table.createDiv({ cls: "cow-habit-overview-row cow-habit-overview-header" });
    header.createSpan();
    ["\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u65E5"].forEach((day) => header.createSpan({ text: day }));
    DEFAULT_HABITS.forEach((habit) => {
      const row = table.createDiv({ cls: "cow-habit-overview-row" });
      row.createSpan({ text: habit.label });
      dates.forEach((date) => {
        const completed = this.store.isHabitCompleted(habit.id, date);
        const button = row.createEl("button", {
          cls: `cow-habit-dot ${completed ? "is-done" : ""}`,
          attr: { type: "button", "aria-label": `${habit.label} ${date}` }
        });
        if (completed) {
          (0, import_obsidian5.setIcon)(button, "check");
        }
        button.addEventListener("click", async () => {
          await this.store.toggleHabit(habit.id, date);
          this.onDataChanged();
        });
      });
    });
    const today = formatDateKey(/* @__PURE__ */ new Date());
    table.createEl("p", { text: `\u4ECA\u5929\uFF1A${today}` });
  }
};

// src/components/overview/MonthlyCalendarSection.ts
var import_obsidian6 = require("obsidian");
var MonthlyCalendarSection = class {
  constructor(app, store) {
    this.app = app;
    this.store = store;
    this.displayDate = /* @__PURE__ */ new Date();
  }
  render(container) {
    this.draw(container);
  }
  draw(container) {
    container.empty();
    const root = container.createDiv({ cls: "cow-month-calendar" });
    const header = root.createDiv({ cls: "cow-month-calendar-header" });
    const previous = header.createEl("button", { attr: { type: "button", "aria-label": "\u4E0A\u4E00\u6708" } });
    (0, import_obsidian6.setIcon)(previous, "chevron-left");
    previous.addEventListener("click", () => {
      this.displayDate = new Date(this.displayDate.getFullYear(), this.displayDate.getMonth() - 1, 1);
      this.draw(container);
    });
    header.createEl("strong", { text: `${this.displayDate.getFullYear()}\u5E74${this.displayDate.getMonth() + 1}\u6708` });
    const today = header.createEl("button", { cls: "cow-calendar-today", text: "\u4ECA\u5929", attr: { type: "button" } });
    today.addEventListener("click", () => {
      this.displayDate = /* @__PURE__ */ new Date();
      this.draw(container);
    });
    const next = header.createEl("button", { attr: { type: "button", "aria-label": "\u4E0B\u4E00\u6708" } });
    (0, import_obsidian6.setIcon)(next, "chevron-right");
    next.addEventListener("click", () => {
      this.displayDate = new Date(this.displayDate.getFullYear(), this.displayDate.getMonth() + 1, 1);
      this.draw(container);
    });
    const grid = root.createDiv({ cls: "cow-month-calendar-grid" });
    const settings = this.store.getData().calendarSettings;
    const weekdays = settings.weekStartsOn === "monday" ? ["\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u65E5"] : ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"];
    weekdays.forEach((weekday) => grid.createSpan({ cls: "cow-weekday", text: weekday }));
    const firstDay = new Date(this.displayDate.getFullYear(), this.displayDate.getMonth(), 1);
    const offset = settings.weekStartsOn === "monday" ? (firstDay.getDay() + 6) % 7 : firstDay.getDay();
    const daysInMonth = new Date(this.displayDate.getFullYear(), this.displayDate.getMonth() + 1, 0).getDate();
    const todayKey = formatDateKey(/* @__PURE__ */ new Date());
    const markdownDates = new Set(
      this.app.vault.getMarkdownFiles().map((file) => formatDateKey(new Date(file.stat.ctime)))
    );
    for (let index = 0; index < offset; index += 1) {
      grid.createSpan({ cls: "cow-calendar-empty" });
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = new Date(this.displayDate.getFullYear(), this.displayDate.getMonth(), day);
      const dateKey = formatDateKey(date);
      const button = grid.createEl("button", {
        cls: `cow-calendar-day ${dateKey === todayKey ? "is-today" : ""}`,
        attr: { type: "button", "aria-label": dateKey }
      });
      if (dateKey === todayKey) {
        button.style.borderColor = settings.highlightColor;
        button.style.background = `${settings.highlightColor}44`;
      }
      button.createSpan({ text: String(day) });
      const dots = button.createDiv({ cls: "cow-calendar-dots" });
      if (settings.showNoteMarkers && markdownDates.has(dateKey)) dots.createSpan({ cls: "is-note" });
      if (settings.showTaskMarkers && day % 5 === 0) dots.createSpan({ cls: "is-task" });
      if (settings.showEventMarkers && day % 9 === 0) dots.createSpan({ cls: "is-event" });
      button.addEventListener("click", () => new import_obsidian6.Notice(`\u5DF2\u9009\u62E9 ${dateKey}`));
    }
  }
};

// src/components/overview/MonthlyProgressSection.ts
var PROGRESS_ITEMS = [
  { label: "\u79D1\u7814", value: 70, className: "is-pink" },
  { label: "\u9605\u8BFB", value: 60, className: "is-yellow" },
  { label: "\u5065\u8EAB", value: 40, className: "is-green" },
  { label: "\u7406\u8D22", value: 75, className: "is-blue" },
  { label: "\u76EE\u6807\u7BA1\u7406", value: 50, className: "is-purple" }
];
var MonthlyProgressSection = class {
  render(container) {
    PROGRESS_ITEMS.forEach((item) => {
      const row = container.createDiv({ cls: "cow-month-progress-row" });
      row.createSpan({ text: item.label });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: `cow-month-progress-fill ${item.className}`, attr: { style: `width: ${item.value}%` } });
      row.createSpan({ text: `${item.value}%` });
    });
  }
};

// src/components/overview/OverviewStatsSection.ts
var import_obsidian7 = require("obsidian");
var OverviewStatsSection = class {
  constructor(store, type) {
    this.store = store;
    this.type = type;
  }
  render(container) {
    const stat = this.getStat();
    const wrapper = container.createDiv({ cls: "cow-overview-stat" });
    const art = wrapper.createDiv({ cls: `cow-stat-art ${stat.className}` });
    (0, import_obsidian7.setIcon)(art.createSpan(), stat.icon);
    const body = wrapper.createDiv();
    body.createEl("strong", { text: stat.value });
    body.createEl("span", { text: stat.caption });
    const meter = body.createDiv({ cls: "cow-stat-meter" });
    meter.createDiv({ attr: { style: `width: ${stat.meter}%` } });
  }
  getStat() {
    if (this.type === "weekly-completion") {
      const rate = this.store.getWeeklyCompletionRate();
      return {
        value: `${rate}%`,
        caption: "\u518D\u63A5\u518D\u5389\uFF01",
        icon: "badge-percent",
        meter: rate,
        className: "is-green"
      };
    }
    if (this.type === "pending-tasks") {
      const pending = this.store.getPendingTaskCount();
      const total = this.store.getTodayFocusTasks().length;
      const doneRate = total === 0 ? 100 : Math.round((total - pending) / total * 100);
      return {
        value: `${total - pending}/${total}`,
        caption: pending === 0 ? "\u4ECA\u65E5\u6E05\u7A7A\u5566" : `\u8FD8\u6709${pending}\u9879\u5F85\u5B8C\u6210`,
        icon: "clipboard-list",
        meter: doneRate,
        className: "is-pink"
      };
    }
    if (this.type === "today-focus-stat") {
      return {
        value: "3.6h",
        caption: "\u4E13\u6CE8\u8BA9\u5E73\u51E1\u53D8\u4F1F\u5927",
        icon: "headphones",
        meter: 72,
        className: "is-blue"
      };
    }
    return {
      value: `${this.store.getCheckinStreakDays()}\u5929`,
      caption: "\u771F\u68D2\uFF01\u7EE7\u7EED\u4FDD\u6301",
      icon: "flame",
      meter: Math.min(100, this.store.getCheckinStreakDays() * 10),
      className: "is-yellow"
    };
  }
};

// src/components/overview/QuickActionsSection.ts
var import_obsidian8 = require("obsidian");
var QuickActionsSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const actions = this.store.getData().quickActions.filter((action) => action.enabled).sort((a, b) => a.order - b.order);
    const grid = container.createDiv({ cls: "cow-quick-action-grid" });
    actions.forEach((action) => {
      const button = grid.createEl("button", { attr: { type: "button" } });
      (0, import_obsidian8.setIcon)(button.createSpan(), this.getIcon(action));
      button.createSpan({ text: action.label });
      button.addEventListener("click", () => void this.runAction(action));
    });
  }
  async runAction(action) {
    switch (action.type) {
      case "new-note":
        await this.createNote();
        break;
      case "daily-note":
        await this.openDailyNote();
        break;
      case "search":
        this.executeCommand("global-search:open");
        break;
      case "templates":
        this.executeCommand("templates:insert-template");
        break;
      case "graph":
        this.executeCommand("graph:open");
        break;
      default:
        new import_obsidian8.Notice(action.target ? `\u81EA\u5B9A\u4E49\u5165\u53E3\uFF1A${action.target}` : "\u81EA\u5B9A\u4E49\u5FEB\u6377\u5165\u53E3\u5DF2\u89E6\u53D1\u3002");
    }
  }
  getIcon(action) {
    const icons = {
      "new-note": "file-plus",
      "daily-note": "calendar-days",
      search: "search",
      templates: "layout-template",
      graph: "git-fork",
      custom: "star"
    };
    return icons[action.type];
  }
  executeCommand(commandId) {
    var _a;
    const didRun = (_a = this.app.commands) == null ? void 0 : _a.executeCommandById(commandId);
    if (!didRun) {
      new import_obsidian8.Notice("\u8FD9\u4E2A Obsidian \u547D\u4EE4\u6682\u65F6\u4E0D\u53EF\u7528\u3002");
    }
  }
  async createNote() {
    const file = await this.createUniqueFile("Cute Workbench Notes", "\u672A\u547D\u540D\u7B14\u8BB0", "# \u672A\u547D\u540D\u7B14\u8BB0\n\n");
    await this.app.workspace.getLeaf(false).openFile(file);
  }
  async openDailyNote() {
    const folder = "Daily Notes";
    const path = `${folder}/${formatDateKey(/* @__PURE__ */ new Date())}.md`;
    const existing = this.app.vault.getFileByPath(path);
    const file = existing != null ? existing : await this.createUniqueFile(folder, formatDateKey(/* @__PURE__ */ new Date()), `# ${formatDateKey(/* @__PURE__ */ new Date())}

`);
    await this.app.workspace.getLeaf(false).openFile(file);
  }
  async addTask() {
    await this.store.addTodayFocusTask("\u65B0\u7684\u5F85\u529E\u4EFB\u52A1");
    this.onDataChanged();
    new import_obsidian8.Notice("\u5DF2\u6DFB\u52A0\u5230\u4ECA\u65E5\u7126\u70B9\u3002");
  }
  async createUniqueFile(folder, basename, content) {
    if (!this.app.vault.getAbstractFileByPath(folder)) {
      await this.app.vault.createFolder(folder);
    }
    let index = 1;
    let path = `${folder}/${basename}.md`;
    while (this.app.vault.getAbstractFileByPath(path)) {
      index += 1;
      path = `${folder}/${basename} ${index}.md`;
    }
    return this.app.vault.create(path, content);
  }
};

// src/components/overview/RecentNotesSection.ts
var RecentNotesSection = class {
  constructor(app) {
    this.app = app;
  }
  render(container) {
    const files = this.app.vault.getMarkdownFiles().sort((left, right) => right.stat.mtime - left.stat.mtime).slice(0, 5);
    if (files.length === 0) {
      container.createEl("p", { cls: "cow-empty-state", text: "\u8FD8\u6CA1\u6709 Markdown \u7B14\u8BB0\u3002" });
      return;
    }
    const list = container.createEl("ul", { cls: "cow-recent-notes" });
    files.forEach((file) => {
      const item = list.createEl("li");
      const button = item.createEl("button", { attr: { type: "button" } });
      button.createSpan({ text: file.basename });
      button.createEl("time", { text: this.formatTime(file.stat.mtime) });
      button.addEventListener("click", async () => this.openFile(file));
    });
  }
  async openFile(file) {
    const leaf = this.app.workspace.getLeaf(false);
    await leaf.openFile(file);
  }
  formatTime(timestamp) {
    return new Date(timestamp).toLocaleString("zh-CN", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
};

// src/components/overview/TodayFocusSection.ts
var CATEGORY_CLASS = {
  \u79D1\u7814: "is-blue",
  \u9605\u8BFB: "is-pink",
  \u5065\u8EAB: "is-green",
  \u7406\u8D22: "is-yellow",
  \u4E2A\u4EBA: "is-purple"
};
var TodayFocusSection = class {
  constructor(store, onDataChanged) {
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const list = container.createEl("ul", { cls: "cow-focus-list" });
    this.store.getTodayFocusTasks().forEach((task) => {
      const item = list.createEl("li");
      const checkbox = item.createEl("input", { type: "checkbox" });
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", async () => {
        await this.store.toggleTodayFocusTask(task.id);
        this.onDataChanged();
      });
      item.createSpan({ cls: `cow-pill ${CATEGORY_CLASS[task.category]}`, text: task.category });
      item.createSpan({ cls: task.completed ? "is-complete" : "", text: task.label });
    });
  }
};

// src/components/modules/ModulesControls.ts
var import_obsidian9 = require("obsidian");
function renderSwitch(container, checked, onChange) {
  const input = container.createEl("input", { type: "checkbox", cls: "cow-switch" });
  input.checked = checked;
  input.addEventListener("change", () => onChange(input.checked));
  return input;
}
function renderField(container, label, value, onChange, type = "text") {
  const row = container.createDiv({ cls: "cow-setting-row" });
  row.createSpan({ text: label });
  const input = row.createEl("input", { type, value });
  input.addEventListener("change", () => onChange(input.value));
}
var EnabledModulesOverviewSection = class {
  constructor(store) {
    this.store = store;
  }
  render(container) {
    const currentPage = this.store.getData().currentPage;
    const currentEnabled = this.store.getSectionsForPage(currentPage).length;
    const allEnabled = this.store.getAllSections().filter((section) => section.enabled).length;
    const total = this.store.getAllSections().length;
    const grid = container.createDiv({ cls: "cow-reading-stat-grid" });
    [
      ["\u5F53\u524D\u9875\u9762", `${currentEnabled} \u4E2A`],
      ["\u5168\u90E8\u542F\u7528", `${allEnabled} \u4E2A`],
      ["\u6A21\u5757\u603B\u6570", `${total} \u4E2A`],
      ["\u9875\u9762\u6570\u91CF", `${DASHBOARD_PAGES.length} \u4E2A`]
    ].forEach(([label, value]) => {
      const item = grid.createDiv();
      item.createEl("strong", { text: value });
      item.createSpan({ text: label });
    });
  }
};
var HomeLayoutManagerSection = class {
  constructor(store, onDataChanged) {
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const current = this.store.getData().userSettings.overviewLayout;
    const grid = container.createDiv({ cls: "cow-layout-picker" });
    [
      ["default", "\u9ED8\u8BA4\u5E03\u5C40", "\u5361\u7247\u6309 12 \u680F\u7F51\u683C\u5C55\u793A"],
      ["compact", "\u7D27\u51D1\u5E03\u5C40", "\u66F4\u591A\u5361\u7247\u5E76\u6392\uFF0C\u4FE1\u606F\u66F4\u5BC6"],
      ["minimal", "\u6781\u7B80\u5E03\u5C40", "\u5355\u5217\u9605\u8BFB\uFF0C\u5C11\u5E72\u6270"]
    ].forEach(([id, title, desc]) => {
      const button = grid.createEl("button", { cls: current === id ? "is-active" : "", attr: { type: "button" } });
      button.createEl("strong", { text: title });
      button.createSpan({ text: desc });
      button.addEventListener("click", async () => {
        await this.store.setOverviewLayout(id);
        this.onDataChanged();
      });
    });
  }
};
var ModuleSwitchSortSection = class {
  constructor(store, onDataChanged) {
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    DASHBOARD_PAGES.forEach((pageDefinition) => {
      const page = pageDefinition.id;
      const sections = this.store.getAllSections().filter((section) => section.page === page);
      if (sections.length === 0) return;
      container.createEl("h4", { text: pageDefinition.label });
      const list = container.createDiv({ cls: "cow-module-sort-list", attr: { "data-page": page } });
      sections.forEach((section) => this.renderRow(list, section));
    });
  }
  renderRow(list, section) {
    const row = list.createDiv({ cls: "cow-module-row", attr: { draggable: "true", "data-id": section.id } });
    const handle = row.createSpan({ cls: "cow-drag-handle" });
    (0, import_obsidian9.setIcon)(handle, "grip-vertical");
    row.createSpan({ text: section.title });
    row.createSpan({ cls: "cow-module-page", text: section.page });
    renderSwitch(row, section.enabled, async (checked) => {
      await this.store.setSectionEnabled(section.id, checked);
      this.onDataChanged();
    });
    row.addEventListener("dragstart", () => {
      this.draggingId = section.id;
      row.addClass("is-dragging");
    });
    row.addEventListener("dragend", () => {
      row.removeClass("is-dragging");
      this.draggingId = void 0;
    });
    row.addEventListener("dragover", (event) => {
      event.preventDefault();
      const dragging = this.draggingId;
      if (!dragging || dragging === section.id) return;
      const draggingEl = list.querySelector(`[data-id="${dragging}"]`);
      if (draggingEl) list.insertBefore(draggingEl, row);
    });
    row.addEventListener("drop", async () => {
      const ids = Array.from(list.querySelectorAll(".cow-module-row")).map((item) => {
        var _a;
        return (_a = item.dataset.id) != null ? _a : "";
      });
      await this.store.reorderSections(section.page, ids);
      this.onDataChanged();
    });
  }
};
var BannerBackgroundSettingsSection = class {
  constructor(store, onDataChanged) {
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const banner = this.store.getData().banner;
    const choices = container.createDiv({ cls: "cow-layout-picker" });
    [
      ["pink-paper", "\u63A8\u8350\u58C1\u7EB8"],
      ["cream-stars", "\u5976\u6CB9\u661F\u661F"],
      ["soft-hearts", "\u7231\u5FC3\u80CC\u666F"]
    ].forEach(([id, label]) => {
      const button = choices.createEl("button", { cls: banner.background === id ? "is-active" : "", attr: { type: "button" } });
      button.createEl("strong", { text: label });
      button.addEventListener("click", async () => {
        await this.store.updateBanner({ background: id, imageDataUrl: void 0 });
        this.onDataChanged();
      });
    });
    const file = container.createEl("input", { type: "file", attr: { accept: "image/*" } });
    file.addEventListener("change", () => {
      var _a;
      const selected = (_a = file.files) == null ? void 0 : _a[0];
      if (!selected) return;
      const reader = new FileReader();
      reader.onload = async () => {
        await this.store.updateBanner({ background: "local-image", imageDataUrl: String(reader.result) });
        this.onDataChanged();
      };
      reader.readAsDataURL(selected);
    });
    renderField(container, "\u80CC\u666F\u4F4D\u7F6E", banner.backgroundPosition, async (value) => {
      await this.store.updateBanner({ backgroundPosition: value });
      this.onDataChanged();
    });
    renderField(container, "\u900F\u660E\u5EA6", String(banner.opacity), async (value) => {
      await this.store.updateBanner({ opacity: Number(value) || 1 });
      this.onDataChanged();
    }, "number");
    const row = container.createDiv({ cls: "cow-setting-row" });
    row.createSpan({ text: "Overlay" });
    renderSwitch(row, banner.overlay, async (checked) => {
      await this.store.updateBanner({ overlay: checked });
      this.onDataChanged();
    });
  }
};
var CalendarWidgetSettingsSection = class {
  constructor(store, onDataChanged) {
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const settings = this.store.getData().calendarSettings;
    [
      ["\u663E\u793A\u7B14\u8BB0\u6807\u8BB0", "showNoteMarkers"],
      ["\u663E\u793A\u4EFB\u52A1\u6807\u8BB0", "showTaskMarkers"],
      ["\u663E\u793A\u4E8B\u4EF6\u6807\u8BB0", "showEventMarkers"]
    ].forEach(([label, key]) => {
      const row = container.createDiv({ cls: "cow-setting-row" });
      row.createSpan({ text: label });
      renderSwitch(row, Boolean(settings[key]), async (checked) => {
        await this.store.updateCalendarSettings({ [key]: checked });
        this.onDataChanged();
      });
    });
    const week = container.createDiv({ cls: "cow-setting-row" });
    week.createSpan({ text: "\u4E00\u5468\u8D77\u59CB\u65E5" });
    const select = week.createEl("select");
    select.createEl("option", { value: "monday", text: "\u5468\u4E00" });
    select.createEl("option", { value: "sunday", text: "\u5468\u65E5" });
    select.value = settings.weekStartsOn;
    select.addEventListener("change", async () => {
      await this.store.updateCalendarSettings({ weekStartsOn: select.value });
      this.onDataChanged();
    });
    renderField(container, "\u65E5\u671F\u9AD8\u4EAE\u989C\u8272", settings.highlightColor, async (value) => {
      await this.store.updateCalendarSettings({ highlightColor: value });
      this.onDataChanged();
    }, "color");
  }
};
var ApexHabitSettingsSection = class {
  constructor(store, onDataChanged) {
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const settings = this.store.getData().apexHabitSettings;
    [
      ["\u9996\u9875\u663E\u793A", "showOnOverview"],
      ["\u8FDE\u7EED\u6253\u5361", "showStreak"],
      ["\u672C\u5468\u5B8C\u6210\u8FDB\u5EA6", "showWeeklyProgress"]
    ].forEach(([label, key]) => {
      const row = container.createDiv({ cls: "cow-setting-row" });
      row.createSpan({ text: label });
      renderSwitch(row, Boolean(settings[key]), async (checked) => {
        await this.store.updateApexHabitSettings({ [key]: checked });
        this.onDataChanged();
      });
    });
    const input = container.createEl("input", { type: "text", attr: { placeholder: "\u65B0\u589E\u6253\u5361\u9879\u76EE" } });
    input.addEventListener("keydown", async (event) => {
      if (event.key !== "Enter" || !input.value.trim()) return;
      await this.store.addCustomHabit(input.value.trim());
      this.onDataChanged();
    });
    const list = container.createDiv({ cls: "cow-module-sort-list" });
    settings.customHabits.sort((a, b) => a.order - b.order).forEach((habit) => {
      const row = list.createDiv({ cls: "cow-module-row", attr: { draggable: "true", "data-id": habit.id } });
      const handle = row.createSpan({ cls: "cow-drag-handle" });
      (0, import_obsidian9.setIcon)(handle, "grip-vertical");
      const edit = row.createEl("input", { type: "text", value: habit.label });
      edit.addEventListener("change", async () => {
        await this.store.updateCustomHabit(habit.id, { label: edit.value.trim() || habit.label });
        this.onDataChanged();
      });
      renderSwitch(row, habit.enabled, async (checked) => {
        await this.store.updateCustomHabit(habit.id, { enabled: checked });
        this.onDataChanged();
      });
      const del = row.createEl("button", { text: "\u5220\u9664", attr: { type: "button" } });
      del.addEventListener("click", async () => {
        await this.store.deleteCustomHabit(habit.id);
        this.onDataChanged();
      });
      row.addEventListener("dragstart", () => {
        this.draggingHabitId = habit.id;
        row.addClass("is-dragging");
      });
      row.addEventListener("dragend", () => {
        this.draggingHabitId = void 0;
        row.removeClass("is-dragging");
      });
      row.addEventListener("dragover", (event) => {
        event.preventDefault();
        if (!this.draggingHabitId || this.draggingHabitId === habit.id) return;
        const draggingEl = list.querySelector(`[data-id="${this.draggingHabitId}"]`);
        if (draggingEl) list.insertBefore(draggingEl, row);
      });
      row.addEventListener("drop", async () => {
        const ids = Array.from(list.querySelectorAll(".cow-module-row")).map((item) => {
          var _a;
          return (_a = item.dataset.id) != null ? _a : "";
        });
        await this.store.reorderCustomHabits(ids);
        this.onDataChanged();
      });
    });
  }
};
var QuickActionSettingsSection = class {
  constructor(store, onDataChanged) {
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const list = container.createDiv({ cls: "cow-module-sort-list" });
    this.store.getData().quickActions.sort((a, b) => a.order - b.order).forEach((action) => {
      const row = list.createDiv({ cls: "cow-module-row" });
      row.createSpan({ text: action.label });
      row.createSpan({ cls: "cow-module-page", text: action.type });
      renderSwitch(row, action.enabled, async (checked) => {
        await this.store.updateQuickAction(action.id, { enabled: checked });
        this.onDataChanged();
      });
    });
    const label = container.createEl("input", { type: "text", attr: { placeholder: "\u81EA\u5B9A\u4E49\u5165\u53E3\u540D\u79F0" } });
    const target = container.createEl("input", { type: "text", attr: { placeholder: "\u76EE\u6807\u8DEF\u5F84\u6216\u547D\u4EE4\u5907\u6CE8" } });
    const add = container.createEl("button", { cls: "cow-small-action", text: "\u6DFB\u52A0\u81EA\u5B9A\u4E49\u5165\u53E3", attr: { type: "button" } });
    add.addEventListener("click", async () => {
      if (!label.value.trim()) return;
      await this.store.addQuickAction(label.value.trim(), target.value.trim());
      this.onDataChanged();
    });
  }
};
var ThemeColorSettingsSection = class {
  constructor(store, onDataChanged) {
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const theme = this.store.getData().theme;
    [
      ["\u4E3B\u8272", "cutePrimary", "color"],
      ["\u8F85\u52A9\u8272", "cuteSecondary", "color"],
      ["\u6587\u5B57", "cuteText", "color"],
      ["\u80CC\u666F", "cuteBg", "color"],
      ["\u5361\u7247\u900F\u660E\u5EA6", "cardOpacity", "number"],
      ["\u5706\u89D2", "cuteRadius", "number"],
      ["\u80CC\u666F\u7EB9\u7406\u5F3A\u5EA6", "textureStrength", "number"],
      ["\u5B57\u4F53\u5927\u5C0F", "fontSize", "number"]
    ].forEach(([label, key, type]) => {
      renderField(container, label, String(theme[key]), async (value) => {
        const numericKeys = ["cardOpacity", "cuteRadius", "textureStrength", "fontSize"];
        await this.store.updateTheme({ [key]: numericKeys.includes(key) ? Number(value) : value });
        this.onDataChanged();
      }, type);
    });
  }
};
var DataSourceStatusSection = class {
  render(container) {
    const sources = [
      ["\u7B14\u8BB0", true],
      ["\u4EFB\u52A1", false],
      ["\u65E5\u5386", true],
      ["\u4E60\u60EF", true],
      ["\u9605\u8BFB", true],
      ["\u79D1\u7814", true]
    ];
    const list = container.createDiv({ cls: "cow-data-list" });
    sources.forEach(([label, enabled]) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: label });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ cls: enabled ? "cow-status is-green" : "cow-status is-yellow", text: enabled ? "\u5DF2\u542F\u7528" : "\u5F85\u63A5\u5165" });
    });
  }
};
function downloadJson(filename, content) {
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
function readJsonFile(file, onRead) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      onRead(JSON.parse(String(reader.result)));
    } catch (e) {
      new import_obsidian9.Notice("\u5BFC\u5165\u5931\u8D25\uFF1AJSON \u683C\u5F0F\u4E0D\u6B63\u786E\u3002");
    }
  };
  reader.readAsText(file);
}

// src/components/finance/AccountOverviewSection.ts
var AccountOverviewSection = class {
  constructor(store) {
    this.store = store;
  }
  render(container) {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getAccounts().forEach((account) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: account.name });
      const meta = row.createDiv({ cls: "cow-meta-line" });
      meta.createSpan({ cls: "cow-status is-blue", text: account.type });
      meta.createSpan({ text: `\xA5${account.balance}` });
    });
  }
};

// src/components/finance/BillRemindersSection.ts
var BillRemindersSection = class {
  constructor(store) {
    this.store = store;
  }
  render(container) {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getBills().forEach((bill) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: bill.title });
      const meta = row.createDiv({ cls: "cow-meta-line" });
      meta.createSpan({ cls: bill.paid ? "cow-status is-green" : "cow-status is-yellow", text: bill.paid ? "\u5DF2\u652F\u4ED8" : "\u5F85\u5904\u7406" });
      meta.createSpan({ text: `${bill.dueDate} \xB7 \xA5${bill.amount}` });
    });
  }
};

// src/components/finance/ExpenseCategoriesSection.ts
var ExpenseCategoriesSection = class {
  constructor(store) {
    this.store = store;
  }
  render(container) {
    this.store.getBudgets().forEach((budget) => {
      const percent = budget.amount === 0 ? 0 : Math.round(budget.spent / budget.amount * 100);
      const row = container.createDiv({ cls: "cow-month-progress-row" });
      row.createSpan({ text: budget.category });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-pink", attr: { style: `width: ${Math.min(100, percent)}%` } });
      row.createSpan({ text: `${percent}%` });
    });
  }
};

// src/components/finance/ExpenseHeatmapSection.ts
var ExpenseHeatmapSection = class {
  constructor(store) {
    this.store = store;
  }
  render(container) {
    var _a;
    const now = /* @__PURE__ */ new Date();
    const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const expenseByDate = /* @__PURE__ */ new Map();
    this.store.getTransactions().filter((tx) => tx.type === "expense").forEach((tx) => {
      var _a2;
      expenseByDate.set(tx.date, ((_a2 = expenseByDate.get(tx.date)) != null ? _a2 : 0) + tx.amount);
    });
    const grid = container.createDiv({ cls: "cow-reading-heatmap" });
    for (let day = 1; day <= days; day += 1) {
      const key = formatDateKey(new Date(now.getFullYear(), now.getMonth(), day));
      const amount = (_a = expenseByDate.get(key)) != null ? _a : 0;
      const level = amount === 0 ? 0 : Math.min(5, Math.ceil(amount / 300));
      grid.createSpan({ cls: `level-${level}` });
    }
  }
};

// src/components/finance/FinanceCheckinSection.ts
var import_obsidian10 = require("obsidian");
var FinanceCheckinSection = class {
  constructor(store, onDataChanged) {
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const dates = this.store.getCurrentWeekDates();
    const table = container.createDiv({ cls: "cow-habit-overview" });
    const header = table.createDiv({ cls: "cow-habit-overview-row cow-habit-overview-header" });
    header.createSpan();
    ["\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u65E5"].forEach((day) => header.createSpan({ text: day }));
    FINANCE_HABITS.forEach((habit) => {
      const row = table.createDiv({ cls: "cow-habit-overview-row" });
      row.createSpan({ text: habit.label });
      dates.forEach((date) => {
        const done = this.store.isHabitCompleted(habit.id, date);
        const button = row.createEl("button", { cls: `cow-habit-dot ${done ? "is-done" : ""}`, attr: { type: "button" } });
        if (done) (0, import_obsidian10.setIcon)(button, "check");
        button.addEventListener("click", async () => {
          await this.store.toggleHabit(habit.id, date);
          this.onDataChanged();
        });
      });
    });
    table.createEl("p", { text: `\u4ECA\u5929\uFF1A${formatDateKey(/* @__PURE__ */ new Date())}` });
  }
};

// src/components/finance/FinanceTodosSection.ts
var import_obsidian12 = require("obsidian");

// src/components/finance/AddTransactionModal.ts
var import_obsidian11 = require("obsidian");
var AddTransactionModal = class extends import_obsidian11.Modal {
  constructor(app, onSubmit) {
    super(app);
    this.onSubmit = onSubmit;
    this.type = "expense";
    this.category = "\u9910\u996E";
    this.amount = 0;
    this.date = formatDateKey(/* @__PURE__ */ new Date());
    this.note = "";
  }
  onOpen() {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "\u65B0\u589E\u8BB0\u8D26" });
    new import_obsidian11.Setting(this.contentEl).setName("\u7C7B\u578B").addDropdown((dropdown) => {
      dropdown.addOption("expense", "\u652F\u51FA");
      dropdown.addOption("income", "\u6536\u5165");
      dropdown.setValue(this.type);
      dropdown.onChange((value) => {
        this.type = value;
      });
    });
    new import_obsidian11.Setting(this.contentEl).setName("\u5206\u7C7B").addText((text) => {
      text.setValue(this.category);
      text.onChange((value) => {
        this.category = value.trim() || "\u672A\u5206\u7C7B";
      });
    });
    new import_obsidian11.Setting(this.contentEl).setName("\u91D1\u989D").addText((text) => {
      text.inputEl.type = "number";
      text.onChange((value) => {
        this.amount = Number(value) || 0;
      });
    });
    new import_obsidian11.Setting(this.contentEl).setName("\u65E5\u671F").addText((text) => {
      text.setValue(this.date);
      text.onChange((value) => {
        this.date = value.trim() || formatDateKey(/* @__PURE__ */ new Date());
      });
    });
    new import_obsidian11.Setting(this.contentEl).setName("\u5907\u6CE8").addText((text) => {
      text.onChange((value) => {
        this.note = value.trim();
      });
    });
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "\u4FDD\u5B58", attr: { type: "button" } }).addEventListener("click", async () => {
      if (this.amount <= 0) {
        return;
      }
      await this.onSubmit({
        id: `tx-${Date.now()}`,
        type: this.type,
        category: this.category,
        amount: this.amount,
        date: this.date,
        note: this.note
      });
      this.close();
    });
  }
};

// src/components/finance/FinanceTodosSection.ts
var FinanceTodosSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const action = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    (0, import_obsidian12.setIcon)(action.createSpan(), "plus");
    action.createSpan({ text: "\u65B0\u589E\u8BB0\u8D26" });
    action.addEventListener("click", () => {
      new AddTransactionModal(this.app, async (transaction) => {
        await this.store.addTransaction(transaction);
        this.onDataChanged();
      }).open();
    });
    const list = container.createEl("ul", { cls: "cow-focus-list" });
    ["\u8BB0\u5F55\u672C\u5468\u4EA4\u901A\u652F\u51FA", "\u68C0\u67E5\u9910\u996E\u9884\u7B97", "\u786E\u8BA4\u8D26\u5355\u63D0\u9192", "\u6574\u7406\u6295\u8D44\u89C2\u5BDF\u7B14\u8BB0"].forEach((item, index) => {
      const row = list.createEl("li");
      const checkbox = row.createEl("input", { type: "checkbox" });
      checkbox.checked = index === 1;
      row.createSpan({ text: item });
    });
  }
};

// src/components/finance/IncomeExpenseTrendSection.ts
var IncomeExpenseTrendSection = class {
  constructor(store) {
    this.store = store;
  }
  render(container) {
    [
      ["\u6536\u5165", this.store.getMonthlyIncome(), "is-green"],
      ["\u652F\u51FA", this.store.getMonthlyExpense(), "is-pink"],
      ["\u9884\u7B97\u5269\u4F59", this.store.getBudgetRemaining(), "is-blue"]
    ].forEach(([label, value, className]) => {
      const row = container.createDiv({ cls: "cow-month-progress-row" });
      row.createSpan({ text: String(label) });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: `cow-month-progress-fill ${className}`, attr: { style: `width: ${Math.min(100, Number(value) / 150)}%` } });
      row.createSpan({ text: `\xA5${value}` });
    });
  }
};

// src/components/finance/InvestmentWatchSection.ts
var InvestmentWatchSection = class {
  render(container) {
    const list = container.createDiv({ cls: "cow-data-list" });
    [
      ["\u6307\u6570\u57FA\u91D1", "\u89C2\u5BDF\u4F30\u503C\uFF0C\u4E0D\u8FFD\u6DA8"],
      ["\u73B0\u91D1\u4ED3\u4F4D", "\u4FDD\u6301 3-6 \u4E2A\u6708\u5B89\u5168\u57AB"],
      ["\u5B66\u4E60\u7B14\u8BB0", "\u8BB0\u5F55\u89C2\u70B9\uFF0C\u4E0D\u505A\u81EA\u52A8\u4EA4\u6613"]
    ].forEach(([title, note]) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: title });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: note });
    });
  }
};

// src/components/finance/MonthlyBudgetSection.ts
var import_obsidian13 = require("obsidian");
var MonthlyBudgetSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const action = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    (0, import_obsidian13.setIcon)(action.createSpan(), "plus");
    action.createSpan({ text: "\u65B0\u589E\u8BB0\u8D26" });
    action.addEventListener("click", () => this.openModal());
    const grid = container.createDiv({ cls: "cow-reading-stat-grid" });
    [
      ["\u672C\u6708\u6536\u5165", `\xA5${this.store.getMonthlyIncome()}`],
      ["\u672C\u6708\u652F\u51FA", `\xA5${this.store.getMonthlyExpense()}`],
      ["\u9884\u7B97\u5269\u4F59", `\xA5${this.store.getBudgetRemaining()}`],
      ["\u50A8\u84C4\u7387", `${this.store.getSavingRate()}%`]
    ].forEach(([label, value]) => {
      const item = grid.createDiv();
      item.createEl("strong", { text: value });
      item.createSpan({ text: label });
    });
  }
  openModal() {
    new AddTransactionModal(this.app, async (transaction) => {
      await this.store.addTransaction(transaction);
      this.onDataChanged();
    }).open();
  }
};

// src/components/finance/SavingGoalsSection.ts
var SavingGoalsSection = class {
  constructor(store) {
    this.store = store;
  }
  render(container) {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getSavingGoals().forEach((goal) => {
      const percent = goal.target === 0 ? 0 : Math.round(goal.current / goal.target * 100);
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: goal.title });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `\xA5${goal.current}/\xA5${goal.target} \xB7 ${goal.deadline}` });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-green", attr: { style: `width: ${Math.min(100, percent)}%` } });
    });
  }
};

// src/components/fitness/BodyMeasurementsSection.ts
var BodyMeasurementsSection = class {
  constructor(store) {
    this.store = store;
  }
  render(container) {
    var _a, _b, _c, _d;
    const measurements = this.store.getBodyMeasurements();
    const latest = measurements[measurements.length - 1];
    const grid = container.createDiv({ cls: "cow-reading-stat-grid" });
    [
      ["\u4F53\u91CD", `${(_a = latest == null ? void 0 : latest.weight) != null ? _a : 0}kg`],
      ["BMI", `${(_b = latest == null ? void 0 : latest.bmi) != null ? _b : 0}`],
      ["\u8170\u56F4", `${(_c = latest == null ? void 0 : latest.waist) != null ? _c : 0}cm`],
      ["\u81C0\u56F4", `${(_d = latest == null ? void 0 : latest.hip) != null ? _d : 0}cm`]
    ].forEach(([label, value]) => {
      const item = grid.createDiv();
      item.createEl("strong", { text: value });
      item.createSpan({ text: label });
    });
  }
};

// src/components/fitness/CardioStrengthSection.ts
var CardioStrengthSection = class {
  constructor(store) {
    this.store = store;
  }
  render(container) {
    const cardio = this.store.getWorkouts().filter((item) => item.type === "\u6709\u6C27").length;
    const strength = this.store.getWorkouts().filter((item) => item.type === "\u529B\u91CF").length;
    const items = [
      ["\u6709\u6C27", cardio, "is-blue"],
      ["\u529B\u91CF", strength, "is-pink"],
      ["\u62C9\u4F38", this.store.getWorkouts().filter((item) => item.type === "\u62C9\u4F38").length, "is-green"]
    ];
    items.forEach(([label, value, className]) => {
      const row = container.createDiv({ cls: "cow-month-progress-row" });
      row.createSpan({ text: label });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: `cow-month-progress-fill ${className}`, attr: { style: `width: ${Math.min(100, value * 30)}%` } });
      row.createSpan({ text: `${value}\u6B21` });
    });
  }
};

// src/components/fitness/FitnessCheckinSection.ts
var import_obsidian14 = require("obsidian");
var FitnessCheckinSection = class {
  constructor(store, onDataChanged) {
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const dates = this.store.getCurrentWeekDates();
    const table = container.createDiv({ cls: "cow-habit-overview" });
    const header = table.createDiv({ cls: "cow-habit-overview-row cow-habit-overview-header" });
    header.createSpan();
    ["\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u65E5"].forEach((day) => header.createSpan({ text: day }));
    FITNESS_HABITS.forEach((habit) => {
      const row = table.createDiv({ cls: "cow-habit-overview-row" });
      row.createSpan({ text: habit.label });
      dates.forEach((date) => {
        const done = this.store.isHabitCompleted(habit.id, date);
        const button = row.createEl("button", { cls: `cow-habit-dot ${done ? "is-done" : ""}`, attr: { type: "button" } });
        if (done) (0, import_obsidian14.setIcon)(button, "check");
        button.addEventListener("click", async () => {
          await this.store.toggleHabit(habit.id, date);
          this.onDataChanged();
        });
      });
    });
    table.createEl("p", { text: `\u4ECA\u5929\uFF1A${formatDateKey(/* @__PURE__ */ new Date())}` });
  }
};

// src/components/fitness/FitnessGoalsSection.ts
var FitnessGoalsSection = class {
  constructor(store) {
    this.store = store;
  }
  render(container) {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getFitnessGoals().forEach((goal) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: goal.title });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${goal.current}/${goal.target}${goal.unit} \xB7 ${goal.deadline}` });
      const percent = goal.target === 0 ? 0 : Math.round(goal.current / goal.target * 100);
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-green", attr: { style: `width: ${Math.min(100, percent)}%` } });
    });
  }
};

// src/components/fitness/FitnessHeatmapSection.ts
var FitnessHeatmapSection = class {
  constructor(store) {
    this.store = store;
  }
  render(container) {
    var _a;
    const now = /* @__PURE__ */ new Date();
    const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const workoutsByDate = /* @__PURE__ */ new Map();
    this.store.getWorkouts().forEach((workout) => {
      var _a2;
      workoutsByDate.set(workout.date, ((_a2 = workoutsByDate.get(workout.date)) != null ? _a2 : 0) + (workout.completed ? 2 : 1));
    });
    const grid = container.createDiv({ cls: "cow-reading-heatmap" });
    for (let day = 1; day <= days; day += 1) {
      const key = formatDateKey(new Date(now.getFullYear(), now.getMonth(), day));
      grid.createSpan({ cls: `level-${Math.min(5, (_a = workoutsByDate.get(key)) != null ? _a : 0)}` });
    }
  }
};

// src/components/fitness/FitnessStatsSection.ts
var FitnessStatsSection = class {
  constructor(store) {
    this.store = store;
  }
  render(container) {
    const workouts = this.store.getWorkouts();
    const minutes = workouts.reduce((sum, item) => sum + item.duration, 0);
    const calories = workouts.reduce((sum, item) => sum + item.calories, 0);
    const grid = container.createDiv({ cls: "cow-reading-stat-grid" });
    [
      ["\u8FD0\u52A8\u65F6\u957F", `${minutes}min`],
      ["\u70ED\u91CF\u6D88\u8017", `${calories}kcal`],
      ["\u5B8C\u6210\u8BAD\u7EC3", `${workouts.filter((item) => item.completed).length}\u6B21`],
      ["\u8BAD\u7EC3\u7C7B\u578B", `${new Set(workouts.map((item) => item.type)).size}\u7C7B`]
    ].forEach(([label, value]) => {
      const item = grid.createDiv();
      item.createEl("strong", { text: value });
      item.createSpan({ text: label });
    });
  }
};

// src/components/goals/GoalBreakdownSection.ts
var GoalBreakdownSection = class {
  constructor(store) {
    this.store = store;
  }
  render(container) {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getGoals().forEach((goal) => {
      const related = this.store.getMilestones().filter((milestone) => milestone.goalId === goal.id).length;
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: goal.title });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${related} \u4E2A\u91CC\u7A0B\u7891 \xB7 ${goal.progress}%` });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-blue", attr: { style: `width: ${goal.progress}%` } });
    });
  }
};

// src/components/goals/GoalsCheckinSection.ts
var import_obsidian15 = require("obsidian");
var GoalsCheckinSection = class {
  constructor(store, onDataChanged) {
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const dates = this.store.getCurrentWeekDates();
    const table = container.createDiv({ cls: "cow-habit-overview" });
    const header = table.createDiv({ cls: "cow-habit-overview-row cow-habit-overview-header" });
    header.createSpan();
    ["\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u65E5"].forEach((day) => header.createSpan({ text: day }));
    GOAL_HABITS.forEach((habit) => {
      const row = table.createDiv({ cls: "cow-habit-overview-row" });
      row.createSpan({ text: habit.label });
      dates.forEach((date) => {
        const done = this.store.isHabitCompleted(habit.id, date);
        const button = row.createEl("button", { cls: `cow-habit-dot ${done ? "is-done" : ""}`, attr: { type: "button" } });
        if (done) (0, import_obsidian15.setIcon)(button, "check");
        button.addEventListener("click", async () => {
          await this.store.toggleHabit(habit.id, date);
          this.onDataChanged();
        });
      });
    });
    table.createEl("p", { text: `\u4ECA\u5929\uFF1A${formatDateKey(/* @__PURE__ */ new Date())}` });
  }
};

// src/components/goals/LongTermProgressSection.ts
var LongTermProgressSection = class {
  constructor(store) {
    this.store = store;
  }
  render(container) {
    const goals = this.store.getGoals();
    const average = goals.length === 0 ? 0 : Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length);
    const card = container.createDiv({ cls: "cow-feature-card" });
    card.createEl("strong", { text: `${average}%` });
    card.createSpan({ text: "\u957F\u671F\u76EE\u6807\u5E73\u5747\u8FDB\u5C55" });
    card.createEl("p", { text: "\u628A\u76EE\u6807\u62C6\u5C0F\uFF0C\u6BCF\u5468\u63A8\u4E00\u70B9\uFF0C\u590D\u5229\u4F1A\u6084\u6084\u7AD9\u5230\u4F60\u8FD9\u8FB9\u3002" });
    goals.forEach((goal) => {
      const row = container.createDiv({ cls: "cow-month-progress-row" });
      row.createSpan({ text: goal.category });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-green", attr: { style: `width: ${goal.progress}%` } });
      row.createSpan({ text: `${goal.progress}%` });
    });
  }
};

// src/components/goals/MilestoneTimelineSection.ts
var import_obsidian17 = require("obsidian");

// src/components/goals/GoalModals.ts
var import_obsidian16 = require("obsidian");
var GoalEditorModal = class extends import_obsidian16.Modal {
  constructor(app, goal, onSubmit) {
    var _a, _b, _c, _d, _e, _f;
    super(app);
    this.goal = goal;
    this.onSubmit = onSubmit;
    this.title = (_a = goal == null ? void 0 : goal.title) != null ? _a : "";
    this.description = (_b = goal == null ? void 0 : goal.description) != null ? _b : "";
    this.category = (_c = goal == null ? void 0 : goal.category) != null ? _c : "\u4E2A\u4EBA";
    this.progress = (_d = goal == null ? void 0 : goal.progress) != null ? _d : 0;
    this.deadline = (_e = goal == null ? void 0 : goal.deadline) != null ? _e : formatDateKey(/* @__PURE__ */ new Date());
    this.status = (_f = goal == null ? void 0 : goal.status) != null ? _f : "\u8FDB\u884C\u4E2D";
  }
  onOpen() {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: this.goal ? "\u4FEE\u6539\u76EE\u6807" : "\u65B0\u589E\u76EE\u6807" });
    new import_obsidian16.Setting(this.contentEl).setName("\u6807\u9898").addText((text) => text.setValue(this.title).onChange((value) => this.title = value.trim()));
    new import_obsidian16.Setting(this.contentEl).setName("\u63CF\u8FF0").addTextArea((text) => text.setValue(this.description).onChange((value) => this.description = value.trim()));
    new import_obsidian16.Setting(this.contentEl).setName("\u5206\u7C7B").addText((text) => text.setValue(this.category).onChange((value) => this.category = value.trim() || "\u4E2A\u4EBA"));
    new import_obsidian16.Setting(this.contentEl).setName("\u8FDB\u5EA6").addText((text) => {
      text.inputEl.type = "number";
      text.setValue(String(this.progress));
      text.onChange((value) => this.progress = Number(value) || 0);
    });
    new import_obsidian16.Setting(this.contentEl).setName("\u622A\u6B62\u65E5\u671F").addText((text) => text.setValue(this.deadline).onChange((value) => this.deadline = value.trim()));
    new import_obsidian16.Setting(this.contentEl).setName("\u72B6\u6001").addDropdown((dropdown) => {
      ["\u672A\u5F00\u59CB", "\u8FDB\u884C\u4E2D", "\u5DF2\u5B8C\u6210", "\u6682\u505C"].forEach((status) => dropdown.addOption(status, status));
      dropdown.setValue(this.status);
      dropdown.onChange((value) => this.status = value);
    });
    this.renderActions(async () => {
      var _a, _b;
      if (!this.title) return;
      await this.onSubmit({
        id: (_b = (_a = this.goal) == null ? void 0 : _a.id) != null ? _b : `goal-${Date.now()}`,
        title: this.title,
        description: this.description,
        category: this.category,
        progress: Math.max(0, Math.min(100, this.progress)),
        deadline: this.deadline,
        status: this.status
      });
    });
  }
  renderActions(onSave) {
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "\u4FDD\u5B58", attr: { type: "button" } }).addEventListener("click", async () => {
      await onSave();
      this.close();
    });
  }
};
var KeyResultModal = class extends import_obsidian16.Modal {
  constructor(app, objectives, onSubmit) {
    var _a, _b;
    super(app);
    this.onSubmit = onSubmit;
    this.title = "";
    this.progress = 0;
    this.objectiveId = (_b = (_a = objectives[0]) == null ? void 0 : _a.id) != null ? _b : "";
    this.objectives = objectives;
  }
  onOpen() {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "\u65B0\u589E KR" });
    new import_obsidian16.Setting(this.contentEl).setName("Objective").addDropdown((dropdown) => {
      this.objectives.forEach((objective) => dropdown.addOption(objective.id, `${objective.quarter} \xB7 ${objective.title}`));
      dropdown.setValue(this.objectiveId);
      dropdown.onChange((value) => this.objectiveId = value);
    });
    new import_obsidian16.Setting(this.contentEl).setName("\u6807\u9898").addText((text) => text.onChange((value) => this.title = value.trim()));
    new import_obsidian16.Setting(this.contentEl).setName("\u8FDB\u5EA6").addText((text) => {
      text.inputEl.type = "number";
      text.onChange((value) => this.progress = Number(value) || 0);
    });
    this.renderActions(async () => {
      if (!this.title || !this.objectiveId) return;
      await this.onSubmit({
        id: `kr-${Date.now()}`,
        objectiveId: this.objectiveId,
        title: this.title,
        progress: Math.max(0, Math.min(100, this.progress)),
        completed: false
      });
    });
  }
  renderActions(onSave) {
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "\u6DFB\u52A0", attr: { type: "button" } }).addEventListener("click", async () => {
      await onSave();
      this.close();
    });
  }
};
var MilestoneModal = class extends import_obsidian16.Modal {
  constructor(app, goals, onSubmit) {
    var _a, _b;
    super(app);
    this.goals = goals;
    this.onSubmit = onSubmit;
    this.title = "";
    this.date = formatDateKey(/* @__PURE__ */ new Date());
    this.goalId = (_b = (_a = goals[0]) == null ? void 0 : _a.id) != null ? _b : "";
  }
  onOpen() {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "\u65B0\u589E\u91CC\u7A0B\u7891" });
    new import_obsidian16.Setting(this.contentEl).setName("\u76EE\u6807").addDropdown((dropdown) => {
      this.goals.forEach((goal) => dropdown.addOption(goal.id, goal.title));
      dropdown.setValue(this.goalId);
      dropdown.onChange((value) => this.goalId = value);
    });
    new import_obsidian16.Setting(this.contentEl).setName("\u6807\u9898").addText((text) => text.onChange((value) => this.title = value.trim()));
    new import_obsidian16.Setting(this.contentEl).setName("\u65E5\u671F").addText((text) => text.setValue(this.date).onChange((value) => this.date = value.trim()));
    this.renderActions(async () => {
      if (!this.title || !this.goalId) return;
      await this.onSubmit({
        id: `milestone-${Date.now()}`,
        goalId: this.goalId,
        title: this.title,
        date: this.date,
        status: "\u672A\u5F00\u59CB"
      });
    });
  }
  renderActions(onSave) {
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "\u6DFB\u52A0", attr: { type: "button" } }).addEventListener("click", async () => {
      await onSave();
      this.close();
    });
  }
};
var RiskModal = class extends import_obsidian16.Modal {
  constructor(app, onSubmit) {
    super(app);
    this.onSubmit = onSubmit;
    this.title = "";
    this.level = "medium";
    this.solution = "";
  }
  onOpen() {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "\u6DFB\u52A0\u98CE\u9669" });
    new import_obsidian16.Setting(this.contentEl).setName("\u98CE\u9669").addText((text) => text.onChange((value) => this.title = value.trim()));
    new import_obsidian16.Setting(this.contentEl).setName("\u7B49\u7EA7").addDropdown((dropdown) => {
      dropdown.addOption("low", "\u4F4E");
      dropdown.addOption("medium", "\u4E2D");
      dropdown.addOption("high", "\u9AD8");
      dropdown.setValue(this.level);
      dropdown.onChange((value) => this.level = value);
    });
    new import_obsidian16.Setting(this.contentEl).setName("\u65B9\u6848").addTextArea((text) => text.onChange((value) => this.solution = value.trim()));
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "\u6DFB\u52A0", attr: { type: "button" } }).addEventListener("click", async () => {
      if (!this.title) return;
      await this.onSubmit({ id: `risk-${Date.now()}`, title: this.title, level: this.level, solution: this.solution });
      this.close();
    });
  }
};

// src/components/goals/MilestoneTimelineSection.ts
var MilestoneTimelineSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const add = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    (0, import_obsidian17.setIcon)(add.createSpan(), "plus");
    add.createSpan({ text: "\u65B0\u589E\u91CC\u7A0B\u7891" });
    add.addEventListener("click", () => {
      new MilestoneModal(this.app, this.store.getGoals(), async (milestone) => {
        await this.store.addMilestone(milestone);
        this.onDataChanged();
      }).open();
    });
    const timeline = container.createDiv({ cls: "cow-timeline" });
    this.store.getMilestones().forEach((milestone) => {
      const item = timeline.createDiv({ cls: "cow-timeline-item priority-medium" });
      item.createEl("time", { text: milestone.date });
      item.createEl("strong", { text: milestone.title });
      item.createSpan({ text: milestone.status });
    });
  }
};

// src/components/goals/MonthlyKeyResultsSection.ts
var import_obsidian18 = require("obsidian");
var MonthlyKeyResultsSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const add = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    (0, import_obsidian18.setIcon)(add.createSpan(), "plus");
    add.createSpan({ text: "\u65B0\u589E KR" });
    add.addEventListener("click", () => {
      new KeyResultModal(this.app, this.store.getObjectives(), async (kr) => {
        await this.store.addKeyResult(kr);
        this.onDataChanged();
      }).open();
    });
    const list = container.createEl("ul", { cls: "cow-focus-list" });
    this.store.getKeyResults().forEach((kr) => {
      const item = list.createEl("li");
      const checkbox = item.createEl("input", { type: "checkbox" });
      checkbox.checked = kr.completed;
      checkbox.addEventListener("change", async () => {
        await this.store.toggleKeyResult(kr.id);
        this.onDataChanged();
      });
      item.createSpan({ cls: "cow-pill is-purple", text: `${kr.progress}%` });
      item.createSpan({ cls: kr.completed ? "is-complete" : "", text: kr.title });
    });
  }
};

// src/components/goals/PriorityMatrixSection.ts
var PriorityMatrixSection = class {
  render(container) {
    const items = [
      ["\u91CD\u8981\u4E14\u7D27\u6025", "\u672C\u5468\u5FC5\u987B\u4EA4\u4ED8\u7684\u5173\u952E\u7ED3\u679C"],
      ["\u91CD\u8981\u4E0D\u7D27\u6025", "\u957F\u671F\u76EE\u6807\u3001\u5065\u5EB7\u8282\u594F\u3001\u80FD\u529B\u5EFA\u8BBE"],
      ["\u4E0D\u91CD\u8981\u4F46\u7D27\u6025", "\u4E34\u65F6\u6D88\u606F\u3001\u6D41\u7A0B\u6027\u5904\u7406"],
      ["\u4E0D\u91CD\u8981\u4E0D\u7D27\u6025", "\u4F4E\u4EF7\u503C\u6D88\u8017\uFF0C\u5C3D\u91CF\u51CF\u5C11"]
    ];
    const grid = container.createDiv({ cls: "cow-priority-grid" });
    items.forEach(([title, text]) => {
      const cell = grid.createDiv();
      cell.createEl("strong", { text: title });
      cell.createSpan({ text });
    });
  }
};

// src/components/goals/QuarterlyOkrSection.ts
var QuarterlyOkrSection = class {
  constructor(store) {
    this.store = store;
  }
  render(container) {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getObjectives().forEach((objective) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: objective.title });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${objective.quarter} \xB7 ${objective.progress}%` });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-pink", attr: { style: `width: ${objective.progress}%` } });
    });
  }
};

// src/components/goals/ReviewChecklistSection.ts
var ReviewChecklistSection = class {
  render(container) {
    const list = container.createEl("ul", { cls: "cow-focus-list" });
    ["\u672C\u5468\u6700\u91CD\u8981\u7684\u76EE\u6807\u63A8\u8FDB\u4E86\u5417\uFF1F", "\u54EA\u4E9B\u4EFB\u52A1\u53EA\u662F\u5FD9\u788C\u611F\uFF1F", "\u4E0B\u5468\u8981\u780D\u6389\u4EC0\u4E48\uFF1F", "\u9700\u8981\u8C01\u7684\u5E2E\u52A9\u6216\u53CD\u9988\uFF1F"].forEach((item) => {
      const row = list.createEl("li");
      row.createEl("input", { type: "checkbox" });
      row.createSpan({ text: item });
    });
  }
};

// src/components/goals/RisksBlockersSection.ts
var import_obsidian19 = require("obsidian");
var RisksBlockersSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const add = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    (0, import_obsidian19.setIcon)(add.createSpan(), "plus");
    add.createSpan({ text: "\u6DFB\u52A0\u98CE\u9669" });
    add.addEventListener("click", () => {
      new RiskModal(this.app, async (risk) => {
        await this.store.addRisk(risk);
        this.onDataChanged();
      }).open();
    });
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getRisks().forEach((risk) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: risk.title });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ cls: `cow-status is-${risk.level === "high" ? "yellow" : "blue"}`, text: risk.level });
      row.createEl("p", { text: risk.solution });
    });
  }
};

// src/components/goals/YearlyGoalsSection.ts
var import_obsidian20 = require("obsidian");
var YearlyGoalsSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const add = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    (0, import_obsidian20.setIcon)(add.createSpan(), "plus");
    add.createSpan({ text: "\u65B0\u589E\u76EE\u6807" });
    add.addEventListener("click", () => {
      new GoalEditorModal(this.app, void 0, async (goal) => {
        await this.store.addGoal(goal);
        this.onDataChanged();
      }).open();
    });
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getGoals().forEach((goal) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      const title = row.createDiv({ cls: "cow-inline-title" });
      title.createEl("strong", { text: goal.title });
      const edit = title.createEl("button", { attr: { type: "button", "aria-label": "\u4FEE\u6539\u76EE\u6807" } });
      (0, import_obsidian20.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => {
        new GoalEditorModal(this.app, goal, async (updated) => {
          await this.store.updateGoal(goal.id, updated);
          this.onDataChanged();
        }).open();
      });
      row.createEl("p", { text: goal.description });
      const meta = row.createDiv({ cls: "cow-meta-line" });
      meta.createSpan({ cls: "cow-status is-green", text: goal.status });
      meta.createSpan({ text: `${goal.category} \xB7 ${goal.deadline}` });
      const input = row.createEl("input", {
        type: "range",
        value: String(goal.progress),
        attr: { min: "0", max: "100", "aria-label": `${goal.title} \u8FDB\u5EA6` }
      });
      input.addEventListener("change", async () => {
        await this.store.updateGoalProgress(goal.id, Number(input.value));
        this.onDataChanged();
      });
    });
  }
};

// src/components/fitness/HealthRemindersSection.ts
var HealthRemindersSection = class {
  render(container) {
    const list = container.createEl("ul", { cls: "cow-memo-list" });
    ["\u8BAD\u7EC3\u524D\u70ED\u8EAB 8 \u5206\u949F\u3002", "\u4E45\u5750 50 \u5206\u949F\u540E\u8D77\u8EAB\u6D3B\u52A8\u3002", "\u529B\u91CF\u65E5\u540E\u8865\u5145\u86CB\u767D\u8D28\u548C\u7761\u7720\u3002", "\u72B6\u6001\u5DEE\u65F6\u5141\u8BB8\u964D\u5F3A\u5EA6\uFF0C\u4E0D\u786C\u625B\u3002"].forEach((item) => {
      list.createEl("li", { text: item });
    });
  }
};

// src/components/fitness/TodayWorkoutSection.ts
var TodayWorkoutSection = class {
  constructor(store) {
    this.store = store;
  }
  render(container) {
    var _a, _b;
    const today = formatDateKey(/* @__PURE__ */ new Date());
    const workout = (_a = this.store.getWorkouts().find((item) => item.date === today)) != null ? _a : this.store.getWorkouts()[0];
    const card = container.createDiv({ cls: "cow-feature-card" });
    card.createEl("strong", { text: (_b = workout == null ? void 0 : workout.note) != null ? _b : "\u4ECA\u5929\u5B89\u6392\u8F7B\u91CF\u6D3B\u52A8" });
    card.createSpan({ text: workout ? `${workout.type} \xB7 ${workout.duration} \u5206\u949F \xB7 ${workout.calories} kcal` : "\u7ED9\u8EAB\u4F53\u4E00\u70B9\u6E29\u67D4\u7684\u542F\u52A8" });
    card.createEl("p", { text: (workout == null ? void 0 : workout.completed) ? "\u5DF2\u5B8C\u6210\uFF0C\u592A\u7A33\u4E86\uFF01" : "\u8FD8\u6CA1\u5B8C\u6210\uFF0C\u7559\u4E00\u70B9\u65F6\u95F4\u7ED9\u81EA\u5DF1\u3002" });
  }
};

// src/components/fitness/WaterSleepHabitsSection.ts
var WaterSleepHabitsSection = class {
  constructor(store) {
    this.store = store;
  }
  render(container) {
    var _a;
    const dates = this.store.getCurrentWeekDates();
    const today = (_a = dates[dates.length - 1]) != null ? _a : "";
    const water = this.store.isHabitCompleted("fitness-water", today);
    const sleep = this.store.isHabitCompleted("fitness-sleep", today);
    const list = container.createDiv({ cls: "cow-data-list" });
    [
      ["\u996E\u6C34", water ? "\u5DF2\u8FBE\u6807" : "\u5F85\u5B8C\u6210", 80],
      ["\u7761\u7720", sleep ? "\u5DF2\u8BB0\u5F55" : "\u5F85\u8BB0\u5F55", 65],
      ["\u62C9\u4F38", this.store.isHabitCompleted("fitness-stretch", today) ? "\u5DF2\u5B8C\u6210" : "\u5F85\u5B8C\u6210", 50]
    ].forEach(([label, status, percent]) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: String(label) });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: String(status) });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-blue", attr: { style: `width: ${percent}%` } });
    });
  }
};

// src/components/fitness/WorkoutLogSection.ts
var WorkoutLogSection = class {
  constructor(store) {
    this.store = store;
  }
  render(container) {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getWorkouts().filter((item) => item.completed).forEach((workout) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: workout.note });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${workout.date} \xB7 ${workout.type} \xB7 ${workout.duration}min` });
    });
  }
};

// src/components/fitness/WorkoutPlanSection.ts
var WorkoutPlanSection = class {
  constructor(store) {
    this.store = store;
  }
  render(container) {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getWorkouts().forEach((workout) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: workout.note });
      const meta = row.createDiv({ cls: "cow-meta-line" });
      meta.createSpan({ cls: workout.completed ? "cow-status is-green" : "cow-status is-yellow", text: workout.completed ? "\u5DF2\u5B8C\u6210" : "\u5F85\u8BAD\u7EC3" });
      meta.createSpan({ text: `${workout.date} \xB7 ${workout.type} \xB7 ${workout.duration}min` });
    });
  }
};

// src/components/reading/AiReadingReviewSection.ts
var AiReadingReviewSection = class {
  render(container) {
    const card = container.createDiv({ cls: "cow-ai-review" });
    card.createEl("strong", { text: "AI \u9605\u8BFB\u590D\u76D8\u51C6\u5907\u4E2D" });
    card.createEl("p", { text: "\u540E\u7EED\u4F1A\u6839\u636E\u9605\u8BFB\u7B14\u8BB0\u3001\u6458\u5F55\u548C\u8FDB\u5EA6\u751F\u6210\u9636\u6BB5\u603B\u7ED3\u3001\u4E3B\u9898\u8109\u7EDC\u548C\u4E0B\u4E00\u6B65\u9605\u8BFB\u5EFA\u8BAE\u3002" });
  }
};

// src/components/reading/BookListSection.ts
var BookListSection = class {
  constructor(store, status) {
    this.store = store;
    this.status = status;
  }
  render(container) {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getBooks().filter((book) => book.status === this.status).forEach((book) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: book.title });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${book.author} \xB7 ${book.tags.join(" / ")}` });
    });
  }
};

// src/components/reading/BookshelfSection.ts
var import_obsidian23 = require("obsidian");

// src/components/reading/AddBookModal.ts
var import_obsidian21 = require("obsidian");
var AddBookModal = class extends import_obsidian21.Modal {
  constructor(app, onSubmit) {
    super(app);
    this.onSubmit = onSubmit;
    this.title = "";
    this.author = "";
    this.totalPages = 200;
  }
  onOpen() {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "\u589E\u52A0\u4E66\u7C4D" });
    new import_obsidian21.Setting(this.contentEl).setName("\u4E66\u540D").addText((text) => {
      text.onChange((value) => {
        this.title = value.trim();
      });
    });
    new import_obsidian21.Setting(this.contentEl).setName("\u4F5C\u8005").addText((text) => {
      text.onChange((value) => {
        this.author = value.trim();
      });
    });
    new import_obsidian21.Setting(this.contentEl).setName("\u603B\u9875\u6570").addText((text) => {
      text.inputEl.type = "number";
      text.setValue(String(this.totalPages));
      text.onChange((value) => {
        this.totalPages = Number(value) || 0;
      });
    });
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "\u6DFB\u52A0", attr: { type: "button" } }).addEventListener("click", async () => {
      if (!this.title) {
        return;
      }
      await this.onSubmit({
        id: `book-${Date.now()}`,
        title: this.title,
        author: this.author || "\u672A\u77E5\u4F5C\u8005",
        totalPages: Math.max(1, this.totalPages),
        currentPage: 0,
        status: "\u60F3\u8BFB",
        tags: []
      });
      this.close();
    });
  }
};

// src/components/reading/BookCard.ts
var import_obsidian22 = require("obsidian");
var BookCard = class {
  constructor(app, store, book, onDataChanged) {
    this.app = app;
    this.store = store;
    this.book = book;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const card = container.createDiv({ cls: "cow-book-card" });
    const cover = card.createDiv({ cls: "cow-book-cover" });
    if (this.book.cover) {
      cover.createEl("img", { attr: { src: this.book.cover, alt: this.book.title } });
    } else {
      cover.createSpan({ text: this.book.title.slice(0, 2) });
    }
    const body = card.createDiv({ cls: "cow-book-body" });
    body.createEl("strong", { text: this.book.title });
    body.createSpan({ text: this.book.author });
    const progress = this.book.totalPages === 0 ? 0 : Math.round(this.book.currentPage / this.book.totalPages * 100);
    const track = body.createDiv({ cls: "cow-month-progress-track" });
    track.createDiv({ cls: "cow-month-progress-fill is-pink", attr: { style: `width: ${progress}%` } });
    const controls = body.createDiv({ cls: "cow-book-controls" });
    const pageInput = controls.createEl("input", {
      type: "number",
      value: String(this.book.currentPage),
      attr: { min: "0", max: String(this.book.totalPages), "aria-label": "\u5F53\u524D\u9875\u6570" }
    });
    pageInput.addEventListener("change", async () => {
      await this.store.updateBookPage(this.book.id, Number(pageInput.value) || 0);
      this.onDataChanged();
    });
    controls.createSpan({ text: `/ ${this.book.totalPages}` });
    const open = controls.createEl("button", { attr: { type: "button", "aria-label": "\u6253\u5F00\u9605\u8BFB\u7B14\u8BB0" } });
    (0, import_obsidian22.setIcon)(open, "notebook-tabs");
    open.addEventListener("click", () => void this.openNote());
    const done = controls.createEl("button", { attr: { type: "button", "aria-label": "\u5B8C\u6210\u9605\u8BFB" } });
    (0, import_obsidian22.setIcon)(done, "check");
    done.addEventListener("click", async () => {
      await this.store.completeBook(this.book.id);
      this.onDataChanged();
    });
  }
  async openNote() {
    if (!this.book.notePath) {
      new import_obsidian22.Notice("\u8FD9\u672C\u4E66\u8FD8\u6CA1\u6709\u7ED1\u5B9A\u9605\u8BFB\u7B14\u8BB0\u3002");
      return;
    }
    const file = this.app.vault.getFileByPath(this.book.notePath);
    if (!file) {
      new import_obsidian22.Notice(`\u6CA1\u6709\u627E\u5230\u7B14\u8BB0\uFF1A${this.book.notePath}`);
      return;
    }
    await this.app.workspace.getLeaf(false).openFile(file);
  }
};

// src/components/reading/BookshelfSection.ts
var BookshelfSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const add = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    (0, import_obsidian23.setIcon)(add.createSpan(), "plus");
    add.createSpan({ text: "\u589E\u52A0\u4E66\u7C4D" });
    add.addEventListener("click", () => {
      new AddBookModal(this.app, async (book) => {
        await this.store.addBook(book);
        this.onDataChanged();
      }).open();
    });
    const grid = container.createDiv({ cls: "cow-book-grid" });
    this.store.getBooks().forEach((book) => new BookCard(this.app, this.store, book, this.onDataChanged).render(grid));
  }
};

// src/components/reading/CurrentReadingSection.ts
var CurrentReadingSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const current = this.store.getBooks().filter((book) => book.status === "\u5728\u8BFB").slice(0, 2);
    const grid = container.createDiv({ cls: "cow-book-grid" });
    current.forEach((book) => new BookCard(this.app, this.store, book, this.onDataChanged).render(grid));
  }
};

// src/components/reading/ReadingCheckinSection.ts
var import_obsidian24 = require("obsidian");
var ReadingCheckinSection = class {
  constructor(store, onDataChanged) {
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const dates = this.store.getCurrentWeekDates();
    const table = container.createDiv({ cls: "cow-habit-overview" });
    const header = table.createDiv({ cls: "cow-habit-overview-row cow-habit-overview-header" });
    header.createSpan();
    ["\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u65E5"].forEach((day) => header.createSpan({ text: day }));
    READING_HABITS.forEach((habit) => {
      const row = table.createDiv({ cls: "cow-habit-overview-row" });
      row.createSpan({ text: habit.label });
      dates.forEach((date) => {
        const done = this.store.isHabitCompleted(habit.id, date);
        const button = row.createEl("button", { cls: `cow-habit-dot ${done ? "is-done" : ""}`, attr: { type: "button" } });
        if (done) (0, import_obsidian24.setIcon)(button, "check");
        button.addEventListener("click", async () => {
          await this.store.toggleHabit(habit.id, date);
          this.onDataChanged();
        });
      });
    });
    table.createEl("p", { text: `\u4ECA\u5929\uFF1A${formatDateKey(/* @__PURE__ */ new Date())}` });
  }
};

// src/components/reading/ReadingHeatmapSection.ts
var ReadingHeatmapSection = class {
  constructor(store) {
    this.store = store;
  }
  render(container) {
    const now = /* @__PURE__ */ new Date();
    const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const grid = container.createDiv({ cls: "cow-reading-heatmap" });
    for (let day = 1; day <= days; day += 1) {
      const date = new Date(now.getFullYear(), now.getMonth(), day);
      const key = formatDateKey(date);
      const count = READING_HABITS.filter((habit) => this.store.isHabitCompleted(habit.id, key)).length;
      grid.createSpan({ cls: `level-${count}`, attr: { "aria-label": key } });
    }
  }
};

// src/components/reading/ReadingNotesSection.ts
var import_obsidian25 = require("obsidian");
var ReadingNotesSection = class {
  constructor(app, store) {
    this.app = app;
    this.store = store;
  }
  render(container) {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getBooks().forEach((book) => {
      var _a;
      const button = list.createEl("button", { cls: "cow-data-card cow-click-card", attr: { type: "button" } });
      button.createEl("strong", { text: book.title });
      button.createDiv({ cls: "cow-meta-line" }).createSpan({ text: (_a = book.notePath) != null ? _a : "\u672A\u7ED1\u5B9A\u9605\u8BFB\u7B14\u8BB0" });
      button.addEventListener("click", () => void this.openNote(book));
    });
  }
  async openNote(book) {
    if (!book.notePath) {
      new import_obsidian25.Notice("\u8FD9\u672C\u4E66\u8FD8\u6CA1\u6709\u7ED1\u5B9A\u9605\u8BFB\u7B14\u8BB0\u3002");
      return;
    }
    const file = this.app.vault.getFileByPath(book.notePath);
    if (file) await this.app.workspace.getLeaf(false).openFile(file);
  }
};

// src/components/reading/ReadingPlanSection.ts
var ReadingPlanSection = class {
  constructor(store) {
    this.store = store;
  }
  render(container) {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getBooks().filter((book) => book.status !== "\u5DF2\u8BFB").forEach((book) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: book.title });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({
        text: `${book.currentPage}/${book.totalPages} \u9875 \xB7 ${book.status}`
      });
    });
  }
};

// src/components/reading/ReadingQuotesSection.ts
var ReadingQuotesSection = class {
  constructor(store) {
    this.store = store;
  }
  render(container) {
    const list = container.createEl("ul", { cls: "cow-memo-list" });
    this.store.getReadingQuotes().forEach((quote) => {
      const item = list.createEl("li");
      item.createEl("blockquote", { text: quote.text });
      item.createSpan({ text: quote.source });
    });
  }
};

// src/components/reading/ReadingStatsSection.ts
var ReadingStatsSection = class {
  constructor(store) {
    this.store = store;
  }
  render(container) {
    const books = this.store.getBooks();
    const total = books.length;
    const finished = books.filter((book) => book.status === "\u5DF2\u8BFB").length;
    const pages = books.reduce((sum, book) => sum + book.currentPage, 0);
    const stats = [
      ["\u85CF\u4E66", `${total}\u672C`],
      ["\u5DF2\u8BFB", `${finished}\u672C`],
      ["\u7D2F\u8BA1\u9875\u6570", `${pages}\u9875`],
      ["\u5B8C\u6210\u7387", `${total === 0 ? 0 : Math.round(finished / total * 100)}%`]
    ];
    const grid = container.createDiv({ cls: "cow-reading-stat-grid" });
    stats.forEach(([label, value]) => {
      const item = grid.createDiv();
      item.createEl("strong", { text: value });
      item.createSpan({ text: label });
    });
  }
};

// src/components/research/DataAnalysisTasksSection.ts
var DataAnalysisTasksSection = class {
  render(container) {
    const tasks = [
      ["scRNA-seq \u6570\u636E\u9884\u5904\u7406", 80, "\u8FDB\u884C\u4E2D"],
      ["\u5DEE\u5F02\u57FA\u56E0\u5206\u6790", 100, "\u5DF2\u5B8C\u6210"],
      ["\u53EF\u89C6\u5316\u56FE\u8868\u751F\u6210", 30, "\u8FDB\u884C\u4E2D"],
      ["\u8BBA\u6587\u56FE\u8868\u6574\u7406", 50, "\u8FDB\u884C\u4E2D"]
    ];
    const list = container.createDiv({ cls: "cow-data-list" });
    tasks.forEach(([title, progress, status]) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: title });
      const meta = row.createDiv({ cls: "cow-meta-line" });
      meta.createSpan({ cls: "cow-status is-green", text: status });
      meta.createSpan({ text: `${progress}%` });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-green", attr: { style: `width: ${progress}%` } });
    });
  }
};

// src/components/research/ExperimentSection.ts
var import_obsidian26 = require("obsidian");
var ExperimentSection = class {
  constructor(app, store, mode) {
    this.app = app;
    this.store = store;
    this.mode = mode;
  }
  render(container) {
    const items = this.mode === "plan" ? this.store.getExperimentPlans() : this.store.getExperimentRecords();
    const list = container.createDiv({ cls: "cow-data-list" });
    items.forEach((item) => {
      const button = list.createEl("button", { cls: "cow-data-card cow-click-card", attr: { type: "button" } });
      button.createEl("strong", { text: item.title });
      const meta = button.createDiv({ cls: "cow-meta-line" });
      meta.createSpan({ cls: "cow-status is-yellow", text: item.status });
      meta.createSpan({ text: item.date });
      button.addEventListener("click", () => void this.openNote(item.notePath));
    });
  }
  async openNote(notePath) {
    if (!notePath) {
      new import_obsidian26.Notice("\u8FD9\u6761\u5B9E\u9A8C\u8BB0\u5F55\u8FD8\u6CA1\u6709\u7ED1\u5B9A Markdown\u3002");
      return;
    }
    const file = this.app.vault.getFileByPath(notePath);
    if (!file) {
      new import_obsidian26.Notice(`\u6CA1\u6709\u627E\u5230\u7B14\u8BB0\uFF1A${notePath}`);
      return;
    }
    await this.app.workspace.getLeaf(false).openFile(file);
  }
};

// src/components/research/LiteratureNotesSection.ts
var import_obsidian27 = require("obsidian");
var LiteratureNotesSection = class {
  constructor(app, store) {
    this.app = app;
    this.store = store;
  }
  render(container) {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getResearchPapers().forEach((paper) => {
      var _a;
      const button = list.createEl("button", { cls: "cow-data-card cow-click-card", attr: { type: "button" } });
      button.createEl("strong", { text: paper.title });
      button.createDiv({ cls: "cow-meta-line" }).createSpan({ text: (_a = paper.notePath) != null ? _a : "\u672A\u7ED1\u5B9A\u7B14\u8BB0" });
      button.addEventListener("click", () => void this.openNote(paper.notePath));
    });
  }
  async openNote(notePath) {
    if (!notePath) {
      new import_obsidian27.Notice("\u8FD8\u6CA1\u6709\u7ED1\u5B9A\u6587\u732E\u7B14\u8BB0\u3002");
      return;
    }
    const file = this.app.vault.getFileByPath(notePath);
    if (file) await this.app.workspace.getLeaf(false).openFile(file);
  }
};

// src/components/research/PaperQueueSection.ts
var import_obsidian28 = require("obsidian");
var PaperQueueSection = class {
  constructor(app, store) {
    this.app = app;
    this.store = store;
  }
  render(container) {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getResearchPapers().forEach((paper) => {
      const button = list.createEl("button", { cls: "cow-data-card cow-click-card", attr: { type: "button" } });
      button.createEl("strong", { text: paper.title });
      const meta = button.createDiv({ cls: "cow-meta-line" });
      meta.createSpan({ cls: "cow-status is-blue", text: paper.status });
      meta.createSpan({ text: `${paper.venue} ${paper.year}` });
      const track = button.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-blue", attr: { style: `width: ${paper.readingProgress}%` } });
      button.addEventListener("click", () => void this.openNote(paper.notePath));
    });
  }
  async openNote(notePath) {
    if (!notePath) {
      new import_obsidian28.Notice("\u8FD9\u7BC7\u6587\u732E\u8FD8\u6CA1\u6709\u7ED1\u5B9A\u7B14\u8BB0\u3002");
      return;
    }
    const file = this.app.vault.getFileByPath(notePath);
    if (!file) {
      new import_obsidian28.Notice(`\u6CA1\u6709\u627E\u5230\u7B14\u8BB0\uFF1A${notePath}`);
      return;
    }
    await this.app.workspace.getLeaf(false).openFile(file);
  }
};

// src/components/research/ResearchCheckinSection.ts
var import_obsidian29 = require("obsidian");
var ResearchCheckinSection = class {
  constructor(store, onDataChanged) {
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const dates = this.store.getCurrentWeekDates();
    const table = container.createDiv({ cls: "cow-habit-overview" });
    const header = table.createDiv({ cls: "cow-habit-overview-row cow-habit-overview-header" });
    header.createSpan();
    ["\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u65E5"].forEach((day) => header.createSpan({ text: day }));
    RESEARCH_HABITS.forEach((habit) => {
      const row = table.createDiv({ cls: "cow-habit-overview-row" });
      row.createSpan({ text: habit.label });
      dates.forEach((date) => {
        const done = this.store.isHabitCompleted(habit.id, date);
        const button = row.createEl("button", { cls: `cow-habit-dot ${done ? "is-done" : ""}`, attr: { type: "button" } });
        if (done) (0, import_obsidian29.setIcon)(button, "check");
        button.addEventListener("click", async () => {
          await this.store.toggleHabit(habit.id, date);
          this.onDataChanged();
        });
      });
    });
    table.createEl("p", { text: `\u4ECA\u5929\uFF1A${formatDateKey(/* @__PURE__ */ new Date())}` });
  }
};

// src/components/research/ResearchMemoSection.ts
var ResearchMemoSection = class {
  constructor(store) {
    this.store = store;
  }
  render(container) {
    const list = container.createEl("ul", { cls: "cow-memo-list" });
    this.store.getResearchMemos().forEach((memo) => list.createEl("li", { text: memo }));
  }
};

// src/components/research/ResearchProjectsSection.ts
var ResearchProjectsSection = class {
  constructor(app, store) {
    this.app = app;
    this.store = store;
  }
  render(container) {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getResearchProjects().forEach((project) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: project.title });
      const meta = row.createDiv({ cls: "cow-meta-line" });
      meta.createSpan({ cls: "cow-status is-green", text: project.status });
      meta.createSpan({ text: `${project.startDate} -> ${project.deadline}` });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-green", attr: { style: `width: ${project.progress}%` } });
      const tags = row.createDiv({ cls: "cow-tag-row" });
      project.tags.forEach((tag) => tags.createSpan({ text: tag }));
    });
  }
};

// src/components/research/ResearchTimelineSection.ts
var ResearchTimelineSection = class {
  constructor(store) {
    this.store = store;
  }
  render(container) {
    const list = container.createDiv({ cls: "cow-timeline" });
    this.store.getResearchDeadlines().forEach((ddl) => {
      const item = list.createDiv({ cls: `cow-timeline-item priority-${ddl.priority}` });
      item.createEl("time", { text: ddl.date });
      item.createEl("strong", { text: ddl.title });
      item.createSpan({ text: ddl.type });
    });
  }
};

// src/components/DashboardSection.ts
var ConfirmDeleteSectionModal = class extends import_obsidian30.Modal {
  constructor(app, section, onConfirm) {
    super(app);
    this.section = section;
    this.onConfirm = onConfirm;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("cow-modal");
    contentEl.createEl("h2", { text: `\u5220\u9664\u201C${this.section.title}\u201D\u5206\u533A\uFF1F` });
    contentEl.createEl("p", { text: "\u53EA\u4F1A\u4ECE\u5F53\u524D\u5DE5\u4F5C\u53F0\u5E03\u5C40\u79FB\u9664\uFF0C\u4E0D\u4F1A\u5220\u9664\u4EFB\u4F55 Markdown \u6587\u4EF6\u3002" });
    const actions = contentEl.createDiv({ cls: "cow-modal-actions" });
    const cancel = actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } });
    cancel.addEventListener("click", () => this.close());
    const remove = actions.createEl("button", {
      text: "\u5220\u9664",
      cls: "mod-warning",
      attr: { type: "button" }
    });
    remove.addEventListener("click", async () => {
      await this.onConfirm();
      this.close();
    });
  }
};
var DashboardSection = class {
  constructor(app, store, section, onRemove, onDataChanged) {
    this.app = app;
    this.store = store;
    this.section = section;
    this.onRemove = onRemove;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    var _a, _b;
    const sectionEl = container.createDiv({
      cls: `cow-section cow-section-${(_a = this.section.width) != null ? _a : "md"} cow-section-height-${(_b = this.section.height) != null ? _b : "sm"}`
    });
    const header = sectionEl.createDiv({ cls: "cow-section-header" });
    const title = header.createDiv({ cls: "cow-section-title" });
    (0, import_obsidian30.setIcon)(title.createSpan(), this.getIcon());
    title.createEl("h3", { text: this.section.title });
    const removeButton = header.createEl("button", {
      cls: "cow-icon-button",
      attr: { type: "button", "aria-label": `\u5220\u9664${this.section.title}` }
    });
    (0, import_obsidian30.setIcon)(removeButton, "trash-2");
    removeButton.addEventListener("click", () => {
      new ConfirmDeleteSectionModal(this.app, this.section, () => this.onRemove(this.section)).open();
    });
    const content = sectionEl.createDiv({ cls: "cow-section-content" });
    this.renderContent(content);
  }
  renderContent(container) {
    switch (this.section.type) {
      case "weekly-completion":
      case "pending-tasks":
      case "today-focus-stat":
      case "checkin-streak":
        new OverviewStatsSection(this.store, this.section.type).render(container);
        break;
      case "today-focus":
      case "today-tasks":
        new TodayFocusSection(this.store, this.onDataChanged).render(container);
        break;
      case "habit-overview":
      case "habit-summary":
        new HabitOverviewSection(this.store, this.onDataChanged).render(container);
        break;
      case "monthly-progress":
        new MonthlyProgressSection().render(container);
        break;
      case "monthly-calendar":
      case "month-calendar":
        new MonthlyCalendarSection(this.app, this.store).render(container);
        break;
      case "recent-notes":
        new RecentNotesSection(this.app).render(container);
        break;
      case "quick-actions":
        new QuickActionsSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "contribution-heatmap":
      case "year-heatmap":
        new ContributionHeatmapSection(this.app).render(container);
        break;
      case "research-projects":
        new ResearchProjectsSection(this.app, this.store).render(container);
        break;
      case "reading-queue":
        new PaperQueueSection(this.app, this.store).render(container);
        break;
      case "research-checkin":
        new ResearchCheckinSection(this.store, this.onDataChanged).render(container);
        break;
      case "experiment-plan":
        new ExperimentSection(this.app, this.store, "plan").render(container);
        break;
      case "experiment-records":
        new ExperimentSection(this.app, this.store, "records").render(container);
        break;
      case "data-analysis-tasks":
        new DataAnalysisTasksSection().render(container);
        break;
      case "literature-notes":
        new LiteratureNotesSection(this.app, this.store).render(container);
        break;
      case "research-timeline":
        new ResearchTimelineSection(this.store).render(container);
        break;
      case "research-memo":
        new ResearchMemoSection(this.store).render(container);
        break;
      case "current-reading":
        new CurrentReadingSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "bookshelf":
        new BookshelfSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "reading-plan":
        new ReadingPlanSection(this.store).render(container);
        break;
      case "reading-checkin":
        new ReadingCheckinSection(this.store, this.onDataChanged).render(container);
        break;
      case "reading-notes":
        new ReadingNotesSection(this.app, this.store).render(container);
        break;
      case "reading-quotes":
        new ReadingQuotesSection(this.store).render(container);
        break;
      case "finished-books":
        new BookListSection(this.store, "\u5DF2\u8BFB").render(container);
        break;
      case "wishlist-books":
        new BookListSection(this.store, "\u60F3\u8BFB").render(container);
        break;
      case "reading-stats":
        new ReadingStatsSection(this.store).render(container);
        break;
      case "reading-heatmap":
        new ReadingHeatmapSection(this.store).render(container);
        break;
      case "ai-reading-review":
        new AiReadingReviewSection().render(container);
        break;
      case "today-workout":
        new TodayWorkoutSection(this.store).render(container);
        break;
      case "workout-plan":
        new WorkoutPlanSection(this.store).render(container);
        break;
      case "fitness-checkin":
        new FitnessCheckinSection(this.store, this.onDataChanged).render(container);
        break;
      case "body-measurements":
        new BodyMeasurementsSection(this.store).render(container);
        break;
      case "cardio-strength-plan":
        new CardioStrengthSection(this.store).render(container);
        break;
      case "water-sleep-habits":
        new WaterSleepHabitsSection(this.store).render(container);
        break;
      case "fitness-stats":
        new FitnessStatsSection(this.store).render(container);
        break;
      case "workout-log":
        new WorkoutLogSection(this.store).render(container);
        break;
      case "fitness-goals":
        new FitnessGoalsSection(this.store).render(container);
        break;
      case "health-reminders":
        new HealthRemindersSection().render(container);
        break;
      case "fitness-heatmap":
        new FitnessHeatmapSection(this.store).render(container);
        break;
      case "monthly-budget":
        new MonthlyBudgetSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "expense-categories":
        new ExpenseCategoriesSection(this.store).render(container);
        break;
      case "account-overview":
        new AccountOverviewSection(this.store).render(container);
        break;
      case "saving-goals":
        new SavingGoalsSection(this.store).render(container);
        break;
      case "bill-reminders":
        new BillRemindersSection(this.store).render(container);
        break;
      case "finance-checkin":
        new FinanceCheckinSection(this.store, this.onDataChanged).render(container);
        break;
      case "income-expense-trend":
        new IncomeExpenseTrendSection(this.store).render(container);
        break;
      case "finance-todos":
        new FinanceTodosSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "investment-watch":
        new InvestmentWatchSection().render(container);
        break;
      case "expense-heatmap":
        new ExpenseHeatmapSection(this.store).render(container);
        break;
      case "yearly-goals":
        new YearlyGoalsSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "quarterly-okr":
        new QuarterlyOkrSection(this.store).render(container);
        break;
      case "monthly-key-results":
        new MonthlyKeyResultsSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "goal-breakdown":
        new GoalBreakdownSection(this.store).render(container);
        break;
      case "milestone-timeline":
        new MilestoneTimelineSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "priority-matrix":
        new PriorityMatrixSection().render(container);
        break;
      case "goals-checkin":
        new GoalsCheckinSection(this.store, this.onDataChanged).render(container);
        break;
      case "review-checklist":
        new ReviewChecklistSection().render(container);
        break;
      case "risks-blockers":
        new RisksBlockersSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "long-term-progress":
        new LongTermProgressSection(this.store).render(container);
        break;
      case "enabled-modules-overview":
        new EnabledModulesOverviewSection(this.store).render(container);
        break;
      case "home-layout-manager":
        new HomeLayoutManagerSection(this.store, this.onDataChanged).render(container);
        break;
      case "module-settings":
        new ModuleSwitchSortSection(this.store, this.onDataChanged).render(container);
        break;
      case "banner-background-settings":
        new BannerBackgroundSettingsSection(this.store, this.onDataChanged).render(container);
        break;
      case "calendar-widget-settings":
        new CalendarWidgetSettingsSection(this.store, this.onDataChanged).render(container);
        break;
      case "apex-habit-settings":
        new ApexHabitSettingsSection(this.store, this.onDataChanged).render(container);
        break;
      case "quick-action-settings":
        new QuickActionSettingsSection(this.store, this.onDataChanged).render(container);
        break;
      case "theme-color-settings":
        new ThemeColorSettingsSection(this.store, this.onDataChanged).render(container);
        break;
      case "data-source-status":
        new DataSourceStatusSection().render(container);
        break;
      default:
        container.createEl("p", { text: "\u8FD9\u662F\u4E00\u4E2A\u53EF\u914D\u7F6E\u529F\u80FD\u5206\u533A\uFF0C\u540E\u7EED\u53EF\u4EE5\u63A5\u5165\u771F\u5B9E\u6A21\u5757\u7EC4\u4EF6\u3002" });
    }
  }
  getIcon() {
    var _a;
    const iconMap = {
      "weekly-completion": "badge-percent",
      "pending-tasks": "clipboard-list",
      "today-focus-stat": "headphones",
      "checkin-streak": "flame",
      "today-focus": "target",
      "today-tasks": "target",
      "habit-overview": "calendar-check",
      "habit-summary": "calendar-check",
      "monthly-progress": "bar-chart-3",
      "monthly-calendar": "calendar-days",
      "month-calendar": "calendar-days",
      "recent-notes": "file-text",
      "quick-actions": "zap",
      "contribution-heatmap": "activity",
      "year-heatmap": "activity",
      memo: "sticky-note",
      todo: "list-checks",
      projects: "folder-kanban",
      notes: "notebook-tabs",
      "research-projects": "layers",
      "reading-queue": "book-marked",
      "research-checkin": "calendar-check",
      "experiment-plan": "clipboard-check",
      "experiment-records": "file-clock",
      "data-analysis-tasks": "bar-chart-3",
      "literature-notes": "notebook-text",
      "research-timeline": "calendar-clock",
      "research-memo": "lightbulb",
      "current-reading": "book-open-check",
      bookshelf: "library",
      "reading-plan": "calendar-range",
      "reading-checkin": "calendar-check",
      "reading-notes": "notebook-tabs",
      "reading-quotes": "quote",
      "finished-books": "badge-check",
      "wishlist-books": "bookmark-plus",
      "reading-stats": "pie-chart",
      "reading-heatmap": "activity",
      "ai-reading-review": "sparkles",
      "today-workout": "dumbbell",
      "workout-plan": "clipboard-list",
      "fitness-checkin": "calendar-check",
      "body-measurements": "ruler",
      "cardio-strength-plan": "heart-pulse",
      "water-sleep-habits": "moon",
      "fitness-stats": "flame",
      "workout-log": "notebook-text",
      "fitness-goals": "target",
      "health-reminders": "bell-ring",
      "fitness-heatmap": "activity",
      "monthly-budget": "wallet-cards",
      "expense-categories": "chart-pie",
      "account-overview": "landmark",
      "saving-goals": "piggy-bank",
      "bill-reminders": "receipt",
      "finance-checkin": "calendar-check",
      "income-expense-trend": "line-chart",
      "finance-todos": "list-checks",
      "investment-watch": "candlestick-chart",
      "expense-heatmap": "activity",
      "yearly-goals": "flag",
      "quarterly-okr": "target",
      "monthly-key-results": "list-checks",
      "goal-breakdown": "git-branch",
      "milestone-timeline": "milestone",
      "priority-matrix": "layout-dashboard",
      "goals-checkin": "calendar-check",
      "review-checklist": "clipboard-check",
      "risks-blockers": "triangle-alert",
      "long-term-progress": "trending-up",
      "enabled-modules-overview": "panel-top",
      "home-layout-manager": "layout-template",
      "module-settings": "sliders-horizontal",
      "banner-background-settings": "image",
      "calendar-widget-settings": "calendar-days",
      "apex-habit-settings": "calendar-check",
      "quick-action-settings": "zap",
      "theme-color-settings": "palette",
      "data-source-status": "database"
    };
    return (_a = iconMap[this.section.type]) != null ? _a : "sparkles";
  }
};

// src/components/AddSectionButton.ts
var import_obsidian31 = require("obsidian");
var AddSectionModal = class extends import_obsidian31.Modal {
  constructor(app, page, modules, onSelect) {
    super(app);
    this.page = page;
    this.modules = modules;
    this.onSelect = onSelect;
  }
  onOpen() {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "\u6DFB\u52A0\u529F\u80FD\u5206\u533A" });
    this.contentEl.createEl("p", { text: "\u9009\u62E9\u4E00\u4E2A\u6A21\u5757\u540E\u4F1A\u7ACB\u5373\u52A0\u5165\u5F53\u524D\u9875\u9762\u5E76\u4FDD\u5B58\u5E03\u5C40\u3002" });
    const grid = this.contentEl.createDiv({ cls: "cow-add-module-grid" });
    this.modules.forEach((module2) => {
      const button = grid.createEl("button", {
        cls: "cow-add-module-card",
        attr: { type: "button" }
      });
      (0, import_obsidian31.setIcon)(button.createSpan({ cls: "cow-add-module-icon" }), module2.icon);
      button.createEl("strong", { text: module2.title });
      button.createEl("span", { text: module2.description });
      button.addEventListener("click", async () => {
        await this.onSelect(module2.type);
        this.close();
      });
    });
    if (this.modules.length === 0) {
      grid.createEl("p", { text: `${this.page} \u9875\u9762\u6682\u65E0\u53EF\u6DFB\u52A0\u6A21\u5757\u3002` });
    }
  }
};
var AddSectionButton = class {
  constructor(app, page, modules, onAdd) {
    this.app = app;
    this.page = page;
    this.modules = modules;
    this.onAdd = onAdd;
  }
  render(container) {
    const button = container.createEl("button", {
      cls: "cow-add-section-button",
      attr: { type: "button" }
    });
    (0, import_obsidian31.setIcon)(button.createSpan(), "plus");
    button.createSpan({ text: "\u6DFB\u52A0\u529F\u80FD\u5206\u533A" });
    button.addEventListener("click", () => {
      new AddSectionModal(this.app, this.page, this.modules, this.onAdd).open();
    });
  }
};

// src/components/DashboardGrid.ts
var DashboardGrid = class {
  constructor(app, store, page, onDataChanged) {
    this.app = app;
    this.store = store;
    this.page = page;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const grid = container.createDiv({ cls: "cow-dashboard-grid" });
    const sections = this.store.getSectionsForPage(this.page);
    sections.forEach((section) => {
      new DashboardSection(this.app, this.store, section, async (removedSection) => {
        await this.store.removeSection(removedSection.id);
        this.onDataChanged();
      }, this.onDataChanged).render(grid);
    });
    new AddSectionButton(this.app, this.page, this.store.getAvailableModules(this.page), async (moduleType) => {
      await this.store.addSection(this.page, moduleType);
      this.onDataChanged();
    }).render(container);
  }
};

// src/pages/BaseDashboardPage.ts
var BaseDashboardPage = class {
  constructor(app, store, page, onDataChanged) {
    this.app = app;
    this.store = store;
    this.page = page;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const definition = this.store.getPages().find((item) => item.id === this.page);
    const pageEl = container.createDiv({ cls: "cow-page" });
    const heading = pageEl.createDiv({ cls: "cow-page-heading" });
    heading.createEl("h1", { text: definition.label });
    heading.createEl("p", { text: definition.description });
    new DashboardGrid(this.app, this.store, this.page, this.onDataChanged).render(pageEl);
  }
};

// src/pages/OverviewPage.ts
var OverviewPage = class extends BaseDashboardPage {
};

// src/pages/ResearchPage.ts
var ResearchPage = class extends BaseDashboardPage {
};

// src/pages/ReadingPage.ts
var ReadingPage = class extends BaseDashboardPage {
};

// src/pages/FitnessPage.ts
var FitnessPage = class extends BaseDashboardPage {
};

// src/pages/FinancePage.ts
var FinancePage = class extends BaseDashboardPage {
};

// src/pages/GoalsPage.ts
var GoalsPage = class extends BaseDashboardPage {
};

// src/pages/ModulesPage.ts
var import_obsidian32 = require("obsidian");
var ResetDefaultsModal = class extends import_obsidian32.Modal {
  constructor(app, onConfirm) {
    super(app);
    this.onConfirm = onConfirm;
  }
  onOpen() {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "\u6062\u590D\u9ED8\u8BA4\u914D\u7F6E\uFF1F" });
    this.contentEl.createEl("p", { text: "\u8FD9\u4F1A\u91CD\u7F6E\u5DE5\u4F5C\u53F0\u5E03\u5C40\u3001\u4E3B\u9898\u3001\u6A21\u5757\u548C\u5185\u90E8\u793A\u4F8B\u6570\u636E\u3002" });
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "\u6062\u590D\u9ED8\u8BA4", cls: "mod-warning", attr: { type: "button" } }).addEventListener("click", async () => {
      await this.onConfirm();
      this.close();
    });
  }
};
var ModulesPage = class {
  constructor(app, store, page, onDataChanged) {
    this.app = app;
    this.store = store;
    this.page = page;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const definition = this.store.getPages().find((item) => item.id === this.page);
    const pageEl = container.createDiv({ cls: "cow-page" });
    const heading = pageEl.createDiv({ cls: "cow-page-heading cow-modules-heading" });
    const title = heading.createDiv();
    title.createEl("h1", { text: definition.label });
    title.createEl("p", { text: definition.description });
    this.renderActions(heading);
    new DashboardGrid(this.app, this.store, this.page, this.onDataChanged).render(pageEl);
  }
  renderActions(container) {
    const actions = container.createDiv({ cls: "cow-config-actions" });
    const importInput = actions.createEl("input", { type: "file", attr: { accept: "application/json" } });
    importInput.addClass("cow-hidden-input");
    const importButton = actions.createEl("button", { attr: { type: "button" } });
    (0, import_obsidian32.setIcon)(importButton.createSpan(), "upload");
    importButton.createSpan({ text: "\u5BFC\u5165\u914D\u7F6E" });
    importButton.addEventListener("click", () => importInput.click());
    importInput.addEventListener("change", () => {
      var _a;
      const file = (_a = importInput.files) == null ? void 0 : _a[0];
      if (!file) return;
      readJsonFile(file, async (data) => {
        await this.store.importData(data);
        new import_obsidian32.Notice("\u914D\u7F6E\u5DF2\u5BFC\u5165\u3002");
        this.onDataChanged();
      });
    });
    const exportButton = actions.createEl("button", { attr: { type: "button" } });
    (0, import_obsidian32.setIcon)(exportButton.createSpan(), "download");
    exportButton.createSpan({ text: "\u5BFC\u51FA\u914D\u7F6E" });
    exportButton.addEventListener("click", () => {
      downloadJson("cute-obsidian-workbench-config.json", this.store.exportData());
    });
    const resetButton = actions.createEl("button", { cls: "mod-warning", attr: { type: "button" } });
    (0, import_obsidian32.setIcon)(resetButton.createSpan(), "rotate-ccw");
    resetButton.createSpan({ text: "\u6062\u590D\u9ED8\u8BA4" });
    resetButton.addEventListener("click", () => {
      new ResetDefaultsModal(this.app, async () => {
        await this.store.resetToDefaults();
        this.onDataChanged();
      }).open();
    });
  }
};

// src/views/WorkbenchView.ts
var WORKBENCH_VIEW_TYPE = "cute-obsidian-workbench-view";
var WorkbenchView = class extends import_obsidian33.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this.eventBus = new EventBus();
    this.router = new DashboardRouter(this.eventBus, this.plugin.store.getData().currentPage);
  }
  getViewType() {
    return WORKBENCH_VIEW_TYPE;
  }
  getDisplayText() {
    return "Cute Workbench";
  }
  getIcon() {
    return "leaf";
  }
  async onOpen() {
    this.eventBus.on(ROUTE_CHANGED_EVENT, async (page) => {
      await this.plugin.store.setCurrentPage(page);
      this.render();
    });
    this.render();
  }
  async onClose() {
    var _a;
    (_a = this.sidebar) == null ? void 0 : _a.destroy();
    this.eventBus.clear();
  }
  render() {
    var _a;
    const container = this.containerEl.children[1];
    container.empty();
    container.addClass("cute-obsidian-workbench");
    this.applyTheme(container);
    (_a = this.sidebar) == null ? void 0 : _a.destroy();
    const shell = container.createDiv({ cls: `cow-shell cow-layout-${this.plugin.store.getData().userSettings.overviewLayout}` });
    this.sidebar = new Sidebar(this.app, this.router.getCurrentPage(), [
      { label: "\u5DE5\u4F5C\u53F0", icon: "home", onClick: () => this.router.navigate("overview") },
      { label: "\u6BCF\u65E5\u7B14\u8BB0", icon: "calendar-days", onClick: () => new import_obsidian33.Notice("\u6BCF\u65E5\u7B14\u8BB0\u670D\u52A1\u5C06\u5728\u4E0B\u4E00\u9636\u6BB5\u63A5\u5165\u3002") },
      { label: "\u7B14\u8BB0\u7BA1\u7406", icon: "notebook-tabs", onClick: () => new import_obsidian33.Notice("\u7B14\u8BB0\u7BA1\u7406\u670D\u52A1\u5C06\u5728\u4E0B\u4E00\u9636\u6BB5\u63A5\u5165\u3002") },
      { label: "\u5168\u90E8\u6587\u4EF6", icon: "files", onClick: () => new import_obsidian33.Notice("\u6587\u4EF6\u76EE\u5F55\u5FEB\u6377\u5165\u53E3\u5DF2\u9884\u7559\u3002") },
      { label: "\u6A21\u5757\u7BA1\u7406", icon: "layout-grid", onClick: () => this.router.navigate("modules") }
    ]);
    this.sidebar.render(shell);
    const main = shell.createDiv({ cls: "cow-main" });
    new TopBanner(this.plugin.store.getData.bind(this.plugin.store), async () => {
      const current = this.plugin.store.getData().banner.background;
      const next = current === "pink-paper" ? "cream-stars" : current === "cream-stars" ? "soft-hearts" : "pink-paper";
      await this.plugin.store.updateBanner({ background: next, imageDataUrl: void 0 });
      this.render();
      new import_obsidian33.Notice("\u5DF2\u66F4\u6362 Banner \u80CC\u666F\u3002");
    }).render(main);
    new TopNavigation(this.plugin.store.getPages(), () => this.router.getCurrentPage(), (page) => {
      this.router.navigate(page);
    }).render(main);
    const pageHost = main.createDiv({ cls: "cow-page-host" });
    this.renderPage(pageHost, this.router.getCurrentPage());
  }
  renderPage(container, page) {
    const refresh = () => this.render();
    const pageMap = {
      overview: new OverviewPage(this.app, this.plugin.store, "overview", refresh),
      research: new ResearchPage(this.app, this.plugin.store, "research", refresh),
      reading: new ReadingPage(this.app, this.plugin.store, "reading", refresh),
      fitness: new FitnessPage(this.app, this.plugin.store, "fitness", refresh),
      finance: new FinancePage(this.app, this.plugin.store, "finance", refresh),
      goals: new GoalsPage(this.app, this.plugin.store, "goals", refresh),
      modules: new ModulesPage(this.app, this.plugin.store, "modules", refresh)
    };
    pageMap[page].render(container);
  }
  applyTheme(container) {
    const theme = this.plugin.store.getData().theme;
    container.style.setProperty("--cute-bg", theme.cuteBg);
    container.style.setProperty("--cute-card", theme.cuteCard);
    container.style.setProperty("--cute-primary", theme.cutePrimary);
    container.style.setProperty("--cute-secondary", theme.cuteSecondary);
    container.style.setProperty("--cute-text", theme.cuteText);
    container.style.setProperty("--cute-border", theme.cuteBorder);
    container.style.setProperty("--cute-radius", `${theme.cuteRadius}px`);
    container.style.setProperty("--cute-shadow", theme.cuteShadow);
    container.style.setProperty("--cute-card-opacity", String(theme.cardOpacity));
    container.style.setProperty("--cute-texture-strength", String(theme.textureStrength));
    container.style.setProperty("--cute-font-size", `${theme.fontSize}px`);
  }
};

// src/main.ts
var CuteObsidianWorkbenchPlugin = class extends import_obsidian34.Plugin {
  async onload() {
    this.store = new DashboardStore(
      () => this.loadData(),
      (data) => this.saveData(data)
    );
    await this.store.load();
    this.registerView(
      WORKBENCH_VIEW_TYPE,
      (leaf) => new WorkbenchView(leaf, this)
    );
    this.addRibbonIcon("leaf", "\u6253\u5F00 Cute Workbench", async () => {
      await this.activateWorkbenchView();
    });
    this.addCommand({
      id: "open-cute-workbench",
      name: "Open Cute Workbench",
      callback: async () => {
        await this.activateWorkbenchView();
      }
    });
    this.addSettingTab(new WorkbenchSettingTab(this.app, this));
  }
  onunload() {
    this.app.workspace.detachLeavesOfType(WORKBENCH_VIEW_TYPE);
  }
  async activateWorkbenchView() {
    const existingLeaves = this.app.workspace.getLeavesOfType(WORKBENCH_VIEW_TYPE);
    let leaf = existingLeaves[0];
    if (!leaf) {
      leaf = this.app.workspace.getLeaf("tab");
      await leaf.setViewState({
        type: WORKBENCH_VIEW_TYPE,
        active: true
      });
    }
    this.app.workspace.revealLeaf(leaf);
  }
};

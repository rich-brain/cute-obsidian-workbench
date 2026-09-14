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
var import_obsidian70 = require("obsidian");

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
  { type: "section-manager", title: "\u529F\u80FD\u5206\u533A\u7BA1\u7406", description: "\u6309\u9875\u9762\u7BA1\u7406\u542F\u7528\u3001\u9690\u85CF\u3001\u5220\u9664\u3001\u6392\u5E8F\u3001\u989C\u8272\u3001\u5BBD\u5EA6\u548C\u81EA\u5B9A\u4E49\u5206\u533A\u3002", page: "modules", icon: "rows-3", defaultWidth: "full", defaultHeight: "lg" },
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
  dataVersion: "0.3.0",
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
    createSection("modules", "section-manager", "\u529F\u80FD\u5206\u533A\u7BA1\u7406", 30, "full", "lg"),
    createSection("modules", "module-settings", "\u6A21\u5757\u5F00\u5173\u4E0E\u6392\u5E8F", 40, "full", "lg"),
    createSection("modules", "banner-background-settings", "Banner \u80CC\u666F\u8BBE\u7F6E", 50),
    createSection("modules", "calendar-widget-settings", "\u65E5\u5386\u7EC4\u4EF6\u8BBE\u7F6E", 60),
    createSection("modules", "apex-habit-settings", "Apex \u6253\u5361\u6A21\u5757\u8BBE\u7F6E", 70),
    createSection("modules", "quick-action-settings", "\u5FEB\u6377\u64CD\u4F5C\u914D\u7F6E", 80),
    createSection("modules", "theme-color-settings", "\u4E3B\u9898\u4E0E\u914D\u8272", 90),
    createSection("modules", "data-source-status", "\u6570\u636E\u6E90", 100)
  ],
  banner: {
    message: "\u8981\u6210\u529F\uFF0C\u5148\u53D1\u75AF\uFF0C\u4E0D\u987E\u4E00\u5207\u5411\u524D\u51B2\u3002",
    subtitle: "\u628A\u60F3\u6CD5\u53D8\u6210\u884C\u52A8\uFF0C\u8BA9\u6BCF\u4E00\u5929\u90FD\u66F4\u9760\u8FD1\u7406\u60F3\u7684\u81EA\u5DF1\u3002",
    background: "pink-paper",
    backgroundPosition: "center",
    overlay: true,
    opacity: 0.88,
    sidebarAvatar: { type: "preset", value: "dog" },
    bannerAvatar: { type: "preset", value: "dog" }
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
  dataAnalysisTasks: [
    { id: "analysis-scrna", title: "scRNA-seq \u6570\u636E\u9884\u5904\u7406", progress: 80, status: "\u8FDB\u884C\u4E2D" },
    { id: "analysis-deg", title: "\u5DEE\u5F02\u57FA\u56E0\u5206\u6790", progress: 100, status: "\u5DF2\u5B8C\u6210" },
    { id: "analysis-chart", title: "\u53EF\u89C6\u5316\u56FE\u8868\u751F\u6210", progress: 30, status: "\u8FDB\u884C\u4E2D" },
    { id: "analysis-paper", title: "\u8BBA\u6587\u56FE\u8868\u6574\u7406", progress: 50, status: "\u8FDB\u884C\u4E2D" }
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
    { id: "measure-2026-09-01", date: "2026-09-01", weight: 58.8, bmi: 21.6, waist: 70, chest: 84, hip: 91 },
    { id: "measure-2026-09-08", date: "2026-09-08", weight: 58.2, bmi: 21.4, waist: 69, chest: 84, hip: 90 },
    { id: "measure-2026-09-14", date: "2026-09-14", weight: 57.9, bmi: 21.3, waist: 68, chest: 84, hip: 90 }
  ],
  fitnessGoals: [
    { id: "fitness-goal-weight", title: "\u7A33\u5B9A\u4F53\u91CD", current: 57.9, target: 56.5, unit: "kg", deadline: "2026-12-31" },
    { id: "fitness-goal-cardio", title: "\u672C\u6708\u6709\u6C27", current: 210, target: 600, unit: "min", deadline: "2026-09-30" },
    { id: "fitness-goal-strength", title: "\u529B\u91CF\u8BAD\u7EC3", current: 6, target: 12, unit: "\u6B21", deadline: "2026-09-30" }
  ],
  healthReminders: [
    { id: "health-warmup", title: "\u8BAD\u7EC3\u524D\u70ED\u8EAB 8 \u5206\u949F\u3002" },
    { id: "health-stand", title: "\u4E45\u5750 50 \u5206\u949F\u540E\u8D77\u8EAB\u6D3B\u52A8\u3002" },
    { id: "health-protein", title: "\u529B\u91CF\u65E5\u540E\u8865\u5145\u86CB\u767D\u8D28\u548C\u7761\u7720\u3002" },
    { id: "health-recovery", title: "\u72B6\u6001\u5DEE\u65F6\u5141\u8BB8\u964D\u5F3A\u5EA6\uFF0C\u4E0D\u786C\u625B\u3002" }
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
  financeTodos: [
    { id: "finance-todo-transport", title: "\u8BB0\u5F55\u672C\u5468\u4EA4\u901A\u652F\u51FA", completed: false },
    { id: "finance-todo-food", title: "\u68C0\u67E5\u9910\u996E\u9884\u7B97", completed: true },
    { id: "finance-todo-bills", title: "\u786E\u8BA4\u8D26\u5355\u63D0\u9192", completed: false },
    { id: "finance-todo-invest", title: "\u6574\u7406\u6295\u8D44\u89C2\u5BDF\u7B14\u8BB0", completed: false }
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
  calendarTodos: [],
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
  focusSettings: {
    focusDuration: 25,
    breakDuration: 5,
    autoStartBreak: false,
    autoStartNextFocus: false,
    defaultBackground: "pink"
  },
  focusState: {
    isRunning: false,
    isPaused: false,
    mode: "focus",
    remainingSeconds: 25 * 60
  },
  focusRecords: [],
  fitnessDailyRecords: [
    { date: "2026-09-14", waterCups: 5, waterGoal: 8, sleepHours: 7, sleepGoal: 8, bedtime: "23:30", wakeTime: "07:00" }
  ],
  investmentWatchItems: [
    { id: "watch-hs300", name: "\u6CAA\u6DF1300", code: "CSI300", price: 3800, changePercent: 0.8, type: "\u6307\u6570" },
    { id: "watch-btc", name: "\u6BD4\u7279\u5E01", code: "BTC", price: 65e3, changePercent: -1.2, type: "\u52A0\u5BC6\u8D44\u4EA7" },
    { id: "watch-gold", name: "\u9EC4\u91D1", code: "XAU", price: 2380, changePercent: 0.3, type: "\u5546\u54C1" }
  ],
  priorityMatrixItems: [
    { id: "priority-1", title: "\u672C\u5468\u5FC5\u987B\u4EA4\u4ED8\u7684\u5173\u952E\u7ED3\u679C", quadrant: "important-urgent", note: "\u4F18\u5148\u5904\u7406", completed: false },
    { id: "priority-2", title: "\u957F\u671F\u76EE\u6807\u3001\u5065\u5EB7\u8282\u594F\u3001\u80FD\u529B\u5EFA\u8BBE", quadrant: "important-not-urgent", note: "\u6BCF\u5929\u63A8\u8FDB", completed: false },
    { id: "priority-3", title: "\u4E34\u65F6\u6D88\u606F\u3001\u6D41\u7A0B\u6027\u5904\u7406", quadrant: "not-important-urgent", note: "\u96C6\u4E2D\u6279\u5904\u7406", completed: false },
    { id: "priority-4", title: "\u4F4E\u4EF7\u503C\u6D88\u8017\uFF0C\u5C3D\u91CF\u51CF\u5C11", quadrant: "not-important-not-urgent", note: "\u51CF\u5C11\u6295\u5165", completed: false }
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
  async addCustomSection(input) {
    var _a;
    const existingSections = this.data.sections.filter((section2) => section2.page === input.page);
    const nextOrder = (_a = input.order) != null ? _a : existingSections.reduce((max, section2) => Math.max(max, section2.order), 0) + 10;
    const section = {
      id: input.id || `${input.page}-${input.type}-${Date.now()}`,
      page: input.page,
      type: input.type,
      title: input.title,
      order: nextOrder,
      enabled: true,
      width: "md",
      height: "md",
      config: {
        description: input.description,
        cardColor: input.color,
        customType: input.type
      }
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
  async updateSection(sectionId, updates) {
    const section = this.data.sections.find((item) => item.id === sectionId);
    if (!section) return;
    Object.assign(section, updates);
    await this.save();
  }
  async updateSectionConfig(sectionId, updates) {
    const section = this.data.sections.find((item) => item.id === sectionId);
    if (!section) return;
    section.config = { ...section.config, ...updates };
    await this.save();
  }
  async moveSection(sectionId, direction) {
    const section = this.data.sections.find((item) => item.id === sectionId);
    if (!section) return;
    const pageSections = this.data.sections.filter((item) => item.page === section.page && item.enabled).sort((left, right) => left.order - right.order);
    const currentIndex = pageSections.findIndex((item) => item.id === sectionId);
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    const target = pageSections[targetIndex];
    if (!target) return;
    const currentOrder = section.order;
    section.order = target.order;
    target.order = currentOrder;
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
  async updateSidebarAvatar(avatar) {
    this.data.banner.sidebarAvatar = avatar;
    await this.save();
  }
  async updateBannerAvatar(avatar) {
    this.data.banner.bannerAvatar = avatar;
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
  getCalendarTodos(date) {
    const todos = [...this.data.calendarTodos].sort((left, right) => left.createdAt.localeCompare(right.createdAt));
    return date ? todos.filter((todo) => todo.date === date) : todos;
  }
  async addCalendarTodo(title, date, category = "\u5F85\u529E") {
    this.data.calendarTodos.push({
      id: `calendar-todo-${Date.now()}`,
      title,
      date,
      completed: false,
      category,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    await this.save();
  }
  async updateCalendarTodo(todoId, updates) {
    const todo = this.data.calendarTodos.find((item) => item.id === todoId);
    if (!todo) return;
    Object.assign(todo, updates);
    await this.save();
  }
  async toggleCalendarTodo(todoId) {
    const todo = this.data.calendarTodos.find((item) => item.id === todoId);
    if (!todo) return;
    todo.completed = !todo.completed;
    await this.save();
  }
  async deleteCalendarTodo(todoId) {
    this.data.calendarTodos = this.data.calendarTodos.filter((todo) => todo.id !== todoId);
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
  getFocusSettings() {
    return this.data.focusSettings;
  }
  getFocusState() {
    return this.resolveFocusState();
  }
  getFocusRecords() {
    return [...this.data.focusRecords].sort((left, right) => right.createdAt.localeCompare(left.createdAt));
  }
  getTodayFocusRecords() {
    const today = formatDateKey(/* @__PURE__ */ new Date());
    return this.getFocusRecords().filter((record) => record.date === today);
  }
  async updateFocusSettings(updates) {
    var _a, _b;
    this.data.focusSettings = {
      ...this.data.focusSettings,
      ...updates,
      focusDuration: Math.max(1, Math.round((_a = updates.focusDuration) != null ? _a : this.data.focusSettings.focusDuration)),
      breakDuration: Math.max(1, Math.round((_b = updates.breakDuration) != null ? _b : this.data.focusSettings.breakDuration))
    };
    if (!this.data.focusState.isRunning) {
      this.data.focusState.remainingSeconds = this.data.focusSettings.focusDuration * 60;
    }
    await this.save();
  }
  async startFocusSession(task = "", durationMinutes = this.data.focusSettings.focusDuration, background = ((_a) => (_a = this.data.focusSettings.defaultBackground) != null ? _a : "pink")()) {
    const plannedDuration = Math.max(1, Math.round(durationMinutes));
    this.data.focusSettings.focusDuration = plannedDuration;
    this.data.focusSettings.defaultBackground = background;
    this.data.focusState = {
      isRunning: true,
      isPaused: false,
      mode: "focus",
      startedAt: (/* @__PURE__ */ new Date()).toISOString(),
      remainingSeconds: plannedDuration * 60,
      currentTask: task.trim(),
      background,
      plannedDuration
    };
    await this.save();
  }
  async pauseFocusSession() {
    const state = this.resolveFocusState();
    if (!state.isRunning || state.isPaused) return;
    this.data.focusState = {
      ...state,
      isPaused: true,
      pausedAt: (/* @__PURE__ */ new Date()).toISOString(),
      startedAt: void 0
    };
    await this.save();
  }
  async resumeFocusSession() {
    const state = this.resolveFocusState();
    if (!state.isRunning || !state.isPaused) return;
    this.data.focusState = {
      ...state,
      isPaused: false,
      pausedAt: void 0,
      startedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    await this.save();
  }
  async endFocusSession(completed = false) {
    var _a, _b, _c;
    const state = this.resolveFocusState();
    if (state.mode === "focus") {
      const totalSeconds = this.data.focusSettings.focusDuration * 60;
      const duration = Math.max(0, Math.round((totalSeconds - state.remainingSeconds) / 60));
      if (duration > 0 || completed) {
        const endedAt = (/* @__PURE__ */ new Date()).toISOString();
        this.data.focusRecords.push({
          id: `focus-record-${Date.now()}`,
          date: formatDateKey(/* @__PURE__ */ new Date()),
          task: ((_a = state.currentTask) == null ? void 0 : _a.trim()) || "\u4E13\u6CE8",
          duration: completed ? (_b = state.plannedDuration) != null ? _b : this.data.focusSettings.focusDuration : duration,
          completed,
          createdAt: endedAt,
          startedAt: state.startedAt,
          endedAt,
          plannedDuration: (_c = state.plannedDuration) != null ? _c : this.data.focusSettings.focusDuration,
          background: state.background
        });
      }
    }
    this.data.focusState = {
      isRunning: false,
      isPaused: false,
      mode: "focus",
      remainingSeconds: this.data.focusSettings.focusDuration * 60
    };
    await this.save();
  }
  async completeCurrentFocusPhase() {
    var _a, _b, _c;
    const state = this.resolveFocusState();
    if (state.mode === "focus") {
      const endedAt = (/* @__PURE__ */ new Date()).toISOString();
      this.data.focusRecords.push({
        id: `focus-record-${Date.now()}`,
        date: formatDateKey(/* @__PURE__ */ new Date()),
        task: ((_a = state.currentTask) == null ? void 0 : _a.trim()) || "\u4E13\u6CE8",
        duration: (_b = state.plannedDuration) != null ? _b : this.data.focusSettings.focusDuration,
        completed: true,
        createdAt: endedAt,
        startedAt: state.startedAt,
        endedAt,
        plannedDuration: (_c = state.plannedDuration) != null ? _c : this.data.focusSettings.focusDuration,
        background: state.background
      });
      this.data.focusState = {
        isRunning: this.data.focusSettings.autoStartBreak,
        isPaused: !this.data.focusSettings.autoStartBreak,
        mode: "break",
        startedAt: this.data.focusSettings.autoStartBreak ? (/* @__PURE__ */ new Date()).toISOString() : void 0,
        remainingSeconds: this.data.focusSettings.breakDuration * 60,
        currentTask: state.currentTask,
        background: state.background,
        plannedDuration: this.data.focusSettings.breakDuration
      };
    } else {
      this.data.focusState = {
        isRunning: this.data.focusSettings.autoStartNextFocus,
        isPaused: !this.data.focusSettings.autoStartNextFocus,
        mode: "focus",
        startedAt: this.data.focusSettings.autoStartNextFocus ? (/* @__PURE__ */ new Date()).toISOString() : void 0,
        remainingSeconds: this.data.focusSettings.focusDuration * 60,
        currentTask: state.currentTask,
        background: state.background,
        plannedDuration: this.data.focusSettings.focusDuration
      };
    }
    await this.save();
  }
  getTodayFocusMinutes() {
    return this.getTodayFocusRecords().reduce((sum, record) => sum + record.duration, 0);
  }
  getTodayPomodoroCount() {
    return this.getTodayFocusRecords().filter((record) => record.completed).length;
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
  async addTodayFocusTask(label, category = "\u4E2A\u4EBA", date = formatDateKey(/* @__PURE__ */ new Date())) {
    this.data.todayFocusTasks.push({
      id: `focus-${Date.now()}`,
      label,
      category,
      completed: false,
      date
    });
    await this.save();
  }
  getTodayFocusTasksForDate(date = formatDateKey(/* @__PURE__ */ new Date())) {
    return this.data.todayFocusTasks.filter((task) => {
      var _a;
      return ((_a = task.date) != null ? _a : formatDateKey(/* @__PURE__ */ new Date())) === date;
    });
  }
  async updateTodayFocusTask(taskId, updates) {
    const task = this.data.todayFocusTasks.find((item) => item.id === taskId);
    if (!task) return;
    Object.assign(task, updates);
    await this.save();
  }
  async deleteTodayFocusTask(taskId) {
    this.data.todayFocusTasks = this.data.todayFocusTasks.filter((item) => item.id !== taskId);
    await this.save();
  }
  getResearchProjects() {
    return this.data.researchProjects;
  }
  async addResearchProject(project) {
    this.data.researchProjects.push(project);
    await this.save();
  }
  async updateResearchProject(projectId, updates) {
    const project = this.data.researchProjects.find((item) => item.id === projectId);
    if (!project) return;
    Object.assign(project, updates);
    await this.save();
  }
  async deleteResearchProject(projectId) {
    this.data.researchProjects = this.data.researchProjects.filter((item) => item.id !== projectId);
    await this.save();
  }
  getResearchPapers() {
    return this.data.researchPapers;
  }
  async addResearchPaper(paper) {
    this.data.researchPapers.push(paper);
    await this.save();
  }
  async updateResearchPaper(paperId, updates) {
    const paper = this.data.researchPapers.find((item) => item.id === paperId);
    if (!paper) return;
    Object.assign(paper, updates);
    await this.save();
  }
  async deleteResearchPaper(paperId) {
    this.data.researchPapers = this.data.researchPapers.filter((item) => item.id !== paperId);
    await this.save();
  }
  getExperimentPlans() {
    return this.data.experimentPlans;
  }
  getExperimentRecords() {
    return this.data.experimentRecords;
  }
  async addExperiment(mode, experiment) {
    const items = mode === "plan" ? this.data.experimentPlans : this.data.experimentRecords;
    items.push(experiment);
    await this.save();
  }
  async updateExperiment(mode, experimentId, updates) {
    const items = mode === "plan" ? this.data.experimentPlans : this.data.experimentRecords;
    const experiment = items.find((item) => item.id === experimentId);
    if (!experiment) return;
    Object.assign(experiment, updates);
    await this.save();
  }
  async deleteExperiment(mode, experimentId) {
    if (mode === "plan") {
      this.data.experimentPlans = this.data.experimentPlans.filter((item) => item.id !== experimentId);
    } else {
      this.data.experimentRecords = this.data.experimentRecords.filter((item) => item.id !== experimentId);
    }
    await this.save();
  }
  getResearchDeadlines() {
    return this.data.researchDeadlines;
  }
  async addResearchDeadline(deadline) {
    this.data.researchDeadlines.push(deadline);
    await this.save();
  }
  async updateResearchDeadline(deadlineId, updates) {
    const deadline = this.data.researchDeadlines.find((item) => item.id === deadlineId);
    if (!deadline) return;
    Object.assign(deadline, updates);
    await this.save();
  }
  async deleteResearchDeadline(deadlineId) {
    this.data.researchDeadlines = this.data.researchDeadlines.filter((item) => item.id !== deadlineId);
    await this.save();
  }
  getResearchMemos() {
    return this.data.researchMemos;
  }
  async addResearchMemo(memo) {
    this.data.researchMemos.push(memo);
    await this.save();
  }
  async updateResearchMemo(index, memo) {
    if (!this.data.researchMemos[index]) return;
    this.data.researchMemos[index] = memo;
    await this.save();
  }
  async deleteResearchMemo(index) {
    this.data.researchMemos.splice(index, 1);
    await this.save();
  }
  getDataAnalysisTasks() {
    return this.data.dataAnalysisTasks;
  }
  async addDataAnalysisTask(task) {
    this.data.dataAnalysisTasks.push(task);
    await this.save();
  }
  async updateDataAnalysisTask(taskId, updates) {
    const task = this.data.dataAnalysisTasks.find((item) => item.id === taskId);
    if (!task) return;
    Object.assign(task, updates);
    await this.save();
  }
  async deleteDataAnalysisTask(taskId) {
    this.data.dataAnalysisTasks = this.data.dataAnalysisTasks.filter((item) => item.id !== taskId);
    await this.save();
  }
  getBooks() {
    return this.data.books;
  }
  getReadingQuotes() {
    return this.data.readingQuotes;
  }
  async addReadingQuote(quote) {
    this.data.readingQuotes.push(quote);
    await this.save();
  }
  async updateReadingQuote(quoteId, updates) {
    const quote = this.data.readingQuotes.find((item) => item.id === quoteId);
    if (!quote) return;
    Object.assign(quote, updates);
    await this.save();
  }
  async deleteReadingQuote(quoteId) {
    this.data.readingQuotes = this.data.readingQuotes.filter((item) => item.id !== quoteId);
    await this.save();
  }
  async addBook(book) {
    this.data.books.push(book);
    await this.save();
  }
  async updateBook(bookId, updates) {
    const book = this.data.books.find((item) => item.id === bookId);
    if (!book) return;
    Object.assign(book, updates);
    await this.save();
  }
  async deleteBook(bookId) {
    this.data.books = this.data.books.filter((item) => item.id !== bookId);
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
  async addWorkout(workout) {
    this.data.workouts.push(workout);
    await this.save();
  }
  async updateWorkout(workoutId, updates) {
    const workout = this.data.workouts.find((item) => item.id === workoutId);
    if (!workout) return;
    Object.assign(workout, updates);
    await this.save();
  }
  async deleteWorkout(workoutId) {
    this.data.workouts = this.data.workouts.filter((item) => item.id !== workoutId);
    await this.save();
  }
  getBodyMeasurements() {
    return this.data.bodyMeasurements;
  }
  async addBodyMeasurement(measurement) {
    var _a;
    this.data.bodyMeasurements.push({ ...measurement, id: (_a = measurement.id) != null ? _a : `measure-${Date.now()}` });
    this.data.bodyMeasurements.sort((left, right) => left.date.localeCompare(right.date));
    await this.save();
  }
  async updateBodyMeasurement(measurementId, updates) {
    const measurement = this.data.bodyMeasurements.find((item) => {
      var _a;
      return ((_a = item.id) != null ? _a : item.date) === measurementId;
    });
    if (!measurement) return;
    Object.assign(measurement, updates);
    await this.save();
  }
  getFitnessDailyRecord(date = formatDateKey(/* @__PURE__ */ new Date())) {
    const record = this.data.fitnessDailyRecords.find((item) => item.date === date);
    return record != null ? record : { date, waterCups: 0, waterGoal: 8, sleepHours: 0, sleepGoal: 8, bedtime: "", wakeTime: "" };
  }
  async updateFitnessDailyRecord(date, updates) {
    let record = this.data.fitnessDailyRecords.find((item) => item.date === date);
    if (!record) {
      record = this.getFitnessDailyRecord(date);
      this.data.fitnessDailyRecords.push(record);
    }
    Object.assign(record, updates, { date });
    await this.save();
  }
  getFitnessGoals() {
    return this.data.fitnessGoals;
  }
  async addFitnessGoal(goal) {
    this.data.fitnessGoals.push(goal);
    await this.save();
  }
  async updateFitnessGoal(goalId, updates) {
    const goal = this.data.fitnessGoals.find((item) => item.id === goalId);
    if (!goal) return;
    Object.assign(goal, updates);
    await this.save();
  }
  async deleteFitnessGoal(goalId) {
    this.data.fitnessGoals = this.data.fitnessGoals.filter((item) => item.id !== goalId);
    await this.save();
  }
  getHealthReminders() {
    return this.data.healthReminders;
  }
  async addHealthReminder(title) {
    this.data.healthReminders.push({ id: `health-${Date.now()}`, title });
    await this.save();
  }
  async updateHealthReminder(reminderId, title) {
    const reminder = this.data.healthReminders.find((item) => item.id === reminderId);
    if (!reminder) return;
    reminder.title = title;
    await this.save();
  }
  async deleteHealthReminder(reminderId) {
    this.data.healthReminders = this.data.healthReminders.filter((item) => item.id !== reminderId);
    await this.save();
  }
  getTransactions() {
    return this.data.transactions;
  }
  async updateTransaction(transactionId, updates) {
    const transaction = this.data.transactions.find((item) => item.id === transactionId);
    if (!transaction) return;
    Object.assign(transaction, updates);
    this.recalculateBudgetSpent();
    await this.save();
  }
  async deleteTransaction(transactionId) {
    this.data.transactions = this.data.transactions.filter((item) => item.id !== transactionId);
    this.recalculateBudgetSpent();
    await this.save();
  }
  getBudgets() {
    return this.data.budgets;
  }
  getMonthlyBudgetLimit() {
    return this.data.budgets.reduce((sum, budget) => sum + budget.amount, 0);
  }
  async setMonthlyBudgetLimit(amount) {
    var _a;
    const budget = (_a = this.data.budgets[0]) != null ? _a : { id: "budget-monthly", category: "\u6708\u9884\u7B97", amount: 0, spent: 0 };
    const currentTotal = this.getMonthlyBudgetLimit();
    const delta = Math.max(0, amount) - currentTotal;
    budget.amount = Math.max(0, budget.amount + delta);
    if (!this.data.budgets.some((item) => item.id === budget.id)) {
      this.data.budgets.unshift(budget);
    }
    await this.save();
  }
  async addBudget(budget) {
    this.data.budgets.push(budget);
    this.recalculateBudgetSpent();
    await this.save();
  }
  async updateBudget(budgetId, updates) {
    const budget = this.data.budgets.find((item) => item.id === budgetId);
    if (!budget) return;
    Object.assign(budget, updates);
    this.recalculateBudgetSpent();
    await this.save();
  }
  async deleteBudget(budgetId) {
    const budget = this.data.budgets.find((item) => item.id === budgetId);
    if (!budget) return false;
    if (this.data.transactions.some((transaction) => transaction.category === budget.category)) {
      return false;
    }
    this.data.budgets = this.data.budgets.filter((item) => item.id !== budgetId);
    await this.save();
    return true;
  }
  getAccounts() {
    return this.data.accounts;
  }
  getTotalAssets() {
    return this.data.accounts.reduce((sum, account) => sum + account.balance, 0);
  }
  async addAccount(account) {
    this.data.accounts.push(account);
    await this.save();
  }
  async updateAccount(accountId, updates) {
    const account = this.data.accounts.find((item) => item.id === accountId);
    if (!account) return;
    Object.assign(account, updates);
    await this.save();
  }
  async deleteAccount(accountId) {
    this.data.accounts = this.data.accounts.filter((item) => item.id !== accountId);
    await this.save();
  }
  getInvestmentWatchItems() {
    return this.data.investmentWatchItems;
  }
  async addInvestmentWatchItem(item) {
    this.data.investmentWatchItems.push(item);
    await this.save();
  }
  async updateInvestmentWatchItem(itemId, updates) {
    const item = this.data.investmentWatchItems.find((entry) => entry.id === itemId);
    if (!item) return;
    Object.assign(item, updates);
    await this.save();
  }
  async deleteInvestmentWatchItem(itemId) {
    this.data.investmentWatchItems = this.data.investmentWatchItems.filter((item) => item.id !== itemId);
    await this.save();
  }
  getSavingGoals() {
    return this.data.savingGoals;
  }
  async addSavingGoal(goal) {
    this.data.savingGoals.push(goal);
    await this.save();
  }
  async updateSavingGoal(goalId, updates) {
    const goal = this.data.savingGoals.find((item) => item.id === goalId);
    if (!goal) return;
    Object.assign(goal, updates);
    await this.save();
  }
  async deleteSavingGoal(goalId) {
    this.data.savingGoals = this.data.savingGoals.filter((item) => item.id !== goalId);
    await this.save();
  }
  getBills() {
    return this.data.bills;
  }
  async addBill(bill) {
    this.data.bills.push(bill);
    await this.save();
  }
  async updateBill(billId, updates) {
    const bill = this.data.bills.find((item) => item.id === billId);
    if (!bill) return;
    Object.assign(bill, updates);
    await this.save();
  }
  async deleteBill(billId) {
    this.data.bills = this.data.bills.filter((item) => item.id !== billId);
    await this.save();
  }
  getFinanceTodos() {
    return this.data.financeTodos;
  }
  async addFinanceTodo(title) {
    this.data.financeTodos.push({ id: `finance-todo-${Date.now()}`, title, completed: false });
    await this.save();
  }
  async updateFinanceTodo(todoId, updates) {
    const todo = this.data.financeTodos.find((item) => item.id === todoId);
    if (!todo) return;
    Object.assign(todo, updates);
    await this.save();
  }
  async deleteFinanceTodo(todoId) {
    this.data.financeTodos = this.data.financeTodos.filter((item) => item.id !== todoId);
    await this.save();
  }
  getGoals() {
    return this.data.goals;
  }
  getObjectives() {
    return this.data.objectives;
  }
  async addObjective(objective) {
    this.data.objectives.push(objective);
    await this.save();
  }
  async updateObjective(objectiveId, updates) {
    const objective = this.data.objectives.find((item) => item.id === objectiveId);
    if (!objective) return;
    Object.assign(objective, updates);
    await this.save();
  }
  async deleteObjective(objectiveId) {
    this.data.objectives = this.data.objectives.filter((item) => item.id !== objectiveId);
    this.data.keyResults = this.data.keyResults.filter((item) => item.objectiveId !== objectiveId);
    await this.save();
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
  async deleteGoal(goalId) {
    this.data.goals = this.data.goals.filter((item) => item.id !== goalId);
    this.data.milestones = this.data.milestones.filter((item) => item.goalId !== goalId);
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
  async updateKeyResult(keyResultId, updates) {
    const keyResult = this.data.keyResults.find((item) => item.id === keyResultId);
    if (!keyResult) return;
    Object.assign(keyResult, updates);
    await this.save();
  }
  async deleteKeyResult(keyResultId) {
    this.data.keyResults = this.data.keyResults.filter((item) => item.id !== keyResultId);
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
  async updateMilestone(milestoneId, updates) {
    const milestone = this.data.milestones.find((item) => item.id === milestoneId);
    if (!milestone) return;
    Object.assign(milestone, updates);
    await this.save();
  }
  async deleteMilestone(milestoneId) {
    this.data.milestones = this.data.milestones.filter((item) => item.id !== milestoneId);
    await this.save();
  }
  async addRisk(risk) {
    this.data.risks.push(risk);
    await this.save();
  }
  async updateRisk(riskId, updates) {
    const risk = this.data.risks.find((item) => item.id === riskId);
    if (!risk) return;
    Object.assign(risk, updates);
    await this.save();
  }
  async deleteRisk(riskId) {
    this.data.risks = this.data.risks.filter((item) => item.id !== riskId);
    await this.save();
  }
  async addTransaction(transaction) {
    this.data.transactions.push(transaction);
    this.recalculateBudgetSpent();
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
  getPriorityMatrixItems() {
    return this.data.priorityMatrixItems;
  }
  async addPriorityMatrixItem(item) {
    this.data.priorityMatrixItems.push(item);
    await this.save();
  }
  async updatePriorityMatrixItem(itemId, updates) {
    const item = this.data.priorityMatrixItems.find((entry) => entry.id === itemId);
    if (!item) return;
    Object.assign(item, updates);
    await this.save();
  }
  async deletePriorityMatrixItem(itemId) {
    this.data.priorityMatrixItems = this.data.priorityMatrixItems.filter((item) => item.id !== itemId);
    await this.save();
  }
  recalculateBudgetSpent() {
    this.data.budgets.forEach((budget) => {
      budget.spent = this.getCurrentMonthTransactions().filter((transaction) => transaction.type === "expense" && transaction.category === budget.category).reduce((sum, transaction) => sum + transaction.amount, 0);
    });
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
  resolveFocusState() {
    const state = { ...this.data.focusState };
    if (!state.isRunning || state.isPaused || !state.startedAt) {
      return state;
    }
    const elapsedSeconds = Math.max(0, Math.floor((Date.now() - new Date(state.startedAt).getTime()) / 1e3));
    const remainingSeconds = Math.max(0, state.remainingSeconds - elapsedSeconds);
    return {
      ...state,
      remainingSeconds
    };
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
      dataVersion: "0.3.0",
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
      dataAnalysisTasks: Array.isArray(partial.dataAnalysisTasks) ? partial.dataAnalysisTasks : structuredClone(DEFAULT_DATA.dataAnalysisTasks),
      books: Array.isArray(partial.books) ? partial.books : structuredClone(DEFAULT_DATA.books),
      readingQuotes: Array.isArray(partial.readingQuotes) ? partial.readingQuotes : structuredClone(DEFAULT_DATA.readingQuotes),
      workouts: Array.isArray(partial.workouts) ? partial.workouts : structuredClone(DEFAULT_DATA.workouts),
      bodyMeasurements: Array.isArray(partial.bodyMeasurements) ? partial.bodyMeasurements : structuredClone(DEFAULT_DATA.bodyMeasurements),
      fitnessGoals: Array.isArray(partial.fitnessGoals) ? partial.fitnessGoals : structuredClone(DEFAULT_DATA.fitnessGoals),
      healthReminders: Array.isArray(partial.healthReminders) ? partial.healthReminders : structuredClone(DEFAULT_DATA.healthReminders),
      transactions: Array.isArray(partial.transactions) ? partial.transactions : structuredClone(DEFAULT_DATA.transactions),
      budgets: Array.isArray(partial.budgets) ? partial.budgets : structuredClone(DEFAULT_DATA.budgets),
      accounts: Array.isArray(partial.accounts) ? partial.accounts : structuredClone(DEFAULT_DATA.accounts),
      savingGoals: Array.isArray(partial.savingGoals) ? partial.savingGoals : structuredClone(DEFAULT_DATA.savingGoals),
      bills: Array.isArray(partial.bills) ? partial.bills : structuredClone(DEFAULT_DATA.bills),
      financeTodos: Array.isArray(partial.financeTodos) ? partial.financeTodos : structuredClone(DEFAULT_DATA.financeTodos),
      goals: Array.isArray(partial.goals) ? partial.goals : structuredClone(DEFAULT_DATA.goals),
      objectives: Array.isArray(partial.objectives) ? partial.objectives : structuredClone(DEFAULT_DATA.objectives),
      keyResults: Array.isArray(partial.keyResults) ? partial.keyResults : structuredClone(DEFAULT_DATA.keyResults),
      milestones: Array.isArray(partial.milestones) ? partial.milestones : structuredClone(DEFAULT_DATA.milestones),
      risks: Array.isArray(partial.risks) ? partial.risks : structuredClone(DEFAULT_DATA.risks),
      calendarSettings: {
        ...DEFAULT_DATA.calendarSettings,
        ...partial.calendarSettings
      },
      calendarTodos: Array.isArray(partial.calendarTodos) ? partial.calendarTodos : structuredClone(DEFAULT_DATA.calendarTodos),
      apexHabitSettings: {
        ...DEFAULT_DATA.apexHabitSettings,
        ...partial.apexHabitSettings,
        customHabits: Array.isArray((_b = partial.apexHabitSettings) == null ? void 0 : _b.customHabits) ? partial.apexHabitSettings.customHabits : structuredClone(DEFAULT_DATA.apexHabitSettings.customHabits)
      },
      quickActions: Array.isArray(partial.quickActions) ? partial.quickActions : structuredClone(DEFAULT_DATA.quickActions),
      focusSettings: {
        ...DEFAULT_DATA.focusSettings,
        ...partial.focusSettings
      },
      focusState: {
        ...DEFAULT_DATA.focusState,
        ...partial.focusState
      },
      focusRecords: Array.isArray(partial.focusRecords) ? partial.focusRecords : structuredClone(DEFAULT_DATA.focusRecords),
      fitnessDailyRecords: Array.isArray(partial.fitnessDailyRecords) ? partial.fitnessDailyRecords : structuredClone(DEFAULT_DATA.fitnessDailyRecords),
      investmentWatchItems: Array.isArray(partial.investmentWatchItems) ? partial.investmentWatchItems : structuredClone(DEFAULT_DATA.investmentWatchItems),
      priorityMatrixItems: Array.isArray(partial.priorityMatrixItems) ? partial.priorityMatrixItems : structuredClone(DEFAULT_DATA.priorityMatrixItems),
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
      return this.withRequiredSections([
        ...structuredClone(DEFAULT_DATA.sections.filter((section) => section.page === "overview")),
        ...migrated.filter((section) => section.page !== "overview")
      ]);
    }
    return this.withRequiredSections(migrated);
  }
  withRequiredSections(sections) {
    const migrated = [...sections];
    if (!migrated.some((section) => section.type === "section-manager")) {
      const sectionManager = DEFAULT_DATA.sections.find((section) => section.type === "section-manager");
      if (sectionManager) {
        migrated.push(structuredClone(sectionManager));
      }
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
var import_obsidian69 = require("obsidian");

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
var import_obsidian3 = require("obsidian");

// src/core/PageLabels.ts
var PAGE_LABELS = {
  overview: "\u603B\u89C8",
  research: "\u79D1\u7814",
  reading: "\u9605\u8BFB",
  fitness: "\u5065\u8EAB",
  finance: "\u7406\u8D22",
  goals: "\u76EE\u6807\u7BA1\u7406",
  modules: "\u6A21\u5757\u7BA1\u7406"
};

// src/services/CalendarService.ts
var CalendarService = class {
  getToday() {
    return /* @__PURE__ */ new Date();
  }
  getDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  getMonthTitle(date) {
    return `${date.getFullYear()}\u5E74${date.getMonth() + 1}\u6708`;
  }
  getWeekdayLabel(date) {
    return ["\u661F\u671F\u65E5", "\u661F\u671F\u4E00", "\u661F\u671F\u4E8C", "\u661F\u671F\u4E09", "\u661F\u671F\u56DB", "\u661F\u671F\u4E94", "\u661F\u671F\u516D"][date.getDay()];
  }
  addMonths(date, amount) {
    return new Date(date.getFullYear(), date.getMonth() + amount, 1);
  }
  isSameDate(left, right) {
    return this.getDateKey(left) === this.getDateKey(right);
  }
  getMonthCells(month, weekStartsOn = "sunday") {
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const cells = [];
    const offset = weekStartsOn === "monday" ? (firstDay.getDay() + 6) % 7 : firstDay.getDay();
    for (let index = 0; index < offset; index += 1) {
      cells.push(null);
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push(new Date(month.getFullYear(), month.getMonth(), day));
    }
    while (cells.length % 7 !== 0) {
      cells.push(null);
    }
    return cells;
  }
};

// src/components/AvatarPickerModal.ts
var import_obsidian2 = require("obsidian");
var AVATAR_PRESETS = [
  { id: "dog", label: "\u624B\u7ED8\u72D7\u72D7", icon: "dog" },
  { id: "heart", label: "\u7231\u5FC3", icon: "heart" },
  { id: "star", label: "\u661F\u661F", icon: "sparkles" },
  { id: "flower", label: "\u5C0F\u82B1", icon: "flower-2" },
  { id: "moon", label: "\u6708\u4EAE", icon: "moon" }
];
function renderWorkbenchAvatar(container, avatar, className) {
  var _a;
  const value = avatar != null ? avatar : { type: "preset", value: "dog" };
  const wrapperClass = className === "cow-banner-dog" ? "cow-banner-avatar-wrapper" : "cow-sidebar-avatar-wrapper";
  const imageClass = className === "cow-banner-dog" ? "cow-banner-avatar-image" : "cow-sidebar-avatar-image";
  const root = container.createDiv({ cls: `${className} ${wrapperClass} cow-custom-avatar cow-avatar-${value.type === "preset" ? value.value : "image"}` });
  if (value.type === "image") {
    root.createEl("img", { cls: imageClass, attr: { src: value.value, alt: "" } });
    return root;
  }
  if (value.value === "dog") {
    root.createDiv({ cls: className === "cow-banner-dog" ? "cow-dog-face" : "cow-mini-dog" });
    return root;
  }
  const preset = (_a = AVATAR_PRESETS.find((item) => item.id === value.value)) != null ? _a : AVATAR_PRESETS[0];
  (0, import_obsidian2.setIcon)(root.createSpan(), preset.icon);
  return root;
}
var AvatarPickerModal = class extends import_obsidian2.Modal {
  constructor(app, title, current, onPick) {
    super(app);
    this.title = title;
    this.current = current;
    this.onPick = onPick;
  }
  onOpen() {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: this.title });
    this.contentEl.createEl("p", { text: "\u9009\u62E9\u9884\u8BBE\u56FE\u6807\uFF0C\u6216\u4E0A\u4F20\u4E00\u5F20\u672C\u5730\u56FE\u7247\u4FDD\u5B58\u4E3A data URL\u3002" });
    const grid = this.contentEl.createDiv({ cls: "cow-avatar-choice-grid" });
    AVATAR_PRESETS.forEach((preset) => {
      var _a;
      const button = grid.createEl("button", {
        cls: ((_a = this.current) == null ? void 0 : _a.type) === "preset" && this.current.value === preset.id ? "is-active" : "",
        attr: { type: "button" }
      });
      const preview = button.createDiv({ cls: `cow-avatar-preview cow-avatar-${preset.id}` });
      if (preset.id === "dog") {
        preview.createDiv({ cls: "cow-mini-dog" });
      } else {
        (0, import_obsidian2.setIcon)(preview.createSpan(), preset.icon);
      }
      button.createSpan({ text: preset.label });
      button.addEventListener("click", async () => {
        await this.onPick({ type: "preset", value: preset.id });
        new import_obsidian2.Notice("\u56FE\u6807\u5DF2\u4FDD\u5B58\u3002");
        this.close();
      });
    });
    const fileInput = this.contentEl.createEl("input", {
      cls: "cow-hidden-input",
      attr: { type: "file", accept: "image/*" }
    });
    fileInput.addEventListener("change", () => {
      var _a;
      const file = (_a = fileInput.files) == null ? void 0 : _a[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async () => {
        await this.onPick({ type: "image", value: String(reader.result) });
        new import_obsidian2.Notice("\u56FE\u7247\u56FE\u6807\u5DF2\u4FDD\u5B58\u3002");
        this.close();
      };
      reader.readAsDataURL(file);
    });
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    const upload = actions.createEl("button", { attr: { type: "button" } });
    (0, import_obsidian2.setIcon)(upload.createSpan(), "image-plus");
    upload.createSpan({ text: "\u4E0A\u4F20\u56FE\u7247" });
    upload.addEventListener("click", () => fileInput.click());
    actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } }).addEventListener("click", () => this.close());
  }
};

// src/components/Sidebar.ts
var Sidebar = class {
  constructor(app, currentPage, actions, onQuickCreate, onOpenDay, getData, onCustomizeAvatar) {
    this.app = app;
    this.currentPage = currentPage;
    this.actions = actions;
    this.onQuickCreate = onQuickCreate;
    this.onOpenDay = onOpenDay;
    this.getData = getData;
    this.onCustomizeAvatar = onCustomizeAvatar;
    this.calendar = new CalendarService();
    this.visibleMonth = /* @__PURE__ */ new Date();
    this.selectedDate = /* @__PURE__ */ new Date();
  }
  render(container) {
    const sidebar = container.createDiv({ cls: "cow-sidebar" });
    const quickCreate = sidebar.createEl("button", {
      cls: "cow-sidebar-create-button",
      attr: { type: "button", "aria-label": "\u5FEB\u901F\u521B\u5EFA" }
    });
    (0, import_obsidian3.setIcon)(quickCreate, "plus");
    quickCreate.addEventListener("click", this.onQuickCreate);
    const profile = sidebar.createDiv({ cls: "cow-profile" });
    const avatarButton = profile.createEl("button", {
      cls: "cow-profile-avatar-button",
      attr: { type: "button", "aria-label": "\u4FEE\u6539\u5DE6\u4FA7\u5934\u50CF" }
    });
    renderWorkbenchAvatar(avatarButton, this.getData().banner.sidebarAvatar, "cow-profile-avatar");
    avatarButton.addEventListener("click", this.onCustomizeAvatar);
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
      this.timer = void 0;
    }
  }
  renderMiniCalendar(container) {
    this.calendarEl = container.createDiv({ cls: "cow-mini-calendar" });
    this.renderMiniCalendarContent();
  }
  renderMiniCalendarContent() {
    if (!this.calendarEl) return;
    this.calendarEl.empty();
    const header = this.calendarEl.createDiv({ cls: "cow-mini-calendar-header" });
    const prev = header.createEl("button", { attr: { type: "button", "aria-label": "\u4E0A\u4E00\u6708" } });
    (0, import_obsidian3.setIcon)(prev, "chevron-left");
    prev.addEventListener("click", () => {
      this.visibleMonth = this.calendar.addMonths(this.visibleMonth, -1);
      this.renderMiniCalendarContent();
    });
    header.createEl("h3", { text: this.calendar.getMonthTitle(this.visibleMonth) });
    const next = header.createEl("button", { attr: { type: "button", "aria-label": "\u4E0B\u4E00\u6708" } });
    (0, import_obsidian3.setIcon)(next, "chevron-right");
    next.addEventListener("click", () => {
      this.visibleMonth = this.calendar.addMonths(this.visibleMonth, 1);
      this.renderMiniCalendarContent();
    });
    const todayButton = this.calendarEl.createEl("button", {
      cls: "cow-mini-calendar-today",
      text: "\u4ECA\u5929",
      attr: { type: "button" }
    });
    todayButton.addEventListener("click", () => {
      const today = /* @__PURE__ */ new Date();
      this.visibleMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      this.selectedDate = today;
      this.renderMiniCalendarContent();
      this.onOpenDay(today);
    });
    const weekdays = ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"];
    const grid = this.calendarEl.createDiv({ cls: "cow-mini-calendar-grid" });
    weekdays.forEach((weekday) => grid.createSpan({ cls: "cow-weekday", text: weekday }));
    this.calendar.getMonthCells(this.visibleMonth).forEach((date) => {
      if (!date) {
        grid.createSpan({ cls: "cow-empty-day" });
        return;
      }
      const today = /* @__PURE__ */ new Date();
      const button = grid.createEl("button", {
        cls: `cow-day ${this.calendar.isSameDate(date, today) ? "is-today" : ""} ${this.calendar.isSameDate(date, this.selectedDate) ? "is-selected" : ""}`,
        text: String(date.getDate()),
        attr: { type: "button", "aria-label": this.calendar.getDateKey(date) }
      });
      button.addEventListener("click", () => {
        this.selectedDate = date;
        this.renderMiniCalendarContent();
        this.onOpenDay(date);
      });
    });
  }
  renderActions(container) {
    const actions = container.createDiv({ cls: "cow-sidebar-actions" });
    this.actions.forEach((action) => {
      const button = actions.createEl("button", {
        cls: "cow-sidebar-action",
        attr: { type: "button" }
      });
      (0, import_obsidian3.setIcon)(button.createSpan(), action.icon);
      button.createSpan({ text: action.label });
      button.addEventListener("click", action.onClick);
    });
    const fileHint = actions.createDiv({ cls: "cow-file-shortcut" });
    (0, import_obsidian3.setIcon)(fileHint.createSpan(), "folder-open");
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
    this.clockEl.createEl("span", { text: PAGE_LABELS[this.currentPage] });
  }
};

// src/components/TopBanner.ts
var import_obsidian4 = require("obsidian");
var TopBanner = class {
  constructor(getData, onCustomize, onCustomizeAvatar) {
    this.getData = getData;
    this.onCustomize = onCustomize;
    this.onCustomizeAvatar = onCustomizeAvatar;
  }
  render(container) {
    var _a;
    const banner = container.createDiv({ cls: "cow-top-banner" });
    const data = this.getData();
    banner.addClass(`cow-banner-bg-${data.banner.background}`);
    banner.style.backgroundPosition = data.banner.backgroundPosition;
    banner.style.opacity = String(data.banner.opacity);
    if (data.banner.imageDataUrl) {
      banner.style.backgroundImage = `linear-gradient(rgba(255, 224, 237, ${data.banner.overlay ? "0.45" : "0"}), rgba(255, 247, 223, ${data.banner.overlay ? "0.45" : "0"})), url("${data.banner.imageDataUrl}")`;
      banner.style.backgroundSize = "cover";
    }
    const dog = banner.createEl("button", {
      cls: "cow-banner-avatar-button",
      attr: { type: "button", "aria-label": "\u4FEE\u6539 Banner \u56FE\u6807" }
    });
    renderWorkbenchAvatar(dog, data.banner.bannerAvatar, "cow-banner-dog");
    dog.addEventListener("click", this.onCustomizeAvatar);
    const copy = banner.createDiv({ cls: "cow-banner-copy" });
    copy.createEl("p", { cls: "cow-banner-kicker", text: "\u51B2\u9E2D\uFF01" });
    copy.createEl("h2", { text: data.banner.message });
    copy.createEl("p", { text: (_a = data.banner.subtitle) != null ? _a : "\u628A\u60F3\u6CD5\u53D8\u6210\u884C\u52A8\uFF0C\u8BA9\u6BCF\u4E00\u5929\u90FD\u66F4\u9760\u8FD1\u7406\u60F3\u7684\u81EA\u5DF1\u3002" });
    const button = banner.createEl("button", {
      cls: "cow-banner-button",
      attr: { type: "button", "aria-label": "\u81EA\u5B9A\u4E49\u5DE5\u4F5C\u53F0" }
    });
    (0, import_obsidian4.setIcon)(button.createSpan(), "plus");
    button.createSpan({ text: "\u81EA\u5B9A\u4E49" });
    button.addEventListener("click", this.onCustomize);
  }
};

// src/components/TopNavigation.ts
var import_obsidian5 = require("obsidian");
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
      (0, import_obsidian5.setIcon)(icon, page.icon);
      button.createSpan({ text: page.label });
      button.addEventListener("click", () => this.onNavigate(page.id));
    });
  }
};

// src/components/DashboardSection.ts
var import_obsidian62 = require("obsidian");

// src/components/SectionActionMenu.ts
var import_obsidian12 = require("obsidian");

// src/core/SectionCapabilities.ts
var ADDABLE_SECTION_TYPES = /* @__PURE__ */ new Set([
  "research-projects",
  "reading-queue",
  "experiment-plan",
  "experiment-records",
  "data-analysis-tasks",
  "literature-notes",
  "research-timeline",
  "research-memo",
  "reading-plan",
  "bookshelf",
  "reading-notes",
  "reading-quotes",
  "wishlist-books",
  "workout-plan",
  "workout-log",
  "health-reminders",
  "body-measurements",
  "water-sleep-habits",
  "fitness-goals",
  "monthly-budget",
  "expense-categories",
  "account-overview",
  "income-expense-trend",
  "investment-watch",
  "saving-goals",
  "bill-reminders",
  "finance-todos",
  "yearly-goals",
  "quarterly-okr",
  "monthly-key-results",
  "milestone-timeline",
  "risks-blockers",
  "today-focus"
]);
function getSectionCapabilities(sectionType) {
  const canAdd = ADDABLE_SECTION_TYPES.has(sectionType);
  return {
    canAdd,
    canEdit: canAdd,
    canDeleteItems: canAdd,
    canOpenStats: sectionType === "habit-overview" || sectionType === "monthly-progress" || sectionType === "today-focus",
    canManage: canAdd
  };
}

// src/components/SectionContentActions.ts
var import_obsidian11 = require("obsidian");

// src/components/CrudItemModal.ts
var import_obsidian6 = require("obsidian");
var CrudItemModal = class extends import_obsidian6.Modal {
  constructor(app, title, initialValues, fields, onSubmit) {
    super(app);
    this.title = title;
    this.fields = fields;
    this.onSubmit = onSubmit;
    this.values = { ...initialValues };
  }
  onOpen() {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: this.title });
    this.fields.forEach((field) => this.renderField(field));
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "\u4FDD\u5B58", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      await this.onSubmit(this.values);
      this.close();
    });
  }
  renderField(field) {
    const currentValue = this.values[field.key];
    const setting = new import_obsidian6.Setting(this.contentEl).setName(field.name);
    if (field.type === "textarea") {
      setting.addTextArea((text) => text.setValue(String(currentValue != null ? currentValue : "")).onChange((value) => {
        this.values[field.key] = value;
      }));
      return;
    }
    if (field.type === "number") {
      setting.addText((text) => {
        text.inputEl.type = "number";
        text.setValue(String(currentValue != null ? currentValue : 0));
        text.onChange((value) => {
          this.values[field.key] = Number(value);
        });
      });
      return;
    }
    if (field.type === "checkbox") {
      setting.addToggle((toggle) => toggle.setValue(Boolean(currentValue)).onChange((value) => {
        this.values[field.key] = value;
      }));
      return;
    }
    if (field.type === "select") {
      setting.addDropdown((dropdown) => {
        var _a, _b, _c, _d;
        (_a = field.options) == null ? void 0 : _a.forEach((option) => dropdown.addOption(option.value, option.label));
        dropdown.setValue(String((_d = currentValue != null ? currentValue : (_c = (_b = field.options) == null ? void 0 : _b[0]) == null ? void 0 : _c.value) != null ? _d : ""));
        dropdown.onChange((value) => {
          this.values[field.key] = value;
        });
      });
      return;
    }
    setting.addText((text) => text.setValue(String(currentValue != null ? currentValue : "")).onChange((value) => {
      this.values[field.key] = value;
    }));
  }
};

// src/components/reading/AddBookModal.ts
var import_obsidian7 = require("obsidian");
var AddBookModal = class extends import_obsidian7.Modal {
  constructor(app, onSubmit, book) {
    var _a, _b, _c, _d, _e, _f, _g;
    super(app);
    this.onSubmit = onSubmit;
    this.book = book;
    this.title = "";
    this.author = "";
    this.totalPages = 200;
    this.currentPage = 0;
    this.status = "\u60F3\u8BFB";
    this.notePath = "";
    this.tags = "";
    this.title = (_a = book == null ? void 0 : book.title) != null ? _a : "";
    this.author = (_b = book == null ? void 0 : book.author) != null ? _b : "";
    this.totalPages = (_c = book == null ? void 0 : book.totalPages) != null ? _c : 200;
    this.currentPage = (_d = book == null ? void 0 : book.currentPage) != null ? _d : 0;
    this.status = (_e = book == null ? void 0 : book.status) != null ? _e : "\u60F3\u8BFB";
    this.notePath = (_f = book == null ? void 0 : book.notePath) != null ? _f : "";
    this.tags = (_g = book == null ? void 0 : book.tags.join(", ")) != null ? _g : "";
  }
  onOpen() {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: this.book ? "\u7F16\u8F91\u4E66\u7C4D" : "\u589E\u52A0\u4E66\u7C4D" });
    new import_obsidian7.Setting(this.contentEl).setName("\u4E66\u540D").addText((text) => {
      text.setValue(this.title);
      text.onChange((value) => {
        this.title = value.trim();
      });
    });
    new import_obsidian7.Setting(this.contentEl).setName("\u4F5C\u8005").addText((text) => {
      text.setValue(this.author);
      text.onChange((value) => {
        this.author = value.trim();
      });
    });
    new import_obsidian7.Setting(this.contentEl).setName("\u603B\u9875\u6570").addText((text) => {
      text.inputEl.type = "number";
      text.setValue(String(this.totalPages));
      text.onChange((value) => {
        this.totalPages = Number(value) || 0;
      });
    });
    new import_obsidian7.Setting(this.contentEl).setName("\u5F53\u524D\u9875").addText((text) => {
      text.inputEl.type = "number";
      text.setValue(String(this.currentPage));
      text.onChange((value) => {
        this.currentPage = Number(value) || 0;
      });
    });
    new import_obsidian7.Setting(this.contentEl).setName("\u72B6\u6001").addDropdown((dropdown) => {
      ["\u5728\u8BFB", "\u60F3\u8BFB", "\u5DF2\u8BFB"].forEach((status) => dropdown.addOption(status, status));
      dropdown.setValue(this.status);
      dropdown.onChange((value) => {
        this.status = value;
      });
    });
    new import_obsidian7.Setting(this.contentEl).setName("\u7B14\u8BB0\u8DEF\u5F84").addText((text) => {
      text.setValue(this.notePath);
      text.onChange((value) => {
        this.notePath = value.trim();
      });
    });
    new import_obsidian7.Setting(this.contentEl).setName("\u6807\u7B7E").addText((text) => {
      text.setValue(this.tags);
      text.onChange((value) => {
        this.tags = value;
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
        ...this.book,
        title: this.title,
        author: this.author || "\u672A\u77E5\u4F5C\u8005",
        totalPages: Math.max(1, this.totalPages),
        currentPage: Math.max(0, Math.min(this.currentPage, Math.max(1, this.totalPages))),
        status: this.status,
        notePath: this.notePath || void 0,
        tags: this.tags.split(/[,，]/).map((tag) => tag.trim()).filter(Boolean)
      });
      this.close();
    });
  }
};

// src/components/goals/GoalModals.ts
var import_obsidian8 = require("obsidian");
var GoalEditorModal = class extends import_obsidian8.Modal {
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
    new import_obsidian8.Setting(this.contentEl).setName("\u6807\u9898").addText((text) => text.setValue(this.title).onChange((value) => this.title = value.trim()));
    new import_obsidian8.Setting(this.contentEl).setName("\u63CF\u8FF0").addTextArea((text) => text.setValue(this.description).onChange((value) => this.description = value.trim()));
    new import_obsidian8.Setting(this.contentEl).setName("\u5206\u7C7B").addText((text) => text.setValue(this.category).onChange((value) => this.category = value.trim() || "\u4E2A\u4EBA"));
    new import_obsidian8.Setting(this.contentEl).setName("\u8FDB\u5EA6").addText((text) => {
      text.inputEl.type = "number";
      text.setValue(String(this.progress));
      text.onChange((value) => this.progress = Number(value) || 0);
    });
    new import_obsidian8.Setting(this.contentEl).setName("\u622A\u6B62\u65E5\u671F").addText((text) => text.setValue(this.deadline).onChange((value) => this.deadline = value.trim()));
    new import_obsidian8.Setting(this.contentEl).setName("\u72B6\u6001").addDropdown((dropdown) => {
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
var KeyResultModal = class extends import_obsidian8.Modal {
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
    new import_obsidian8.Setting(this.contentEl).setName("Objective").addDropdown((dropdown) => {
      this.objectives.forEach((objective) => dropdown.addOption(objective.id, `${objective.quarter} \xB7 ${objective.title}`));
      dropdown.setValue(this.objectiveId);
      dropdown.onChange((value) => this.objectiveId = value);
    });
    new import_obsidian8.Setting(this.contentEl).setName("\u6807\u9898").addText((text) => text.onChange((value) => this.title = value.trim()));
    new import_obsidian8.Setting(this.contentEl).setName("\u8FDB\u5EA6").addText((text) => {
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
var MilestoneModal = class extends import_obsidian8.Modal {
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
    new import_obsidian8.Setting(this.contentEl).setName("\u76EE\u6807").addDropdown((dropdown) => {
      this.goals.forEach((goal) => dropdown.addOption(goal.id, goal.title));
      dropdown.setValue(this.goalId);
      dropdown.onChange((value) => this.goalId = value);
    });
    new import_obsidian8.Setting(this.contentEl).setName("\u6807\u9898").addText((text) => text.onChange((value) => this.title = value.trim()));
    new import_obsidian8.Setting(this.contentEl).setName("\u65E5\u671F").addText((text) => text.setValue(this.date).onChange((value) => this.date = value.trim()));
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
var RiskModal = class extends import_obsidian8.Modal {
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
    new import_obsidian8.Setting(this.contentEl).setName("\u98CE\u9669").addText((text) => text.onChange((value) => this.title = value.trim()));
    new import_obsidian8.Setting(this.contentEl).setName("\u7B49\u7EA7").addDropdown((dropdown) => {
      dropdown.addOption("low", "\u4F4E");
      dropdown.addOption("medium", "\u4E2D");
      dropdown.addOption("high", "\u9AD8");
      dropdown.setValue(this.level);
      dropdown.onChange((value) => this.level = value);
    });
    new import_obsidian8.Setting(this.contentEl).setName("\u65B9\u6848").addTextArea((text) => text.onChange((value) => this.solution = value.trim()));
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "\u6DFB\u52A0", attr: { type: "button" } }).addEventListener("click", async () => {
      if (!this.title) return;
      await this.onSubmit({ id: `risk-${Date.now()}`, title: this.title, level: this.level, solution: this.solution });
      this.close();
    });
  }
};

// src/components/DashboardEditModals.ts
var import_obsidian9 = require("obsidian");
var ACCOUNT_TYPES = ["\u73B0\u91D1", "\u50A8\u84C4\u5361", "\u4FE1\u7528\u5361", "\u6295\u8D44\u8D26\u6237", "\u652F\u4ED8\u5B9D", "\u5FAE\u4FE1\u94B1\u5305", "\u8BC1\u5238", "\u5176\u4ED6"];
var QUADRANTS = [
  { value: "important-urgent", label: "\u91CD\u8981\u4E14\u7D27\u6025" },
  { value: "important-not-urgent", label: "\u91CD\u8981\u4E0D\u7D27\u6025" },
  { value: "not-important-urgent", label: "\u4E0D\u91CD\u8981\u4F46\u7D27\u6025" },
  { value: "not-important-not-urgent", label: "\u4E0D\u91CD\u8981\u4E0D\u7D27\u6025" }
];
function openBodyMeasurementModal(app, onSubmit, item) {
  var _a, _b, _c, _d, _e, _f;
  new CrudItemModal(app, item ? "\u7F16\u8F91\u56F4\u5EA6\u8BB0\u5F55" : "\u8BB0\u5F55\u8EAB\u4F53\u6570\u636E", {
    date: (_a = item == null ? void 0 : item.date) != null ? _a : formatDateKey(/* @__PURE__ */ new Date()),
    weight: (_b = item == null ? void 0 : item.weight) != null ? _b : 0,
    bmi: (_c = item == null ? void 0 : item.bmi) != null ? _c : 0,
    waist: (_d = item == null ? void 0 : item.waist) != null ? _d : 0,
    chest: (_e = item == null ? void 0 : item.chest) != null ? _e : 0,
    hip: (_f = item == null ? void 0 : item.hip) != null ? _f : 0
  }, [
    { key: "date", name: "\u65E5\u671F" },
    { key: "weight", name: "\u4F53\u91CD", type: "number" },
    { key: "bmi", name: "BMI", type: "number" },
    { key: "waist", name: "\u8170\u56F4", type: "number" },
    { key: "chest", name: "\u80F8\u56F4", type: "number" },
    { key: "hip", name: "\u81C0\u56F4", type: "number" }
  ], async (values) => {
    var _a2;
    return onSubmit({ ...values, id: (_a2 = item == null ? void 0 : item.id) != null ? _a2 : `measure-${Date.now()}` });
  }).open();
}
function openFitnessDailyModal(app, record, onSubmit) {
  new CrudItemModal(app, "\u7F16\u8F91\u996E\u6C34\u4E0E\u7761\u7720", { ...record }, [
    { key: "date", name: "\u65E5\u671F" },
    { key: "waterCups", name: "\u996E\u6C34\u676F\u6570", type: "number" },
    { key: "waterGoal", name: "\u996E\u6C34\u76EE\u6807", type: "number" },
    { key: "sleepHours", name: "\u7761\u7720\u65F6\u957F", type: "number" },
    { key: "sleepGoal", name: "\u7761\u7720\u76EE\u6807", type: "number" },
    { key: "bedtime", name: "\u5165\u7761\u65F6\u95F4" },
    { key: "wakeTime", name: "\u8D77\u5E8A\u65F6\u95F4" }
  ], onSubmit).open();
}
function openFitnessGoalModal(app, onSubmit, goal) {
  var _a, _b, _c, _d, _e;
  new CrudItemModal(app, goal ? "\u7F16\u8F91\u5065\u8EAB\u76EE\u6807" : "\u65B0\u589E\u5065\u8EAB\u76EE\u6807", {
    title: (_a = goal == null ? void 0 : goal.title) != null ? _a : "",
    current: (_b = goal == null ? void 0 : goal.current) != null ? _b : 0,
    target: (_c = goal == null ? void 0 : goal.target) != null ? _c : 0,
    unit: (_d = goal == null ? void 0 : goal.unit) != null ? _d : "kg",
    deadline: (_e = goal == null ? void 0 : goal.deadline) != null ? _e : formatDateKey(/* @__PURE__ */ new Date())
  }, [
    { key: "title", name: "\u76EE\u6807\u540D\u79F0" },
    { key: "current", name: "\u5F53\u524D\u503C", type: "number" },
    { key: "target", name: "\u76EE\u6807\u503C", type: "number" },
    { key: "unit", name: "\u5355\u4F4D" },
    { key: "deadline", name: "\u622A\u6B62\u65E5\u671F" }
  ], async (values) => {
    var _a2;
    return onSubmit({ ...values, id: (_a2 = goal == null ? void 0 : goal.id) != null ? _a2 : `fitness-goal-${Date.now()}` });
  }).open();
}
function openBudgetModal(app, onSubmit, budget) {
  var _a, _b, _c, _d;
  new CrudItemModal(app, budget ? "\u7F16\u8F91\u652F\u51FA\u5206\u7C7B" : "\u65B0\u589E\u652F\u51FA\u5206\u7C7B", {
    category: (_a = budget == null ? void 0 : budget.category) != null ? _a : "",
    amount: (_b = budget == null ? void 0 : budget.amount) != null ? _b : 0,
    spent: (_c = budget == null ? void 0 : budget.spent) != null ? _c : 0,
    color: (_d = budget == null ? void 0 : budget.color) != null ? _d : "#ff7fb4"
  }, [
    { key: "category", name: "\u5206\u7C7B\u540D\u79F0" },
    { key: "amount", name: "\u9884\u7B97\u91D1\u989D", type: "number" },
    { key: "color", name: "\u989C\u8272" }
  ], async (values) => {
    var _a2, _b2;
    return onSubmit({ ...values, id: (_a2 = budget == null ? void 0 : budget.id) != null ? _a2 : `budget-${Date.now()}`, spent: (_b2 = budget == null ? void 0 : budget.spent) != null ? _b2 : 0 });
  }).open();
}
function openAccountModal(app, onSubmit, account) {
  var _a, _b, _c, _d;
  new CrudItemModal(app, account ? "\u7F16\u8F91\u8D26\u6237" : "\u65B0\u589E\u8D26\u6237", {
    name: (_a = account == null ? void 0 : account.name) != null ? _a : "",
    type: (_b = account == null ? void 0 : account.type) != null ? _b : "\u50A8\u84C4\u5361",
    balance: (_c = account == null ? void 0 : account.balance) != null ? _c : 0,
    icon: (_d = account == null ? void 0 : account.icon) != null ? _d : "wallet"
  }, [
    { key: "name", name: "\u8D26\u6237\u540D\u79F0" },
    { key: "type", name: "\u8D26\u6237\u7C7B\u578B", type: "select", options: ACCOUNT_TYPES.map((type) => ({ value: type, label: type })) },
    { key: "balance", name: "\u4F59\u989D", type: "number" },
    { key: "icon", name: "\u56FE\u6807" }
  ], async (values) => {
    var _a2;
    return onSubmit({ ...values, id: (_a2 = account == null ? void 0 : account.id) != null ? _a2 : `account-${Date.now()}` });
  }).open();
}
function openInvestmentWatchModal(app, onSubmit, item) {
  var _a, _b, _c, _d, _e;
  new CrudItemModal(app, item ? "\u7F16\u8F91\u6295\u8D44\u89C2\u5BDF" : "\u65B0\u589E\u6295\u8D44\u89C2\u5BDF", {
    name: (_a = item == null ? void 0 : item.name) != null ? _a : "",
    code: (_b = item == null ? void 0 : item.code) != null ? _b : "",
    price: (_c = item == null ? void 0 : item.price) != null ? _c : 0,
    changePercent: (_d = item == null ? void 0 : item.changePercent) != null ? _d : 0,
    type: (_e = item == null ? void 0 : item.type) != null ? _e : "\u6307\u6570"
  }, [
    { key: "name", name: "\u540D\u79F0" },
    { key: "code", name: "\u4EE3\u7801" },
    { key: "price", name: "\u5F53\u524D\u4EF7\u683C", type: "number" },
    { key: "changePercent", name: "\u53D8\u5316\u767E\u5206\u6BD4", type: "number" },
    { key: "type", name: "\u7C7B\u578B" }
  ], async (values) => {
    var _a2;
    return onSubmit({ ...values, id: (_a2 = item == null ? void 0 : item.id) != null ? _a2 : `watch-${Date.now()}` });
  }).open();
}
function openPriorityItemModal(app, onSubmit, item) {
  var _a, _b, _c, _d;
  new CrudItemModal(app, item ? "\u7F16\u8F91\u4F18\u5148\u7EA7\u4EFB\u52A1" : "\u65B0\u589E\u4F18\u5148\u7EA7\u4EFB\u52A1", {
    title: (_a = item == null ? void 0 : item.title) != null ? _a : "",
    quadrant: (_b = item == null ? void 0 : item.quadrant) != null ? _b : "important-urgent",
    note: (_c = item == null ? void 0 : item.note) != null ? _c : "",
    completed: (_d = item == null ? void 0 : item.completed) != null ? _d : false
  }, [
    { key: "title", name: "\u6807\u9898" },
    { key: "quadrant", name: "\u8C61\u9650", type: "select", options: QUADRANTS },
    { key: "note", name: "\u5907\u6CE8", type: "textarea" },
    { key: "completed", name: "\u5DF2\u5B8C\u6210", type: "checkbox" }
  ], async (values) => {
    var _a2;
    return onSubmit({ ...values, id: (_a2 = item == null ? void 0 : item.id) != null ? _a2 : `priority-${Date.now()}` });
  }).open();
}
function showUsedCategoryNotice(category) {
  new import_obsidian9.Notice(`\u201C${category}\u201D\u4ECD\u6709\u8BB0\u8D26\u8BB0\u5F55\uFF0C\u6682\u4E0D\u80FD\u5220\u9664\u3002`);
}
function openTransactionModal(app, onSubmit, transaction) {
  var _a, _b, _c, _d, _e, _f;
  new CrudItemModal(app, transaction ? "\u7F16\u8F91\u6536\u652F\u8BB0\u5F55" : "\u65B0\u589E\u6536\u652F\u8BB0\u5F55", {
    type: (_a = transaction == null ? void 0 : transaction.type) != null ? _a : "expense",
    category: (_b = transaction == null ? void 0 : transaction.category) != null ? _b : "\u9910\u996E",
    amount: (_c = transaction == null ? void 0 : transaction.amount) != null ? _c : 0,
    date: (_d = transaction == null ? void 0 : transaction.date) != null ? _d : formatDateKey(/* @__PURE__ */ new Date()),
    accountId: (_e = transaction == null ? void 0 : transaction.accountId) != null ? _e : "",
    note: (_f = transaction == null ? void 0 : transaction.note) != null ? _f : ""
  }, [
    { key: "type", name: "\u7C7B\u578B", type: "select", options: [{ value: "expense", label: "\u652F\u51FA" }, { value: "income", label: "\u6536\u5165" }] },
    { key: "category", name: "\u5206\u7C7B" },
    { key: "amount", name: "\u91D1\u989D", type: "number" },
    { key: "date", name: "\u65E5\u671F" },
    { key: "accountId", name: "\u8D26\u6237" },
    { key: "note", name: "\u5907\u6CE8" }
  ], async (values) => {
    var _a2;
    return onSubmit({ ...values, id: (_a2 = transaction == null ? void 0 : transaction.id) != null ? _a2 : `tx-${Date.now()}` });
  }).open();
}

// src/components/overview/TodoStatisticsModal.ts
var import_obsidian10 = require("obsidian");
var CATEGORIES = ["\u79D1\u7814", "\u9605\u8BFB", "\u5065\u8EAB", "\u7406\u8D22", "\u4E2A\u4EBA"];
var TodoStatisticsModal = class extends import_obsidian10.Modal {
  constructor(app, store, date, onDataChanged) {
    super(app);
    this.store = store;
    this.onDataChanged = onDataChanged;
    this.calendar = new CalendarService();
    this.date = date;
  }
  onOpen() {
    this.render();
  }
  render() {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-todo-stat-modal");
    const dateKey = this.calendar.getDateKey(this.date);
    const tasks = this.store.getTodayFocusTasksForDate(dateKey);
    const done = tasks.filter((task) => task.completed).length;
    const rate = tasks.length === 0 ? 0 : Math.round(done / tasks.length * 100);
    const header = this.contentEl.createDiv({ cls: "cow-stats-modal-header" });
    const prev = header.createEl("button", { attr: { type: "button", "aria-label": "\u4E0A\u4E00\u5929" } });
    (0, import_obsidian10.setIcon)(prev, "chevron-left");
    prev.addEventListener("click", () => {
      this.date.setDate(this.date.getDate() - 1);
      this.render();
    });
    header.createEl("h2", { text: dateKey });
    const next = header.createEl("button", { attr: { type: "button", "aria-label": "\u4E0B\u4E00\u5929" } });
    (0, import_obsidian10.setIcon)(next, "chevron-right");
    next.addEventListener("click", () => {
      this.date.setDate(this.date.getDate() + 1);
      this.render();
    });
    const summary = this.contentEl.createDiv({ cls: "cow-stats-card-grid" });
    [["\u603B\u4EFB\u52A1", tasks.length], ["\u5DF2\u5B8C\u6210", done], ["\u672A\u5B8C\u6210", tasks.length - done], ["\u5B8C\u6210\u7387", `${rate}%`]].forEach(([label, value]) => {
      const card = summary.createDiv({ cls: "cow-stats-card" });
      card.createEl("strong", { text: String(value) });
      card.createSpan({ text: String(label) });
    });
    const add = this.contentEl.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    (0, import_obsidian10.setIcon)(add.createSpan(), "plus");
    add.createSpan({ text: "\u65B0\u589E\u5F85\u529E" });
    add.addEventListener("click", () => {
      new TodayFocusTaskModal(this.app, dateKey, async (values) => {
        await this.store.addTodayFocusTask(values.label, values.category, values.date);
        this.onDataChanged();
        this.render();
      }).open();
    });
    const list = this.contentEl.createDiv({ cls: "cow-data-list" });
    if (tasks.length === 0) {
      list.createEl("p", { cls: "cow-empty-state", text: "\u8FD9\u4E00\u5929\u8FD8\u6CA1\u6709 Todo\u3002" });
      return;
    }
    tasks.forEach((task) => {
      var _a;
      const row = list.createDiv({ cls: "cow-data-card cow-todo-stat-item" });
      const checkbox = row.createEl("input", { attr: { type: "checkbox" } });
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", async () => {
        await this.store.toggleTodayFocusTask(task.id);
        this.onDataChanged();
        this.render();
      });
      const body = row.createDiv({ cls: "cow-list-item-head" });
      const text = body.createDiv();
      text.createEl("strong", { text: task.label });
      text.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${task.category} \xB7 ${(_a = task.date) != null ? _a : dateKey}` });
      const actions = body.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91" } });
      (0, import_obsidian10.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => {
        new TodayFocusTaskModal(this.app, dateKey, async (values) => {
          await this.store.updateTodayFocusTask(task.id, values);
          this.onDataChanged();
          this.render();
        }, task).open();
      });
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664" } });
      (0, import_obsidian10.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteTodayFocusTask(task.id);
        this.onDataChanged();
        this.render();
      });
    });
  }
};
var TodayFocusTaskModal = class extends import_obsidian10.Modal {
  constructor(app, date, onSubmit, task) {
    var _a, _b, _c;
    super(app);
    this.onSubmit = onSubmit;
    this.label = (_a = task == null ? void 0 : task.label) != null ? _a : "";
    this.category = (_b = task == null ? void 0 : task.category) != null ? _b : "\u4E2A\u4EBA";
    this.date = (_c = task == null ? void 0 : task.date) != null ? _c : date;
  }
  onOpen() {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: this.label ? "\u7F16\u8F91\u4ECA\u65E5\u7126\u70B9" : "\u65B0\u589E\u4ECA\u65E5\u7126\u70B9" });
    new import_obsidian10.Setting(this.contentEl).setName("\u6807\u9898").addText((text) => text.setValue(this.label).onChange((value) => {
      this.label = value;
    }));
    new import_obsidian10.Setting(this.contentEl).setName("\u5206\u7C7B").addDropdown((dropdown) => {
      CATEGORIES.forEach((category) => dropdown.addOption(category, category));
      dropdown.setValue(this.category);
      dropdown.onChange((value) => {
        this.category = value;
      });
    });
    new import_obsidian10.Setting(this.contentEl).setName("\u65E5\u671F").addText((text) => text.setValue(this.date).onChange((value) => {
      this.date = value.trim() || formatDateKey(/* @__PURE__ */ new Date());
    }));
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } }).addEventListener("click", () => this.close());
    const save = actions.createEl("button", { text: "\u4FDD\u5B58", cls: "mod-cta", attr: { type: "button" } });
    save.addEventListener("click", async () => {
      const label = this.label.trim();
      if (!label) return;
      await this.onSubmit({ label, category: this.category, date: this.date });
      this.close();
    });
  }
};

// src/components/SectionContentActions.ts
function openAddContentModal(app, store, section, onDataChanged) {
  const refresh = () => onDataChanged();
  switch (section.type) {
    case "research-projects":
      openResearchProjectModal(app, async (values) => {
        await store.addResearchProject({ ...values, id: `project-${Date.now()}`, tags: splitTags(values.tagsText) });
        refresh();
      });
      break;
    case "reading-queue":
    case "literature-notes":
      openResearchPaperModal(app, async (values) => {
        await store.addResearchPaper({ ...values, id: `paper-${Date.now()}` });
        refresh();
      });
      break;
    case "experiment-plan":
    case "experiment-records":
      openExperimentModal(app, async (values) => {
        await store.addExperiment(section.type === "experiment-plan" ? "plan" : "records", { ...values, id: `experiment-${Date.now()}` });
        refresh();
      });
      break;
    case "data-analysis-tasks":
      openDataAnalysisTaskModal(app, async (values) => {
        await store.addDataAnalysisTask({ ...values, id: `analysis-${Date.now()}` });
        refresh();
      });
      break;
    case "research-timeline":
      openDeadlineModal(app, async (values) => {
        await store.addResearchDeadline({ ...values, id: `deadline-${Date.now()}` });
        refresh();
      });
      break;
    case "research-memo":
      openTextModal(app, "\u65B0\u589E\u79D1\u7814 Memo", "Memo", "", async (text) => {
        await store.addResearchMemo(text);
        refresh();
      });
      break;
    case "bookshelf":
    case "reading-plan":
    case "reading-notes":
    case "wishlist-books":
      new AddBookModal(app, async (book) => {
        await store.addBook(section.type === "wishlist-books" ? { ...book, status: "\u60F3\u8BFB" } : book);
        refresh();
      }).open();
      break;
    case "reading-quotes":
      openQuoteModal(app, async (values) => {
        await store.addReadingQuote({ ...values, id: `quote-${Date.now()}` });
        refresh();
      });
      break;
    case "workout-plan":
    case "workout-log":
      openWorkoutModal(app, async (values) => {
        await store.addWorkout({ ...values, id: `workout-${Date.now()}` });
        refresh();
      }, section.type === "workout-log");
      break;
    case "health-reminders":
      openTextModal(app, "\u65B0\u589E\u5065\u5EB7\u63D0\u9192", "\u63D0\u9192", "", async (text) => {
        await store.addHealthReminder(text);
        refresh();
      });
      break;
    case "saving-goals":
      openSavingGoalModal(app, async (values) => {
        await store.addSavingGoal({ ...values, id: `saving-${Date.now()}` });
        refresh();
      });
      break;
    case "bill-reminders":
      openBillModal(app, async (values) => {
        await store.addBill({ ...values, id: `bill-${Date.now()}` });
        refresh();
      });
      break;
    case "finance-todos":
      openTextModal(app, "\u65B0\u589E\u8BB0\u8D26\u5F85\u529E", "\u5F85\u529E", "", async (text) => {
        await store.addFinanceTodo(text);
        refresh();
      });
      break;
    case "yearly-goals":
      new GoalEditorModal(app, void 0, async (goal) => {
        await store.addGoal(goal);
        refresh();
      }).open();
      break;
    case "quarterly-okr":
      openObjectiveModal(app, async (values) => {
        await store.addObjective({ ...values, id: `objective-${Date.now()}` });
        refresh();
      });
      break;
    case "monthly-key-results":
      new KeyResultModal(app, store.getObjectives(), async (kr) => {
        await store.addKeyResult(kr);
        refresh();
      }).open();
      break;
    case "milestone-timeline":
      new MilestoneModal(app, store.getGoals(), async (milestone) => {
        await store.addMilestone(milestone);
        refresh();
      }).open();
      break;
    case "risks-blockers":
      new RiskModal(app, async (risk) => {
        await store.addRisk(risk);
        refresh();
      }).open();
      break;
    case "today-focus":
      new TodayFocusTaskModal(app, formatDateKey(/* @__PURE__ */ new Date()), async (values) => {
        await store.addTodayFocusTask(values.label, values.category, values.date);
        refresh();
      }).open();
      break;
    case "body-measurements":
      openBodyMeasurementModal(app, async (values) => {
        await store.addBodyMeasurement(values);
        refresh();
      });
      break;
    case "water-sleep-habits":
      openFitnessDailyModal(app, store.getFitnessDailyRecord(), async (values) => {
        await store.updateFitnessDailyRecord(values.date, values);
        refresh();
      });
      break;
    case "fitness-goals":
      openFitnessGoalModal(app, async (values) => {
        await store.addFitnessGoal(values);
        refresh();
      });
      break;
    case "monthly-budget":
      openBudgetLimitModal(app, store.getMonthlyBudgetLimit(), async (value) => {
        await store.setMonthlyBudgetLimit(value);
        refresh();
      });
      break;
    case "expense-categories":
      openBudgetModal(app, async (values) => {
        await store.addBudget(values);
        refresh();
      });
      break;
    case "account-overview":
      openAccountModal(app, async (values) => {
        await store.addAccount(values);
        refresh();
      });
      break;
    case "income-expense-trend":
      openTransactionModal(app, async (values) => {
        await store.addTransaction(values);
        refresh();
      });
      break;
    case "investment-watch":
      openInvestmentWatchModal(app, async (values) => {
        await store.addInvestmentWatchItem(values);
        refresh();
      });
      break;
    case "priority-matrix":
      openPriorityItemModal(app, async (values) => {
        await store.addPriorityMatrixItem(values);
        refresh();
      });
      break;
    default:
      new import_obsidian11.Notice("\u8FD9\u4E2A\u6A21\u5757\u6682\u672A\u63D0\u4F9B\u6DFB\u52A0\u5165\u53E3\u3002");
  }
}
function openManageContentModal(app, store, section, onDataChanged) {
  if (section.type === "today-focus") {
    new TodoStatisticsModal(app, store, /* @__PURE__ */ new Date(), onDataChanged).open();
    return;
  }
  openAddContentModal(app, store, section, onDataChanged);
}
function openTextModal(app, title, fieldName, initialValue, onSubmit) {
  new CrudItemModal(app, title, { value: initialValue }, [{ key: "value", name: fieldName, type: "textarea" }], async (values) => {
    var _a;
    const value = String((_a = values.value) != null ? _a : "").trim();
    if (!value) return;
    await onSubmit(value);
  }).open();
}
function openBudgetLimitModal(app, initialValue, onSubmit) {
  new CrudItemModal(app, "\u8BBE\u7F6E\u6708\u9884\u7B97", { amount: initialValue }, [
    { key: "amount", name: "\u6708\u9884\u7B97", type: "number" }
  ], async (values) => {
    await onSubmit(Number(values.amount) || 0);
  }).open();
}
function openResearchProjectModal(app, onSubmit, project) {
  var _a, _b, _c, _d, _e, _f;
  new CrudItemModal(app, project ? "\u7F16\u8F91\u7814\u7A76\u9879\u76EE" : "\u65B0\u589E\u7814\u7A76\u9879\u76EE", {
    title: (_a = project == null ? void 0 : project.title) != null ? _a : "",
    status: (_b = project == null ? void 0 : project.status) != null ? _b : "\u8FDB\u884C\u4E2D",
    progress: (_c = project == null ? void 0 : project.progress) != null ? _c : 0,
    startDate: (_d = project == null ? void 0 : project.startDate) != null ? _d : formatDateKey(/* @__PURE__ */ new Date()),
    deadline: (_e = project == null ? void 0 : project.deadline) != null ? _e : formatDateKey(/* @__PURE__ */ new Date()),
    tagsText: (_f = project == null ? void 0 : project.tags.join(", ")) != null ? _f : ""
  }, [
    { key: "title", name: "\u6807\u9898" },
    { key: "status", name: "\u72B6\u6001", type: "select", options: statusOptions(["\u672A\u5F00\u59CB", "\u8FDB\u884C\u4E2D", "\u64B0\u5199\u4E2D", "\u5DF2\u5B8C\u6210"]) },
    { key: "progress", name: "\u8FDB\u5EA6", type: "number" },
    { key: "startDate", name: "\u5F00\u59CB\u65E5\u671F" },
    { key: "deadline", name: "\u622A\u6B62\u65E5\u671F" },
    { key: "tagsText", name: "\u6807\u7B7E" }
  ], onSubmit).open();
}
function openResearchPaperModal(app, onSubmit, paper) {
  var _a, _b, _c, _d, _e, _f;
  new CrudItemModal(app, paper ? "\u7F16\u8F91\u8BBA\u6587" : "\u65B0\u589E\u8BBA\u6587", {
    title: (_a = paper == null ? void 0 : paper.title) != null ? _a : "",
    venue: (_b = paper == null ? void 0 : paper.venue) != null ? _b : "",
    year: (_c = paper == null ? void 0 : paper.year) != null ? _c : (/* @__PURE__ */ new Date()).getFullYear(),
    status: (_d = paper == null ? void 0 : paper.status) != null ? _d : "\u672A\u5F00\u59CB",
    readingProgress: (_e = paper == null ? void 0 : paper.readingProgress) != null ? _e : 0,
    notePath: (_f = paper == null ? void 0 : paper.notePath) != null ? _f : ""
  }, [
    { key: "title", name: "\u6807\u9898" },
    { key: "venue", name: "\u4F1A\u8BAE/\u671F\u520A" },
    { key: "year", name: "\u5E74\u4EFD", type: "number" },
    { key: "status", name: "\u72B6\u6001", type: "select", options: statusOptions(["\u672A\u5F00\u59CB", "\u8FDB\u884C\u4E2D", "\u5DF2\u5B8C\u6210"]) },
    { key: "readingProgress", name: "\u9605\u8BFB\u8FDB\u5EA6", type: "number" },
    { key: "notePath", name: "\u7B14\u8BB0\u8DEF\u5F84" }
  ], onSubmit).open();
}
function openExperimentModal(app, onSubmit, item) {
  var _a, _b, _c, _d;
  new CrudItemModal(app, item ? "\u7F16\u8F91\u5B9E\u9A8C" : "\u65B0\u589E\u5B9E\u9A8C", {
    title: (_a = item == null ? void 0 : item.title) != null ? _a : "",
    date: (_b = item == null ? void 0 : item.date) != null ? _b : formatDateKey(/* @__PURE__ */ new Date()),
    status: (_c = item == null ? void 0 : item.status) != null ? _c : "\u8BA1\u5212\u4E2D",
    notePath: (_d = item == null ? void 0 : item.notePath) != null ? _d : ""
  }, [
    { key: "title", name: "\u6807\u9898" },
    { key: "date", name: "\u65E5\u671F" },
    { key: "status", name: "\u72B6\u6001", type: "select", options: statusOptions(["\u672A\u5F00\u59CB", "\u8BA1\u5212\u4E2D", "\u8FDB\u884C\u4E2D", "\u5DF2\u5B8C\u6210"]) },
    { key: "notePath", name: "\u7B14\u8BB0\u8DEF\u5F84" }
  ], onSubmit).open();
}
function openDataAnalysisTaskModal(app, onSubmit, task) {
  var _a, _b, _c;
  new CrudItemModal(app, task ? "\u7F16\u8F91\u6570\u636E\u5206\u6790\u4EFB\u52A1" : "\u65B0\u589E\u6570\u636E\u5206\u6790\u4EFB\u52A1", {
    title: (_a = task == null ? void 0 : task.title) != null ? _a : "",
    progress: (_b = task == null ? void 0 : task.progress) != null ? _b : 0,
    status: (_c = task == null ? void 0 : task.status) != null ? _c : "\u8FDB\u884C\u4E2D"
  }, [
    { key: "title", name: "\u6807\u9898" },
    { key: "progress", name: "\u8FDB\u5EA6", type: "number" },
    { key: "status", name: "\u72B6\u6001", type: "select", options: statusOptions(["\u672A\u5F00\u59CB", "\u8FDB\u884C\u4E2D", "\u5DF2\u5B8C\u6210"]) }
  ], onSubmit).open();
}
function openDeadlineModal(app, onSubmit, deadline) {
  var _a, _b, _c, _d;
  new CrudItemModal(app, deadline ? "\u7F16\u8F91\u4F1A\u8BAE / DDL" : "\u65B0\u589E\u4F1A\u8BAE / DDL", {
    title: (_a = deadline == null ? void 0 : deadline.title) != null ? _a : "",
    date: (_b = deadline == null ? void 0 : deadline.date) != null ? _b : formatDateKey(/* @__PURE__ */ new Date()),
    type: (_c = deadline == null ? void 0 : deadline.type) != null ? _c : "DDL",
    priority: (_d = deadline == null ? void 0 : deadline.priority) != null ? _d : "medium"
  }, [
    { key: "title", name: "\u6807\u9898" },
    { key: "date", name: "\u65E5\u671F" },
    { key: "type", name: "\u7C7B\u578B", type: "select", options: statusOptions(["\u4F1A\u8BAE", "DDL", "\u7EC4\u4F1A", "\u6C47\u62A5"]) },
    { key: "priority", name: "\u4F18\u5148\u7EA7", type: "select", options: [{ value: "low", label: "\u4F4E" }, { value: "medium", label: "\u4E2D" }, { value: "high", label: "\u9AD8" }] }
  ], onSubmit).open();
}
function openQuoteModal(app, onSubmit, quote) {
  var _a, _b;
  new CrudItemModal(app, quote ? "\u7F16\u8F91\u91D1\u53E5" : "\u65B0\u589E\u91D1\u53E5", {
    text: (_a = quote == null ? void 0 : quote.text) != null ? _a : "",
    source: (_b = quote == null ? void 0 : quote.source) != null ? _b : ""
  }, [
    { key: "text", name: "\u6458\u5F55", type: "textarea" },
    { key: "source", name: "\u6765\u6E90" }
  ], onSubmit).open();
}
function openWorkoutModal(app, onSubmit, completed = false, workout) {
  var _a, _b, _c, _d, _e, _f;
  new CrudItemModal(app, workout ? "\u7F16\u8F91\u8BAD\u7EC3" : "\u65B0\u589E\u8BAD\u7EC3", {
    date: (_a = workout == null ? void 0 : workout.date) != null ? _a : formatDateKey(/* @__PURE__ */ new Date()),
    type: (_b = workout == null ? void 0 : workout.type) != null ? _b : "\u529B\u91CF",
    duration: (_c = workout == null ? void 0 : workout.duration) != null ? _c : 30,
    calories: (_d = workout == null ? void 0 : workout.calories) != null ? _d : 0,
    completed: (_e = workout == null ? void 0 : workout.completed) != null ? _e : completed,
    note: (_f = workout == null ? void 0 : workout.note) != null ? _f : ""
  }, [
    { key: "date", name: "\u65E5\u671F" },
    { key: "type", name: "\u7C7B\u578B", type: "select", options: statusOptions(["\u6709\u6C27", "\u529B\u91CF", "\u62C9\u4F38", "\u4F11\u606F"]) },
    { key: "duration", name: "\u65F6\u957F", type: "number" },
    { key: "calories", name: "\u70ED\u91CF", type: "number" },
    { key: "completed", name: "\u5DF2\u5B8C\u6210", type: "checkbox" },
    { key: "note", name: "\u5907\u6CE8" }
  ], onSubmit).open();
}
function openSavingGoalModal(app, onSubmit, goal) {
  var _a, _b, _c, _d;
  new CrudItemModal(app, goal ? "\u7F16\u8F91\u50A8\u84C4\u76EE\u6807" : "\u65B0\u589E\u50A8\u84C4\u76EE\u6807", {
    title: (_a = goal == null ? void 0 : goal.title) != null ? _a : "",
    current: (_b = goal == null ? void 0 : goal.current) != null ? _b : 0,
    target: (_c = goal == null ? void 0 : goal.target) != null ? _c : 0,
    deadline: (_d = goal == null ? void 0 : goal.deadline) != null ? _d : formatDateKey(/* @__PURE__ */ new Date())
  }, [
    { key: "title", name: "\u6807\u9898" },
    { key: "current", name: "\u5F53\u524D\u91D1\u989D", type: "number" },
    { key: "target", name: "\u76EE\u6807\u91D1\u989D", type: "number" },
    { key: "deadline", name: "\u622A\u6B62\u65E5\u671F" }
  ], onSubmit).open();
}
function openBillModal(app, onSubmit, bill) {
  var _a, _b, _c, _d;
  new CrudItemModal(app, bill ? "\u7F16\u8F91\u8D26\u5355" : "\u65B0\u589E\u8D26\u5355", {
    title: (_a = bill == null ? void 0 : bill.title) != null ? _a : "",
    amount: (_b = bill == null ? void 0 : bill.amount) != null ? _b : 0,
    dueDate: (_c = bill == null ? void 0 : bill.dueDate) != null ? _c : formatDateKey(/* @__PURE__ */ new Date()),
    paid: (_d = bill == null ? void 0 : bill.paid) != null ? _d : false
  }, [
    { key: "title", name: "\u6807\u9898" },
    { key: "amount", name: "\u91D1\u989D", type: "number" },
    { key: "dueDate", name: "\u5230\u671F\u65E5" },
    { key: "paid", name: "\u5DF2\u652F\u4ED8", type: "checkbox" }
  ], onSubmit).open();
}
function openObjectiveModal(app, onSubmit, objective) {
  var _a, _b, _c;
  new CrudItemModal(app, objective ? "\u7F16\u8F91 OKR" : "\u65B0\u589E OKR", {
    title: (_a = objective == null ? void 0 : objective.title) != null ? _a : "",
    quarter: (_b = objective == null ? void 0 : objective.quarter) != null ? _b : "2026 Q4",
    progress: (_c = objective == null ? void 0 : objective.progress) != null ? _c : 0
  }, [
    { key: "title", name: "\u6807\u9898" },
    { key: "quarter", name: "\u5B63\u5EA6" },
    { key: "progress", name: "\u8FDB\u5EA6", type: "number" }
  ], onSubmit).open();
}
function splitTags(value) {
  return value.split(/[,，]/).map((tag) => tag.trim()).filter(Boolean);
}
function statusOptions(values) {
  return values.map((value) => ({ value, label: value }));
}

// src/components/SectionActionMenu.ts
var CARD_COLORS = [
  { id: "default", label: "\u9ED8\u8BA4" },
  { id: "pink", label: "\u7C89\u8272" },
  { id: "cream", label: "\u5976\u6CB9\u9EC4" },
  { id: "mint", label: "\u8584\u8377\u7EFF" },
  { id: "sky", label: "\u5929\u84DD" },
  { id: "lavender", label: "\u6DE1\u7D2B" }
];
var WIDTHS = [
  { id: "sm", label: "\u5C0F" },
  { id: "md", label: "\u4E2D" },
  { id: "lg", label: "\u5927" },
  { id: "full", label: "\u6574\u884C" }
];
var SectionActionMenu = class {
  constructor(app, store, section, onRemove, onDataChanged) {
    this.app = app;
    this.store = store;
    this.section = section;
    this.onRemove = onRemove;
    this.onDataChanged = onDataChanged;
  }
  show(event) {
    const menu = new import_obsidian12.Menu();
    const capabilities = getSectionCapabilities(this.section.type);
    if (capabilities.canAdd) {
      menu.addItem((item) => item.setTitle("\u6DFB\u52A0\u5185\u5BB9").setIcon("plus").onClick(() => void this.addContent()));
    }
    if (capabilities.canManage) {
      menu.addItem((item) => item.setTitle("\u7F16\u8F91\u6570\u636E").setIcon("pencil").onClick(() => openManageContentModal(this.app, this.store, this.section, this.onDataChanged)));
    }
    menu.addItem((item) => item.setTitle("\u4FEE\u6539\u6846\u4F53\u989C\u8272").setIcon("palette").onClick(() => new SectionColorModal(this.app, this.store, this.section, this.onDataChanged).open()));
    menu.addItem((item) => item.setTitle("\u4FEE\u6539\u5BBD\u5EA6").setIcon("columns-3").onClick(() => new SectionWidthModal(this.app, this.store, this.section, this.onDataChanged).open()));
    menu.addSeparator();
    menu.addItem((item) => item.setTitle("\u4E0A\u79FB").setIcon("arrow-up").onClick(() => void this.move("up")));
    menu.addItem((item) => item.setTitle("\u4E0B\u79FB").setIcon("arrow-down").onClick(() => void this.move("down")));
    menu.addItem((item) => item.setTitle("\u9690\u85CF").setIcon("eye-off").onClick(() => void this.hide()));
    menu.addSeparator();
    menu.addItem((item) => item.setTitle("\u5220\u9664").setIcon("trash-2").setWarning(true).onClick(() => new ConfirmSectionDeleteModal(this.app, this.section, () => this.onRemove(this.section)).open()));
    menu.showAtMouseEvent(event);
  }
  async addContent() {
    openAddContentModal(this.app, this.store, this.section, this.onDataChanged);
  }
  async move(direction) {
    await this.store.moveSection(this.section.id, direction);
    this.onDataChanged();
  }
  async hide() {
    await this.store.setSectionEnabled(this.section.id, false);
    this.onDataChanged();
  }
};
var ConfirmSectionDeleteModal = class extends import_obsidian12.Modal {
  constructor(app, section, onConfirm) {
    super(app);
    this.section = section;
    this.onConfirm = onConfirm;
  }
  onOpen() {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: `\u5220\u9664\u201C${this.section.title}\u201D\u5206\u533A\uFF1F` });
    this.contentEl.createEl("p", { text: "\u53EA\u4F1A\u4ECE\u5F53\u524D\u5DE5\u4F5C\u53F0\u5E03\u5C40\u79FB\u9664\uFF0C\u4E0D\u4F1A\u5220\u9664\u4EFB\u4F55 Markdown \u6587\u4EF6\u6216\u4E1A\u52A1\u6570\u636E\u3002" });
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } }).addEventListener("click", () => this.close());
    const remove = actions.createEl("button", { text: "\u5220\u9664", cls: "mod-warning", attr: { type: "button" } });
    remove.addEventListener("click", async () => {
      await this.onConfirm();
      this.close();
    });
  }
};
var SectionColorModal = class extends import_obsidian12.Modal {
  constructor(app, store, section, onDataChanged) {
    super(app);
    this.store = store;
    this.section = section;
    this.onDataChanged = onDataChanged;
  }
  onOpen() {
    var _a, _b;
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "\u4FEE\u6539\u6846\u4F53\u989C\u8272" });
    const grid = this.contentEl.createDiv({ cls: "cow-choice-grid" });
    const current = String((_b = (_a = this.section.config) == null ? void 0 : _a.cardColor) != null ? _b : "default");
    CARD_COLORS.forEach((color) => {
      const button = grid.createEl("button", {
        cls: `cow-color-choice cow-card-color-${color.id} ${current === color.id ? "is-active" : ""}`,
        attr: { type: "button" }
      });
      button.createSpan({ text: color.label });
      button.addEventListener("click", async () => {
        await this.store.updateSectionConfig(this.section.id, { cardColor: color.id });
        this.onDataChanged();
        this.close();
      });
    });
  }
};
var SectionWidthModal = class extends import_obsidian12.Modal {
  constructor(app, store, section, onDataChanged) {
    super(app);
    this.store = store;
    this.section = section;
    this.onDataChanged = onDataChanged;
  }
  onOpen() {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "\u4FEE\u6539\u5BBD\u5EA6" });
    const grid = this.contentEl.createDiv({ cls: "cow-choice-grid" });
    WIDTHS.forEach((width) => {
      const button = grid.createEl("button", {
        cls: this.section.width === width.id ? "is-active" : "",
        attr: { type: "button" }
      });
      (0, import_obsidian12.setIcon)(button.createSpan(), width.id === "full" ? "panel-top" : "columns-3");
      button.createSpan({ text: width.label });
      button.addEventListener("click", async () => {
        await this.store.updateSection(this.section.id, { width: width.id });
        this.onDataChanged();
        this.close();
      });
    });
  }
};

// src/components/overview/HabitStatisticsModal.ts
var import_obsidian13 = require("obsidian");

// src/services/StatisticsService.ts
var StatisticsService = class {
  constructor(store) {
    this.store = store;
    this.calendar = new CalendarService();
  }
  getFocusStats() {
    const today = this.calendar.getDateKey(/* @__PURE__ */ new Date());
    const weekKeys = new Set(this.store.getCurrentWeekDates());
    const records = this.store.getFocusRecords();
    return {
      todayMinutes: records.filter((record) => record.date === today).reduce((sum, record) => sum + record.duration, 0),
      todayPomodoros: records.filter((record) => record.date === today && record.completed).length,
      weekMinutes: records.filter((record) => weekKeys.has(record.date)).reduce((sum, record) => sum + record.duration, 0),
      recentRecords: records.slice(0, 5)
    };
  }
  getHabitStats(month) {
    const monthDays = this.getHabitMonthDays(month);
    const year = month.getFullYear();
    const yearDays = this.getDaysBetween(new Date(year, 0, 1), new Date(year, 11, 31));
    return {
      currentStreak: this.getCurrentHabitStreak(),
      longestStreak: this.getLongestHabitStreak(year),
      monthCompletionRate: this.getCompletionRate(monthDays.map((day) => day.statuses)),
      yearCompletionRate: this.getCompletionRate(yearDays.map((date) => this.getHabitStatuses(date))),
      monthDays
    };
  }
  getMonthProgress(month) {
    const previous = this.calendar.addMonths(month, -1);
    return this.getProgressLabels().map((item) => {
      const current = this.getProgressValue(item.id, month);
      const previousValue = this.getProgressValue(item.id, previous);
      return {
        id: item.id,
        label: item.label,
        current,
        previous: previousValue,
        change: current - previousValue
      };
    });
  }
  getYearProgress(year) {
    return Array.from({ length: 12 }, (_, index) => {
      const month = new Date(year, index, 1);
      const items = this.getMonthProgress(month);
      const average = items.length === 0 ? 0 : Math.round(items.reduce((sum, item) => sum + item.current, 0) / items.length);
      return { month: index + 1, items, average };
    });
  }
  getHabitMonthDays(month) {
    const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    return Array.from({ length: days }, (_, index) => {
      const date = new Date(month.getFullYear(), month.getMonth(), index + 1);
      const statuses = this.getHabitStatuses(date);
      return {
        date: this.calendar.getDateKey(date),
        completedCount: statuses.filter((status) => status.completed).length,
        totalCount: statuses.length,
        statuses
      };
    });
  }
  getHabitStatuses(date) {
    const dateKey = this.calendar.getDateKey(date);
    return DEFAULT_HABITS.map((habit) => ({
      ...habit,
      completed: this.store.isHabitCompleted(habit.id, dateKey)
    }));
  }
  getCurrentHabitStreak() {
    const today = /* @__PURE__ */ new Date();
    let streak = 0;
    for (let offset = 0; offset < 366; offset += 1) {
      const date = new Date(today);
      date.setDate(today.getDate() - offset);
      if (!this.isAllHabitsDone(date)) break;
      streak += 1;
    }
    return streak;
  }
  getLongestHabitStreak(year) {
    let longest = 0;
    let current = 0;
    this.getDaysBetween(new Date(year, 0, 1), new Date(year, 11, 31)).forEach((date) => {
      if (this.isAllHabitsDone(date)) {
        current += 1;
        longest = Math.max(longest, current);
      } else {
        current = 0;
      }
    });
    return longest;
  }
  isAllHabitsDone(date) {
    return this.getHabitStatuses(date).every((status) => status.completed);
  }
  getCompletionRate(days) {
    const statuses = [];
    days.forEach((day) => {
      day.forEach((status) => statuses.push(status));
    });
    if (statuses.length === 0) return 0;
    return Math.round(statuses.filter((status) => status.completed).length / statuses.length * 100);
  }
  getDaysBetween(start, end) {
    const days = [];
    const cursor = new Date(start);
    while (cursor <= end) {
      days.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    return days;
  }
  getProgressLabels() {
    return [
      { id: "research", label: "\u79D1\u7814" },
      { id: "reading", label: "\u9605\u8BFB" },
      { id: "fitness", label: "\u5065\u8EAB" },
      { id: "finance", label: "\u7406\u8D22" },
      { id: "goals", label: "\u76EE\u6807\u7BA1\u7406" }
    ];
  }
  getProgressValue(id, month) {
    switch (id) {
      case "research":
        return this.average(this.store.getResearchProjects().map((item) => item.progress));
      case "reading":
        return this.average(this.store.getBooks().map((book) => book.totalPages === 0 ? 0 : Math.round(book.currentPage / book.totalPages * 100)));
      case "fitness":
        return this.getFitnessProgress(month);
      case "finance":
        return this.getFinanceProgress();
      case "goals":
        return this.average(this.store.getGoals().map((goal) => goal.progress));
    }
  }
  getFitnessProgress(month) {
    const prefix = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, "0")}`;
    const workouts = this.store.getWorkouts().filter((workout) => workout.date.startsWith(prefix));
    if (workouts.length === 0) return 0;
    return Math.round(workouts.filter((workout) => workout.completed).length / workouts.length * 100);
  }
  getFinanceProgress() {
    const budgets = this.store.getBudgets();
    if (budgets.length === 0) return 0;
    return this.clamp(Math.round(this.average(budgets.map((budget) => budget.amount === 0 ? 100 : (budget.amount - budget.spent) / budget.amount * 100))));
  }
  average(values) {
    if (values.length === 0) return 0;
    return this.clamp(Math.round(values.reduce((sum, value) => sum + value, 0) / values.length));
  }
  clamp(value) {
    return Math.max(0, Math.min(100, value));
  }
};

// src/components/overview/HabitStatisticsModal.ts
var HabitStatisticsModal = class extends import_obsidian13.Modal {
  constructor(app, store) {
    super(app);
    this.calendar = new CalendarService();
    this.month = /* @__PURE__ */ new Date();
    this.statistics = new StatisticsService(store);
  }
  onOpen() {
    this.render();
  }
  render() {
    var _a, _b;
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    const stats = this.statistics.getHabitStats(this.month);
    this.selectedDay = (_a = this.selectedDay) != null ? _a : stats.monthDays.find((day2) => day2.date === this.calendar.getDateKey(/* @__PURE__ */ new Date()));
    const header = this.contentEl.createDiv({ cls: "cow-stats-modal-header" });
    const previous = header.createEl("button", { attr: { type: "button", "aria-label": "\u4E0A\u4E00\u6708" } });
    (0, import_obsidian13.setIcon)(previous, "chevron-left");
    previous.addEventListener("click", () => {
      this.month = this.calendar.addMonths(this.month, -1);
      this.selectedDay = void 0;
      this.render();
    });
    header.createEl("h2", { text: `\u6253\u5361\u7EDF\u8BA1 \xB7 ${this.calendar.getMonthTitle(this.month)}` });
    const next = header.createEl("button", { attr: { type: "button", "aria-label": "\u4E0B\u4E00\u6708" } });
    (0, import_obsidian13.setIcon)(next, "chevron-right");
    next.addEventListener("click", () => {
      this.month = this.calendar.addMonths(this.month, 1);
      this.selectedDay = void 0;
      this.render();
    });
    const cards = this.contentEl.createDiv({ cls: "cow-stats-card-grid" });
    [
      ["\u8FDE\u7EED\u6253\u5361", `${stats.currentStreak} \u5929`],
      ["\u6700\u957F\u8FDE\u7EED", `${stats.longestStreak} \u5929`],
      ["\u672C\u6708\u5B8C\u6210\u7387", `${stats.monthCompletionRate}%`],
      ["\u5168\u5E74\u5B8C\u6210\u7387", `${stats.yearCompletionRate}%`]
    ].forEach(([label, value]) => {
      const card = cards.createDiv({ cls: "cow-stats-card" });
      card.createEl("strong", { text: value });
      card.createSpan({ text: label });
    });
    const heatmap = this.contentEl.createDiv({ cls: "cow-habit-stats-heatmap" });
    stats.monthDays.forEach((day2) => {
      var _a2;
      const level = day2.totalCount === 0 ? 0 : Math.ceil(day2.completedCount / day2.totalCount * 4);
      const button = heatmap.createEl("button", {
        cls: `level-${level} ${((_a2 = this.selectedDay) == null ? void 0 : _a2.date) === day2.date ? "is-selected" : ""}`,
        text: day2.date.slice(-2),
        attr: { type: "button", "aria-label": day2.date }
      });
      button.addEventListener("click", () => {
        this.selectedDay = day2;
        this.render();
      });
    });
    const detail = this.contentEl.createDiv({ cls: "cow-habit-day-detail" });
    detail.createEl("h3", { text: this.selectedDay ? `\u5F53\u5929\u5B8C\u6210\u60C5\u51B5 \xB7 ${this.selectedDay.date}` : "\u5F53\u5929\u5B8C\u6210\u60C5\u51B5" });
    const day = (_b = this.selectedDay) != null ? _b : stats.monthDays[0];
    if (!day) return;
    day.statuses.forEach((status) => {
      const row = detail.createDiv({ cls: "cow-habit-day-row" });
      row.createSpan({ text: status.label });
      row.createSpan({ cls: status.completed ? "is-done" : "", text: status.completed ? "\u5DF2\u5B8C\u6210" : "\u672A\u5B8C\u6210" });
    });
  }
};

// src/components/overview/MonthlyProgressStatisticsModal.ts
var import_obsidian14 = require("obsidian");
var MonthlyProgressStatisticsModal = class extends import_obsidian14.Modal {
  constructor(app, store) {
    super(app);
    this.calendar = new CalendarService();
    this.month = /* @__PURE__ */ new Date();
    this.statistics = new StatisticsService(store);
  }
  onOpen() {
    this.render();
  }
  render() {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    const progress = this.statistics.getMonthProgress(this.month);
    const header = this.contentEl.createDiv({ cls: "cow-stats-modal-header" });
    const previous = header.createEl("button", { attr: { type: "button", "aria-label": "\u4E0A\u4E00\u6708" } });
    (0, import_obsidian14.setIcon)(previous, "chevron-left");
    previous.addEventListener("click", () => {
      this.month = this.calendar.addMonths(this.month, -1);
      this.render();
    });
    header.createEl("h2", { text: `\u672C\u6708\u8FDB\u5EA6\u7EDF\u8BA1 \xB7 ${this.calendar.getMonthTitle(this.month)}` });
    const next = header.createEl("button", { attr: { type: "button", "aria-label": "\u4E0B\u4E00\u6708" } });
    (0, import_obsidian14.setIcon)(next, "chevron-right");
    next.addEventListener("click", () => {
      this.month = this.calendar.addMonths(this.month, 1);
      this.render();
    });
    const table = this.contentEl.createDiv({ cls: "cow-progress-stats-table" });
    const tableHeader = table.createDiv({ cls: "cow-progress-stats-row is-header" });
    ["\u6A21\u5757", "\u672C\u6708", "\u4E0A\u6708", "\u53D8\u5316\u503C"].forEach((label) => tableHeader.createSpan({ text: label }));
    progress.forEach((item) => {
      const row = table.createDiv({ cls: "cow-progress-stats-row" });
      row.createSpan({ text: item.label });
      row.createSpan({ text: `${item.current}%` });
      row.createSpan({ text: `${item.previous}%` });
      row.createSpan({ cls: item.change >= 0 ? "is-up" : "is-down", text: `${item.change >= 0 ? "+" : ""}${item.change}%` });
    });
    this.contentEl.createEl("h3", { text: "1\uFF5E12\u6708\u5168\u5E74\u603B\u89C8" });
    const yearGrid = this.contentEl.createDiv({ cls: "cow-year-progress-grid" });
    this.statistics.getYearProgress(this.month.getFullYear()).forEach((month) => {
      const card = yearGrid.createDiv({ cls: "cow-year-progress-card" });
      card.createEl("strong", { text: `${month.month}\u6708` });
      const track = card.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-purple", attr: { style: `width: ${month.average}%` } });
      card.createSpan({ text: `${month.average}%` });
    });
  }
};

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
var import_obsidian15 = require("obsidian");
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
          (0, import_obsidian15.setIcon)(button, "check");
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
var import_obsidian17 = require("obsidian");

// src/services/HolidayService.ts
var FIXED_HOLIDAYS = {
  "01-01": [
    { name: "\u5143\u65E6", region: "CN" },
    { name: "New Year's Day", region: "Global" }
  ],
  "02-14": [{ name: "Valentine's Day", region: "Global" }],
  "04-01": [{ name: "April Fools' Day", region: "Global" }],
  "05-01": [{ name: "\u52B3\u52A8\u8282", region: "CN" }],
  "09-10": [{ name: "\u6559\u5E08\u8282", region: "CN" }],
  "10-01": [{ name: "\u56FD\u5E86\u8282", region: "CN" }],
  "10-31": [{ name: "Halloween", region: "Global" }],
  "12-25": [{ name: "Christmas", region: "Global" }]
};
var CHINESE_LUNAR_HOLIDAYS = {
  2024: {
    "02-10": "\u6625\u8282",
    "02-24": "\u5143\u5BB5\u8282",
    "04-04": "\u6E05\u660E\u8282",
    "06-10": "\u7AEF\u5348\u8282",
    "09-17": "\u4E2D\u79CB\u8282"
  },
  2025: {
    "01-29": "\u6625\u8282",
    "02-12": "\u5143\u5BB5\u8282",
    "04-04": "\u6E05\u660E\u8282",
    "05-31": "\u7AEF\u5348\u8282",
    "10-06": "\u4E2D\u79CB\u8282"
  },
  2026: {
    "02-17": "\u6625\u8282",
    "03-03": "\u5143\u5BB5\u8282",
    "04-05": "\u6E05\u660E\u8282",
    "06-19": "\u7AEF\u5348\u8282",
    "09-25": "\u4E2D\u79CB\u8282"
  },
  2027: {
    "02-06": "\u6625\u8282",
    "02-20": "\u5143\u5BB5\u8282",
    "04-05": "\u6E05\u660E\u8282",
    "06-09": "\u7AEF\u5348\u8282",
    "09-15": "\u4E2D\u79CB\u8282"
  },
  2028: {
    "01-26": "\u6625\u8282",
    "02-09": "\u5143\u5BB5\u8282",
    "04-04": "\u6E05\u660E\u8282",
    "05-28": "\u7AEF\u5348\u8282",
    "10-03": "\u4E2D\u79CB\u8282"
  },
  2029: {
    "02-13": "\u6625\u8282",
    "02-27": "\u5143\u5BB5\u8282",
    "04-04": "\u6E05\u660E\u8282",
    "06-16": "\u7AEF\u5348\u8282",
    "09-22": "\u4E2D\u79CB\u8282"
  },
  2030: {
    "02-03": "\u6625\u8282",
    "02-17": "\u5143\u5BB5\u8282",
    "04-05": "\u6E05\u660E\u8282",
    "06-05": "\u7AEF\u5348\u8282",
    "09-12": "\u4E2D\u79CB\u8282"
  }
};
var HolidayService = class {
  constructor() {
    this.calendar = new CalendarService();
  }
  getHolidays(date) {
    var _a, _b;
    const key = this.calendar.getDateKey(date).slice(5);
    const holidays = [...(_a = FIXED_HOLIDAYS[key]) != null ? _a : []];
    const lunarHoliday = (_b = CHINESE_LUNAR_HOLIDAYS[date.getFullYear()]) == null ? void 0 : _b[key];
    if (lunarHoliday) {
      holidays.push({ name: lunarHoliday, region: "CN" });
    }
    if (this.isThanksgiving(date)) {
      holidays.push({ name: "Thanksgiving", region: "Global" });
    }
    return holidays;
  }
  getHoliday(date) {
    const names = this.getHolidays(date).map((holiday) => holiday.name);
    return names.length > 0 ? names.join(" / ") : null;
  }
  isThanksgiving(date) {
    if (date.getMonth() !== 10 || date.getDay() !== 4) {
      return false;
    }
    const day = date.getDate();
    return day >= 22 && day <= 28;
  }
};

// src/services/NoteService.ts
var NoteService = class {
  constructor(app) {
    this.app = app;
    this.calendar = new CalendarService();
  }
  getVaultName() {
    return this.app.vault.getName();
  }
  getDailyNotePath(date) {
    return `Daily Notes/${this.calendar.getDateKey(date)}.md`;
  }
  getDailyNote(date) {
    return this.app.vault.getFileByPath(this.getDailyNotePath(date));
  }
  async openOrCreateDailyNote(date) {
    const existing = this.getDailyNote(date);
    const file = existing != null ? existing : await this.createUniqueFile(
      "Daily Notes",
      this.calendar.getDateKey(date),
      `# ${this.calendar.getDateKey(date)}

`
    );
    await this.app.workspace.getLeaf(false).openFile(file);
    return file;
  }
  getRecentMarkdownFiles(limit = 12) {
    return this.app.vault.getMarkdownFiles().sort((left, right) => right.stat.mtime - left.stat.mtime).slice(0, limit);
  }
  getNotesForDate(date) {
    const dateKey = this.calendar.getDateKey(date);
    const dailyNote = this.getDailyNote(date);
    const markdownFiles = this.app.vault.getMarkdownFiles();
    const dailyPath = dailyNote == null ? void 0 : dailyNote.path;
    const isNotDaily = (file) => file.path !== dailyPath;
    const created = markdownFiles.filter((file) => isNotDaily(file) && this.calendar.getDateKey(new Date(file.stat.ctime)) === dateKey).sort((left, right) => right.stat.ctime - left.stat.ctime);
    const modified = markdownFiles.filter((file) => isNotDaily(file) && this.calendar.getDateKey(new Date(file.stat.mtime)) === dateKey).sort((left, right) => right.stat.mtime - left.stat.mtime);
    const linked = markdownFiles.filter((file) => isNotDaily(file) && this.isExplicitlyLinkedToDate(file, dateKey)).sort((left, right) => right.stat.mtime - left.stat.mtime);
    return { dailyNote, created, modified, linked };
  }
  hasNotesForDate(date) {
    const notes = this.getNotesForDate(date);
    return Boolean(notes.dailyNote || notes.created.length > 0 || notes.modified.length > 0 || notes.linked.length > 0);
  }
  getNoteCountForDate(date) {
    const notes = this.getNotesForDate(date);
    const paths = /* @__PURE__ */ new Set();
    if (notes.dailyNote) paths.add(notes.dailyNote.path);
    notes.created.forEach((file) => paths.add(file.path));
    notes.modified.forEach((file) => paths.add(file.path));
    notes.linked.forEach((file) => paths.add(file.path));
    return paths.size;
  }
  async createNote() {
    const file = await this.createUniqueFile("Cute Workbench Notes", "\u672A\u547D\u540D\u7B14\u8BB0", "# \u672A\u547D\u540D\u7B14\u8BB0\n\n");
    await this.app.workspace.getLeaf(false).openFile(file);
    return file;
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
  isExplicitlyLinkedToDate(file, dateKey) {
    var _a, _b;
    const cache = this.app.metadataCache.getFileCache(file);
    const frontmatter = cache == null ? void 0 : cache.frontmatter;
    const frontmatterValues = [
      frontmatter == null ? void 0 : frontmatter.date,
      frontmatter == null ? void 0 : frontmatter.day,
      frontmatter == null ? void 0 : frontmatter.created,
      frontmatter == null ? void 0 : frontmatter.updated,
      frontmatter == null ? void 0 : frontmatter.workbenchDate
    ];
    if (frontmatterValues.some((value) => this.valueContainsDate(value, dateKey))) {
      return true;
    }
    const links = [...(_a = cache == null ? void 0 : cache.links) != null ? _a : [], ...(_b = cache == null ? void 0 : cache.embeds) != null ? _b : []];
    return links.some((link) => link.link.includes(dateKey));
  }
  valueContainsDate(value, dateKey) {
    if (Array.isArray(value)) {
      return value.some((item) => this.valueContainsDate(item, dateKey));
    }
    return typeof value === "string" && value.includes(dateKey);
  }
};

// src/components/overview/DayOverviewModal.ts
var import_obsidian16 = require("obsidian");
var DayOverviewModal = class extends import_obsidian16.Modal {
  constructor(app, store, date, onDataChanged) {
    super(app);
    this.store = store;
    this.date = date;
    this.onDataChanged = onDataChanged;
    this.calendar = new CalendarService();
    this.holidays = new HolidayService();
    this.notes = new NoteService(app);
  }
  onOpen() {
    this.render();
  }
  render() {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    const dateKey = this.calendar.getDateKey(this.date);
    const holidays = this.holidays.getHolidays(this.date);
    this.contentEl.createEl("h2", { text: dateKey });
    this.contentEl.createEl("p", {
      text: `${this.calendar.getWeekdayLabel(this.date)}${holidays.length > 0 ? ` \xB7 ${holidays.map((holiday) => holiday.name).join(" / ")}` : " \xB7 \u6682\u65E0\u8282\u65E5"}`
    });
    this.renderTodos(dateKey);
    this.renderNotes();
  }
  renderTodos(dateKey) {
    const header = this.contentEl.createDiv({ cls: "cow-day-section-header" });
    header.createEl("h3", { text: "\u5F85\u529E" });
    const addButton = header.createEl("button", { attr: { type: "button" } });
    (0, import_obsidian16.setIcon)(addButton.createSpan(), "plus");
    addButton.createSpan({ text: "\u6DFB\u52A0\u5F85\u529E" });
    addButton.addEventListener("click", () => {
      new CalendarTodoModal(this.app, async (title, category) => {
        await this.store.addCalendarTodo(title, dateKey, category);
        this.onDataChanged();
        this.render();
      }).open();
    });
    const list = this.contentEl.createDiv({ cls: "cow-calendar-todo-list" });
    const todos = this.store.getCalendarTodos(dateKey);
    if (todos.length === 0) {
      list.createEl("p", { cls: "cow-empty-state", text: "\u8FD9\u4E00\u5929\u8FD8\u6CA1\u6709\u5F85\u529E\u3002" });
      return;
    }
    todos.forEach((todo) => this.renderTodoItem(list, todo));
  }
  renderTodoItem(container, todo) {
    const row = container.createDiv({ cls: `cow-calendar-todo-item ${todo.completed ? "is-complete" : ""}` });
    const checkbox = row.createEl("input", { attr: { type: "checkbox" } });
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", async () => {
      await this.store.toggleCalendarTodo(todo.id);
      this.onDataChanged();
      this.render();
    });
    const text = row.createDiv();
    text.createEl("strong", { text: todo.title });
    text.createSpan({ text: todo.category });
    const edit = row.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u5F85\u529E" } });
    (0, import_obsidian16.setIcon)(edit, "pencil");
    edit.addEventListener("click", () => {
      new CalendarTodoModal(this.app, async (title, category) => {
        await this.store.updateCalendarTodo(todo.id, { title, category });
        this.onDataChanged();
        this.render();
      }, todo).open();
    });
    const remove = row.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u5F85\u529E" } });
    (0, import_obsidian16.setIcon)(remove, "trash-2");
    remove.addEventListener("click", async () => {
      await this.store.deleteCalendarTodo(todo.id);
      this.onDataChanged();
      this.render();
    });
  }
  renderNotes() {
    this.contentEl.createEl("h3", { text: "\u7B14\u8BB0" });
    const groups = this.notes.getNotesForDate(this.date);
    const list = this.contentEl.createDiv({ cls: "cow-day-note-list" });
    this.renderDailyNote(list, groups);
    this.renderNoteGroup(list, "\u5F53\u5929\u521B\u5EFA\u7684\u7B14\u8BB0", groups.created);
    this.renderNoteGroup(list, "\u5F53\u5929\u4FEE\u6539\u7684\u7B14\u8BB0", groups.modified);
    this.renderNoteGroup(list, "\u660E\u786E\u5173\u8054\u8BE5\u65E5\u671F\u7684\u7B14\u8BB0", groups.linked);
  }
  renderDailyNote(container, groups) {
    const section = container.createDiv({ cls: "cow-day-note-group" });
    section.createEl("h4", { text: "Daily Note" });
    if (groups.dailyNote) {
      this.renderNoteButton(section, groups.dailyNote);
      return;
    }
    const button = section.createEl("button", { cls: "cow-day-note-item", attr: { type: "button" } });
    button.createEl("strong", { text: "\u521B\u5EFA\u6BCF\u65E5\u7B14\u8BB0" });
    button.createSpan({ text: this.notes.getDailyNotePath(this.date) });
    button.addEventListener("click", async () => {
      await this.notes.openOrCreateDailyNote(this.date);
      this.close();
    });
  }
  renderNoteGroup(container, title, files) {
    const section = container.createDiv({ cls: "cow-day-note-group" });
    section.createEl("h4", { text: title });
    if (files.length === 0) {
      section.createEl("p", { cls: "cow-empty-state", text: "\u6682\u65E0\u7B14\u8BB0\u3002" });
      return;
    }
    files.forEach((file) => this.renderNoteButton(section, file));
  }
  renderNoteButton(container, file) {
    const button = container.createEl("button", { cls: "cow-day-note-item", attr: { type: "button" } });
    button.createEl("strong", { text: file.basename });
    button.createSpan({ text: file.path });
    button.createEl("time", { text: new Date(file.stat.mtime).toLocaleString("zh-CN") });
    button.addEventListener("click", async () => {
      await this.app.workspace.getLeaf(false).openFile(file);
      this.close();
    });
  }
};
var CalendarTodoModal = class extends import_obsidian16.Modal {
  constructor(app, onSubmit, todo) {
    var _a, _b;
    super(app);
    this.onSubmit = onSubmit;
    this.titleValue = (_a = todo == null ? void 0 : todo.title) != null ? _a : "";
    this.categoryValue = (_b = todo == null ? void 0 : todo.category) != null ? _b : "\u5F85\u529E";
  }
  onOpen() {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: this.titleValue ? "\u7F16\u8F91\u5F85\u529E" : "\u6DFB\u52A0\u5F85\u529E" });
    new import_obsidian16.Setting(this.contentEl).setName("\u6807\u9898").addText((text) => text.setValue(this.titleValue).onChange((value) => {
      this.titleValue = value;
    }));
    new import_obsidian16.Setting(this.contentEl).setName("\u5206\u7C7B").addText((text) => text.setValue(this.categoryValue).onChange((value) => {
      this.categoryValue = value;
    }));
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } }).addEventListener("click", () => this.close());
    const save = actions.createEl("button", { text: "\u4FDD\u5B58", cls: "mod-cta", attr: { type: "button" } });
    save.addEventListener("click", async () => {
      const title = this.titleValue.trim();
      if (!title) return;
      await this.onSubmit(title, this.categoryValue.trim() || "\u5F85\u529E");
      this.close();
    });
  }
};

// src/components/overview/MonthlyCalendarSection.ts
var MonthlyCalendarSection = class {
  constructor(app, store, onDataChanged = () => void 0) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
    this.displayDate = /* @__PURE__ */ new Date();
    this.calendar = new CalendarService();
    this.holidays = new HolidayService();
    this.notes = new NoteService(app);
  }
  render(container) {
    this.draw(container);
  }
  draw(container) {
    container.empty();
    const root = container.createDiv({ cls: "cow-month-calendar" });
    const header = root.createDiv({ cls: "cow-month-calendar-header" });
    const previous = header.createEl("button", { attr: { type: "button", "aria-label": "\u4E0A\u4E00\u6708" } });
    (0, import_obsidian17.setIcon)(previous, "chevron-left");
    previous.addEventListener("click", () => {
      this.displayDate = this.calendar.addMonths(this.displayDate, -1);
      this.draw(container);
    });
    header.createEl("strong", { text: this.calendar.getMonthTitle(this.displayDate) });
    const today = header.createEl("button", { cls: "cow-calendar-today", text: "\u4ECA\u5929", attr: { type: "button" } });
    today.addEventListener("click", () => {
      this.displayDate = /* @__PURE__ */ new Date();
      this.draw(container);
    });
    const next = header.createEl("button", { attr: { type: "button", "aria-label": "\u4E0B\u4E00\u6708" } });
    (0, import_obsidian17.setIcon)(next, "chevron-right");
    next.addEventListener("click", () => {
      this.displayDate = this.calendar.addMonths(this.displayDate, 1);
      this.draw(container);
    });
    const grid = root.createDiv({ cls: "cow-month-calendar-grid" });
    const settings = this.store.getData().calendarSettings;
    const weekdays = settings.weekStartsOn === "monday" ? ["\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u65E5"] : ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"];
    weekdays.forEach((weekday) => grid.createSpan({ cls: "cow-weekday", text: weekday }));
    const todayKey = this.calendar.getDateKey(/* @__PURE__ */ new Date());
    this.calendar.getMonthCells(this.displayDate, settings.weekStartsOn).forEach((date) => {
      if (!date) {
        grid.createSpan({ cls: "cow-calendar-empty" });
        return;
      }
      const dateKey = this.calendar.getDateKey(date);
      const button = grid.createEl("button", {
        cls: `cow-calendar-day ${dateKey === todayKey ? "is-today" : ""}`,
        attr: { type: "button", "aria-label": dateKey }
      });
      if (dateKey === todayKey) {
        button.style.borderColor = settings.highlightColor;
        button.style.background = `${settings.highlightColor}44`;
      }
      button.createSpan({ cls: "cow-calendar-day-number", text: String(date.getDate()) });
      const holidays = this.holidays.getHolidays(date);
      if (holidays.length > 0) {
        button.createSpan({ cls: "cow-calendar-holiday", text: holidays[0].name });
      } else {
        button.createSpan({ cls: "cow-calendar-holiday is-empty", text: "" });
      }
      const dots = button.createDiv({ cls: "cow-calendar-dots cow-calendar-day-indicators" });
      this.renderBadges(dots, this.getBadges(date));
      button.addEventListener("click", () => {
        new DayOverviewModal(this.app, this.store, date, () => {
          this.onDataChanged();
          this.draw(container);
        }).open();
      });
    });
  }
  getBadges(date) {
    const settings = this.store.getData().calendarSettings;
    const dateKey = this.calendar.getDateKey(date);
    const todos = this.store.getCalendarTodos(dateKey);
    const badges = [];
    if (settings.showTaskMarkers) {
      const incomplete = todos.filter((todo) => !todo.completed).length;
      const complete = todos.filter((todo) => todo.completed).length;
      if (incomplete > 0) badges.push({ cls: "is-task", count: incomplete });
      if (complete > 0) badges.push({ cls: "is-task-done", count: complete });
    }
    if (settings.showNoteMarkers) {
      const noteCount = this.notes.getNoteCountForDate(date);
      if (noteCount > 0) badges.push({ cls: "is-note", count: noteCount });
    }
    if (settings.showEventMarkers) {
      const eventCount = this.holidays.getHolidays(date).length;
      if (eventCount > 0) badges.push({ cls: "is-event", count: eventCount });
    }
    return badges;
  }
  renderBadges(container, badges) {
    const expanded = [];
    badges.forEach((badge) => {
      for (let index = 0; index < badge.count; index += 1) {
        expanded.push(badge.cls);
      }
    });
    expanded.slice(0, 4).forEach((cls) => container.createSpan({ cls }));
    if (expanded.length > 4) {
      container.createSpan({ cls: "is-more", text: `+${expanded.length - 4}` });
    }
  }
};

// src/components/overview/MonthlyProgressSection.ts
var COLOR_MAP = {
  research: "is-pink",
  reading: "is-yellow",
  fitness: "is-green",
  finance: "is-blue",
  goals: "is-purple"
};
var MonthlyProgressSection = class {
  constructor(store) {
    this.store = store;
  }
  render(container) {
    const progress = new StatisticsService(this.store).getMonthProgress(/* @__PURE__ */ new Date());
    progress.forEach((item) => {
      const row = container.createDiv({ cls: "cow-month-progress-row" });
      row.createSpan({ text: item.label });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: `cow-month-progress-fill ${COLOR_MAP[item.id]}`, attr: { style: `width: ${item.current}%` } });
      row.createSpan({ text: `${item.current}%` });
    });
  }
};

// src/components/overview/OverviewStatsSection.ts
var import_obsidian18 = require("obsidian");
var OverviewStatsSection = class {
  constructor(store, type) {
    this.store = store;
    this.type = type;
  }
  render(container) {
    const stat = this.getStat();
    const wrapper = container.createDiv({ cls: "cow-overview-stat" });
    const art = wrapper.createDiv({ cls: `cow-stat-art ${stat.className}` });
    (0, import_obsidian18.setIcon)(art.createSpan(), stat.icon);
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
var import_obsidian19 = require("obsidian");
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
      (0, import_obsidian19.setIcon)(button.createSpan(), this.getIcon(action));
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
        new import_obsidian19.Notice(action.target ? `\u81EA\u5B9A\u4E49\u5165\u53E3\uFF1A${action.target}` : "\u81EA\u5B9A\u4E49\u5FEB\u6377\u5165\u53E3\u5DF2\u89E6\u53D1\u3002");
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
      new import_obsidian19.Notice("\u8FD9\u4E2A Obsidian \u547D\u4EE4\u6682\u65F6\u4E0D\u53EF\u7528\u3002");
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
    new import_obsidian19.Notice("\u5DF2\u6DFB\u52A0\u5230\u4ECA\u65E5\u7126\u70B9\u3002");
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
var import_obsidian20 = require("obsidian");
var CATEGORY_CLASS = {
  \u79D1\u7814: "is-blue",
  \u9605\u8BFB: "is-pink",
  \u5065\u8EAB: "is-green",
  \u7406\u8D22: "is-yellow",
  \u4E2A\u4EBA: "is-purple"
};
var TodayFocusSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const list = container.createEl("ul", { cls: "cow-focus-list" });
    this.store.getTodayFocusTasksForDate(formatDateKey(/* @__PURE__ */ new Date())).forEach((task) => {
      const item = list.createEl("li");
      const checkbox = item.createEl("input", { type: "checkbox" });
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", async () => {
        await this.store.toggleTodayFocusTask(task.id);
        this.onDataChanged();
      });
      item.createSpan({ cls: `cow-pill ${CATEGORY_CLASS[task.category]}`, text: task.category });
      item.createSpan({ cls: task.completed ? "is-complete cow-focus-task-title" : "cow-focus-task-title", text: task.label });
      const actions = item.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91" } });
      (0, import_obsidian20.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => {
        new TodayFocusTaskModal(this.app, formatDateKey(/* @__PURE__ */ new Date()), async (values) => {
          await this.store.updateTodayFocusTask(task.id, values);
          this.onDataChanged();
        }, task).open();
      });
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664" } });
      (0, import_obsidian20.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteTodayFocusTask(task.id);
        this.onDataChanged();
      });
    });
  }
};

// src/components/overview/FocusStatSection.ts
var import_obsidian21 = require("obsidian");
var FOCUS_BACKGROUNDS = [
  { id: "solid", label: "\u7EAF\u8272" },
  { id: "pink", label: "\u7C89\u8272\u6E10\u53D8" },
  { id: "forest", label: "\u68EE\u6797" },
  { id: "sky", label: "\u5929\u7A7A" },
  { id: "night", label: "\u591C\u665A" },
  { id: "desk", label: "\u4E66\u684C" },
  { id: "minimal", label: "\u6781\u7B80" }
];
var FocusStatSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const stats = new StatisticsService(this.store).getFocusStats();
    const state = this.store.getFocusState();
    const root = container.createDiv({ cls: "cow-focus-stat-card" });
    const top = root.createDiv({ cls: "cow-focus-stat-top" });
    const art = top.createDiv({ cls: "cow-stat-art is-blue" });
    (0, import_obsidian21.setIcon)(art.createSpan(), state.mode === "break" ? "coffee" : "headphones");
    const summary = top.createDiv();
    summary.createEl("strong", { text: this.formatMinutes(stats.todayMinutes) });
    summary.createSpan({ text: `\u4ECA\u65E5 ${stats.todayPomodoros} \u4E2A\u756A\u8304 \xB7 \u672C\u5468 ${this.formatMinutes(stats.weekMinutes)}` });
    root.createDiv({ cls: "cow-focus-timer", text: this.formatSeconds(state.remainingSeconds) });
    root.createDiv({
      cls: "cow-focus-status",
      text: `${state.isRunning ? state.isPaused ? "\u5DF2\u6682\u505C" : "\u8FDB\u884C\u4E2D" : "\u672A\u5F00\u59CB"} \xB7 ${state.mode === "focus" ? "\u4E13\u6CE8" : "\u4F11\u606F"}${state.currentTask ? ` \xB7 ${state.currentTask}` : ""}`
    });
    const actions = root.createDiv({ cls: "cow-focus-actions" });
    const primary = actions.createEl("button", { cls: "mod-cta", attr: { type: "button" } });
    (0, import_obsidian21.setIcon)(primary.createSpan(), state.isRunning ? state.isPaused ? "play" : "pause" : "play");
    primary.createSpan({ text: state.isRunning ? state.isPaused ? "\u7EE7\u7EED" : "\u6682\u505C" : "\u5F00\u59CB\u4E13\u6CE8" });
    primary.addEventListener("click", async () => {
      if (!state.isRunning) {
        new FocusSetupModal(this.app, this.store, this.onDataChanged).open();
        return;
      }
      if (state.isPaused) {
        await this.store.resumeFocusSession();
      } else {
        await this.store.pauseFocusSession();
      }
      this.onDataChanged();
    });
    const detail = actions.createEl("button", { attr: { type: "button" } });
    (0, import_obsidian21.setIcon)(detail.createSpan(), "timer");
    detail.createSpan({ text: "\u67E5\u770B\u8BB0\u5F55" });
    detail.addEventListener("click", () => new FocusSessionModal(this.app, this.store, this.onDataChanged).open());
  }
  formatMinutes(minutes) {
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    return rest === 0 ? `${hours}h` : `${hours}h ${rest}min`;
  }
  formatSeconds(seconds) {
    const safe = Math.max(0, seconds);
    const mins = Math.floor(safe / 60);
    const secs = safe % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
};
var FocusSetupModal = class extends import_obsidian21.Modal {
  constructor(app, store, onDataChanged) {
    var _a;
    super(app);
    this.store = store;
    this.onDataChanged = onDataChanged;
    this.customDuration = "";
    this.task = "";
    const settings = store.getFocusSettings();
    this.duration = settings.focusDuration;
    this.background = (_a = settings.defaultBackground) != null ? _a : "pink";
  }
  onOpen() {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "\u5F00\u59CB\u4E13\u6CE8" });
    this.contentEl.createEl("p", { text: "\u5148\u9009\u4E00\u4E2A\u5408\u9002\u7684\u756A\u8304\u957F\u5EA6\uFF0C\u518D\u8FDB\u5165\u6C89\u6D78\u5F0F\u4E13\u6CE8\u3002" });
    const presets = this.contentEl.createDiv({ cls: "cow-focus-preset-grid" });
    [25, 45, 60, 90].forEach((minutes) => {
      const button = presets.createEl("button", { cls: this.duration === minutes ? "is-active" : "", attr: { type: "button" } });
      button.createSpan({ text: `${minutes} \u5206\u949F` });
      button.addEventListener("click", () => {
        this.duration = minutes;
        this.customDuration = "";
        this.onOpen();
      });
    });
    new import_obsidian21.Setting(this.contentEl).setName("\u81EA\u5B9A\u4E49\u5206\u949F\u6570").addText((text) => text.setValue(this.customDuration).onChange((value) => {
      this.customDuration = value;
      const next = Number(value);
      if (Number.isFinite(next) && next > 0) this.duration = Math.round(next);
    }));
    new import_obsidian21.Setting(this.contentEl).setName("\u4E13\u6CE8\u4E8B\u9879").addText((text) => text.setPlaceholder("\u8FD9\u6B21\u51C6\u5907\u4E13\u6CE8\u505A\u4EC0\u4E48\uFF1F").setValue(this.task).onChange((value) => {
      this.task = value;
    }));
    this.contentEl.createEl("h3", { text: "\u9009\u62E9\u4E13\u6CE8\u80CC\u666F" });
    const backgrounds = this.contentEl.createDiv({ cls: "cow-focus-background-grid" });
    FOCUS_BACKGROUNDS.forEach((background) => {
      const button = backgrounds.createEl("button", { cls: `cow-focus-bg-${background.id} ${this.background === background.id ? "is-active" : ""}`, attr: { type: "button" } });
      button.createSpan({ text: background.label });
      button.addEventListener("click", () => {
        this.background = background.id;
        this.onOpen();
      });
    });
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } }).addEventListener("click", () => this.close());
    const start = actions.createEl("button", { cls: "mod-cta", text: "\u5F00\u59CB\u4E13\u6CE8", attr: { type: "button" } });
    start.addEventListener("click", async () => {
      await this.store.startFocusSession(this.task, this.duration, this.background);
      this.onDataChanged();
      this.close();
      new FocusSessionModal(this.app, this.store, this.onDataChanged).open();
    });
  }
};
var FocusSessionModal = class extends import_obsidian21.Modal {
  constructor(app, store, onDataChanged) {
    super(app);
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  onOpen() {
    this.render();
    this.timer = window.setInterval(() => this.tick(), 1e3);
  }
  onClose() {
    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = void 0;
    }
  }
  render() {
    var _a;
    this.contentEl.empty();
    const settings = this.store.getFocusSettings();
    const state = this.store.getFocusState();
    const stats = new StatisticsService(this.store).getFocusStats();
    this.contentEl.addClass("cow-modal", "cow-focus-session-modal", `cow-focus-bg-${(_a = state.background) != null ? _a : "pink"}`);
    this.contentEl.createEl("h2", { text: state.currentTask || "\u4ECA\u65E5\u4E13\u6CE8" });
    this.contentEl.createEl("p", {
      text: `\u9ED8\u8BA4 ${settings.focusDuration} \u5206\u949F\u4E13\u6CE8 / ${settings.breakDuration} \u5206\u949F\u4F11\u606F\uFF0C\u4ECA\u65E5\u7D2F\u8BA1 ${stats.todayMinutes} \u5206\u949F\u3002`
    });
    const timer = this.contentEl.createDiv({ cls: "cow-focus-modal-timer" });
    timer.createSpan({ text: state.mode === "focus" ? "\u4E13\u6CE8\u4E2D" : "\u4F11\u606F\u4E2D" });
    timer.createEl("strong", { text: this.formatSeconds(state.remainingSeconds) });
    timer.createSpan({ text: this.getStateLabel(state) });
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions cow-focus-modal-actions" });
    this.renderAction(actions, state.isRunning ? state.isPaused ? "\u7EE7\u7EED" : "\u6682\u505C" : "\u5F00\u59CB", state.isRunning && !state.isPaused ? "pause" : "play", async () => {
      if (!state.isRunning) {
        new FocusSetupModal(this.app, this.store, this.onDataChanged).open();
        this.close();
        return;
      } else if (state.isPaused) {
        await this.store.resumeFocusSession();
      } else {
        await this.store.pauseFocusSession();
      }
      this.onDataChanged();
      this.render();
    }, true);
    this.renderAction(actions, "\u63D0\u524D\u7ED3\u675F", "square", async () => {
      var _a2;
      const savePartial = this.store.getFocusState().remainingSeconds < ((_a2 = this.store.getFocusState().plannedDuration) != null ? _a2 : settings.focusDuration) * 60 - 60;
      await this.store.endFocusSession(savePartial);
      this.onDataChanged();
      this.render();
    });
    this.renderAction(actions, "\u5173\u95ED", "x", async () => this.close());
    const records = this.contentEl.createDiv({ cls: "cow-focus-records" });
    records.createEl("h3", { text: "\u6700\u8FD1\u8BB0\u5F55" });
    const recent = stats.recentRecords;
    if (recent.length === 0) {
      records.createEl("p", { cls: "cow-empty-state", text: "\u8FD8\u6CA1\u6709\u4E13\u6CE8\u8BB0\u5F55\u3002" });
    } else {
      recent.forEach((record) => {
        const row = records.createDiv({ cls: "cow-focus-record-item" });
        row.createEl("strong", { text: record.task });
        row.createSpan({ text: `${record.date} \xB7 ${record.duration} \u5206\u949F${record.completed ? " \xB7 \u5DF2\u5B8C\u6210" : ""}` });
      });
    }
  }
  async tick() {
    const state = this.store.getFocusState();
    if (state.isRunning && !state.isPaused && state.remainingSeconds <= 0) {
      await this.store.completeCurrentFocusPhase();
      this.onDataChanged();
      new import_obsidian21.Notice(state.mode === "focus" ? "\u4E13\u6CE8\u5B8C\u6210\uFF0C\u4F11\u606F\u4E00\u4E0B\u5427\u3002" : "\u4F11\u606F\u5B8C\u6210\uFF0C\u53EF\u4EE5\u5F00\u59CB\u4E0B\u4E00\u8F6E\u5566\u3002");
    }
    this.render();
  }
  renderAction(container, label, icon, onClick, primary = false) {
    const button = container.createEl("button", { cls: primary ? "mod-cta" : "", attr: { type: "button" } });
    (0, import_obsidian21.setIcon)(button.createSpan(), icon);
    button.createSpan({ text: label });
    button.addEventListener("click", () => void onClick());
  }
  getStateLabel(state) {
    if (!state.isRunning) return "\u51C6\u5907\u5F00\u59CB";
    return state.isPaused ? "\u5DF2\u6682\u505C" : "\u6B63\u5728\u8BA1\u65F6";
  }
  formatSeconds(seconds) {
    const safe = Math.max(0, seconds);
    const mins = Math.floor(safe / 60);
    const secs = safe % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
};

// src/components/modules/ModulesControls.ts
var import_obsidian22 = require("obsidian");
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
    (0, import_obsidian22.setIcon)(handle, "grip-vertical");
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
var MANAGED_PAGES = ["overview", "research", "reading", "fitness", "finance", "goals"];
var CARD_COLORS2 = [
  { id: "default", label: "\u9ED8\u8BA4" },
  { id: "pink", label: "\u7C89\u8272" },
  { id: "cream", label: "\u5976\u6CB9\u9EC4" },
  { id: "mint", label: "\u8584\u8377\u7EFF" },
  { id: "sky", label: "\u5929\u84DD" },
  { id: "lavender", label: "\u6DE1\u7D2B" }
];
var WIDTHS2 = [
  { id: "sm", label: "\u5C0F" },
  { id: "md", label: "\u4E2D" },
  { id: "lg", label: "\u5927" },
  { id: "full", label: "\u6574\u884C" }
];
var FunctionalSectionManagerSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
    this.selectedPage = "overview";
    const currentPage = this.store.getData().currentPage;
    this.selectedPage = MANAGED_PAGES.includes(currentPage) ? currentPage : "overview";
  }
  render(container) {
    const root = container.createDiv({ cls: "cow-section-manager" });
    this.renderPagePicker(root);
    const columns = root.createDiv({ cls: "cow-section-manager-columns" });
    this.renderEnabled(columns);
    this.renderHidden(columns);
    this.renderAddable(columns);
  }
  renderPagePicker(container) {
    const picker = container.createDiv({ cls: "cow-section-manager-picker" });
    MANAGED_PAGES.forEach((page) => {
      const button = picker.createEl("button", {
        cls: page === this.selectedPage ? "is-active" : "",
        attr: { type: "button" }
      });
      button.createSpan({ text: PAGE_LABELS[page] });
      button.addEventListener("click", () => {
        this.selectedPage = page;
        container.empty();
        this.renderPagePicker(container);
        const columns = container.createDiv({ cls: "cow-section-manager-columns" });
        this.renderEnabled(columns);
        this.renderHidden(columns);
        this.renderAddable(columns);
      });
    });
  }
  renderEnabled(container) {
    const panel = container.createDiv({ cls: "cow-section-manager-panel" });
    panel.createEl("h4", { text: "\u5F53\u524D\u542F\u7528\u6A21\u5757" });
    const list = panel.createDiv({ cls: "cow-module-sort-list" });
    const sections = this.store.getAllSections().filter((section) => section.page === this.selectedPage && section.enabled);
    if (sections.length === 0) {
      list.createEl("p", { cls: "cow-empty-state", text: "\u6682\u65E0\u542F\u7528\u6A21\u5757\u3002" });
    }
    sections.forEach((section) => this.renderSectionRow(list, section, "enabled"));
  }
  renderHidden(container) {
    const panel = container.createDiv({ cls: "cow-section-manager-panel" });
    panel.createEl("h4", { text: "\u9690\u85CF\u6A21\u5757" });
    const list = panel.createDiv({ cls: "cow-module-sort-list" });
    const sections = this.store.getAllSections().filter((section) => section.page === this.selectedPage && !section.enabled);
    if (sections.length === 0) {
      list.createEl("p", { cls: "cow-empty-state", text: "\u6682\u65E0\u9690\u85CF\u6A21\u5757\u3002" });
    }
    sections.forEach((section) => this.renderSectionRow(list, section, "hidden"));
  }
  renderAddable(container) {
    const panel = container.createDiv({ cls: "cow-section-manager-panel" });
    const header = panel.createDiv({ cls: "cow-list-item-head" });
    header.createEl("h4", { text: "\u53EF\u6DFB\u52A0\u6A21\u5757" });
    const custom = header.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    (0, import_obsidian22.setIcon)(custom.createSpan(), "plus");
    custom.createSpan({ text: "\u81EA\u5B9A\u4E49" });
    custom.addEventListener("click", () => {
      new CustomSectionModal(this.app, this.selectedPage, async (input) => {
        await this.store.addCustomSection(input);
        this.onDataChanged();
      }).open();
    });
    const existingTypes = new Set(this.store.getAllSections().filter((section) => section.page === this.selectedPage).map((section) => section.type));
    const addable = AVAILABLE_MODULES.filter((module2) => module2.page === this.selectedPage && !existingTypes.has(module2.type));
    const list = panel.createDiv({ cls: "cow-module-sort-list" });
    if (addable.length === 0) {
      list.createEl("p", { cls: "cow-empty-state", text: "\u9ED8\u8BA4\u6A21\u5757\u90FD\u5DF2\u5728\u5E03\u5C40\u4E2D\uFF0C\u53EF\u7EE7\u7EED\u521B\u5EFA\u81EA\u5B9A\u4E49\u5206\u533A\u3002" });
    }
    addable.forEach((module2) => {
      const row = list.createDiv({ cls: "cow-section-manager-row" });
      row.createDiv().createEl("strong", { text: module2.title });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: module2.description });
      const actions = row.createDiv({ cls: "cow-list-item-actions" });
      const add = actions.createEl("button", { attr: { type: "button", "aria-label": "\u6DFB\u52A0\u6A21\u5757" } });
      (0, import_obsidian22.setIcon)(add, "plus");
      add.addEventListener("click", async () => {
        await this.store.addSection(this.selectedPage, module2.type);
        this.onDataChanged();
      });
    });
  }
  renderSectionRow(list, section, mode) {
    const row = list.createDiv({ cls: "cow-section-manager-row", attr: { draggable: mode === "enabled" ? "true" : "false", "data-id": section.id } });
    const title = row.createDiv({ cls: "cow-section-manager-title" });
    if (mode === "enabled") {
      const handle = title.createSpan({ cls: "cow-drag-handle" });
      (0, import_obsidian22.setIcon)(handle, "grip-vertical");
    }
    title.createEl("strong", { text: section.title });
    title.createSpan({ text: this.getSectionDescription(section) });
    const controls = row.createDiv({ cls: "cow-section-manager-controls" });
    this.renderColorSelect(controls, section);
    this.renderWidthSelect(controls, section);
    const actions = row.createDiv({ cls: "cow-list-item-actions" });
    if (mode === "enabled") {
      this.renderIconButton(actions, "eye-off", "\u9690\u85CF", async () => this.store.setSectionEnabled(section.id, false));
    } else {
      this.renderIconButton(actions, "eye", "\u6062\u590D", async () => this.store.setSectionEnabled(section.id, true));
    }
    this.renderIconButton(actions, "trash-2", "\u5220\u9664", async () => this.store.removeSection(section.id));
    if (mode === "enabled") {
      row.addEventListener("dragstart", () => {
        this.draggingId = section.id;
        row.addClass("is-dragging");
      });
      row.addEventListener("dragend", () => {
        this.draggingId = void 0;
        row.removeClass("is-dragging");
      });
      row.addEventListener("dragover", (event) => {
        event.preventDefault();
        if (!this.draggingId || this.draggingId === section.id) return;
        const draggingEl = list.querySelector(`[data-id="${this.draggingId}"]`);
        if (draggingEl) list.insertBefore(draggingEl, row);
      });
      row.addEventListener("drop", async () => {
        const ids = Array.from(list.querySelectorAll(".cow-section-manager-row")).map((item) => {
          var _a;
          return (_a = item.dataset.id) != null ? _a : "";
        });
        await this.store.reorderSections(this.selectedPage, ids);
        this.onDataChanged();
      });
    }
  }
  renderColorSelect(container, section) {
    var _a, _b;
    const select = container.createEl("select", { attr: { "aria-label": "\u4FEE\u6539\u989C\u8272" } });
    CARD_COLORS2.forEach((color) => select.createEl("option", { value: color.id, text: color.label }));
    select.value = String((_b = (_a = section.config) == null ? void 0 : _a.cardColor) != null ? _b : "default");
    select.addEventListener("change", async () => {
      await this.store.updateSectionConfig(section.id, { cardColor: select.value });
      this.onDataChanged();
    });
  }
  renderWidthSelect(container, section) {
    var _a;
    const select = container.createEl("select", { attr: { "aria-label": "\u4FEE\u6539\u5BBD\u5EA6" } });
    WIDTHS2.forEach((width) => select.createEl("option", { value: width.id, text: width.label }));
    select.value = (_a = section.width) != null ? _a : "md";
    select.addEventListener("change", async () => {
      await this.store.updateSection(section.id, { width: select.value });
      this.onDataChanged();
    });
  }
  renderIconButton(container, icon, label, action) {
    const button = container.createEl("button", { attr: { type: "button", "aria-label": label } });
    (0, import_obsidian22.setIcon)(button, icon);
    button.addEventListener("click", async () => {
      await action();
      this.onDataChanged();
    });
  }
  getSectionDescription(section) {
    var _a, _b, _c;
    const definition = AVAILABLE_MODULES.find((module2) => module2.type === section.type);
    return String((_c = (_b = (_a = section.config) == null ? void 0 : _a.description) != null ? _b : definition == null ? void 0 : definition.description) != null ? _c : section.type);
  }
};
var CustomSectionModal = class extends import_obsidian22.Modal {
  constructor(app, page, onSubmit) {
    super(app);
    this.page = page;
    this.onSubmit = onSubmit;
    this.title = "";
    this.description = "";
    this.type = "custom-text";
    this.color = "default";
  }
  onOpen() {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "\u521B\u5EFA\u81EA\u5B9A\u4E49\u529F\u80FD\u5206\u533A" });
    this.contentEl.createEl("p", { text: `\u5C06\u6DFB\u52A0\u5230 ${PAGE_LABELS[this.page]} \u9875\u9762\u3002` });
    new import_obsidian22.Setting(this.contentEl).setName("\u6807\u9898").addText((text) => text.onChange((value) => {
      this.title = value.trim();
    }));
    new import_obsidian22.Setting(this.contentEl).setName("\u63CF\u8FF0").addTextArea((text) => text.onChange((value) => {
      this.description = value.trim();
    }));
    new import_obsidian22.Setting(this.contentEl).setName("\u7C7B\u578B").addDropdown((dropdown) => {
      [
        ["custom-text", "\u6587\u672C"],
        ["custom-todo-list", "Todo List"],
        ["custom-link-list", "\u94FE\u63A5\u5217\u8868"],
        ["custom-memo", "Memo"]
      ].forEach(([value, label]) => dropdown.addOption(value, label));
      dropdown.setValue(this.type);
      dropdown.onChange((value) => {
        this.type = value;
      });
    });
    new import_obsidian22.Setting(this.contentEl).setName("\u989C\u8272").addDropdown((dropdown) => {
      CARD_COLORS2.forEach((color) => dropdown.addOption(color.id, color.label));
      dropdown.setValue(this.color);
      dropdown.onChange((value) => {
        this.color = value;
      });
    });
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } }).addEventListener("click", () => this.close());
    const save = actions.createEl("button", { text: "\u521B\u5EFA", cls: "mod-cta", attr: { type: "button" } });
    save.addEventListener("click", async () => {
      if (!this.title) return;
      await this.onSubmit({
        id: `custom-${Date.now()}`,
        page: this.page,
        title: this.title,
        description: this.description,
        type: this.type,
        color: this.color
      });
      this.close();
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
      (0, import_obsidian22.setIcon)(handle, "grip-vertical");
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
      new import_obsidian22.Notice("\u5BFC\u5165\u5931\u8D25\uFF1AJSON \u683C\u5F0F\u4E0D\u6B63\u786E\u3002");
    }
  };
  reader.readAsText(file);
}

// src/components/finance/AccountOverviewSection.ts
var import_obsidian23 = require("obsidian");
var AccountOverviewSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const total = container.createDiv({ cls: "cow-feature-card" });
    total.createEl("strong", { text: `\xA5${this.store.getTotalAssets()}` });
    total.createSpan({ text: "\u603B\u8D44\u4EA7\u81EA\u52A8\u6C47\u603B" });
    const add = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    (0, import_obsidian23.setIcon)(add.createSpan(), "plus");
    add.createSpan({ text: "\u65B0\u589E\u8D26\u6237" });
    add.addEventListener("click", () => openAccountModal(this.app, async (account) => {
      await this.store.addAccount(account);
      this.onDataChanged();
    }));
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getAccounts().forEach((account) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      const head = row.createDiv({ cls: "cow-list-item-head" });
      const body = head.createDiv();
      body.createEl("strong", { text: account.name });
      const meta = body.createDiv({ cls: "cow-meta-line" });
      meta.createSpan({ cls: "cow-status is-blue", text: account.type });
      meta.createSpan({ text: `\xA5${account.balance}` });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u8D26\u6237" } });
      (0, import_obsidian23.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => openAccountModal(this.app, async (values) => {
        await this.store.updateAccount(account.id, values);
        this.onDataChanged();
      }, account));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u8D26\u6237" } });
      (0, import_obsidian23.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteAccount(account.id);
        this.onDataChanged();
      });
    });
  }
};

// src/components/finance/BillRemindersSection.ts
var import_obsidian24 = require("obsidian");
var BillRemindersSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getBills().forEach((bill) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      const head = row.createDiv({ cls: "cow-list-item-head" });
      head.createEl("strong", { text: bill.title });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u8D26\u5355" } });
      (0, import_obsidian24.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => openBillModal(this.app, async (values) => {
        await this.store.updateBill(bill.id, values);
        this.onDataChanged();
      }, bill));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u8D26\u5355" } });
      (0, import_obsidian24.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteBill(bill.id);
        this.onDataChanged();
      });
      const meta = row.createDiv({ cls: "cow-meta-line" });
      meta.createSpan({ cls: bill.paid ? "cow-status is-green" : "cow-status is-yellow", text: bill.paid ? "\u5DF2\u652F\u4ED8" : "\u5F85\u5904\u7406" });
      meta.createSpan({ text: `${bill.dueDate} \xB7 \xA5${bill.amount}` });
    });
  }
};

// src/components/finance/ExpenseCategoriesSection.ts
var import_obsidian25 = require("obsidian");
var ExpenseCategoriesSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const add = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    (0, import_obsidian25.setIcon)(add.createSpan(), "plus");
    add.createSpan({ text: "\u65B0\u589E\u5206\u7C7B" });
    add.addEventListener("click", () => {
      openBudgetModal(this.app, async (budget) => {
        await this.store.addBudget(budget);
        this.onDataChanged();
      });
    });
    this.store.getBudgets().forEach((budget) => {
      const percent = budget.amount === 0 ? 0 : Math.round(budget.spent / budget.amount * 100);
      const row = container.createDiv({ cls: "cow-month-progress-row" });
      row.createSpan({ text: budget.category });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-pink", attr: { style: `width: ${Math.min(100, percent)}%` } });
      row.createSpan({ text: `${percent}%` });
      const actions = row.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u5206\u7C7B" } });
      (0, import_obsidian25.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => openBudgetModal(this.app, async (values) => {
        await this.store.updateBudget(budget.id, values);
        this.onDataChanged();
      }, budget));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u5206\u7C7B" } });
      (0, import_obsidian25.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        const deleted = await this.store.deleteBudget(budget.id);
        if (!deleted) showUsedCategoryNotice(budget.category);
        this.onDataChanged();
      });
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
var import_obsidian26 = require("obsidian");
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
        if (done) (0, import_obsidian26.setIcon)(button, "check");
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
var import_obsidian28 = require("obsidian");

// src/components/finance/AddTransactionModal.ts
var import_obsidian27 = require("obsidian");
var AddTransactionModal = class extends import_obsidian27.Modal {
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
    new import_obsidian27.Setting(this.contentEl).setName("\u7C7B\u578B").addDropdown((dropdown) => {
      dropdown.addOption("expense", "\u652F\u51FA");
      dropdown.addOption("income", "\u6536\u5165");
      dropdown.setValue(this.type);
      dropdown.onChange((value) => {
        this.type = value;
      });
    });
    new import_obsidian27.Setting(this.contentEl).setName("\u5206\u7C7B").addText((text) => {
      text.setValue(this.category);
      text.onChange((value) => {
        this.category = value.trim() || "\u672A\u5206\u7C7B";
      });
    });
    new import_obsidian27.Setting(this.contentEl).setName("\u91D1\u989D").addText((text) => {
      text.inputEl.type = "number";
      text.onChange((value) => {
        this.amount = Number(value) || 0;
      });
    });
    new import_obsidian27.Setting(this.contentEl).setName("\u65E5\u671F").addText((text) => {
      text.setValue(this.date);
      text.onChange((value) => {
        this.date = value.trim() || formatDateKey(/* @__PURE__ */ new Date());
      });
    });
    new import_obsidian27.Setting(this.contentEl).setName("\u5907\u6CE8").addText((text) => {
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
    (0, import_obsidian28.setIcon)(action.createSpan(), "plus");
    action.createSpan({ text: "\u65B0\u589E\u8BB0\u8D26" });
    action.addEventListener("click", () => {
      new AddTransactionModal(this.app, async (transaction) => {
        await this.store.addTransaction(transaction);
        this.onDataChanged();
      }).open();
    });
    const list = container.createEl("ul", { cls: "cow-focus-list cow-editable-list" });
    this.store.getFinanceTodos().forEach((item) => {
      const row = list.createEl("li");
      const checkbox = row.createEl("input", { type: "checkbox" });
      checkbox.checked = item.completed;
      checkbox.addEventListener("change", async () => {
        await this.store.updateFinanceTodo(item.id, { completed: checkbox.checked });
        this.onDataChanged();
      });
      row.createSpan({ text: item.title });
      const actions = row.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u8BB0\u8D26\u5F85\u529E" } });
      (0, import_obsidian28.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => openTextModal(this.app, "\u7F16\u8F91\u8BB0\u8D26\u5F85\u529E", "\u5F85\u529E", item.title, async (value) => {
        await this.store.updateFinanceTodo(item.id, { title: value });
        this.onDataChanged();
      }));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u8BB0\u8D26\u5F85\u529E" } });
      (0, import_obsidian28.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteFinanceTodo(item.id);
        this.onDataChanged();
      });
    });
  }
};

// src/components/finance/IncomeExpenseTrendSection.ts
var import_obsidian29 = require("obsidian");
var IncomeExpenseTrendSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const add = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    (0, import_obsidian29.setIcon)(add.createSpan(), "list-checks");
    add.createSpan({ text: "\u7BA1\u7406\u6536\u652F\u8BB0\u5F55" });
    add.addEventListener("click", () => openTransactionModal(this.app, async (transaction) => {
      await this.store.addTransaction(transaction);
      this.onDataChanged();
    }));
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
    const list = container.createDiv({ cls: "cow-data-list cow-compact-list" });
    this.store.getTransactions().slice(-4).reverse().forEach((transaction) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      const head = row.createDiv({ cls: "cow-list-item-head" });
      const body = head.createDiv();
      body.createEl("strong", { text: `${transaction.type === "income" ? "\u6536\u5165" : "\u652F\u51FA"} \xA5${transaction.amount}` });
      body.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${transaction.date} \xB7 ${transaction.category} \xB7 ${transaction.note || "\u65E0\u5907\u6CE8"}` });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u6536\u652F" } });
      (0, import_obsidian29.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => openTransactionModal(this.app, async (values) => {
        await this.store.updateTransaction(transaction.id, values);
        this.onDataChanged();
      }, transaction));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u6536\u652F" } });
      (0, import_obsidian29.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteTransaction(transaction.id);
        this.onDataChanged();
      });
    });
  }
};

// src/components/finance/InvestmentWatchSection.ts
var import_obsidian30 = require("obsidian");
var InvestmentWatchSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const add = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    (0, import_obsidian30.setIcon)(add.createSpan(), "plus");
    add.createSpan({ text: "\u65B0\u589E\u89C2\u5BDF" });
    add.addEventListener("click", () => {
      openInvestmentWatchModal(this.app, async (item) => {
        await this.store.addInvestmentWatchItem(item);
        this.onDataChanged();
      });
    });
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getInvestmentWatchItems().forEach((item) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      const head = row.createDiv({ cls: "cow-list-item-head" });
      const body = head.createDiv();
      body.createEl("strong", { text: item.name });
      body.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${item.code} \xB7 ${item.type} \xB7 \xA5${item.price} \xB7 ${item.changePercent}%` });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u89C2\u5BDF" } });
      (0, import_obsidian30.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => openInvestmentWatchModal(this.app, async (values) => {
        await this.store.updateInvestmentWatchItem(item.id, values);
        this.onDataChanged();
      }, item));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u89C2\u5BDF" } });
      (0, import_obsidian30.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteInvestmentWatchItem(item.id);
        this.onDataChanged();
      });
    });
  }
};

// src/components/finance/MonthlyBudgetSection.ts
var import_obsidian31 = require("obsidian");
var MonthlyBudgetSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const action = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    (0, import_obsidian31.setIcon)(action.createSpan(), "plus");
    action.createSpan({ text: "\u65B0\u589E\u8BB0\u8D26" });
    action.addEventListener("click", () => this.openModal());
    const manage = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    (0, import_obsidian31.setIcon)(manage.createSpan(), "list-checks");
    manage.createSpan({ text: "\u7BA1\u7406\u6536\u652F" });
    manage.addEventListener("click", () => this.openManager());
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
  openManager() {
    openTransactionModal(this.app, async (transaction) => {
      await this.store.addTransaction(transaction);
      this.onDataChanged();
    });
  }
};

// src/components/finance/SavingGoalsSection.ts
var import_obsidian32 = require("obsidian");
var SavingGoalsSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getSavingGoals().forEach((goal) => {
      const percent = goal.target === 0 ? 0 : Math.round(goal.current / goal.target * 100);
      const row = list.createDiv({ cls: "cow-data-card" });
      const head = row.createDiv({ cls: "cow-list-item-head" });
      head.createEl("strong", { text: goal.title });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u50A8\u84C4\u76EE\u6807" } });
      (0, import_obsidian32.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => openSavingGoalModal(this.app, async (values) => {
        await this.store.updateSavingGoal(goal.id, values);
        this.onDataChanged();
      }, goal));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u50A8\u84C4\u76EE\u6807" } });
      (0, import_obsidian32.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteSavingGoal(goal.id);
        this.onDataChanged();
      });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `\xA5${goal.current}/\xA5${goal.target} \xB7 ${goal.deadline}` });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-green", attr: { style: `width: ${Math.min(100, percent)}%` } });
    });
  }
};

// src/components/fitness/BodyMeasurementsSection.ts
var import_obsidian33 = require("obsidian");
var BodyMeasurementsSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    var _a, _b, _c, _d;
    const measurements = this.store.getBodyMeasurements();
    const latest = measurements[measurements.length - 1];
    const action = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    (0, import_obsidian33.setIcon)(action.createSpan(), "plus");
    action.createSpan({ text: "\u8BB0\u5F55\u6570\u636E" });
    action.addEventListener("click", () => {
      openBodyMeasurementModal(this.app, async (values) => {
        await this.store.addBodyMeasurement(values);
        this.onDataChanged();
      });
    });
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
    const list = container.createDiv({ cls: "cow-data-list cow-compact-list" });
    measurements.slice(-3).reverse().forEach((item) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      const head = row.createDiv({ cls: "cow-list-item-head" });
      const body = head.createDiv();
      body.createEl("strong", { text: item.date });
      body.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${item.weight}kg \xB7 BMI ${item.bmi} \xB7 \u8170\u56F4 ${item.waist}cm` });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u8BB0\u5F55" } });
      (0, import_obsidian33.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => {
        openBodyMeasurementModal(this.app, async (values) => {
          var _a2;
          await this.store.updateBodyMeasurement((_a2 = item.id) != null ? _a2 : item.date, values);
          this.onDataChanged();
        }, item);
      });
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
var import_obsidian34 = require("obsidian");
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
        if (done) (0, import_obsidian34.setIcon)(button, "check");
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
var import_obsidian35 = require("obsidian");
var FitnessGoalsSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const action = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    (0, import_obsidian35.setIcon)(action.createSpan(), "plus");
    action.createSpan({ text: "\u65B0\u589E\u76EE\u6807" });
    action.addEventListener("click", () => {
      openFitnessGoalModal(this.app, async (goal) => {
        await this.store.addFitnessGoal(goal);
        this.onDataChanged();
      });
    });
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getFitnessGoals().forEach((goal) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      const head = row.createDiv({ cls: "cow-list-item-head" });
      const body = head.createDiv();
      body.createEl("strong", { text: goal.title });
      body.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${goal.current}/${goal.target}${goal.unit} \xB7 ${goal.deadline}` });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u76EE\u6807" } });
      (0, import_obsidian35.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => openFitnessGoalModal(this.app, async (values) => {
        await this.store.updateFitnessGoal(goal.id, values);
        this.onDataChanged();
      }, goal));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u76EE\u6807" } });
      (0, import_obsidian35.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteFitnessGoal(goal.id);
        this.onDataChanged();
      });
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
var import_obsidian36 = require("obsidian");
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
        if (done) (0, import_obsidian36.setIcon)(button, "check");
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
var import_obsidian37 = require("obsidian");
var MilestoneTimelineSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const add = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    (0, import_obsidian37.setIcon)(add.createSpan(), "plus");
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
      const actions = item.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u91CC\u7A0B\u7891" } });
      (0, import_obsidian37.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => {
        new CrudItemModal(this.app, "\u7F16\u8F91\u91CC\u7A0B\u7891", {
          title: milestone.title,
          date: milestone.date,
          status: milestone.status
        }, [
          { key: "title", name: "\u6807\u9898" },
          { key: "date", name: "\u65E5\u671F" },
          { key: "status", name: "\u72B6\u6001", type: "select", options: ["\u672A\u5F00\u59CB", "\u8FDB\u884C\u4E2D", "\u5DF2\u5B8C\u6210"].map((value) => ({ value, label: value })) }
        ], async (values) => {
          await this.store.updateMilestone(milestone.id, values);
          this.onDataChanged();
        }).open();
      });
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u91CC\u7A0B\u7891" } });
      (0, import_obsidian37.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteMilestone(milestone.id);
        this.onDataChanged();
      });
    });
  }
};

// src/components/goals/MonthlyKeyResultsSection.ts
var import_obsidian38 = require("obsidian");
var MonthlyKeyResultsSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const add = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    (0, import_obsidian38.setIcon)(add.createSpan(), "plus");
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
      const actions = item.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91 KR" } });
      (0, import_obsidian38.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => {
        new CrudItemModal(this.app, "\u7F16\u8F91 KR", {
          title: kr.title,
          progress: kr.progress,
          completed: kr.completed
        }, [
          { key: "title", name: "\u6807\u9898" },
          { key: "progress", name: "\u8FDB\u5EA6", type: "number" },
          { key: "completed", name: "\u5DF2\u5B8C\u6210", type: "checkbox" }
        ], async (values) => {
          await this.store.updateKeyResult(kr.id, values);
          this.onDataChanged();
        }).open();
      });
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664 KR" } });
      (0, import_obsidian38.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteKeyResult(kr.id);
        this.onDataChanged();
      });
    });
  }
};

// src/components/goals/PriorityMatrixSection.ts
var import_obsidian39 = require("obsidian");
var QUADRANTS2 = [
  { id: "important-urgent", label: "\u91CD\u8981\u4E14\u7D27\u6025" },
  { id: "important-not-urgent", label: "\u91CD\u8981\u4E0D\u7D27\u6025" },
  { id: "not-important-urgent", label: "\u4E0D\u91CD\u8981\u4F46\u7D27\u6025" },
  { id: "not-important-not-urgent", label: "\u4E0D\u91CD\u8981\u4E0D\u7D27\u6025" }
];
var PriorityMatrixSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const add = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    (0, import_obsidian39.setIcon)(add.createSpan(), "plus");
    add.createSpan({ text: "\u65B0\u589E\u4EFB\u52A1" });
    add.addEventListener("click", () => openPriorityItemModal(this.app, async (item) => {
      await this.store.addPriorityMatrixItem(item);
      this.onDataChanged();
    }));
    const grid = container.createDiv({ cls: "cow-priority-grid" });
    QUADRANTS2.forEach((quadrant) => {
      const cell = grid.createDiv();
      cell.createEl("strong", { text: quadrant.label });
      this.store.getPriorityMatrixItems().filter((item) => item.quadrant === quadrant.id).forEach((item) => {
        const row = cell.createDiv({ cls: "cow-priority-item" });
        row.createSpan({ cls: item.completed ? "is-complete" : "", text: item.title });
        const actions = row.createDiv({ cls: "cow-list-item-actions" });
        const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u4EFB\u52A1" } });
        (0, import_obsidian39.setIcon)(edit, "pencil");
        edit.addEventListener("click", () => openPriorityItemModal(this.app, async (values) => {
          await this.store.updatePriorityMatrixItem(item.id, values);
          this.onDataChanged();
        }, item));
        const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u4EFB\u52A1" } });
        (0, import_obsidian39.setIcon)(remove, "trash-2");
        remove.addEventListener("click", async () => {
          await this.store.deletePriorityMatrixItem(item.id);
          this.onDataChanged();
        });
      });
    });
  }
};

// src/components/goals/QuarterlyOkrSection.ts
var import_obsidian40 = require("obsidian");
var QuarterlyOkrSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getObjectives().forEach((objective) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      const head = row.createDiv({ cls: "cow-list-item-head" });
      head.createEl("strong", { text: objective.title });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91 OKR" } });
      (0, import_obsidian40.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => openObjectiveModal(this.app, async (values) => {
        await this.store.updateObjective(objective.id, values);
        this.onDataChanged();
      }, objective));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664 OKR" } });
      (0, import_obsidian40.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteObjective(objective.id);
        this.onDataChanged();
      });
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
var import_obsidian41 = require("obsidian");
var RisksBlockersSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const add = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    (0, import_obsidian41.setIcon)(add.createSpan(), "plus");
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
      const actions = row.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u98CE\u9669" } });
      (0, import_obsidian41.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => {
        new CrudItemModal(this.app, "\u7F16\u8F91\u98CE\u9669", {
          title: risk.title,
          level: risk.level,
          solution: risk.solution
        }, [
          { key: "title", name: "\u98CE\u9669" },
          { key: "level", name: "\u7B49\u7EA7", type: "select", options: [{ value: "low", label: "\u4F4E" }, { value: "medium", label: "\u4E2D" }, { value: "high", label: "\u9AD8" }] },
          { key: "solution", name: "\u65B9\u6848", type: "textarea" }
        ], async (values) => {
          await this.store.updateRisk(risk.id, values);
          this.onDataChanged();
        }).open();
      });
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u98CE\u9669" } });
      (0, import_obsidian41.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteRisk(risk.id);
        this.onDataChanged();
      });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ cls: `cow-status is-${risk.level === "high" ? "yellow" : "blue"}`, text: risk.level });
      row.createEl("p", { text: risk.solution });
    });
  }
};

// src/components/goals/YearlyGoalsSection.ts
var import_obsidian42 = require("obsidian");
var YearlyGoalsSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const add = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    (0, import_obsidian42.setIcon)(add.createSpan(), "plus");
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
      (0, import_obsidian42.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => {
        new GoalEditorModal(this.app, goal, async (updated) => {
          await this.store.updateGoal(goal.id, updated);
          this.onDataChanged();
        }).open();
      });
      const remove = title.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u76EE\u6807" } });
      (0, import_obsidian42.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteGoal(goal.id);
        this.onDataChanged();
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
var import_obsidian43 = require("obsidian");
var HealthRemindersSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const list = container.createEl("ul", { cls: "cow-memo-list" });
    this.store.getHealthReminders().forEach((item) => {
      const row = list.createEl("li");
      const head = row.createDiv({ cls: "cow-list-item-head" });
      head.createSpan({ text: item.title });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u63D0\u9192" } });
      (0, import_obsidian43.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => openTextModal(this.app, "\u7F16\u8F91\u5065\u5EB7\u63D0\u9192", "\u63D0\u9192", item.title, async (value) => {
        await this.store.updateHealthReminder(item.id, value);
        this.onDataChanged();
      }));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u63D0\u9192" } });
      (0, import_obsidian43.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteHealthReminder(item.id);
        this.onDataChanged();
      });
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
var import_obsidian44 = require("obsidian");
var WaterSleepHabitsSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const today = formatDateKey(/* @__PURE__ */ new Date());
    const record = this.store.getFitnessDailyRecord(today);
    const action = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    (0, import_obsidian44.setIcon)(action.createSpan(), "pencil");
    action.createSpan({ text: "\u7F16\u8F91\u4ECA\u65E5" });
    action.addEventListener("click", () => {
      openFitnessDailyModal(this.app, record, async (values) => {
        await this.store.updateFitnessDailyRecord(values.date, values);
        this.onDataChanged();
      });
    });
    const list = container.createDiv({ cls: "cow-data-list" });
    [
      ["\u996E\u6C34", `${record.waterCups}/${record.waterGoal} \u676F`, record.waterGoal === 0 ? 0 : Math.round(record.waterCups / record.waterGoal * 100)],
      ["\u7761\u7720", `${record.sleepHours}/${record.sleepGoal} \u5C0F\u65F6`, record.sleepGoal === 0 ? 0 : Math.round(record.sleepHours / record.sleepGoal * 100)],
      ["\u4F5C\u606F", `${record.bedtime || "--"} - ${record.wakeTime || "--"}`, 100]
    ].forEach(([label, status, percent]) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: String(label) });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: String(status) });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-blue", attr: { style: `width: ${Math.min(100, Number(percent))}%` } });
    });
  }
};

// src/components/fitness/WorkoutLogSection.ts
var import_obsidian45 = require("obsidian");
var WorkoutLogSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getWorkouts().filter((item) => item.completed).forEach((workout) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      const head = row.createDiv({ cls: "cow-list-item-head" });
      head.createEl("strong", { text: workout.note });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u8FD0\u52A8\u65E5\u5FD7" } });
      (0, import_obsidian45.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => openWorkoutModal(this.app, async (values) => {
        await this.store.updateWorkout(workout.id, values);
        this.onDataChanged();
      }, true, workout));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u8FD0\u52A8\u65E5\u5FD7" } });
      (0, import_obsidian45.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteWorkout(workout.id);
        this.onDataChanged();
      });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${workout.date} \xB7 ${workout.type} \xB7 ${workout.duration}min` });
    });
  }
};

// src/components/fitness/WorkoutPlanSection.ts
var import_obsidian46 = require("obsidian");
var WorkoutPlanSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getWorkouts().forEach((workout) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      const head = row.createDiv({ cls: "cow-list-item-head" });
      head.createEl("strong", { text: workout.note });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u8BAD\u7EC3\u8BA1\u5212" } });
      (0, import_obsidian46.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => openWorkoutModal(this.app, async (values) => {
        await this.store.updateWorkout(workout.id, values);
        this.onDataChanged();
      }, workout.completed, workout));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u8BAD\u7EC3\u8BA1\u5212" } });
      (0, import_obsidian46.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteWorkout(workout.id);
        this.onDataChanged();
      });
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
var import_obsidian47 = require("obsidian");
var BookListSection = class {
  constructor(app, store, status, onDataChanged) {
    this.app = app;
    this.store = store;
    this.status = status;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getBooks().filter((book) => book.status === this.status).forEach((book) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      const head = row.createDiv({ cls: "cow-list-item-head" });
      head.createEl("strong", { text: book.title });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u4E66\u7C4D" } });
      (0, import_obsidian47.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => new AddBookModal(this.app, async (updated) => {
        await this.store.updateBook(book.id, updated);
        this.onDataChanged();
      }, book).open());
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u4E66\u7C4D" } });
      (0, import_obsidian47.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteBook(book.id);
        this.onDataChanged();
      });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${book.author} \xB7 ${book.tags.join(" / ")}` });
    });
  }
};

// src/components/reading/BookshelfSection.ts
var import_obsidian49 = require("obsidian");

// src/components/reading/BookCard.ts
var import_obsidian48 = require("obsidian");
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
    (0, import_obsidian48.setIcon)(open, "notebook-tabs");
    open.addEventListener("click", () => void this.openNote());
    const done = controls.createEl("button", { attr: { type: "button", "aria-label": "\u5B8C\u6210\u9605\u8BFB" } });
    (0, import_obsidian48.setIcon)(done, "check");
    done.addEventListener("click", async () => {
      await this.store.completeBook(this.book.id);
      this.onDataChanged();
    });
    const edit = controls.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u4E66\u7C4D" } });
    (0, import_obsidian48.setIcon)(edit, "pencil");
    edit.addEventListener("click", () => {
      new AddBookModal(this.app, async (book) => {
        await this.store.updateBook(this.book.id, book);
        this.onDataChanged();
      }, this.book).open();
    });
    const remove = controls.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u4E66\u7C4D" } });
    (0, import_obsidian48.setIcon)(remove, "trash-2");
    remove.addEventListener("click", async () => {
      await this.store.deleteBook(this.book.id);
      this.onDataChanged();
    });
  }
  async openNote() {
    if (!this.book.notePath) {
      new import_obsidian48.Notice("\u8FD9\u672C\u4E66\u8FD8\u6CA1\u6709\u7ED1\u5B9A\u9605\u8BFB\u7B14\u8BB0\u3002");
      return;
    }
    const file = this.app.vault.getFileByPath(this.book.notePath);
    if (!file) {
      new import_obsidian48.Notice(`\u6CA1\u6709\u627E\u5230\u7B14\u8BB0\uFF1A${this.book.notePath}`);
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
    (0, import_obsidian49.setIcon)(add.createSpan(), "plus");
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
var import_obsidian50 = require("obsidian");
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
        if (done) (0, import_obsidian50.setIcon)(button, "check");
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
var import_obsidian51 = require("obsidian");
var ReadingNotesSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getBooks().forEach((book) => {
      var _a;
      const button = list.createEl("button", { cls: "cow-data-card cow-click-card", attr: { type: "button" } });
      const head = button.createDiv({ cls: "cow-list-item-head" });
      head.createEl("strong", { text: book.title });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u9605\u8BFB\u7B14\u8BB0" } });
      (0, import_obsidian51.setIcon)(edit, "pencil");
      edit.addEventListener("click", (event) => {
        event.stopPropagation();
        new AddBookModal(this.app, async (updated) => {
          await this.store.updateBook(book.id, updated);
          this.onDataChanged();
        }, book).open();
      });
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u9605\u8BFB\u7B14\u8BB0" } });
      (0, import_obsidian51.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async (event) => {
        event.stopPropagation();
        await this.store.deleteBook(book.id);
        this.onDataChanged();
      });
      button.createDiv({ cls: "cow-meta-line" }).createSpan({ text: (_a = book.notePath) != null ? _a : "\u672A\u7ED1\u5B9A\u9605\u8BFB\u7B14\u8BB0" });
      button.addEventListener("click", () => void this.openNote(book));
    });
  }
  async openNote(book) {
    if (!book.notePath) {
      new import_obsidian51.Notice("\u8FD9\u672C\u4E66\u8FD8\u6CA1\u6709\u7ED1\u5B9A\u9605\u8BFB\u7B14\u8BB0\u3002");
      return;
    }
    const file = this.app.vault.getFileByPath(book.notePath);
    if (file) await this.app.workspace.getLeaf(false).openFile(file);
  }
};

// src/components/reading/ReadingPlanSection.ts
var import_obsidian52 = require("obsidian");
var ReadingPlanSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getBooks().filter((book) => book.status !== "\u5DF2\u8BFB").forEach((book) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      const head = row.createDiv({ cls: "cow-list-item-head" });
      head.createEl("strong", { text: book.title });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u9605\u8BFB\u8BA1\u5212" } });
      (0, import_obsidian52.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => new AddBookModal(this.app, async (updated) => {
        await this.store.updateBook(book.id, updated);
        this.onDataChanged();
      }, book).open());
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u9605\u8BFB\u8BA1\u5212" } });
      (0, import_obsidian52.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteBook(book.id);
        this.onDataChanged();
      });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({
        text: `${book.currentPage}/${book.totalPages} \u9875 \xB7 ${book.status}`
      });
    });
  }
};

// src/components/reading/ReadingQuotesSection.ts
var import_obsidian53 = require("obsidian");
var ReadingQuotesSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const list = container.createEl("ul", { cls: "cow-memo-list" });
    this.store.getReadingQuotes().forEach((quote) => {
      const item = list.createEl("li");
      const head = item.createDiv({ cls: "cow-list-item-head" });
      head.createEl("blockquote", { text: quote.text });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u91D1\u53E5" } });
      (0, import_obsidian53.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => openQuoteModal(this.app, async (values) => {
        await this.store.updateReadingQuote(quote.id, values);
        this.onDataChanged();
      }, quote));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u91D1\u53E5" } });
      (0, import_obsidian53.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteReadingQuote(quote.id);
        this.onDataChanged();
      });
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
var import_obsidian54 = require("obsidian");
var DataAnalysisTasksSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getDataAnalysisTasks().forEach((task) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      const head = row.createDiv({ cls: "cow-list-item-head" });
      head.createEl("strong", { text: task.title });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u4EFB\u52A1" } });
      (0, import_obsidian54.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => openDataAnalysisTaskModal(this.app, async (values) => {
        await this.store.updateDataAnalysisTask(task.id, values);
        this.onDataChanged();
      }, task));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u4EFB\u52A1" } });
      (0, import_obsidian54.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteDataAnalysisTask(task.id);
        this.onDataChanged();
      });
      const meta = row.createDiv({ cls: "cow-meta-line" });
      meta.createSpan({ cls: "cow-status is-green", text: task.status });
      meta.createSpan({ text: `${task.progress}%` });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-green", attr: { style: `width: ${task.progress}%` } });
    });
  }
};

// src/components/research/ExperimentSection.ts
var import_obsidian55 = require("obsidian");
var ExperimentSection = class {
  constructor(app, store, mode, onDataChanged) {
    this.app = app;
    this.store = store;
    this.mode = mode;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const items = this.mode === "plan" ? this.store.getExperimentPlans() : this.store.getExperimentRecords();
    const list = container.createDiv({ cls: "cow-data-list" });
    items.forEach((item) => {
      const button = list.createEl("button", { cls: "cow-data-card cow-click-card", attr: { type: "button" } });
      const head = button.createDiv({ cls: "cow-list-item-head" });
      head.createEl("strong", { text: item.title });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u5B9E\u9A8C" } });
      (0, import_obsidian55.setIcon)(edit, "pencil");
      edit.addEventListener("click", (event) => {
        event.stopPropagation();
        openExperimentModal(this.app, async (values) => {
          await this.store.updateExperiment(this.mode, item.id, values);
          this.onDataChanged();
        }, item);
      });
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u5B9E\u9A8C" } });
      (0, import_obsidian55.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async (event) => {
        event.stopPropagation();
        await this.store.deleteExperiment(this.mode, item.id);
        this.onDataChanged();
      });
      const meta = button.createDiv({ cls: "cow-meta-line" });
      meta.createSpan({ cls: "cow-status is-yellow", text: item.status });
      meta.createSpan({ text: item.date });
      button.addEventListener("click", () => void this.openNote(item.notePath));
    });
  }
  async openNote(notePath) {
    if (!notePath) {
      new import_obsidian55.Notice("\u8FD9\u6761\u5B9E\u9A8C\u8BB0\u5F55\u8FD8\u6CA1\u6709\u7ED1\u5B9A Markdown\u3002");
      return;
    }
    const file = this.app.vault.getFileByPath(notePath);
    if (!file) {
      new import_obsidian55.Notice(`\u6CA1\u6709\u627E\u5230\u7B14\u8BB0\uFF1A${notePath}`);
      return;
    }
    await this.app.workspace.getLeaf(false).openFile(file);
  }
};

// src/components/research/LiteratureNotesSection.ts
var import_obsidian56 = require("obsidian");
var LiteratureNotesSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getResearchPapers().forEach((paper) => {
      var _a;
      const button = list.createEl("button", { cls: "cow-data-card cow-click-card", attr: { type: "button" } });
      const head = button.createDiv({ cls: "cow-list-item-head" });
      head.createEl("strong", { text: paper.title });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u6587\u732E\u7B14\u8BB0" } });
      (0, import_obsidian56.setIcon)(edit, "pencil");
      edit.addEventListener("click", (event) => {
        event.stopPropagation();
        openResearchPaperModal(this.app, async (values) => {
          await this.store.updateResearchPaper(paper.id, values);
          this.onDataChanged();
        }, paper);
      });
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u6587\u732E\u7B14\u8BB0" } });
      (0, import_obsidian56.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async (event) => {
        event.stopPropagation();
        await this.store.deleteResearchPaper(paper.id);
        this.onDataChanged();
      });
      button.createDiv({ cls: "cow-meta-line" }).createSpan({ text: (_a = paper.notePath) != null ? _a : "\u672A\u7ED1\u5B9A\u7B14\u8BB0" });
      button.addEventListener("click", () => void this.openNote(paper.notePath));
    });
  }
  async openNote(notePath) {
    if (!notePath) {
      new import_obsidian56.Notice("\u8FD8\u6CA1\u6709\u7ED1\u5B9A\u6587\u732E\u7B14\u8BB0\u3002");
      return;
    }
    const file = this.app.vault.getFileByPath(notePath);
    if (file) await this.app.workspace.getLeaf(false).openFile(file);
  }
};

// src/components/research/PaperQueueSection.ts
var import_obsidian57 = require("obsidian");
var PaperQueueSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getResearchPapers().forEach((paper) => {
      const button = list.createEl("button", { cls: "cow-data-card cow-click-card", attr: { type: "button" } });
      const head = button.createDiv({ cls: "cow-list-item-head" });
      head.createEl("strong", { text: paper.title });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u8BBA\u6587" } });
      (0, import_obsidian57.setIcon)(edit, "pencil");
      edit.addEventListener("click", (event) => {
        event.stopPropagation();
        openResearchPaperModal(this.app, async (values) => {
          await this.store.updateResearchPaper(paper.id, values);
          this.onDataChanged();
        }, paper);
      });
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u8BBA\u6587" } });
      (0, import_obsidian57.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async (event) => {
        event.stopPropagation();
        await this.store.deleteResearchPaper(paper.id);
        this.onDataChanged();
      });
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
      new import_obsidian57.Notice("\u8FD9\u7BC7\u6587\u732E\u8FD8\u6CA1\u6709\u7ED1\u5B9A\u7B14\u8BB0\u3002");
      return;
    }
    const file = this.app.vault.getFileByPath(notePath);
    if (!file) {
      new import_obsidian57.Notice(`\u6CA1\u6709\u627E\u5230\u7B14\u8BB0\uFF1A${notePath}`);
      return;
    }
    await this.app.workspace.getLeaf(false).openFile(file);
  }
};

// src/components/research/ResearchCheckinSection.ts
var import_obsidian58 = require("obsidian");
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
        if (done) (0, import_obsidian58.setIcon)(button, "check");
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
var import_obsidian59 = require("obsidian");
var ResearchMemoSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const list = container.createEl("ul", { cls: "cow-memo-list" });
    this.store.getResearchMemos().forEach((memo, index) => {
      const item = list.createEl("li");
      const head = item.createDiv({ cls: "cow-list-item-head" });
      head.createSpan({ text: memo });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91 Memo" } });
      (0, import_obsidian59.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => openTextModal(this.app, "\u7F16\u8F91\u79D1\u7814 Memo", "Memo", memo, async (value) => {
        await this.store.updateResearchMemo(index, value);
        this.onDataChanged();
      }));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664 Memo" } });
      (0, import_obsidian59.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteResearchMemo(index);
        this.onDataChanged();
      });
    });
  }
};

// src/components/research/ResearchProjectsSection.ts
var import_obsidian60 = require("obsidian");
var ResearchProjectsSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getResearchProjects().forEach((project) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      const head = row.createDiv({ cls: "cow-list-item-head" });
      head.createEl("strong", { text: project.title });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u9879\u76EE" } });
      (0, import_obsidian60.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => {
        openResearchProjectModal(this.app, async (values) => {
          await this.store.updateResearchProject(project.id, { ...values, tags: values.tagsText.split(/[,，]/).map((tag) => tag.trim()).filter(Boolean) });
          this.onDataChanged();
        }, project);
      });
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u9879\u76EE" } });
      (0, import_obsidian60.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteResearchProject(project.id);
        this.onDataChanged();
      });
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
var import_obsidian61 = require("obsidian");
var ResearchTimelineSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const list = container.createDiv({ cls: "cow-timeline" });
    this.store.getResearchDeadlines().forEach((ddl) => {
      const item = list.createDiv({ cls: `cow-timeline-item priority-${ddl.priority}` });
      item.createEl("time", { text: ddl.date });
      item.createEl("strong", { text: ddl.title });
      item.createSpan({ text: ddl.type });
      const actions = item.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91 DDL" } });
      (0, import_obsidian61.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => openDeadlineModal(this.app, async (values) => {
        await this.store.updateResearchDeadline(ddl.id, values);
        this.onDataChanged();
      }, ddl));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664 DDL" } });
      (0, import_obsidian61.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteResearchDeadline(ddl.id);
        this.onDataChanged();
      });
    });
  }
};

// src/components/DashboardSection.ts
var DashboardSection = class {
  constructor(app, store, section, onRemove, onDataChanged) {
    this.app = app;
    this.store = store;
    this.section = section;
    this.onRemove = onRemove;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    var _a, _b, _c;
    const cardColor = typeof ((_a = this.section.config) == null ? void 0 : _a.cardColor) === "string" ? this.section.config.cardColor : "default";
    const sectionEl = container.createDiv({
      cls: `cow-section cow-section-${(_b = this.section.width) != null ? _b : "md"} cow-section-height-${(_c = this.section.height) != null ? _c : "sm"} cow-card-color-${cardColor}`
    });
    const header = sectionEl.createDiv({ cls: "cow-section-header" });
    const title = header.createDiv({ cls: "cow-section-title" });
    (0, import_obsidian62.setIcon)(title.createSpan(), this.getIcon());
    title.createEl("h3", { text: this.section.title });
    const actions = header.createDiv({ cls: "cow-section-actions" });
    if (getSectionCapabilities(this.section.type).canAdd) {
      const addButton = actions.createEl("button", {
        cls: "cow-section-add-button",
        attr: { type: "button", "aria-label": `\u6DFB\u52A0${this.section.title}\u5185\u5BB9` }
      });
      (0, import_obsidian62.setIcon)(addButton.createSpan(), "plus");
      addButton.createSpan({ text: "\u6DFB\u52A0" });
      addButton.addEventListener("click", () => {
        openAddContentModal(this.app, this.store, this.section, this.onDataChanged);
      });
    }
    if (getSectionCapabilities(this.section.type).canOpenStats) {
      const statsButton = actions.createEl("button", {
        cls: "cow-section-add-button",
        attr: { type: "button", "aria-label": `${this.section.title}\u7EDF\u8BA1` }
      });
      (0, import_obsidian62.setIcon)(statsButton.createSpan(), "bar-chart-3");
      statsButton.createSpan({ text: "\u7EDF\u8BA1" });
      statsButton.addEventListener("click", () => this.openStats());
    }
    const menuButton = actions.createEl("button", {
      cls: "cow-icon-button",
      attr: { type: "button", "aria-label": `${this.section.title}\u64CD\u4F5C\u83DC\u5355` }
    });
    (0, import_obsidian62.setIcon)(menuButton, "more-horizontal");
    menuButton.addEventListener("click", (event) => {
      new SectionActionMenu(this.app, this.store, this.section, this.onRemove, this.onDataChanged).show(event);
    });
    const content = sectionEl.createDiv({ cls: "cow-section-content" });
    this.renderContent(content);
  }
  renderContent(container) {
    switch (this.section.type) {
      case "weekly-completion":
      case "pending-tasks":
      case "checkin-streak":
        new OverviewStatsSection(this.store, this.section.type).render(container);
        break;
      case "today-focus-stat":
        new FocusStatSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "today-focus":
      case "today-tasks":
        new TodayFocusSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "habit-overview":
      case "habit-summary":
        new HabitOverviewSection(this.store, this.onDataChanged).render(container);
        break;
      case "monthly-progress":
        new MonthlyProgressSection(this.store).render(container);
        break;
      case "monthly-calendar":
      case "month-calendar":
        new MonthlyCalendarSection(this.app, this.store, this.onDataChanged).render(container);
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
        new ResearchProjectsSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "reading-queue":
        new PaperQueueSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "research-checkin":
        new ResearchCheckinSection(this.store, this.onDataChanged).render(container);
        break;
      case "experiment-plan":
        new ExperimentSection(this.app, this.store, "plan", this.onDataChanged).render(container);
        break;
      case "experiment-records":
        new ExperimentSection(this.app, this.store, "records", this.onDataChanged).render(container);
        break;
      case "data-analysis-tasks":
        new DataAnalysisTasksSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "literature-notes":
        new LiteratureNotesSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "research-timeline":
        new ResearchTimelineSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "research-memo":
        new ResearchMemoSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "current-reading":
        new CurrentReadingSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "bookshelf":
        new BookshelfSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "reading-plan":
        new ReadingPlanSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "reading-checkin":
        new ReadingCheckinSection(this.store, this.onDataChanged).render(container);
        break;
      case "reading-notes":
        new ReadingNotesSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "reading-quotes":
        new ReadingQuotesSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "finished-books":
        new BookListSection(this.app, this.store, "\u5DF2\u8BFB", this.onDataChanged).render(container);
        break;
      case "wishlist-books":
        new BookListSection(this.app, this.store, "\u60F3\u8BFB", this.onDataChanged).render(container);
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
        new WorkoutPlanSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "fitness-checkin":
        new FitnessCheckinSection(this.store, this.onDataChanged).render(container);
        break;
      case "body-measurements":
        new BodyMeasurementsSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "cardio-strength-plan":
        new CardioStrengthSection(this.store).render(container);
        break;
      case "water-sleep-habits":
        new WaterSleepHabitsSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "fitness-stats":
        new FitnessStatsSection(this.store).render(container);
        break;
      case "workout-log":
        new WorkoutLogSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "fitness-goals":
        new FitnessGoalsSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "health-reminders":
        new HealthRemindersSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "fitness-heatmap":
        new FitnessHeatmapSection(this.store).render(container);
        break;
      case "monthly-budget":
        new MonthlyBudgetSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "expense-categories":
        new ExpenseCategoriesSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "account-overview":
        new AccountOverviewSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "saving-goals":
        new SavingGoalsSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "bill-reminders":
        new BillRemindersSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "finance-checkin":
        new FinanceCheckinSection(this.store, this.onDataChanged).render(container);
        break;
      case "income-expense-trend":
        new IncomeExpenseTrendSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "finance-todos":
        new FinanceTodosSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "investment-watch":
        new InvestmentWatchSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "expense-heatmap":
        new ExpenseHeatmapSection(this.store).render(container);
        break;
      case "yearly-goals":
        new YearlyGoalsSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "quarterly-okr":
        new QuarterlyOkrSection(this.app, this.store, this.onDataChanged).render(container);
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
        new PriorityMatrixSection(this.app, this.store, this.onDataChanged).render(container);
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
      case "section-manager":
        new FunctionalSectionManagerSection(this.app, this.store, this.onDataChanged).render(container);
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
      case "custom-text":
      case "custom-todo-list":
      case "custom-link-list":
      case "custom-memo":
        this.renderCustomSection(container);
        break;
      default:
        container.createEl("p", { text: "\u8FD9\u662F\u4E00\u4E2A\u53EF\u914D\u7F6E\u529F\u80FD\u5206\u533A\uFF0C\u540E\u7EED\u53EF\u4EE5\u63A5\u5165\u771F\u5B9E\u6A21\u5757\u7EC4\u4EF6\u3002" });
    }
  }
  openStats() {
    if (this.section.type === "habit-overview") {
      new HabitStatisticsModal(this.app, this.store).open();
      return;
    }
    if (this.section.type === "monthly-progress") {
      new MonthlyProgressStatisticsModal(this.app, this.store).open();
      return;
    }
    if (this.section.type === "today-focus") {
      new TodoStatisticsModal(this.app, this.store, /* @__PURE__ */ new Date(), this.onDataChanged).open();
    }
  }
  renderCustomSection(container) {
    var _a;
    const description = typeof ((_a = this.section.config) == null ? void 0 : _a.description) === "string" ? this.section.config.description : "";
    if (description) {
      container.createEl("p", { text: description });
    }
    if (this.section.type === "custom-todo-list") {
      const list = container.createEl("ul", { cls: "cow-focus-list" });
      ["\u5F85\u8865\u5145 Todo", "\u7EE7\u7EED\u5B8C\u5584\u8FD9\u4E2A\u5206\u533A"].forEach((item) => {
        const row = list.createEl("li");
        row.createEl("input", { type: "checkbox" });
        row.createSpan({ text: item });
      });
      return;
    }
    if (this.section.type === "custom-link-list") {
      const list = container.createDiv({ cls: "cow-data-list" });
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: "\u94FE\u63A5\u5217\u8868" });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: "\u540E\u7EED\u53EF\u5728\u6A21\u5757\u5185\u5BB9\u7BA1\u7406\u4E2D\u6269\u5C55\u94FE\u63A5\u9879\u3002" });
      return;
    }
    if (this.section.type === "custom-memo") {
      const list = container.createEl("ul", { cls: "cow-memo-list" });
      list.createEl("li", { text: description || "\u8BB0\u5F55\u4E00\u4E2A\u53EF\u7231\u7684\u60F3\u6CD5\u3002" });
      return;
    }
    if (!description) {
      container.createEl("p", { cls: "cow-empty-state", text: "\u8FD9\u662F\u4E00\u4E2A\u81EA\u5B9A\u4E49\u6587\u672C\u5206\u533A\u3002" });
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
      "section-manager": "rows-3",
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
var import_obsidian63 = require("obsidian");
var AddSectionModal = class extends import_obsidian63.Modal {
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
      (0, import_obsidian63.setIcon)(button.createSpan({ cls: "cow-add-module-icon" }), module2.icon);
      button.createEl("strong", { text: module2.title });
      button.createEl("span", { text: module2.description });
      button.addEventListener("click", async () => {
        await this.onSelect(module2.type);
        this.close();
      });
    });
    if (this.modules.length === 0) {
      grid.createEl("p", { text: `${PAGE_LABELS[this.page]}\u9875\u9762\u6682\u65E0\u53EF\u6DFB\u52A0\u6A21\u5757\u3002` });
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
    (0, import_obsidian63.setIcon)(button.createSpan(), "plus");
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
var import_obsidian64 = require("obsidian");
var ResetDefaultsModal = class extends import_obsidian64.Modal {
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
    (0, import_obsidian64.setIcon)(importButton.createSpan(), "upload");
    importButton.createSpan({ text: "\u5BFC\u5165\u914D\u7F6E" });
    importButton.addEventListener("click", () => importInput.click());
    importInput.addEventListener("change", () => {
      var _a;
      const file = (_a = importInput.files) == null ? void 0 : _a[0];
      if (!file) return;
      readJsonFile(file, async (data) => {
        await this.store.importData(data);
        new import_obsidian64.Notice("\u914D\u7F6E\u5DF2\u5BFC\u5165\u3002");
        this.onDataChanged();
      });
    });
    const exportButton = actions.createEl("button", { attr: { type: "button" } });
    (0, import_obsidian64.setIcon)(exportButton.createSpan(), "download");
    exportButton.createSpan({ text: "\u5BFC\u51FA\u914D\u7F6E" });
    exportButton.addEventListener("click", () => {
      downloadJson("cute-obsidian-workbench-config.json", this.store.exportData());
    });
    const resetButton = actions.createEl("button", { cls: "mod-warning", attr: { type: "button" } });
    (0, import_obsidian64.setIcon)(resetButton.createSpan(), "rotate-ccw");
    resetButton.createSpan({ text: "\u6062\u590D\u9ED8\u8BA4" });
    resetButton.addEventListener("click", () => {
      new ResetDefaultsModal(this.app, async () => {
        await this.store.resetToDefaults();
        this.onDataChanged();
      }).open();
    });
  }
};

// src/components/QuickCreateModal.ts
var import_obsidian65 = require("obsidian");
var QuickCreateModal = class extends import_obsidian65.Modal {
  constructor(app, store, getCurrentPage, onDataChanged) {
    super(app);
    this.store = store;
    this.getCurrentPage = getCurrentPage;
    this.onDataChanged = onDataChanged;
    this.notes = new NoteService(app);
  }
  onOpen() {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "\u5FEB\u901F\u521B\u5EFA" });
    this.contentEl.createEl("p", { text: "\u9009\u62E9\u4E00\u4E2A\u5165\u53E3\uFF0C\u9A6C\u4E0A\u5F00\u59CB\u8BB0\u5F55\u3002" });
    const grid = this.contentEl.createDiv({ cls: "cow-quick-create-grid" });
    this.renderAction(grid, "\u65B0\u5EFA\u7B14\u8BB0", "file-plus", async () => {
      await this.notes.createNote();
    });
    this.renderAction(grid, "\u6253\u5F00/\u521B\u5EFA\u4ECA\u65E5\u7B14\u8BB0", "calendar-days", async () => {
      await this.notes.openOrCreateDailyNote(/* @__PURE__ */ new Date());
    });
    this.renderAction(grid, "\u6DFB\u52A0\u4EFB\u52A1", "list-plus", async () => {
      await this.store.addTodayFocusTask("\u65B0\u7684\u5F85\u529E\u4EFB\u52A1");
      this.onDataChanged();
      new import_obsidian65.Notice("\u5DF2\u6DFB\u52A0\u5230\u4ECA\u65E5\u7126\u70B9\u3002");
    });
    this.renderAction(grid, "\u6DFB\u52A0\u6253\u5361\u9879\u76EE", "badge-plus", async () => {
      await this.store.addCustomHabit("\u65B0\u7684\u6253\u5361");
      this.onDataChanged();
      new import_obsidian65.Notice("\u5DF2\u6DFB\u52A0\u6253\u5361\u9879\u76EE\uFF0C\u53EF\u5728\u6A21\u5757\u7BA1\u7406\u4E2D\u7F16\u8F91\u3002");
    });
    this.renderAction(grid, "\u6DFB\u52A0\u529F\u80FD\u5206\u533A", "layout-grid", async () => {
      this.close();
      this.openAddSectionModal();
    }, false);
  }
  renderAction(container, label, icon, action, closeAfter = true) {
    const button = container.createEl("button", { cls: "cow-quick-create-card", attr: { type: "button" } });
    (0, import_obsidian65.setIcon)(button.createSpan(), icon);
    button.createSpan({ text: label });
    button.addEventListener("click", async () => {
      await action();
      if (closeAfter) this.close();
    });
  }
  openAddSectionModal() {
    const page = this.getCurrentPage();
    new AddSectionModal(this.app, page, this.store.getAvailableModules(page), async (moduleType) => {
      await this.store.addSection(page, moduleType);
      this.onDataChanged();
    }).open();
  }
};

// src/components/WorkbenchCustomizeModal.ts
var import_obsidian66 = require("obsidian");
var WorkbenchCustomizeModal = class extends import_obsidian66.Modal {
  constructor(app, store, getCurrentPage, onDataChanged) {
    var _a;
    super(app);
    this.store = store;
    this.getCurrentPage = getCurrentPage;
    this.onDataChanged = onDataChanged;
    const banner = this.store.getData().banner;
    this.titleValue = banner.message;
    this.subtitleValue = (_a = banner.subtitle) != null ? _a : "\u628A\u60F3\u6CD5\u53D8\u6210\u884C\u52A8\uFF0C\u8BA9\u6BCF\u4E00\u5929\u90FD\u66F4\u9760\u8FD1\u7406\u60F3\u7684\u81EA\u5DF1\u3002";
  }
  onOpen() {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "\u81EA\u5B9A\u4E49\u5DE5\u4F5C\u53F0" });
    this.contentEl.createEl("p", { text: "\u8C03\u6574 Banner \u548C\u5F53\u524D\u9875\u9762\u5165\u53E3\u3002" });
    const backgrounds = [
      { id: "pink-paper", label: "\u7C89\u8272\u7EB8\u5F20" },
      { id: "cream-stars", label: "\u5976\u6CB9\u661F\u661F" },
      { id: "soft-hearts", label: "\u67D4\u548C\u7231\u5FC3" }
    ];
    const choices = this.contentEl.createDiv({ cls: "cow-background-choice-grid" });
    backgrounds.forEach((background) => {
      const button = choices.createEl("button", {
        cls: this.store.getData().banner.background === background.id ? "is-active" : "",
        attr: { type: "button" }
      });
      (0, import_obsidian66.setIcon)(button.createSpan(), "image");
      button.createSpan({ text: background.label });
      button.addEventListener("click", async () => {
        await this.store.updateBanner({ background: background.id, imageDataUrl: void 0 });
        this.onDataChanged();
        this.close();
      });
    });
    const fileInput = this.contentEl.createEl("input", {
      cls: "cow-hidden-input",
      attr: { type: "file", accept: "image/*" }
    });
    fileInput.addEventListener("change", async () => {
      var _a;
      const file = (_a = fileInput.files) == null ? void 0 : _a[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async () => {
        await this.store.updateBanner({ background: "local-image", imageDataUrl: String(reader.result) });
        this.onDataChanged();
        this.close();
      };
      reader.readAsDataURL(file);
    });
    new import_obsidian66.Setting(this.contentEl).setName("\u672C\u5730\u56FE\u7247").setDesc("\u4FDD\u5B58\u4E3A data URL\uFF0CBRAT \u5B89\u88C5\u540E\u4E0D\u4F9D\u8D56\u989D\u5916\u8D44\u6E90\u8DEF\u5F84\u3002").addButton((button) => button.setButtonText("\u9009\u62E9\u56FE\u7247").onClick(() => fileInput.click()));
    new import_obsidian66.Setting(this.contentEl).setName("\u5DE6\u4FA7\u5934\u50CF").setDesc("\u9009\u62E9\u9884\u8BBE\u56FE\u6807\u6216\u4E0A\u4F20\u56FE\u7247\uFF0C\u5237\u65B0\u540E\u4ECD\u4FDD\u7559\u3002").addButton((button) => button.setButtonText("\u4FEE\u6539\u5DE6\u4FA7\u5934\u50CF").onClick(() => {
      const current = this.store.getData().banner.sidebarAvatar;
      new AvatarPickerModal(this.app, "\u4FEE\u6539\u5DE6\u4FA7\u5934\u50CF", current, async (avatar) => {
        await this.store.updateSidebarAvatar(avatar);
        this.onDataChanged();
      }).open();
    }));
    new import_obsidian66.Setting(this.contentEl).setName("Banner \u56FE\u6807").setDesc("\u9009\u62E9 Banner \u5DE6\u4FA7\u663E\u793A\u7684\u53EF\u7231\u56FE\u6807\u3002").addButton((button) => button.setButtonText("\u4FEE\u6539 Banner \u56FE\u6807").onClick(() => {
      const current = this.store.getData().banner.bannerAvatar;
      new AvatarPickerModal(this.app, "\u4FEE\u6539 Banner \u56FE\u6807", current, async (avatar) => {
        await this.store.updateBannerAvatar(avatar);
        this.onDataChanged();
      }).open();
    }));
    new import_obsidian66.Setting(this.contentEl).setName("Banner \u4E3B\u6807\u9898").addText((text) => text.setValue(this.titleValue).onChange((value) => {
      this.titleValue = value;
    }));
    new import_obsidian66.Setting(this.contentEl).setName("Banner \u526F\u6807\u9898").addText((text) => text.setValue(this.subtitleValue).onChange((value) => {
      this.subtitleValue = value;
    }));
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    const addSection = actions.createEl("button", { attr: { type: "button" } });
    (0, import_obsidian66.setIcon)(addSection.createSpan(), "plus");
    addSection.createSpan({ text: "\u6DFB\u52A0\u5F53\u524D\u9875\u9762\u529F\u80FD\u5206\u533A" });
    addSection.addEventListener("click", () => {
      this.close();
      this.openAddSectionModal();
    });
    const save = actions.createEl("button", { cls: "mod-cta", text: "\u4FDD\u5B58", attr: { type: "button" } });
    save.addEventListener("click", async () => {
      await this.store.updateBanner({
        message: this.titleValue.trim() || "\u4ECA\u5929\u4E5F\u8981\u53EF\u7231\u5730\u63A8\u8FDB\u4E00\u70B9\u70B9",
        subtitle: this.subtitleValue.trim() || "\u628A\u60F3\u6CD5\u53D8\u6210\u884C\u52A8\uFF0C\u8BA9\u6BCF\u4E00\u5929\u90FD\u66F4\u9760\u8FD1\u7406\u60F3\u7684\u81EA\u5DF1\u3002"
      });
      this.onDataChanged();
      new import_obsidian66.Notice("Banner \u6587\u6848\u5DF2\u4FDD\u5B58\u3002");
      this.close();
    });
  }
  openAddSectionModal() {
    const page = this.getCurrentPage();
    new AddSectionModal(this.app, page, this.store.getAvailableModules(page), async (moduleType) => {
      await this.store.addSection(page, moduleType);
      this.onDataChanged();
    }).open();
  }
};

// src/components/DayDetailModal.ts
var import_obsidian67 = require("obsidian");
var DayDetailModal = class extends import_obsidian67.Modal {
  constructor(app, store, date) {
    super(app);
    this.store = store;
    this.date = date;
    this.calendar = new CalendarService();
    this.holidays = new HolidayService();
    this.notes = new NoteService(app);
  }
  onOpen() {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    const dateKey = this.calendar.getDateKey(this.date);
    const holidays = this.holidays.getHolidays(this.date);
    const dailyNote = this.notes.getDailyNote(this.date);
    const isToday = this.calendar.isSameDate(this.date, /* @__PURE__ */ new Date());
    this.contentEl.createEl("h2", { text: dateKey });
    this.contentEl.createEl("p", {
      text: `${this.calendar.getWeekdayLabel(this.date)}${holidays.length > 0 ? ` \xB7 ${holidays.map((holiday) => holiday.name).join(" / ")}` : " \xB7 \u6682\u65E0\u8282\u65E5"}`
    });
    this.contentEl.createEl("h3", { text: "\u5F53\u5929\u5F85\u529E" });
    const taskList = this.contentEl.createEl("ul", { cls: "cow-day-detail-list" });
    const tasks = isToday ? this.store.getTodayFocusTasks() : [];
    if (tasks.length === 0) {
      taskList.createEl("li", { text: "\u6682\u65E0\u5F85\u529E\u3002" });
    } else {
      tasks.forEach((task) => {
        taskList.createEl("li", { text: `${task.completed ? "\u2713" : "\u25CB"} ${task.category} \xB7 ${task.label}` });
      });
    }
    this.contentEl.createEl("h3", { text: "\u5F53\u5929\u7B14\u8BB0" });
    const noteRow = this.contentEl.createDiv({ cls: "cow-day-note-row" });
    noteRow.createSpan({ text: dailyNote ? dailyNote.path : "\u8FD8\u6CA1\u6709\u6BCF\u65E5\u7B14\u8BB0\u3002" });
    const button = noteRow.createEl("button", { attr: { type: "button" } });
    (0, import_obsidian67.setIcon)(button.createSpan(), dailyNote ? "file-text" : "file-plus");
    button.createSpan({ text: dailyNote ? "\u6253\u5F00\u6BCF\u65E5\u7B14\u8BB0" : "\u521B\u5EFA\u6BCF\u65E5\u7B14\u8BB0" });
    button.addEventListener("click", async () => {
      await this.notes.openOrCreateDailyNote(this.date);
      this.close();
    });
  }
};

// src/components/NotesManagerModal.ts
var import_obsidian68 = require("obsidian");
var NotesManagerModal = class extends import_obsidian68.Modal {
  constructor(app) {
    super(app);
    this.searchValue = "";
    this.notes = new NoteService(app);
  }
  onOpen() {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-notes-manager-modal");
    const header = this.contentEl.createDiv({ cls: "cow-notes-manager-header" });
    header.createEl("h2", { text: "\u7B14\u8BB0\u7BA1\u7406" });
    header.createEl("p", { text: "\u8F7B\u91CF\u67E5\u770B\u6700\u8FD1 Markdown \u7B14\u8BB0\uFF0C\u70B9\u51FB\u5373\u53EF\u6253\u5F00\u3002" });
    const searchWrap = this.contentEl.createDiv({ cls: "cow-notes-manager-search" });
    const search = searchWrap.createEl("input", {
      cls: "cow-notes-search",
      attr: { type: "search", placeholder: "\u641C\u7D22\u6587\u4EF6\u540D\u6216\u8DEF\u5F84" }
    });
    search.addEventListener("input", () => {
      this.searchValue = search.value.trim().toLowerCase();
      this.renderList();
    });
    this.listEl = this.contentEl.createDiv({ cls: "cow-notes-manager-list" });
    this.renderList();
  }
  renderList() {
    if (!this.listEl) return;
    this.listEl.empty();
    const files = this.notes.getRecentMarkdownFiles(80).filter((file) => this.matchesSearch(file)).slice(0, 20);
    if (files.length === 0) {
      this.listEl.createEl("p", { text: "\u6CA1\u6709\u627E\u5230\u5339\u914D\u7B14\u8BB0\u3002" });
      return;
    }
    files.forEach((file) => {
      const button = this.listEl.createEl("button", { cls: "cow-note-manager-item", attr: { type: "button" } });
      const body = button.createDiv({ cls: "cow-note-manager-body" });
      body.createEl("strong", { text: file.basename });
      body.createEl("span", { text: file.path });
      button.createEl("time", { text: new Date(file.stat.mtime).toLocaleString("zh-CN") });
      button.addEventListener("click", async () => {
        await this.app.workspace.getLeaf(false).openFile(file);
        this.close();
      });
    });
  }
  matchesSearch(file) {
    if (!this.searchValue) return true;
    return file.basename.toLowerCase().includes(this.searchValue) || file.path.toLowerCase().includes(this.searchValue);
  }
};

// src/views/WorkbenchView.ts
var WORKBENCH_VIEW_TYPE = "cute-obsidian-workbench-view";
var WorkbenchView = class extends import_obsidian69.ItemView {
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
      { label: "\u6BCF\u65E5\u7B14\u8BB0", icon: "calendar-days", onClick: () => void new NoteService(this.app).openOrCreateDailyNote(/* @__PURE__ */ new Date()) },
      { label: "\u7B14\u8BB0\u7BA1\u7406", icon: "notebook-tabs", onClick: () => new NotesManagerModal(this.app).open() },
      { label: "\u5168\u90E8\u6587\u4EF6", icon: "files", onClick: () => this.openFileExplorer() },
      { label: "\u6A21\u5757\u7BA1\u7406", icon: "layout-grid", onClick: () => this.router.navigate("modules") }
    ], () => {
      new QuickCreateModal(this.app, this.plugin.store, () => this.router.getCurrentPage(), () => this.render()).open();
    }, (date) => {
      new DayDetailModal(this.app, this.plugin.store, date).open();
    }, this.plugin.store.getData.bind(this.plugin.store), () => this.openAvatarPicker("sidebar"));
    this.sidebar.render(shell);
    const main = shell.createDiv({ cls: "cow-main" });
    new TopBanner(this.plugin.store.getData.bind(this.plugin.store), () => {
      new WorkbenchCustomizeModal(this.app, this.plugin.store, () => this.router.getCurrentPage(), () => this.render()).open();
    }, () => this.openAvatarPicker("banner")).render(main);
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
  openFileExplorer() {
    var _a;
    const didRun = (_a = this.app.commands) == null ? void 0 : _a.executeCommandById("file-explorer:open");
    if (!didRun) {
      new import_obsidian69.Notice("\u672A\u80FD\u6FC0\u6D3B Obsidian \u6587\u4EF6\u7BA1\u7406\u5668\u3002");
    }
  }
  openAvatarPicker(target) {
    const banner = this.plugin.store.getData().banner;
    new AvatarPickerModal(
      this.app,
      target === "sidebar" ? "\u4FEE\u6539\u5DE6\u4FA7\u5934\u50CF" : "\u4FEE\u6539 Banner \u56FE\u6807",
      target === "sidebar" ? banner.sidebarAvatar : banner.bannerAvatar,
      async (avatar) => {
        if (target === "sidebar") {
          await this.plugin.store.updateSidebarAvatar(avatar);
        } else {
          await this.plugin.store.updateBannerAvatar(avatar);
        }
        this.render();
      }
    ).open();
  }
};

// src/main.ts
var CuteObsidianWorkbenchPlugin = class extends import_obsidian70.Plugin {
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

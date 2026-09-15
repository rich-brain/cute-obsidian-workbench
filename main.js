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
var import_obsidian75 = require("obsidian");

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
  { type: "water-sleep-habits", title: "\u4E60\u60EF", description: "\u996E\u6C34\u3001\u7761\u7720\u548C\u81EA\u5B9A\u4E49\u5065\u5EB7\u4E60\u60EF\u3002", page: "fitness", icon: "moon", defaultWidth: "md" },
  { type: "fitness-stats", title: "\u70ED\u91CF\u6D88\u8017\u4E0E\u8FD0\u52A8\u65F6\u957F", description: "\u7EDF\u8BA1\u672C\u5468\u8FD0\u52A8\u91CF\u3002", page: "fitness", icon: "flame", defaultWidth: "md" },
  { type: "workout-log", title: "\u8FD0\u52A8\u65E5\u5FD7", description: "\u6700\u8FD1\u5B8C\u6210\u7684\u8BAD\u7EC3\u8BB0\u5F55\u3002", page: "fitness", icon: "notebook-text", defaultWidth: "md" },
  { type: "fitness-goals", title: "\u5065\u8EAB\u76EE\u6807\u8FDB\u5EA6", description: "\u8FFD\u8E2A\u5065\u8EAB\u76EE\u6807\u5B8C\u6210\u5EA6\u3002", page: "fitness", icon: "target", defaultWidth: "md" },
  { type: "health-reminders", title: "\u5065\u5EB7\u63D0\u9192", description: "\u6062\u590D\u3001\u70ED\u8EAB\u548C\u4F11\u606F\u63D0\u9192\u3002", page: "fitness", icon: "bell-ring", defaultWidth: "md" },
  { type: "fitness-heatmap", title: "\u6708\u5EA6\u8FD0\u52A8\u70ED\u529B\u56FE", description: "\u6309\u65E5\u5C55\u793A\u8FD0\u52A8\u6D3B\u8DC3\u5EA6\u3002", page: "fitness", icon: "activity", defaultWidth: "md" },
  { type: "monthly-budget", title: "\u672C\u6708\u9884\u7B97", description: "\u9884\u7B97\u3001\u652F\u51FA\u548C\u5269\u4F59\u989D\u5EA6\u3002", page: "finance", icon: "wallet-cards", defaultWidth: "md" },
  { type: "finance-ledger", title: "\u8BB0\u8D26", description: "\u5FEB\u901F\u8BB0\u5F55\u6BCF\u65E5\u6536\u5165\u4E0E\u652F\u51FA\u3002", page: "finance", icon: "circle-plus", defaultWidth: "md" },
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
function nowIso() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
function todayKey() {
  return formatDateKey(/* @__PURE__ */ new Date());
}
var DEFAULT_DATA = {
  dataVersion: "0.3.6",
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
    createSection("fitness", "water-sleep-habits", "\u4E60\u60EF", 60),
    createSection("fitness", "fitness-stats", "\u70ED\u91CF\u6D88\u8017\u4E0E\u8FD0\u52A8\u65F6\u957F", 70),
    createSection("fitness", "workout-log", "\u8FD0\u52A8\u65E5\u5FD7", 80),
    createSection("fitness", "fitness-goals", "\u5065\u8EAB\u76EE\u6807\u8FDB\u5EA6", 90),
    createSection("fitness", "health-reminders", "\u5065\u5EB7\u63D0\u9192", 100),
    createSection("fitness", "fitness-heatmap", "\u6708\u5EA6\u8FD0\u52A8\u70ED\u529B\u56FE", 110),
    createSection("finance", "monthly-budget", "\u672C\u6708\u9884\u7B97", 10),
    createSection("finance", "finance-ledger", "\u8BB0\u8D26", 20),
    createSection("finance", "expense-categories", "\u652F\u51FA\u5206\u7C7B", 30),
    createSection("finance", "account-overview", "\u8D26\u6237\u603B\u89C8", 40),
    createSection("finance", "saving-goals", "\u50A8\u84C4\u76EE\u6807", 50),
    createSection("finance", "bill-reminders", "\u8D26\u5355\u63D0\u9192", 60),
    createSection("finance", "finance-checkin", "\u672C\u5468\u7406\u8D22\u6253\u5361", 70),
    createSection("finance", "income-expense-trend", "\u6536\u652F\u8D8B\u52BF", 80),
    createSection("finance", "finance-todos", "\u672C\u6708\u8BB0\u8D26\u5F85\u529E", 90),
    createSection("finance", "investment-watch", "\u6295\u8D44\u89C2\u5BDF", 100),
    createSection("finance", "expense-heatmap", "\u6708\u5EA6\u652F\u51FA\u70ED\u529B\u56FE", 110),
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
    { id: "measure-2026-09-01", date: "2026-09-01", weight: 58.8, bmi: 21.6, waist: 70, chest: 84, hip: 91, note: "", createdAt: "2026-09-01T08:00:00.000Z", updatedAt: "2026-09-01T08:00:00.000Z" },
    { id: "measure-2026-09-08", date: "2026-09-08", weight: 58.2, bmi: 21.4, waist: 69, chest: 84, hip: 90, note: "", createdAt: "2026-09-08T08:00:00.000Z", updatedAt: "2026-09-08T08:00:00.000Z" },
    { id: "measure-2026-09-14", date: "2026-09-14", weight: 57.9, bmi: 21.3, waist: 68, chest: 84, hip: 90, note: "", createdAt: "2026-09-14T08:00:00.000Z", updatedAt: "2026-09-14T08:00:00.000Z" }
  ],
  fitnessGoals: [
    { id: "fitness-goal-weight", title: "\u7A33\u5B9A\u4F53\u91CD", currentValue: 57.9, targetValue: 56.5, unit: "kg", startDate: "2026-09-01", deadline: "2026-12-31", status: "active", createdAt: "2026-09-01T08:00:00.000Z", updatedAt: "2026-09-14T08:00:00.000Z" },
    { id: "fitness-goal-cardio", title: "\u672C\u6708\u6709\u6C27", currentValue: 210, targetValue: 600, unit: "min", startDate: "2026-09-01", deadline: "2026-09-30", status: "active", createdAt: "2026-09-01T08:00:00.000Z", updatedAt: "2026-09-14T08:00:00.000Z" },
    { id: "fitness-goal-strength", title: "\u529B\u91CF\u8BAD\u7EC3", currentValue: 6, targetValue: 12, unit: "\u6B21", startDate: "2026-09-01", deadline: "2026-09-30", status: "active", createdAt: "2026-09-01T08:00:00.000Z", updatedAt: "2026-09-14T08:00:00.000Z" }
  ],
  healthReminders: [
    { id: "health-warmup", title: "\u8BAD\u7EC3\u524D\u70ED\u8EAB 8 \u5206\u949F\u3002", date: "2026-09-14", time: "18:30", repeatType: "once", repeatDays: [], note: "", enabled: true, createdAt: "2026-09-14T08:00:00.000Z", updatedAt: "2026-09-14T08:00:00.000Z" },
    { id: "health-stand", title: "\u4E45\u5750 50 \u5206\u949F\u540E\u8D77\u8EAB\u6D3B\u52A8\u3002", date: "2026-09-14", time: "15:30", repeatType: "daily", repeatDays: [], note: "", enabled: true, createdAt: "2026-09-14T08:00:00.000Z", updatedAt: "2026-09-14T08:00:00.000Z" },
    { id: "health-protein", title: "\u529B\u91CF\u65E5\u540E\u8865\u5145\u86CB\u767D\u8D28\u548C\u7761\u7720\u3002", date: "2026-09-14", time: "20:30", repeatType: "once", repeatDays: [], note: "", enabled: true, createdAt: "2026-09-14T08:00:00.000Z", updatedAt: "2026-09-14T08:00:00.000Z" },
    { id: "health-recovery", title: "\u72B6\u6001\u5DEE\u65F6\u5141\u8BB8\u964D\u5F3A\u5EA6\uFF0C\u4E0D\u786C\u625B\u3002", date: "2026-09-14", time: "21:30", repeatType: "daily", repeatDays: [], note: "", enabled: true, createdAt: "2026-09-14T08:00:00.000Z", updatedAt: "2026-09-14T08:00:00.000Z" }
  ],
  healthReminderLogs: [],
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
  goalActions: [],
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
    { date: "2026-09-14", waterCups: 5, waterGoal: 8, waterNote: "", sleepHours: 7, sleepGoal: 8, bedtime: "23:30", wakeTime: "07:00", sleepNote: "", updatedAt: "2026-09-14T08:00:00.000Z" }
  ],
  fitnessHabitDefinitions: [
    { id: "fitness-habit-steps", name: "\u6B65\u6570", targetName: "\u6BCF\u65E5\u6B65\u6570\u76EE\u6807", targetValue: 1e4, unit: "\u6B65", order: 10, createdAt: "2026-09-14T08:00:00.000Z", updatedAt: "2026-09-14T08:00:00.000Z" }
  ],
  fitnessHabitRecords: [
    { date: "2026-09-14", habitId: "fitness-habit-steps", actualValue: 8530, note: "", updatedAt: "2026-09-14T08:00:00.000Z" }
  ],
  investmentWatchItems: [
    { id: "watch-hs300", name: "\u6CAA\u6DF1300", code: "CSI300", price: 3800, changePercent: 0.8, type: "\u6307\u6570" },
    { id: "watch-btc", name: "\u6BD4\u7279\u5E01", code: "BTC", price: 65e3, changePercent: -1.2, type: "\u52A0\u5BC6\u8D44\u4EA7" },
    { id: "watch-gold", name: "\u9EC4\u91D1", code: "XAU", price: 2380, changePercent: 0.3, type: "\u5546\u54C1" }
  ],
  investmentSnapshots: [
    { id: "snapshot-watch-hs300-2026-09-14", investmentId: "watch-hs300", date: "2026-09-14", price: 3800, changePercent: 0.8, note: "", createdAt: "2026-09-14T08:00:00.000Z" },
    { id: "snapshot-watch-btc-2026-09-14", investmentId: "watch-btc", date: "2026-09-14", price: 65e3, changePercent: -1.2, note: "", createdAt: "2026-09-14T08:00:00.000Z" },
    { id: "snapshot-watch-gold-2026-09-14", investmentId: "watch-gold", date: "2026-09-14", price: 2380, changePercent: 0.3, note: "", createdAt: "2026-09-14T08:00:00.000Z" }
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
    const today5 = formatDateKey(/* @__PURE__ */ new Date());
    return this.getFocusRecords().filter((record) => record.date === today5);
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
  async startFocusSession(task = "", durationMinutes = this.data.focusSettings.focusDuration, background = ((_a) => (_a = this.data.focusSettings.defaultBackground) != null ? _a : "pink")(), backgroundDataUrl) {
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
      backgroundDataUrl,
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
  async endFocusSession(completed = false, saveRecord = true) {
    const state = this.resolveFocusState();
    if (saveRecord && state.mode === "focus") {
      this.pushFocusRecord(state, completed);
    }
    this.data.focusState = {
      isRunning: false,
      isPaused: false,
      mode: "focus",
      remainingSeconds: this.data.focusSettings.focusDuration * 60
    };
    await this.save();
  }
  async updateFocusRecord(recordId, updates) {
    var _a, _b, _c, _d, _e;
    const record = this.data.focusRecords.find((item) => item.id === recordId);
    if (!record) return;
    Object.assign(record, updates);
    record.duration = (_c = (_b = (_a = updates.actualDurationMinutes) != null ? _a : updates.duration) != null ? _b : record.actualDurationMinutes) != null ? _c : record.duration;
    record.actualDurationMinutes = record.duration;
    record.plannedDuration = (_e = (_d = updates.plannedDurationMinutes) != null ? _d : updates.plannedDuration) != null ? _e : record.plannedDuration;
    record.plannedDurationMinutes = record.plannedDuration;
    await this.save();
  }
  async deleteFocusRecord(recordId) {
    this.data.focusRecords = this.data.focusRecords.filter((record) => record.id !== recordId);
    await this.save();
  }
  async completeCurrentFocusPhase() {
    const state = this.resolveFocusState();
    if (state.mode === "focus") {
      this.pushFocusRecord(state, true);
      this.data.focusState = {
        isRunning: this.data.focusSettings.autoStartBreak,
        isPaused: !this.data.focusSettings.autoStartBreak,
        mode: "break",
        startedAt: this.data.focusSettings.autoStartBreak ? (/* @__PURE__ */ new Date()).toISOString() : void 0,
        remainingSeconds: this.data.focusSettings.breakDuration * 60,
        currentTask: state.currentTask,
        background: state.background,
        backgroundDataUrl: state.backgroundDataUrl,
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
        backgroundDataUrl: state.backgroundDataUrl,
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
  pushFocusRecord(state, completed) {
    var _a, _b;
    const plannedDuration = (_a = state.plannedDuration) != null ? _a : this.data.focusSettings.focusDuration;
    const elapsedMinutes = Math.max(0, Math.ceil((plannedDuration * 60 - state.remainingSeconds) / 60));
    const actualDuration = completed ? plannedDuration : elapsedMinutes;
    if (actualDuration <= 0) return;
    const endedAt = (/* @__PURE__ */ new Date()).toISOString();
    this.data.focusRecords.push({
      id: `focus-record-${Date.now()}`,
      date: formatDateKey(/* @__PURE__ */ new Date()),
      task: ((_b = state.currentTask) == null ? void 0 : _b.trim()) || "\u4E13\u6CE8",
      duration: actualDuration,
      actualDurationMinutes: actualDuration,
      completed,
      createdAt: endedAt,
      startedAt: state.startedAt,
      endedAt,
      plannedDuration,
      plannedDurationMinutes: plannedDuration,
      background: state.background,
      backgroundDataUrl: state.backgroundDataUrl
    });
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
    var _a, _b;
    const timestamp = nowIso();
    this.data.bodyMeasurements.push({
      ...measurement,
      id: (_a = measurement.id) != null ? _a : `measure-${Date.now()}`,
      createdAt: (_b = measurement.createdAt) != null ? _b : timestamp,
      updatedAt: timestamp
    });
    this.data.bodyMeasurements.sort((left, right) => left.date.localeCompare(right.date));
    await this.save();
  }
  async updateBodyMeasurement(measurementId, updates) {
    const measurement = this.data.bodyMeasurements.find((item) => {
      var _a;
      return ((_a = item.id) != null ? _a : item.date) === measurementId;
    });
    if (!measurement) return;
    Object.assign(measurement, updates, { updatedAt: nowIso() });
    await this.save();
  }
  async upsertBodyMeasurementForDate(measurement) {
    var _a;
    const existing = this.data.bodyMeasurements.find((item) => item.date === measurement.date);
    if (existing) {
      await this.updateBodyMeasurement((_a = existing.id) != null ? _a : existing.date, measurement);
      return;
    }
    await this.addBodyMeasurement(measurement);
  }
  async deleteBodyMeasurement(measurementId) {
    this.data.bodyMeasurements = this.data.bodyMeasurements.filter((item) => {
      var _a;
      return ((_a = item.id) != null ? _a : item.date) !== measurementId;
    });
    await this.save();
  }
  getFitnessDailyRecord(date = formatDateKey(/* @__PURE__ */ new Date())) {
    const record = this.data.fitnessDailyRecords.find((item) => item.date === date);
    return record != null ? record : { date, waterCups: 0, waterGoal: 8, waterNote: "", sleepHours: 0, sleepGoal: 8, bedtime: "", wakeTime: "", sleepNote: "" };
  }
  async updateFitnessDailyRecord(date, updates) {
    let record = this.data.fitnessDailyRecords.find((item) => item.date === date);
    if (!record) {
      record = this.getFitnessDailyRecord(date);
      this.data.fitnessDailyRecords.push(record);
    }
    Object.assign(record, updates, { date, updatedAt: nowIso() });
    await this.save();
  }
  getFitnessHabitDefinitions() {
    return [...this.data.fitnessHabitDefinitions].sort((left, right) => left.order - right.order);
  }
  getFitnessHabitRecords(date) {
    return date ? this.data.fitnessHabitRecords.filter((item) => item.date === date) : this.data.fitnessHabitRecords;
  }
  async addFitnessHabitDefinition(definition) {
    const timestamp = nowIso();
    const maxOrder = Math.max(0, ...this.data.fitnessHabitDefinitions.map((item) => item.order));
    this.data.fitnessHabitDefinitions.push({
      ...definition,
      id: `fitness-habit-${Date.now()}`,
      order: maxOrder + 10,
      createdAt: timestamp,
      updatedAt: timestamp
    });
    await this.save();
  }
  async updateFitnessHabitDefinition(definitionId, updates) {
    const definition = this.data.fitnessHabitDefinitions.find((item) => item.id === definitionId);
    if (!definition) return;
    Object.assign(definition, updates, { updatedAt: nowIso() });
    await this.save();
  }
  async deleteFitnessHabitDefinition(definitionId) {
    this.data.fitnessHabitDefinitions = this.data.fitnessHabitDefinitions.filter((item) => item.id !== definitionId);
    this.data.fitnessHabitRecords = this.data.fitnessHabitRecords.filter((item) => item.habitId !== definitionId);
    await this.save();
  }
  async moveFitnessHabitDefinition(definitionId, direction) {
    const definitions = this.getFitnessHabitDefinitions();
    const index = definitions.findIndex((item) => item.id === definitionId);
    const nextIndex = index + direction;
    if (index < 0 || nextIndex < 0 || nextIndex >= definitions.length) return;
    const currentOrder = definitions[index].order;
    definitions[index].order = definitions[nextIndex].order;
    definitions[nextIndex].order = currentOrder;
    await this.save();
  }
  async updateFitnessHabitRecord(date, habitId, updates) {
    let record = this.data.fitnessHabitRecords.find((item) => item.date === date && item.habitId === habitId);
    if (!record) {
      record = { date, habitId, actualValue: 0, note: "", updatedAt: nowIso() };
      this.data.fitnessHabitRecords.push(record);
    }
    Object.assign(record, updates, { date, habitId, updatedAt: nowIso() });
    await this.save();
  }
  getFitnessGoals() {
    return this.data.fitnessGoals;
  }
  async addFitnessGoal(goal) {
    var _a, _b, _c, _d, _e, _f, _g;
    const timestamp = nowIso();
    this.data.fitnessGoals.push({
      ...goal,
      currentValue: (_b = (_a = goal.currentValue) != null ? _a : goal.current) != null ? _b : 0,
      targetValue: (_d = (_c = goal.targetValue) != null ? _c : goal.target) != null ? _d : 0,
      startDate: (_e = goal.startDate) != null ? _e : todayKey(),
      status: (_f = goal.status) != null ? _f : "active",
      createdAt: (_g = goal.createdAt) != null ? _g : timestamp,
      updatedAt: timestamp
    });
    await this.save();
  }
  async updateFitnessGoal(goalId, updates) {
    const goal = this.data.fitnessGoals.find((item) => item.id === goalId);
    if (!goal) return;
    Object.assign(goal, updates, { updatedAt: nowIso() });
    await this.save();
  }
  async completeFitnessGoal(goalId) {
    var _a, _b, _c, _d;
    const goal = this.data.fitnessGoals.find((item) => item.id === goalId);
    if (!goal) return;
    Object.assign(goal, {
      status: "completed",
      completedDate: todayKey(),
      currentValue: (_d = (_c = (_b = (_a = goal.targetValue) != null ? _a : goal.target) != null ? _b : goal.currentValue) != null ? _c : goal.current) != null ? _d : 0,
      updatedAt: nowIso()
    });
    await this.save();
  }
  async deleteFitnessGoal(goalId) {
    this.data.fitnessGoals = this.data.fitnessGoals.filter((item) => item.id !== goalId);
    await this.save();
  }
  getHealthReminders() {
    return this.data.healthReminders;
  }
  async addHealthReminder(reminder) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const timestamp = nowIso();
    const reminderData = typeof reminder === "string" ? { title: reminder } : reminder;
    this.data.healthReminders.push({
      id: (_a = reminderData.id) != null ? _a : `health-${Date.now()}`,
      title: reminderData.title,
      date: (_b = reminderData.date) != null ? _b : todayKey(),
      time: (_c = reminderData.time) != null ? _c : "09:00",
      repeatType: (_d = reminderData.repeatType) != null ? _d : "once",
      repeatDays: (_e = reminderData.repeatDays) != null ? _e : [],
      note: (_f = reminderData.note) != null ? _f : "",
      enabled: (_g = reminderData.enabled) != null ? _g : true,
      createdAt: (_h = reminderData.createdAt) != null ? _h : timestamp,
      updatedAt: timestamp
    });
    await this.save();
  }
  async updateHealthReminder(reminderId, updates) {
    const reminder = this.data.healthReminders.find((item) => item.id === reminderId);
    if (!reminder) return;
    if (typeof updates === "string") {
      reminder.title = updates;
    } else {
      Object.assign(reminder, updates);
    }
    reminder.updatedAt = nowIso();
    await this.save();
  }
  async deleteHealthReminder(reminderId) {
    this.data.healthReminders = this.data.healthReminders.filter((item) => item.id !== reminderId);
    await this.save();
  }
  getHealthReminderLogs() {
    return this.data.healthReminderLogs;
  }
  async addHealthReminderLog(log) {
    if (this.data.healthReminderLogs.some((item) => item.id === log.id)) return;
    this.data.healthReminderLogs.push(log);
    await this.save();
  }
  async updateHealthReminderLog(logId, updates) {
    const log = this.data.healthReminderLogs.find((item) => item.id === logId);
    if (!log) return;
    Object.assign(log, updates);
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
    const delta = amount - currentTotal;
    budget.amount = budget.amount + delta;
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
    var _a;
    this.data.investmentWatchItems.push(item);
    await this.addInvestmentSnapshot({
      id: `snapshot-${item.id}-${Date.now()}`,
      investmentId: item.id,
      date: todayKey(),
      price: item.price,
      changePercent: item.changePercent,
      note: (_a = item.note) != null ? _a : "",
      createdAt: nowIso()
    }, false);
    await this.save();
  }
  async updateInvestmentWatchItem(itemId, updates) {
    var _a;
    const item = this.data.investmentWatchItems.find((entry) => entry.id === itemId);
    if (!item) return;
    Object.assign(item, updates);
    await this.addInvestmentSnapshot({
      id: `snapshot-${item.id}-${Date.now()}`,
      investmentId: item.id,
      date: todayKey(),
      price: item.price,
      changePercent: item.changePercent,
      note: (_a = item.note) != null ? _a : "",
      createdAt: nowIso()
    }, false);
    await this.save();
  }
  async deleteInvestmentWatchItem(itemId) {
    this.data.investmentWatchItems = this.data.investmentWatchItems.filter((item) => item.id !== itemId);
    await this.save();
  }
  getInvestmentSnapshots() {
    return this.data.investmentSnapshots;
  }
  async addInvestmentSnapshot(snapshot, save = true) {
    this.data.investmentSnapshots.push(snapshot);
    if (save) {
      await this.save();
    }
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
  async addFinanceTodo(todo) {
    var _a, _b, _c, _d, _e;
    const timestamp = nowIso();
    const values = typeof todo === "string" ? { title: todo } : todo;
    this.data.financeTodos.push({
      id: (_a = values.id) != null ? _a : `finance-todo-${Date.now()}`,
      title: values.title,
      completed: (_b = values.completed) != null ? _b : false,
      date: (_c = values.date) != null ? _c : todayKey(),
      note: (_d = values.note) != null ? _d : "",
      createdAt: (_e = values.createdAt) != null ? _e : timestamp,
      updatedAt: timestamp
    });
    await this.save();
  }
  async updateFinanceTodo(todoId, updates) {
    const todo = this.data.financeTodos.find((item) => item.id === todoId);
    if (!todo) return;
    Object.assign(todo, updates, { updatedAt: nowIso() });
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
  getGoalActions() {
    return this.data.goalActions.map((action) => this.withGoalActionComputedState(action));
  }
  getGoalActionsForGoal(goalId) {
    return this.getGoalActions().filter((action) => action.goalId === goalId);
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
    this.data.goalActions = this.data.goalActions.filter((item) => item.goalId !== goalId);
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
  async addGoalAction(action) {
    this.data.goalActions.push(this.normalizeGoalAction(action));
    await this.save();
  }
  async updateGoalAction(actionId, updates) {
    var _a;
    const action = this.data.goalActions.find((item) => item.id === actionId);
    if (!action) return;
    Object.assign(action, updates, { updatedAt: Date.now() });
    if (updates.status === "completed") {
      action.progress = 100;
      action.completedDate = (_a = action.completedDate) != null ? _a : formatDateKey(/* @__PURE__ */ new Date());
    }
    if (updates.status && updates.status !== "completed") {
      action.completedDate = updates.completedDate;
    }
    await this.save();
  }
  async toggleGoalActionCompleted(actionId) {
    var _a;
    const action = this.data.goalActions.find((item) => item.id === actionId);
    if (!action) return;
    if (action.status === "completed") {
      Object.assign(action, { status: "in-progress", completedDate: void 0, progress: Math.min((_a = action.progress) != null ? _a : 0, 90), updatedAt: Date.now() });
    } else {
      Object.assign(action, { status: "completed", completedDate: formatDateKey(/* @__PURE__ */ new Date()), progress: 100, updatedAt: Date.now() });
    }
    await this.save();
  }
  async deleteGoalAction(actionId) {
    const ids = /* @__PURE__ */ new Set([actionId]);
    let changed = true;
    while (changed) {
      changed = false;
      this.data.goalActions.forEach((action) => {
        if (action.parentId && ids.has(action.parentId) && !ids.has(action.id)) {
          ids.add(action.id);
          changed = true;
        }
      });
    }
    this.data.goalActions = this.data.goalActions.filter((action) => !ids.has(action.id));
    await this.save();
  }
  getGoalActionProgress(actionId) {
    var _a;
    const action = this.data.goalActions.find((item) => item.id === actionId);
    if (!action) return 0;
    const children = this.data.goalActions.filter((item) => item.parentId === actionId);
    if (children.length === 0) return Math.max(0, Math.min(100, (_a = action.progress) != null ? _a : action.status === "completed" ? 100 : 0));
    const total = children.reduce((sum, child) => sum + this.getGoalActionProgress(child.id), 0);
    return Math.round(total / children.length);
  }
  withGoalActionComputedState(action) {
    const progress = this.getGoalActionProgress(action.id);
    const status = action.status !== "completed" && action.deadline && action.deadline < formatDateKey(/* @__PURE__ */ new Date()) ? "overdue" : action.status;
    return { ...action, status, progress };
  }
  normalizeGoalAction(action) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const timestamp = Date.now();
    return {
      id: (_a = action.id) != null ? _a : `goal-action-${timestamp}`,
      goalId: action.goalId,
      parentId: action.parentId,
      title: action.title || "\u76EE\u6807\u4EFB\u52A1",
      description: (_b = action.description) != null ? _b : "",
      status: (_c = action.status) != null ? _c : "todo",
      startDate: action.startDate,
      deadline: action.deadline,
      completedDate: action.completedDate,
      progress: Math.max(0, Math.min(100, (_d = action.progress) != null ? _d : 0)),
      isMilestone: (_e = action.isMilestone) != null ? _e : false,
      milestoneDate: action.milestoneDate,
      importance: action.importance,
      urgency: action.urgency,
      note: (_f = action.note) != null ? _f : "",
      collapsed: (_g = action.collapsed) != null ? _g : false,
      createdAt: (_h = action.createdAt) != null ? _h : timestamp,
      updatedAt: timestamp
    };
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
    this.data.transactions.push({ ...transaction, amount: Math.abs(transaction.amount) });
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
    return this.getMonthlyBudgetLimit() - this.getMonthlyExpense();
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
    const today5 = /* @__PURE__ */ new Date();
    let streak = 0;
    for (let offset = 0; offset < 366; offset += 1) {
      const date = new Date(today5);
      date.setDate(today5.getDate() - offset);
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
    const today5 = /* @__PURE__ */ new Date();
    const day = today5.getDay();
    const mondayOffset = day === 0 ? -6 : 1 - day;
    const monday = new Date(today5);
    monday.setDate(today5.getDate() + mondayOffset);
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
      dataVersion: "0.3.6",
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
      bodyMeasurements: Array.isArray(partial.bodyMeasurements) ? partial.bodyMeasurements.map((item) => this.normalizeBodyMeasurement(item)) : structuredClone(DEFAULT_DATA.bodyMeasurements),
      fitnessGoals: Array.isArray(partial.fitnessGoals) ? partial.fitnessGoals.map((item) => this.normalizeFitnessGoal(item)) : structuredClone(DEFAULT_DATA.fitnessGoals),
      healthReminders: Array.isArray(partial.healthReminders) ? partial.healthReminders.map((item) => this.normalizeHealthReminder(item)) : structuredClone(DEFAULT_DATA.healthReminders),
      healthReminderLogs: Array.isArray(partial.healthReminderLogs) ? partial.healthReminderLogs : structuredClone(DEFAULT_DATA.healthReminderLogs),
      transactions: Array.isArray(partial.transactions) ? partial.transactions : structuredClone(DEFAULT_DATA.transactions),
      budgets: Array.isArray(partial.budgets) ? partial.budgets : structuredClone(DEFAULT_DATA.budgets),
      accounts: Array.isArray(partial.accounts) ? partial.accounts : structuredClone(DEFAULT_DATA.accounts),
      savingGoals: Array.isArray(partial.savingGoals) ? partial.savingGoals : structuredClone(DEFAULT_DATA.savingGoals),
      bills: Array.isArray(partial.bills) ? partial.bills : structuredClone(DEFAULT_DATA.bills),
      financeTodos: Array.isArray(partial.financeTodos) ? partial.financeTodos.map((item) => this.normalizeFinanceTodo(item)) : structuredClone(DEFAULT_DATA.financeTodos),
      goals: Array.isArray(partial.goals) ? partial.goals : structuredClone(DEFAULT_DATA.goals),
      goalActions: Array.isArray(partial.goalActions) ? partial.goalActions.map((action) => this.normalizeGoalAction(action)) : this.createInitialGoalActions(partial),
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
      focusRecords: Array.isArray(partial.focusRecords) ? partial.focusRecords.map((record) => this.normalizeFocusRecord(record)) : structuredClone(DEFAULT_DATA.focusRecords),
      fitnessDailyRecords: Array.isArray(partial.fitnessDailyRecords) ? partial.fitnessDailyRecords.map((item) => this.normalizeFitnessDailyRecord(item)) : structuredClone(DEFAULT_DATA.fitnessDailyRecords),
      fitnessHabitDefinitions: Array.isArray(partial.fitnessHabitDefinitions) ? partial.fitnessHabitDefinitions.map((item, index) => this.normalizeFitnessHabitDefinition(item, index)) : structuredClone(DEFAULT_DATA.fitnessHabitDefinitions),
      fitnessHabitRecords: Array.isArray(partial.fitnessHabitRecords) ? partial.fitnessHabitRecords : structuredClone(DEFAULT_DATA.fitnessHabitRecords),
      investmentWatchItems: Array.isArray(partial.investmentWatchItems) ? partial.investmentWatchItems.map((item) => this.normalizeInvestmentWatchItem(item)) : structuredClone(DEFAULT_DATA.investmentWatchItems),
      investmentSnapshots: Array.isArray(partial.investmentSnapshots) ? partial.investmentSnapshots : this.createInitialInvestmentSnapshots(Array.isArray(partial.investmentWatchItems) ? partial.investmentWatchItems : DEFAULT_DATA.investmentWatchItems),
      priorityMatrixItems: Array.isArray(partial.priorityMatrixItems) ? partial.priorityMatrixItems : structuredClone(DEFAULT_DATA.priorityMatrixItems),
      theme: {
        ...DEFAULT_DATA.theme,
        ...partial.theme
      }
    };
  }
  normalizeBodyMeasurement(measurement) {
    var _a, _b, _c, _d;
    const timestamp = (_a = measurement.createdAt) != null ? _a : `${measurement.date || todayKey()}T00:00:00.000Z`;
    return {
      id: (_b = measurement.id) != null ? _b : `measure-${measurement.date || Date.now()}`,
      date: measurement.date || todayKey(),
      weight: Number(measurement.weight) || 0,
      bmi: Number(measurement.bmi) || 0,
      waist: Number(measurement.waist) || 0,
      chest: Number(measurement.chest) || 0,
      hip: Number(measurement.hip) || 0,
      note: (_c = measurement.note) != null ? _c : "",
      createdAt: timestamp,
      updatedAt: (_d = measurement.updatedAt) != null ? _d : timestamp
    };
  }
  normalizeFitnessGoal(goal) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const timestamp = (_a = goal.createdAt) != null ? _a : `${goal.startDate || goal.deadline || todayKey()}T00:00:00.000Z`;
    const currentValue = Number((_c = (_b = goal.currentValue) != null ? _b : goal.current) != null ? _c : 0);
    const targetValue = Number((_e = (_d = goal.targetValue) != null ? _d : goal.target) != null ? _e : 0);
    const status = this.getNormalizedFitnessGoalStatus({
      ...goal,
      currentValue,
      targetValue
    });
    return {
      ...goal,
      id: (_f = goal.id) != null ? _f : `fitness-goal-${Date.now()}`,
      title: goal.title || "\u5065\u8EAB\u76EE\u6807",
      currentValue,
      targetValue,
      unit: goal.unit || "",
      startDate: (_g = goal.startDate) != null ? _g : todayKey(),
      deadline: goal.deadline || todayKey(),
      status,
      createdAt: timestamp,
      updatedAt: (_h = goal.updatedAt) != null ? _h : timestamp
    };
  }
  getNormalizedFitnessGoalStatus(goal) {
    if (goal.status === "archived") return "archived";
    if (goal.status === "completed" || goal.completedDate) return "completed";
    if (goal.deadline && goal.deadline < todayKey()) return "overdue";
    return "active";
  }
  normalizeHealthReminder(reminder) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    const timestamp = (_a = reminder.createdAt) != null ? _a : nowIso();
    return {
      id: (_b = reminder.id) != null ? _b : `health-${Date.now()}`,
      title: reminder.title || "\u5065\u5EB7\u63D0\u9192",
      date: (_c = reminder.date) != null ? _c : todayKey(),
      time: (_d = reminder.time) != null ? _d : "09:00",
      repeatType: (_e = reminder.repeatType) != null ? _e : "once",
      repeatDays: (_f = reminder.repeatDays) != null ? _f : [],
      note: (_g = reminder.note) != null ? _g : "",
      enabled: (_h = reminder.enabled) != null ? _h : true,
      createdAt: timestamp,
      updatedAt: (_i = reminder.updatedAt) != null ? _i : timestamp
    };
  }
  normalizeFitnessDailyRecord(record) {
    var _a, _b, _c, _d, _e;
    return {
      date: record.date || todayKey(),
      waterCups: Number(record.waterCups) || 0,
      waterGoal: Number(record.waterGoal) || 8,
      waterNote: (_a = record.waterNote) != null ? _a : "",
      sleepHours: Number(record.sleepHours) || 0,
      sleepGoal: Number(record.sleepGoal) || 8,
      bedtime: (_b = record.bedtime) != null ? _b : "",
      wakeTime: (_c = record.wakeTime) != null ? _c : "",
      sleepNote: (_d = record.sleepNote) != null ? _d : "",
      updatedAt: (_e = record.updatedAt) != null ? _e : nowIso()
    };
  }
  normalizeFitnessHabitDefinition(definition, index) {
    var _a, _b, _c;
    const timestamp = (_a = definition.createdAt) != null ? _a : nowIso();
    return {
      id: (_b = definition.id) != null ? _b : `fitness-habit-${Date.now()}-${index}`,
      name: definition.name || "\u81EA\u5B9A\u4E49\u4E60\u60EF",
      targetName: definition.targetName || "\u6BCF\u65E5\u76EE\u6807",
      targetValue: Number(definition.targetValue) || 0,
      unit: definition.unit || "",
      order: Number(definition.order) || (index + 1) * 10,
      createdAt: timestamp,
      updatedAt: (_c = definition.updatedAt) != null ? _c : timestamp
    };
  }
  normalizeFinanceTodo(todo) {
    var _a, _b, _c, _d, _e, _f;
    const timestamp = (_a = todo.createdAt) != null ? _a : nowIso();
    return {
      id: (_b = todo.id) != null ? _b : `finance-todo-${Date.now()}`,
      title: todo.title || "\u7406\u8D22\u5F85\u529E",
      completed: (_c = todo.completed) != null ? _c : false,
      date: (_d = todo.date) != null ? _d : todayKey(),
      note: (_e = todo.note) != null ? _e : "",
      createdAt: timestamp,
      updatedAt: (_f = todo.updatedAt) != null ? _f : timestamp
    };
  }
  createInitialGoalActions(partial) {
    const goals = Array.isArray(partial.goals) ? partial.goals : DEFAULT_DATA.goals;
    const fallbackGoal = goals[0];
    const actions = [];
    goals.forEach((goal, index) => {
      actions.push(this.normalizeGoalAction({
        id: `goal-action-root-${goal.id}`,
        goalId: goal.id,
        title: `${goal.title} \u62C6\u89E3`,
        description: goal.description,
        status: goal.status === "\u5DF2\u5B8C\u6210" ? "completed" : goal.status === "\u672A\u5F00\u59CB" ? "todo" : "in-progress",
        deadline: goal.deadline,
        progress: goal.progress,
        note: "",
        createdAt: Date.now() + index,
        updatedAt: Date.now() + index
      }));
    });
    if (Array.isArray(partial.milestones)) {
      partial.milestones.forEach((milestone, index) => {
        actions.push(this.normalizeGoalAction({
          id: `goal-action-milestone-${milestone.id}`,
          goalId: milestone.goalId || (fallbackGoal == null ? void 0 : fallbackGoal.id) || "goal-default",
          title: milestone.title,
          status: milestone.status === "\u5DF2\u5B8C\u6210" ? "completed" : milestone.status === "\u672A\u5F00\u59CB" ? "todo" : "in-progress",
          deadline: milestone.date,
          progress: milestone.status === "\u5DF2\u5B8C\u6210" ? 100 : 0,
          isMilestone: true,
          milestoneDate: milestone.date,
          note: "",
          createdAt: Date.now() + 100 + index,
          updatedAt: Date.now() + 100 + index
        }));
      });
    }
    if (Array.isArray(partial.priorityMatrixItems)) {
      partial.priorityMatrixItems.forEach((item, index) => {
        actions.push(this.normalizeGoalAction({
          id: `goal-action-priority-${item.id}`,
          goalId: (fallbackGoal == null ? void 0 : fallbackGoal.id) || "goal-default",
          title: item.title,
          status: item.completed ? "completed" : "todo",
          progress: item.completed ? 100 : 0,
          importance: item.quadrant.includes("important") && !item.quadrant.includes("not-important") ? "important" : "not-important",
          urgency: item.quadrant.includes("urgent") && !item.quadrant.includes("not-urgent") ? "urgent" : "not-urgent",
          note: item.note,
          createdAt: Date.now() + 200 + index,
          updatedAt: Date.now() + 200 + index
        }));
      });
    }
    return actions;
  }
  normalizeInvestmentWatchItem(item) {
    var _a, _b;
    return {
      id: (_a = item.id) != null ? _a : `watch-${Date.now()}`,
      name: item.name || "\u6295\u8D44\u89C2\u5BDF",
      code: item.code || "",
      price: Number(item.price) || 0,
      changePercent: Number(item.changePercent) || 0,
      type: item.type || "\u5176\u5B83",
      note: (_b = item.note) != null ? _b : ""
    };
  }
  createInitialInvestmentSnapshots(items) {
    const date = todayKey();
    const createdAt = nowIso();
    return items.map((item) => {
      var _a;
      return {
        id: `snapshot-${item.id}-${date}`,
        investmentId: item.id,
        date,
        price: Number(item.price) || 0,
        changePercent: Number(item.changePercent) || 0,
        note: (_a = item.note) != null ? _a : "",
        createdAt
      };
    });
  }
  migrateSections(sections) {
    const pages = ["overview", "research", "reading", "fitness", "finance", "goals", "modules"];
    const migrated = [...sections];
    pages.forEach((page) => {
      if (!sections.some((section) => section.page === page)) {
        migrated.push(...structuredClone(DEFAULT_DATA.sections.filter((section) => section.page === page)));
      }
    });
    migrated.forEach((section) => {
      if (section.type === "water-sleep-habits") {
        section.title = "\u4E60\u60EF";
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
  normalizeFocusRecord(record) {
    var _a, _b, _c, _d, _e, _f, _g;
    const createdAt = (_b = (_a = record.createdAt) != null ? _a : record.endedAt) != null ? _b : (/* @__PURE__ */ new Date()).toISOString();
    const date = (_c = record.date) != null ? _c : createdAt.slice(0, 10);
    const actualDuration = (_e = (_d = record.actualDurationMinutes) != null ? _d : record.duration) != null ? _e : 0;
    const plannedDuration = (_g = (_f = record.plannedDurationMinutes) != null ? _f : record.plannedDuration) != null ? _g : actualDuration;
    return {
      ...record,
      date,
      createdAt,
      duration: actualDuration,
      actualDurationMinutes: actualDuration,
      plannedDuration,
      plannedDurationMinutes: plannedDuration
    };
  }
  withRequiredSections(sections) {
    const migrated = [...sections];
    if (!migrated.some((section) => section.type === "section-manager")) {
      const sectionManager = DEFAULT_DATA.sections.find((section) => section.type === "section-manager");
      if (sectionManager) {
        migrated.push(structuredClone(sectionManager));
      }
    }
    if (!migrated.some((section) => section.page === "finance" && section.type === "finance-ledger")) {
      const ledger = DEFAULT_DATA.sections.find((section) => section.type === "finance-ledger");
      if (ledger) {
        migrated.push(structuredClone(ledger));
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

// src/services/HealthReminderService.ts
var import_obsidian2 = require("obsidian");
var HealthReminderService = class {
  constructor(app, store) {
    this.app = app;
    this.store = store;
  }
  async checkMissedReminders() {
    var _a, _b, _c;
    const missed = [];
    const today5 = formatDateKey(/* @__PURE__ */ new Date());
    const now = /* @__PURE__ */ new Date();
    for (const reminder of this.store.getHealthReminders()) {
      if (!this.shouldCheck(reminder)) continue;
      const date = (_a = reminder.date) != null ? _a : today5;
      if (date > today5) continue;
      if (!this.isScheduledForDate(reminder, date)) continue;
      const scheduled = this.getScheduledDate(reminder, date);
      if (!scheduled || scheduled >= now) continue;
      const id = this.getLogId(reminder.id, date, (_b = reminder.time) != null ? _b : "09:00");
      if (this.store.getHealthReminderLogs().some((log) => log.id === id)) continue;
      missed.push({
        id,
        reminderId: reminder.id,
        date,
        scheduledTime: (_c = reminder.time) != null ? _c : "09:00",
        status: "missed"
      });
    }
    for (const log of missed) {
      await this.store.addHealthReminderLog(log);
    }
    if (missed.length > 0) {
      new import_obsidian2.Notice(`\u4F60\u6709 ${missed.length} \u4E2A\u9519\u8FC7\u7684\u5065\u5EB7\u63D0\u9192\u3002`);
    }
  }
  async tick() {
    var _a;
    const now = /* @__PURE__ */ new Date();
    const date = formatDateKey(now);
    const minute = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    for (const reminder of this.store.getHealthReminders()) {
      if (!this.shouldCheck(reminder) || !this.isScheduledForDate(reminder, date) || ((_a = reminder.time) != null ? _a : "09:00") !== minute) {
        continue;
      }
      const id = this.getLogId(reminder.id, date, minute);
      if (this.store.getHealthReminderLogs().some((log) => log.id === id)) continue;
      await this.store.addHealthReminderLog({
        id,
        reminderId: reminder.id,
        date,
        scheduledTime: minute,
        triggeredAt: now.toISOString(),
        status: "triggered"
      });
      new import_obsidian2.Notice(`\u5065\u5EB7\u63D0\u9192\uFF1A${reminder.title}`);
    }
  }
  shouldCheck(reminder) {
    return reminder.enabled !== false && Boolean(reminder.title);
  }
  isScheduledForDate(reminder, date) {
    var _a, _b, _c, _d, _e;
    const repeatType = (_a = reminder.repeatType) != null ? _a : "once";
    if (repeatType === "once") return ((_b = reminder.date) != null ? _b : date) === date;
    if (((_c = reminder.date) != null ? _c : date) > date) return false;
    const day = (/* @__PURE__ */ new Date(`${date}T00:00:00`)).getDay();
    if (repeatType === "daily") return true;
    if (repeatType === "weekdays") return day >= 1 && day <= 5;
    if (repeatType === "weekly") return day === (/* @__PURE__ */ new Date(`${(_d = reminder.date) != null ? _d : date}T00:00:00`)).getDay();
    if (repeatType === "custom") return ((_e = reminder.repeatDays) != null ? _e : []).includes(day);
    return false;
  }
  getScheduledDate(reminder, date) {
    var _a;
    const [hour, minute] = ((_a = reminder.time) != null ? _a : "09:00").split(":").map((part) => Number(part));
    if (!Number.isFinite(hour) || !Number.isFinite(minute)) return null;
    return /* @__PURE__ */ new Date(`${date}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`);
  }
  getLogId(reminderId, date, time) {
    return `health-log-${reminderId}-${date}-${time}`;
  }
};

// src/views/WorkbenchView.ts
var import_obsidian74 = require("obsidian");

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
var import_obsidian4 = require("obsidian");

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
var import_obsidian3 = require("obsidian");
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
  (0, import_obsidian3.setIcon)(root.createSpan(), preset.icon);
  return root;
}
var AvatarPickerModal = class extends import_obsidian3.Modal {
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
        (0, import_obsidian3.setIcon)(preview.createSpan(), preset.icon);
      }
      button.createSpan({ text: preset.label });
      button.addEventListener("click", async () => {
        await this.onPick({ type: "preset", value: preset.id });
        new import_obsidian3.Notice("\u56FE\u6807\u5DF2\u4FDD\u5B58\u3002");
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
        new import_obsidian3.Notice("\u56FE\u7247\u56FE\u6807\u5DF2\u4FDD\u5B58\u3002");
        this.close();
      };
      reader.readAsDataURL(file);
    });
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    const upload = actions.createEl("button", { attr: { type: "button" } });
    (0, import_obsidian3.setIcon)(upload.createSpan(), "image-plus");
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
    (0, import_obsidian4.setIcon)(quickCreate, "plus");
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
    (0, import_obsidian4.setIcon)(prev, "chevron-left");
    prev.addEventListener("click", () => {
      this.visibleMonth = this.calendar.addMonths(this.visibleMonth, -1);
      this.renderMiniCalendarContent();
    });
    header.createEl("h3", { text: this.calendar.getMonthTitle(this.visibleMonth) });
    const next = header.createEl("button", { attr: { type: "button", "aria-label": "\u4E0B\u4E00\u6708" } });
    (0, import_obsidian4.setIcon)(next, "chevron-right");
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
      const today5 = /* @__PURE__ */ new Date();
      this.visibleMonth = new Date(today5.getFullYear(), today5.getMonth(), 1);
      this.selectedDate = today5;
      this.renderMiniCalendarContent();
      this.onOpenDay(today5);
    });
    const weekdays = ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"];
    const grid = this.calendarEl.createDiv({ cls: "cow-mini-calendar-grid" });
    weekdays.forEach((weekday) => grid.createSpan({ cls: "cow-weekday", text: weekday }));
    this.calendar.getMonthCells(this.visibleMonth).forEach((date) => {
      if (!date) {
        grid.createSpan({ cls: "cow-empty-day" });
        return;
      }
      const today5 = /* @__PURE__ */ new Date();
      const button = grid.createEl("button", {
        cls: `cow-day ${this.calendar.isSameDate(date, today5) ? "is-today" : ""} ${this.calendar.isSameDate(date, this.selectedDate) ? "is-selected" : ""}`,
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
      (0, import_obsidian4.setIcon)(button.createSpan(), action.icon);
      button.createSpan({ text: action.label });
      button.addEventListener("click", action.onClick);
    });
    const fileHint = actions.createDiv({ cls: "cow-file-shortcut" });
    (0, import_obsidian4.setIcon)(fileHint.createSpan(), "folder-open");
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
var import_obsidian5 = require("obsidian");
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
    (0, import_obsidian5.setIcon)(button.createSpan(), "plus");
    button.createSpan({ text: "\u81EA\u5B9A\u4E49" });
    button.addEventListener("click", this.onCustomize);
  }
};

// src/components/TopNavigation.ts
var import_obsidian6 = require("obsidian");
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
      (0, import_obsidian6.setIcon)(icon, page.icon);
      button.createSpan({ text: page.label });
      button.addEventListener("click", () => this.onNavigate(page.id));
    });
  }
};

// src/components/DashboardSection.ts
var import_obsidian67 = require("obsidian");

// src/components/SectionActionMenu.ts
var import_obsidian13 = require("obsidian");

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
  "account-overview",
  "saving-goals",
  "bill-reminders",
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
var import_obsidian12 = require("obsidian");

// src/components/CrudItemModal.ts
var import_obsidian7 = require("obsidian");
var CrudItemModal = class extends import_obsidian7.Modal {
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
    const setting = new import_obsidian7.Setting(this.contentEl).setName(field.name);
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
var import_obsidian8 = require("obsidian");
var AddBookModal = class extends import_obsidian8.Modal {
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
    new import_obsidian8.Setting(this.contentEl).setName("\u4E66\u540D").addText((text) => {
      text.setValue(this.title);
      text.onChange((value) => {
        this.title = value.trim();
      });
    });
    new import_obsidian8.Setting(this.contentEl).setName("\u4F5C\u8005").addText((text) => {
      text.setValue(this.author);
      text.onChange((value) => {
        this.author = value.trim();
      });
    });
    new import_obsidian8.Setting(this.contentEl).setName("\u603B\u9875\u6570").addText((text) => {
      text.inputEl.type = "number";
      text.setValue(String(this.totalPages));
      text.onChange((value) => {
        this.totalPages = Number(value) || 0;
      });
    });
    new import_obsidian8.Setting(this.contentEl).setName("\u5F53\u524D\u9875").addText((text) => {
      text.inputEl.type = "number";
      text.setValue(String(this.currentPage));
      text.onChange((value) => {
        this.currentPage = Number(value) || 0;
      });
    });
    new import_obsidian8.Setting(this.contentEl).setName("\u72B6\u6001").addDropdown((dropdown) => {
      ["\u5728\u8BFB", "\u60F3\u8BFB", "\u5DF2\u8BFB"].forEach((status) => dropdown.addOption(status, status));
      dropdown.setValue(this.status);
      dropdown.onChange((value) => {
        this.status = value;
      });
    });
    new import_obsidian8.Setting(this.contentEl).setName("\u7B14\u8BB0\u8DEF\u5F84").addText((text) => {
      text.setValue(this.notePath);
      text.onChange((value) => {
        this.notePath = value.trim();
      });
    });
    new import_obsidian8.Setting(this.contentEl).setName("\u6807\u7B7E").addText((text) => {
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
var import_obsidian9 = require("obsidian");
var GoalEditorModal = class extends import_obsidian9.Modal {
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
    new import_obsidian9.Setting(this.contentEl).setName("\u6807\u9898").addText((text) => text.setValue(this.title).onChange((value) => this.title = value.trim()));
    new import_obsidian9.Setting(this.contentEl).setName("\u63CF\u8FF0").addTextArea((text) => text.setValue(this.description).onChange((value) => this.description = value.trim()));
    new import_obsidian9.Setting(this.contentEl).setName("\u5206\u7C7B").addText((text) => text.setValue(this.category).onChange((value) => this.category = value.trim() || "\u4E2A\u4EBA"));
    new import_obsidian9.Setting(this.contentEl).setName("\u8FDB\u5EA6").addText((text) => {
      text.inputEl.type = "number";
      text.setValue(String(this.progress));
      text.onChange((value) => this.progress = Number(value) || 0);
    });
    new import_obsidian9.Setting(this.contentEl).setName("\u622A\u6B62\u65E5\u671F").addText((text) => text.setValue(this.deadline).onChange((value) => this.deadline = value.trim()));
    new import_obsidian9.Setting(this.contentEl).setName("\u72B6\u6001").addDropdown((dropdown) => {
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
var KeyResultModal = class extends import_obsidian9.Modal {
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
    new import_obsidian9.Setting(this.contentEl).setName("Objective").addDropdown((dropdown) => {
      this.objectives.forEach((objective) => dropdown.addOption(objective.id, `${objective.quarter} \xB7 ${objective.title}`));
      dropdown.setValue(this.objectiveId);
      dropdown.onChange((value) => this.objectiveId = value);
    });
    new import_obsidian9.Setting(this.contentEl).setName("\u6807\u9898").addText((text) => text.onChange((value) => this.title = value.trim()));
    new import_obsidian9.Setting(this.contentEl).setName("\u8FDB\u5EA6").addText((text) => {
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
var MilestoneModal = class extends import_obsidian9.Modal {
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
    new import_obsidian9.Setting(this.contentEl).setName("\u76EE\u6807").addDropdown((dropdown) => {
      this.goals.forEach((goal) => dropdown.addOption(goal.id, goal.title));
      dropdown.setValue(this.goalId);
      dropdown.onChange((value) => this.goalId = value);
    });
    new import_obsidian9.Setting(this.contentEl).setName("\u6807\u9898").addText((text) => text.onChange((value) => this.title = value.trim()));
    new import_obsidian9.Setting(this.contentEl).setName("\u65E5\u671F").addText((text) => text.setValue(this.date).onChange((value) => this.date = value.trim()));
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
var RiskModal = class extends import_obsidian9.Modal {
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
    new import_obsidian9.Setting(this.contentEl).setName("\u98CE\u9669").addText((text) => text.onChange((value) => this.title = value.trim()));
    new import_obsidian9.Setting(this.contentEl).setName("\u7B49\u7EA7").addDropdown((dropdown) => {
      dropdown.addOption("low", "\u4F4E");
      dropdown.addOption("medium", "\u4E2D");
      dropdown.addOption("high", "\u9AD8");
      dropdown.setValue(this.level);
      dropdown.onChange((value) => this.level = value);
    });
    new import_obsidian9.Setting(this.contentEl).setName("\u65B9\u6848").addTextArea((text) => text.onChange((value) => this.solution = value.trim()));
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
var import_obsidian10 = require("obsidian");
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
  new CrudItemModal(app, "\u7F16\u8F91\u4E60\u60EF", { ...record }, [
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
  new import_obsidian10.Notice(`\u201C${category}\u201D\u4ECD\u6709\u8BB0\u8D26\u8BB0\u5F55\uFF0C\u6682\u4E0D\u80FD\u5220\u9664\u3002`);
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
var import_obsidian11 = require("obsidian");
var CATEGORIES = ["\u79D1\u7814", "\u9605\u8BFB", "\u5065\u8EAB", "\u7406\u8D22", "\u4E2A\u4EBA"];
var TodoStatisticsModal = class extends import_obsidian11.Modal {
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
    (0, import_obsidian11.setIcon)(prev, "chevron-left");
    prev.addEventListener("click", () => {
      this.date.setDate(this.date.getDate() - 1);
      this.render();
    });
    header.createEl("h2", { text: dateKey });
    const next = header.createEl("button", { attr: { type: "button", "aria-label": "\u4E0B\u4E00\u5929" } });
    (0, import_obsidian11.setIcon)(next, "chevron-right");
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
    (0, import_obsidian11.setIcon)(add.createSpan(), "plus");
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
      (0, import_obsidian11.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => {
        new TodayFocusTaskModal(this.app, dateKey, async (values) => {
          await this.store.updateTodayFocusTask(task.id, values);
          this.onDataChanged();
          this.render();
        }, task).open();
      });
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664" } });
      (0, import_obsidian11.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteTodayFocusTask(task.id);
        this.onDataChanged();
        this.render();
      });
    });
  }
};
var TodayFocusTaskModal = class extends import_obsidian11.Modal {
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
    new import_obsidian11.Setting(this.contentEl).setName("\u6807\u9898").addText((text) => text.setValue(this.label).onChange((value) => {
      this.label = value;
    }));
    new import_obsidian11.Setting(this.contentEl).setName("\u5206\u7C7B").addDropdown((dropdown) => {
      CATEGORIES.forEach((category) => dropdown.addOption(category, category));
      dropdown.setValue(this.category);
      dropdown.onChange((value) => {
        this.category = value;
      });
    });
    new import_obsidian11.Setting(this.contentEl).setName("\u65E5\u671F").addText((text) => text.setValue(this.date).onChange((value) => {
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
      new import_obsidian12.Notice("\u8FD9\u4E2A\u6A21\u5757\u6682\u672A\u63D0\u4F9B\u6DFB\u52A0\u5165\u53E3\u3002");
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
    const menu = new import_obsidian13.Menu();
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
var ConfirmSectionDeleteModal = class extends import_obsidian13.Modal {
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
var SectionColorModal = class extends import_obsidian13.Modal {
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
var SectionWidthModal = class extends import_obsidian13.Modal {
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
      (0, import_obsidian13.setIcon)(button.createSpan(), width.id === "full" ? "panel-top" : "columns-3");
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
var import_obsidian14 = require("obsidian");

// src/services/StatisticsService.ts
var StatisticsService = class {
  constructor(store) {
    this.store = store;
    this.calendar = new CalendarService();
  }
  getFocusStats() {
    const today5 = this.calendar.getDateKey(/* @__PURE__ */ new Date());
    const weekKeys = new Set(this.store.getCurrentWeekDates());
    const monthPrefix = today5.slice(0, 7);
    const records = this.store.getFocusRecords();
    return {
      todayMinutes: records.filter((record) => record.date === today5).reduce((sum, record) => {
        var _a;
        return sum + ((_a = record.actualDurationMinutes) != null ? _a : record.duration);
      }, 0),
      todayPomodoros: records.filter((record) => record.date === today5 && record.completed).length,
      weekMinutes: records.filter((record) => weekKeys.has(record.date)).reduce((sum, record) => {
        var _a;
        return sum + ((_a = record.actualDurationMinutes) != null ? _a : record.duration);
      }, 0),
      monthMinutes: records.filter((record) => record.date.startsWith(monthPrefix)).reduce((sum, record) => {
        var _a;
        return sum + ((_a = record.actualDurationMinutes) != null ? _a : record.duration);
      }, 0),
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
    const today5 = /* @__PURE__ */ new Date();
    let streak = 0;
    for (let offset = 0; offset < 366; offset += 1) {
      const date = new Date(today5);
      date.setDate(today5.getDate() - offset);
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
var HabitStatisticsModal = class extends import_obsidian14.Modal {
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
    (0, import_obsidian14.setIcon)(previous, "chevron-left");
    previous.addEventListener("click", () => {
      this.month = this.calendar.addMonths(this.month, -1);
      this.selectedDay = void 0;
      this.render();
    });
    header.createEl("h2", { text: `\u6253\u5361\u7EDF\u8BA1 \xB7 ${this.calendar.getMonthTitle(this.month)}` });
    const next = header.createEl("button", { attr: { type: "button", "aria-label": "\u4E0B\u4E00\u6708" } });
    (0, import_obsidian14.setIcon)(next, "chevron-right");
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
var import_obsidian15 = require("obsidian");
var MonthlyProgressStatisticsModal = class extends import_obsidian15.Modal {
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
    (0, import_obsidian15.setIcon)(previous, "chevron-left");
    previous.addEventListener("click", () => {
      this.month = this.calendar.addMonths(this.month, -1);
      this.render();
    });
    header.createEl("h2", { text: `\u672C\u6708\u8FDB\u5EA6\u7EDF\u8BA1 \xB7 ${this.calendar.getMonthTitle(this.month)}` });
    const next = header.createEl("button", { attr: { type: "button", "aria-label": "\u4E0B\u4E00\u6708" } });
    (0, import_obsidian15.setIcon)(next, "chevron-right");
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
var import_obsidian16 = require("obsidian");
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
          (0, import_obsidian16.setIcon)(button, "check");
        }
        button.addEventListener("click", async () => {
          await this.store.toggleHabit(habit.id, date);
          this.onDataChanged();
        });
      });
    });
    const today5 = formatDateKey(/* @__PURE__ */ new Date());
    table.createEl("p", { text: `\u4ECA\u5929\uFF1A${today5}` });
  }
};

// src/components/overview/MonthlyCalendarSection.ts
var import_obsidian18 = require("obsidian");

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
var import_obsidian17 = require("obsidian");
var DayOverviewModal = class extends import_obsidian17.Modal {
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
    (0, import_obsidian17.setIcon)(addButton.createSpan(), "plus");
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
    (0, import_obsidian17.setIcon)(edit, "pencil");
    edit.addEventListener("click", () => {
      new CalendarTodoModal(this.app, async (title, category) => {
        await this.store.updateCalendarTodo(todo.id, { title, category });
        this.onDataChanged();
        this.render();
      }, todo).open();
    });
    const remove = row.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u5F85\u529E" } });
    (0, import_obsidian17.setIcon)(remove, "trash-2");
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
var CalendarTodoModal = class extends import_obsidian17.Modal {
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
    new import_obsidian17.Setting(this.contentEl).setName("\u6807\u9898").addText((text) => text.setValue(this.titleValue).onChange((value) => {
      this.titleValue = value;
    }));
    new import_obsidian17.Setting(this.contentEl).setName("\u5206\u7C7B").addText((text) => text.setValue(this.categoryValue).onChange((value) => {
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
    (0, import_obsidian18.setIcon)(previous, "chevron-left");
    previous.addEventListener("click", () => {
      this.displayDate = this.calendar.addMonths(this.displayDate, -1);
      this.draw(container);
    });
    header.createEl("strong", { text: this.calendar.getMonthTitle(this.displayDate) });
    const today5 = header.createEl("button", { cls: "cow-calendar-today", text: "\u4ECA\u5929", attr: { type: "button" } });
    today5.addEventListener("click", () => {
      this.displayDate = /* @__PURE__ */ new Date();
      this.draw(container);
    });
    const next = header.createEl("button", { attr: { type: "button", "aria-label": "\u4E0B\u4E00\u6708" } });
    (0, import_obsidian18.setIcon)(next, "chevron-right");
    next.addEventListener("click", () => {
      this.displayDate = this.calendar.addMonths(this.displayDate, 1);
      this.draw(container);
    });
    const grid = root.createDiv({ cls: "cow-month-calendar-grid" });
    const settings = this.store.getData().calendarSettings;
    const weekdays = settings.weekStartsOn === "monday" ? ["\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u65E5"] : ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"];
    weekdays.forEach((weekday) => grid.createSpan({ cls: "cow-weekday", text: weekday }));
    const todayKey2 = this.calendar.getDateKey(/* @__PURE__ */ new Date());
    this.calendar.getMonthCells(this.displayDate, settings.weekStartsOn).forEach((date) => {
      if (!date) {
        grid.createSpan({ cls: "cow-calendar-empty" });
        return;
      }
      const dateKey = this.calendar.getDateKey(date);
      const button = grid.createEl("button", {
        cls: `cow-calendar-day ${dateKey === todayKey2 ? "is-today" : ""}`,
        attr: { type: "button", "aria-label": dateKey }
      });
      if (dateKey === todayKey2) {
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
var import_obsidian19 = require("obsidian");
var OverviewStatsSection = class {
  constructor(store, type) {
    this.store = store;
    this.type = type;
  }
  render(container) {
    const stat = this.getStat();
    const wrapper = container.createDiv({ cls: "cow-overview-stat" });
    const art = wrapper.createDiv({ cls: `cow-stat-art ${stat.className}` });
    (0, import_obsidian19.setIcon)(art.createSpan(), stat.icon);
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
var import_obsidian20 = require("obsidian");
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
      (0, import_obsidian20.setIcon)(button.createSpan(), this.getIcon(action));
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
        new import_obsidian20.Notice(action.target ? `\u81EA\u5B9A\u4E49\u5165\u53E3\uFF1A${action.target}` : "\u81EA\u5B9A\u4E49\u5FEB\u6377\u5165\u53E3\u5DF2\u89E6\u53D1\u3002");
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
      new import_obsidian20.Notice("\u8FD9\u4E2A Obsidian \u547D\u4EE4\u6682\u65F6\u4E0D\u53EF\u7528\u3002");
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
    new import_obsidian20.Notice("\u5DF2\u6DFB\u52A0\u5230\u4ECA\u65E5\u7126\u70B9\u3002");
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
var import_obsidian21 = require("obsidian");
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
      (0, import_obsidian21.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => {
        new TodayFocusTaskModal(this.app, formatDateKey(/* @__PURE__ */ new Date()), async (values) => {
          await this.store.updateTodayFocusTask(task.id, values);
          this.onDataChanged();
        }, task).open();
      });
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664" } });
      (0, import_obsidian21.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteTodayFocusTask(task.id);
        this.onDataChanged();
      });
    });
  }
};

// src/components/overview/FocusStatSection.ts
var import_obsidian22 = require("obsidian");
var FOCUS_BACKGROUNDS = [
  { id: "pink", label: "\u9ED8\u8BA4\u7C89\u8272" },
  { id: "cream", label: "\u5976\u6CB9\u6E10\u53D8" },
  { id: "sky", label: "\u5929\u7A7A" },
  { id: "forest", label: "\u68EE\u6797" },
  { id: "night", label: "\u591C\u665A" },
  { id: "desk", label: "\u4E66\u684C" },
  { id: "minimal-dark", label: "\u6781\u7B80\u6DF1\u8272" }
];
function applyFocusModalFrame(modal, options) {
  modal.modalEl.addClass("cute-focus-resizable-modal", options.className);
  modal.modalEl.style.width = options.width;
  modal.modalEl.style.height = options.height;
  modal.modalEl.style.maxWidth = options.maxWidth;
  modal.modalEl.style.maxHeight = options.maxHeight;
  if (options.minWidth) {
    modal.modalEl.style.minWidth = options.minWidth;
  }
  if (options.minHeight) {
    modal.modalEl.style.minHeight = options.minHeight;
  }
}
function logFocusModalSize(label, modalEl) {
  window.requestAnimationFrame(() => {
    const rect = modalEl.getBoundingClientRect();
    console.debug(`${label} modal size`, {
      width: Math.round(rect.width),
      height: Math.round(rect.height)
    });
  });
}
var FocusStatSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const stats = new StatisticsService(this.store).getFocusStats();
    const state = this.store.getFocusState();
    const root = container.createDiv({ cls: "cow-focus-summary-card" });
    const top = root.createDiv({ cls: "cow-focus-summary-top" });
    const art = top.createDiv({ cls: "cow-stat-art is-blue" });
    (0, import_obsidian22.setIcon)(art.createSpan(), "headphones");
    const summary = top.createDiv({ cls: "cow-focus-summary-copy" });
    summary.createEl("strong", { text: this.formatMinutes(stats.todayMinutes) });
    summary.createSpan({ text: `\u4ECA\u65E5 ${stats.todayPomodoros} \u4E2A\u756A\u8304 \xB7 \u672C\u5468 ${this.formatMinutes(stats.weekMinutes)}` });
    if (state.isRunning) {
      root.createDiv({
        cls: "cow-focus-summary-status",
        text: `\u4E13\u6CE8\u4E2D${state.currentTask ? `\uFF1A${state.currentTask}` : ""}`
      });
    }
    const actions = root.createDiv({ cls: "cow-focus-summary-actions" });
    const primary = actions.createEl("button", { cls: "mod-cta", attr: { type: "button" } });
    (0, import_obsidian22.setIcon)(primary.createSpan(), state.isRunning ? "maximize-2" : "play");
    primary.createSpan({ text: state.isRunning ? "\u8FD4\u56DE\u4E13\u6CE8" : "\u5F00\u59CB\u4E13\u6CE8" });
    primary.addEventListener("click", () => {
      if (state.isRunning) {
        new FocusSessionWindow(this.app, this.store, this.onDataChanged).open();
        return;
      }
      new FocusSetupModal(this.app, this.store, this.onDataChanged).open();
    });
    const records = actions.createEl("button", { attr: { type: "button" } });
    (0, import_obsidian22.setIcon)(records.createSpan(), "list-checks");
    records.createSpan({ text: "\u67E5\u770B\u8BB0\u5F55" });
    records.addEventListener("click", () => new FocusRecordsModal(this.app, this.store, this.onDataChanged).open());
  }
  formatMinutes(minutes) {
    return `${minutes} min`;
  }
};
var FocusSetupModal = class extends import_obsidian22.Modal {
  constructor(app, store, onDataChanged) {
    var _a;
    super(app);
    this.store = store;
    this.onDataChanged = onDataChanged;
    this.duration = 25;
    this.customDuration = "";
    this.task = "";
    this.background = "pink";
    this.error = "";
    this.background = (_a = store.getFocusSettings().defaultBackground) != null ? _a : "pink";
  }
  onOpen() {
    applyFocusModalFrame(this, {
      className: "cute-focus-setup-modal",
      width: "min(900px, 90vw)",
      height: "min(506px, 82vh)",
      maxWidth: "95vw",
      maxHeight: "90vh",
      minWidth: "min(620px, 90vw)",
      minHeight: "min(360px, 82vh)"
    });
    this.render();
    logFocusModalSize("FocusSetup", this.modalEl);
  }
  render() {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-focus-setup-modal");
    const header = this.contentEl.createDiv({ cls: "cute-focus-modal-header" });
    header.createEl("h2", { text: "\u5F00\u59CB\u4E13\u6CE8" });
    header.createEl("p", { text: "\u9009\u62E9\u65F6\u95F4\u3001\u5199\u4E0B\u4E13\u6CE8\u5185\u5BB9\uFF0C\u518D\u8FDB\u5165\u6C89\u6D78\u5F0F\u7A97\u53E3\u3002" });
    const content = this.contentEl.createDiv({ cls: "cute-focus-modal-content" });
    content.createEl("h3", { text: "\u9009\u62E9\u4E13\u6CE8\u65F6\u95F4" });
    const presets = content.createDiv({ cls: "cow-focus-preset-grid" });
    [15, 25, 45, 60, 90].forEach((minutes) => {
      const button = presets.createEl("button", {
        cls: this.duration === minutes && !this.customDuration ? "is-active" : "",
        attr: { type: "button" }
      });
      button.createSpan({ text: `${minutes} \u5206\u949F` });
      button.addEventListener("click", () => {
        this.duration = minutes;
        this.customDuration = "";
        this.error = "";
        this.render();
      });
    });
    new import_obsidian22.Setting(content).setName("\u81EA\u5B9A\u4E49\u65F6\u95F4").setDesc("\u5355\u4F4D\uFF1A\u5206\u949F\uFF0C\u8303\u56F4 1-180\u3002").addText((text) => text.setValue(this.customDuration).onChange((value) => {
      this.customDuration = value.trim();
      const next = Number(this.customDuration);
      if (this.customDuration && (!Number.isFinite(next) || next < 1 || next > 180)) {
        this.error = "\u8BF7\u8F93\u5165 1 \u5230 180 \u4E4B\u95F4\u7684\u5206\u949F\u6570\u3002";
        return;
      }
      if (this.customDuration) {
        this.duration = Math.round(next);
      }
      this.error = "";
      this.render();
    }));
    content.createDiv({ cls: "cow-focus-selected-duration", text: `\u672C\u6B21\u4E13\u6CE8\uFF1A${this.duration} \u5206\u949F` });
    if (this.error) {
      content.createDiv({ cls: "cow-form-error", text: this.error });
    }
    new import_obsidian22.Setting(content).setName("\u4E13\u6CE8\u5185\u5BB9").addText((text) => text.setPlaceholder("\u8FD9\u6B21\u51C6\u5907\u4E13\u6CE8\u505A\u4EC0\u4E48\uFF1F").setValue(this.task).onChange((value) => {
      this.task = value;
    }));
    content.createEl("h3", { text: "\u9009\u62E9\u4E13\u6CE8\u80CC\u666F" });
    const backgrounds = content.createDiv({ cls: "cow-focus-background-picker" });
    FOCUS_BACKGROUNDS.forEach((background) => this.renderBackgroundButton(backgrounds, background.id, background.label));
    const fileInput = content.createEl("input", {
      cls: "cow-hidden-input",
      attr: { type: "file", accept: "image/*" }
    });
    fileInput.addEventListener("change", () => {
      var _a;
      const file = (_a = fileInput.files) == null ? void 0 : _a[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        this.background = "custom";
        this.backgroundDataUrl = String(reader.result);
        this.render();
      };
      reader.readAsDataURL(file);
    });
    const custom = backgrounds.createEl("button", {
      cls: `cow-focus-bg-custom ${this.background === "custom" ? "is-active" : ""}`,
      attr: { type: "button" }
    });
    if (this.backgroundDataUrl) {
      custom.style.backgroundImage = `linear-gradient(rgba(255, 248, 253, 0.38), rgba(255, 248, 253, 0.38)), url("${this.backgroundDataUrl}")`;
    }
    custom.createSpan({ text: "\u81EA\u5B9A\u4E49\u80CC\u666F" });
    custom.addEventListener("click", () => fileInput.click());
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions cute-focus-modal-footer" });
    actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } }).addEventListener("click", () => this.close());
    const start = actions.createEl("button", { cls: "mod-cta", text: "\u5F00\u59CB\u4E13\u6CE8", attr: { type: "button" } });
    start.addEventListener("click", async () => {
      if (this.duration < 1 || this.duration > 180) {
        this.error = "\u8BF7\u8F93\u5165 1 \u5230 180 \u4E4B\u95F4\u7684\u5206\u949F\u6570\u3002";
        this.render();
        return;
      }
      await this.store.startFocusSession(this.task, this.duration, this.background, this.backgroundDataUrl);
      this.onDataChanged();
      this.close();
      new FocusSessionWindow(this.app, this.store, this.onDataChanged).open();
    });
  }
  renderBackgroundButton(container, id, label) {
    const button = container.createEl("button", {
      cls: `cow-focus-bg-${id} ${this.background === id ? "is-active" : ""}`,
      attr: { type: "button" }
    });
    button.createSpan({ text: label });
    button.addEventListener("click", () => {
      this.background = id;
      this.backgroundDataUrl = void 0;
      this.render();
    });
  }
};
var FocusSessionWindow = class extends import_obsidian22.Modal {
  constructor(app, store, onDataChanged) {
    super(app);
    this.store = store;
    this.onDataChanged = onDataChanged;
    this.maximized = false;
    this.completed = false;
    this.completionTask = "";
    this.completionDuration = 0;
  }
  onOpen() {
    this.applyModalFrame();
    this.render();
    logFocusModalSize("FocusSession", this.modalEl);
    this.timer = window.setInterval(() => void this.tick(), 1e3);
  }
  onClose() {
    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = void 0;
    }
  }
  render() {
    var _a;
    this.applyModalFrame();
    this.contentEl.empty();
    this.contentEl.addClass("cow-focus-session-window", `cow-focus-bg-${(_a = this.store.getFocusState().background) != null ? _a : "pink"}`);
    const state = this.store.getFocusState();
    if (state.backgroundDataUrl) {
      this.contentEl.style.backgroundImage = `linear-gradient(rgba(255, 248, 253, 0.62), rgba(255, 248, 253, 0.62)), url("${state.backgroundDataUrl}")`;
    }
    this.renderWindowControls();
    if (this.completed) {
      this.renderCompleted();
      return;
    }
    const body = this.contentEl.createDiv({ cls: "cow-focus-window-body" });
    body.createSpan({ cls: "cow-focus-window-label", text: state.currentTask ? "\u6B63\u5728\u4E13\u6CE8\uFF1A" : "\u4E13\u6CE8\u65F6\u95F4" });
    body.createEl("h2", { text: state.currentTask || "\u4FDD\u6301\u5F53\u4E0B\u8FD9\u4E00\u8F6E" });
    body.createDiv({ cls: "cow-focus-session-countdown", text: this.formatSeconds(state.remainingSeconds) });
    body.createDiv({ cls: "cow-focus-session-status", text: state.isPaused ? "\u5DF2\u6682\u505C" : "\u4E13\u6CE8\u4E2D" });
    const actions = body.createDiv({ cls: "cow-focus-window-actions" });
    const toggle = actions.createEl("button", { cls: "mod-cta", attr: { type: "button" } });
    (0, import_obsidian22.setIcon)(toggle.createSpan(), state.isPaused ? "play" : "pause");
    toggle.createSpan({ text: state.isPaused ? "\u7EE7\u7EED" : "\u6682\u505C" });
    toggle.addEventListener("click", async () => {
      if (state.isPaused) {
        await this.store.resumeFocusSession();
      } else {
        await this.store.pauseFocusSession();
      }
      this.onDataChanged();
      this.render();
    });
    const end = actions.createEl("button", { attr: { type: "button" } });
    (0, import_obsidian22.setIcon)(end.createSpan(), "square");
    end.createSpan({ text: "\u7ED3\u675F" });
    end.addEventListener("click", () => new EndFocusConfirmModal(this.app, this.store, async () => {
      this.onDataChanged();
      this.close();
    }).open());
  }
  renderWindowControls() {
    const controls = this.contentEl.createDiv({ cls: "cow-focus-window-controls" });
    controls.createEl("button", { text: "\u2014", attr: { type: "button", "aria-label": "\u6700\u5C0F\u5316" } }).addEventListener("click", () => {
      this.onDataChanged();
      this.close();
    });
    controls.createEl("button", { text: this.maximized ? "\u25A3" : "\u25A1", attr: { type: "button", "aria-label": this.maximized ? "\u6062\u590D\u7A97\u53E3" : "\u6700\u5927\u5316" } }).addEventListener("click", () => {
      this.maximized = !this.maximized;
      this.render();
    });
    controls.createEl("button", { text: "\xD7", attr: { type: "button", "aria-label": "\u5173\u95ED" } }).addEventListener("click", () => {
      if (this.store.getFocusState().isRunning) {
        new CloseFocusWindowModal(this.app, this.store, async () => {
          this.onDataChanged();
          this.close();
        }).open();
        return;
      }
      this.close();
    });
  }
  applyModalFrame() {
    applyFocusModalFrame(this, {
      className: "cute-focus-session-modal",
      width: this.maximized ? "96vw" : "min(1100px, 94vw)",
      height: this.maximized ? "92vh" : "min(720px, 90vh)",
      maxWidth: "96vw",
      maxHeight: "94vh",
      minWidth: "min(640px, 94vw)",
      minHeight: "min(400px, 90vh)"
    });
    this.modalEl.style.resize = this.maximized ? "none" : "both";
    if (this.maximized) {
      this.modalEl.addClass("is-maximized");
    } else {
      this.modalEl.removeClass("is-maximized");
    }
  }
  renderCompleted() {
    const stats = new StatisticsService(this.store).getFocusStats();
    const body = this.contentEl.createDiv({ cls: "cow-focus-window-body cow-focus-complete-body" });
    body.createEl("h2", { text: "\u{1F389} \u4E13\u6CE8\u5B8C\u6210" });
    body.createDiv({ cls: "cow-focus-session-countdown", text: `${this.completionDuration} min` });
    body.createSpan({ text: `\u5185\u5BB9\uFF1A${this.completionTask || "\u4E13\u6CE8"}` });
    body.createSpan({ text: `\u4ECA\u65E5\u7D2F\u8BA1\uFF1A${stats.todayMinutes} min \xB7 \u4ECA\u65E5\u756A\u8304\uFF1A${stats.todayPomodoros} \u4E2A` });
    const actions = body.createDiv({ cls: "cow-focus-window-actions" });
    actions.createEl("button", { text: "\u5B8C\u6210", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "\u518D\u6765\u4E00\u6B21", attr: { type: "button" } }).addEventListener("click", () => {
      this.close();
      new FocusSetupModal(this.app, this.store, this.onDataChanged).open();
    });
  }
  async tick() {
    var _a, _b;
    const state = this.store.getFocusState();
    if (state.isRunning && !state.isPaused && state.remainingSeconds <= 0) {
      this.completionTask = (_a = state.currentTask) != null ? _a : "\u4E13\u6CE8";
      this.completionDuration = (_b = state.plannedDuration) != null ? _b : this.store.getFocusSettings().focusDuration;
      await this.store.completeCurrentFocusPhase();
      this.completed = true;
      this.onDataChanged();
      new import_obsidian22.Notice("\u4E13\u6CE8\u5B8C\u6210");
    }
    this.render();
  }
  formatSeconds(seconds) {
    const safe = Math.max(0, seconds);
    const mins = Math.floor(safe / 60);
    const secs = safe % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
};
var CloseFocusWindowModal = class extends import_obsidian22.Modal {
  constructor(app, store, onDone) {
    super(app);
    this.store = store;
    this.onDone = onDone;
  }
  onOpen() {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "\u5F53\u524D\u4E13\u6CE8\u5C1A\u672A\u7ED3\u675F" });
    this.contentEl.createEl("p", { text: "\u8BF7\u9009\u62E9\u7EE7\u7EED\u540E\u53F0\u4E13\u6CE8\uFF0C\u6216\u7ED3\u675F\u672C\u6B21\u4E13\u6CE8\u3002" });
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "\u7EE7\u7EED\u540E\u53F0\u4E13\u6CE8", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      await this.onDone();
      this.close();
    });
    actions.createEl("button", { text: "\u7ED3\u675F\u672C\u6B21\u4E13\u6CE8", cls: "mod-warning", attr: { type: "button" } }).addEventListener("click", () => {
      this.close();
      new EndFocusConfirmModal(this.app, this.store, this.onDone).open();
    });
  }
};
var EndFocusConfirmModal = class extends import_obsidian22.Modal {
  constructor(app, store, onDone) {
    super(app);
    this.store = store;
    this.onDone = onDone;
  }
  onOpen() {
    const elapsed = this.getElapsedText();
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "\u7ED3\u675F\u672C\u6B21\u4E13\u6CE8\uFF1F" });
    this.contentEl.createEl("p", { text: `\u5DF2\u4E13\u6CE8\uFF1A${elapsed}` });
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "\u7ED3\u675F\u5E76\u4FDD\u5B58", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      await this.store.endFocusSession(false, true);
      await this.onDone();
      this.close();
    });
    actions.createEl("button", { text: "\u7ED3\u675F\u4F46\u4E0D\u4FDD\u5B58", cls: "mod-warning", attr: { type: "button" } }).addEventListener("click", async () => {
      await this.store.endFocusSession(false, false);
      await this.onDone();
      this.close();
    });
  }
  getElapsedText() {
    var _a;
    const state = this.store.getFocusState();
    const planned = ((_a = state.plannedDuration) != null ? _a : this.store.getFocusSettings().focusDuration) * 60;
    const elapsed = Math.max(0, planned - state.remainingSeconds);
    return `${Math.floor(elapsed / 60)} \u5206 ${String(elapsed % 60).padStart(2, "0")} \u79D2`;
  }
};
var FocusRecordsModal = class extends import_obsidian22.Modal {
  constructor(app, store, onDataChanged) {
    super(app);
    this.store = store;
    this.onDataChanged = onDataChanged;
    this.filter = "today";
    this.dateValue = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  }
  onOpen() {
    applyFocusModalFrame(this, {
      className: "cute-focus-records-modal",
      width: "min(1050px, 92vw)",
      height: "min(700px, 85vh)",
      maxWidth: "96vw",
      maxHeight: "92vh",
      minWidth: "min(680px, 92vw)",
      minHeight: "min(420px, 85vh)"
    });
    this.render();
    logFocusModalSize("FocusRecords", this.modalEl);
  }
  render() {
    const stats = new StatisticsService(this.store).getFocusStats();
    const records = this.getFilteredRecords();
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-focus-records-modal");
    const header = this.contentEl.createDiv({ cls: "cute-focus-modal-header" });
    header.createEl("h2", { text: "\u4E13\u6CE8\u8BB0\u5F55" });
    const content = this.contentEl.createDiv({ cls: "cute-focus-modal-content" });
    const statGrid = content.createDiv({ cls: "cow-stats-card-grid" });
    [["\u4ECA\u65E5\u4E13\u6CE8", `${stats.todayMinutes} min`], ["\u4ECA\u65E5\u756A\u8304", stats.todayPomodoros], ["\u672C\u5468\u4E13\u6CE8", `${stats.weekMinutes} min`], ["\u672C\u6708\u4E13\u6CE8", `${stats.monthMinutes} min`]].forEach(([label, value]) => {
      const card = statGrid.createDiv({ cls: "cow-stats-card" });
      card.createEl("strong", { text: String(value) });
      card.createSpan({ text: String(label) });
    });
    const filters = content.createDiv({ cls: "cow-focus-filter-row" });
    [
      ["today", "\u4ECA\u5929"],
      ["week", "\u672C\u5468"],
      ["month", "\u672C\u6708"],
      ["all", "\u5168\u90E8"],
      ["date", "\u65E5\u671F"]
    ].forEach(([id, label]) => {
      const button = filters.createEl("button", { cls: this.filter === id ? "is-active" : "", attr: { type: "button" } });
      button.createSpan({ text: label });
      button.addEventListener("click", () => {
        this.filter = id;
        this.render();
      });
    });
    if (this.filter === "date") {
      new import_obsidian22.Setting(content).setName("\u65E5\u671F").addText((text) => text.setValue(this.dateValue).onChange((value) => {
        this.dateValue = value.trim();
        this.render();
      }));
    }
    const list = content.createDiv({ cls: "cow-focus-record-list" });
    if (records.length === 0) {
      list.createEl("p", { cls: "cow-empty-state", text: "\u6CA1\u6709\u5339\u914D\u7684\u4E13\u6CE8\u8BB0\u5F55\u3002" });
      return;
    }
    records.forEach((record) => this.renderRecord(list, record));
  }
  renderRecord(container, record) {
    var _a, _b, _c;
    const row = container.createDiv({ cls: "cow-focus-record-row" });
    const body = row.createDiv();
    body.createEl("strong", { text: record.date });
    body.createSpan({ text: `${this.formatTime(record.startedAt)} - ${this.formatTime(record.endedAt)} \xB7 ${record.task || "\u4E13\u6CE8"}` });
    body.createSpan({ text: `${(_a = record.actualDurationMinutes) != null ? _a : record.duration} min / \u8BA1\u5212 ${(_c = (_b = record.plannedDurationMinutes) != null ? _b : record.plannedDuration) != null ? _c : record.duration} min \xB7 ${record.completed ? "\u5DF2\u5B8C\u6210" : "\u63D0\u524D\u7ED3\u675F"}` });
    const actions = row.createDiv({ cls: "cow-list-item-actions" });
    const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u8BB0\u5F55" } });
    (0, import_obsidian22.setIcon)(edit, "pencil");
    edit.addEventListener("click", () => new EditFocusRecordModal(this.app, this.store, record, () => {
      this.onDataChanged();
      this.render();
    }).open());
    const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u8BB0\u5F55" } });
    (0, import_obsidian22.setIcon)(remove, "trash-2");
    remove.addEventListener("click", () => new DeleteFocusRecordModal(this.app, this.store, record, async () => {
      this.onDataChanged();
      this.render();
    }).open());
  }
  getFilteredRecords() {
    const records = this.store.getFocusRecords();
    const today5 = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    if (this.filter === "today") return records.filter((record) => record.date === today5);
    if (this.filter === "date") return records.filter((record) => record.date === this.dateValue);
    if (this.filter === "month") return records.filter((record) => record.date.startsWith(today5.slice(0, 7)));
    if (this.filter === "week") {
      const week = new Set(this.store.getCurrentWeekDates());
      return records.filter((record) => week.has(record.date));
    }
    return records;
  }
  formatTime(value) {
    if (!value) return "--:--";
    return new Date(value).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
  }
};
var EditFocusRecordModal = class extends import_obsidian22.Modal {
  constructor(app, store, record, onDone) {
    var _a;
    super(app);
    this.store = store;
    this.record = record;
    this.onDone = onDone;
    this.date = record.date;
    this.task = record.task;
    this.duration = (_a = record.actualDurationMinutes) != null ? _a : record.duration;
  }
  onOpen() {
    applyFocusModalFrame(this, {
      className: "cute-edit-focus-record-modal",
      width: "min(640px, 88vw)",
      height: "min(420px, 72vh)",
      maxWidth: "92vw",
      maxHeight: "82vh",
      minWidth: "min(420px, 88vw)",
      minHeight: "min(300px, 72vh)"
    });
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-edit-focus-record-modal");
    const header = this.contentEl.createDiv({ cls: "cute-focus-modal-header" });
    header.createEl("h2", { text: "\u7F16\u8F91\u4E13\u6CE8\u8BB0\u5F55" });
    const content = this.contentEl.createDiv({ cls: "cute-focus-modal-content" });
    new import_obsidian22.Setting(content).setName("\u65E5\u671F").addText((text) => text.setValue(this.date).onChange((value) => {
      this.date = value.trim();
    }));
    new import_obsidian22.Setting(content).setName("\u4E13\u6CE8\u5185\u5BB9").addText((text) => text.setValue(this.task).onChange((value) => {
      this.task = value;
    }));
    new import_obsidian22.Setting(content).setName("\u5B9E\u9645\u4E13\u6CE8\u65F6\u957F").setDesc("\u5355\u4F4D\uFF1A\u5206\u949F").addText((text) => {
      text.inputEl.type = "number";
      text.setValue(String(this.duration));
      text.onChange((value) => {
        this.duration = Math.max(0, Number(value) || 0);
      });
    });
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions cute-focus-modal-footer" });
    actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "\u4FDD\u5B58", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      await this.store.updateFocusRecord(this.record.id, {
        date: this.date,
        task: this.task.trim() || "\u4E13\u6CE8",
        duration: this.duration,
        actualDurationMinutes: this.duration
      });
      this.onDone();
      this.close();
    });
  }
};
var DeleteFocusRecordModal = class extends import_obsidian22.Modal {
  constructor(app, store, record, onDone) {
    super(app);
    this.store = store;
    this.record = record;
    this.onDone = onDone;
  }
  onOpen() {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "\u5220\u9664\u8FD9\u6761\u4E13\u6CE8\u8BB0\u5F55\uFF1F" });
    this.contentEl.createEl("p", { text: `${this.record.date} \xB7 ${this.record.task || "\u4E13\u6CE8"}` });
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "\u5220\u9664", cls: "mod-warning", attr: { type: "button" } }).addEventListener("click", async () => {
      await this.store.deleteFocusRecord(this.record.id);
      await this.onDone();
      this.close();
    });
  }
};

// src/components/modules/ModulesControls.ts
var import_obsidian23 = require("obsidian");
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
    (0, import_obsidian23.setIcon)(handle, "grip-vertical");
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
    (0, import_obsidian23.setIcon)(custom.createSpan(), "plus");
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
      (0, import_obsidian23.setIcon)(add, "plus");
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
      (0, import_obsidian23.setIcon)(handle, "grip-vertical");
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
    (0, import_obsidian23.setIcon)(button, icon);
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
var CustomSectionModal = class extends import_obsidian23.Modal {
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
    new import_obsidian23.Setting(this.contentEl).setName("\u6807\u9898").addText((text) => text.onChange((value) => {
      this.title = value.trim();
    }));
    new import_obsidian23.Setting(this.contentEl).setName("\u63CF\u8FF0").addTextArea((text) => text.onChange((value) => {
      this.description = value.trim();
    }));
    new import_obsidian23.Setting(this.contentEl).setName("\u7C7B\u578B").addDropdown((dropdown) => {
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
    new import_obsidian23.Setting(this.contentEl).setName("\u989C\u8272").addDropdown((dropdown) => {
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
      (0, import_obsidian23.setIcon)(handle, "grip-vertical");
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
      new import_obsidian23.Notice("\u5BFC\u5165\u5931\u8D25\uFF1AJSON \u683C\u5F0F\u4E0D\u6B63\u786E\u3002");
    }
  };
  reader.readAsText(file);
}

// src/components/finance/AccountOverviewSection.ts
var import_obsidian24 = require("obsidian");
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
    (0, import_obsidian24.setIcon)(add.createSpan(), "plus");
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
      (0, import_obsidian24.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => openAccountModal(this.app, async (values) => {
        await this.store.updateAccount(account.id, values);
        this.onDataChanged();
      }, account));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u8D26\u6237" } });
      (0, import_obsidian24.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteAccount(account.id);
        this.onDataChanged();
      });
    });
  }
};

// src/components/finance/BillRemindersSection.ts
var import_obsidian25 = require("obsidian");
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
      (0, import_obsidian25.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => openBillModal(this.app, async (values) => {
        await this.store.updateBill(bill.id, values);
        this.onDataChanged();
      }, bill));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u8D26\u5355" } });
      (0, import_obsidian25.setIcon)(remove, "trash-2");
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
var import_obsidian28 = require("obsidian");

// src/components/finance/FinanceModals.ts
var import_obsidian27 = require("obsidian");

// src/components/ResizableModal.ts
function applyResizableModal(modal, options) {
  modal.modalEl.addClass("cute-resizable-modal", options.className);
  modal.modalEl.style.width = options.width;
  if (options.height) {
    modal.modalEl.style.height = options.height;
  } else {
    modal.modalEl.style.removeProperty("height");
  }
  modal.modalEl.style.maxWidth = options.maxWidth;
  modal.modalEl.style.maxHeight = options.maxHeight;
  if (options.minWidth) {
    modal.modalEl.style.minWidth = options.minWidth;
  }
  if (options.minHeight) {
    modal.modalEl.style.minHeight = options.minHeight;
  }
}

// src/components/finance/AddTransactionModal.ts
var import_obsidian26 = require("obsidian");
var INCOME_CATEGORIES = ["\u5DE5\u8D44", "\u5956\u91D1", "\u517C\u804C", "\u6295\u8D44", "\u9000\u6B3E", "\u5176\u5B83"];
function today() {
  return formatDateKey(/* @__PURE__ */ new Date());
}
function createClickableInput(container, label, type, value) {
  const row = container.createDiv({ cls: `cow-finance-form-row ${type === "date" || type === "time" ? "is-picker" : ""}` });
  row.createEl("label", { text: label });
  const input = row.createEl("input", { attr: { type, value } });
  if (type === "date" || type === "time") {
    row.addEventListener("click", () => {
      var _a;
      input.focus();
      try {
        (_a = input.showPicker) == null ? void 0 : _a.call(input);
      } catch (e) {
        input.focus();
      }
    });
  }
  return input;
}
var AddTransactionModal = class extends import_obsidian26.Modal {
  constructor(app, onSubmit, transaction, budgets = []) {
    var _a;
    super(app);
    this.onSubmit = onSubmit;
    this.transaction = transaction;
    this.budgets = budgets;
    this.type = (_a = transaction == null ? void 0 : transaction.type) != null ? _a : "expense";
  }
  onOpen() {
    applyResizableModal(this, {
      className: "cute-finance-edit-modal",
      width: "min(760px, 90vw)",
      maxWidth: "94vw",
      maxHeight: "88vh",
      minWidth: "min(420px, 90vw)",
      minHeight: "min(320px, 80vh)"
    });
    this.render();
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-finance-modal");
    this.contentEl.createEl("h2", { text: this.transaction ? "\u7F16\u8F91\u8BB0\u8D26" : "\u65B0\u589E\u8BB0\u8D26" });
    const segment = this.contentEl.createDiv({ cls: "cow-finance-segment" });
    ["expense", "income"].forEach((type) => {
      const button = segment.createEl("button", {
        cls: this.type === type ? "is-active" : "",
        text: type === "expense" ? "\u652F\u51FA" : "\u6536\u5165",
        attr: { type: "button" }
      });
      button.addEventListener("click", () => {
        this.type = type;
        this.render();
      });
    });
    const form = this.contentEl.createDiv({ cls: "cow-finance-form-grid" });
    const categoryRow = form.createDiv({ cls: "cow-finance-form-row" });
    categoryRow.createEl("label", { text: "\u5206\u7C7B" });
    const category = categoryRow.createEl("select");
    const options = this.type === "income" ? INCOME_CATEGORIES : this.getExpenseCategories();
    options.forEach((item) => category.createEl("option", { text: item, value: item }));
    category.value = ((_a = this.transaction) == null ? void 0 : _a.category) && options.includes(this.transaction.category) ? this.transaction.category : (_b = options[0]) != null ? _b : "\u5176\u5B83";
    const amount = createClickableInput(form, "\u91D1\u989D", "number", String((_d = (_c = this.transaction) == null ? void 0 : _c.amount) != null ? _d : ""));
    amount.min = "0.01";
    amount.step = "0.01";
    const date = createClickableInput(form, "\u65E5\u671F", "date", (_f = (_e = this.transaction) == null ? void 0 : _e.date) != null ? _f : today());
    const noteRow = this.contentEl.createDiv({ cls: "cow-finance-form-row" });
    noteRow.createEl("label", { text: "\u5907\u6CE8" });
    const note = noteRow.createEl("textarea", { text: (_h = (_g = this.transaction) == null ? void 0 : _g.note) != null ? _h : "" });
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "\u4FDD\u5B58\u8BB0\u8D26", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      var _a2, _b2, _c2;
      const numericAmount = Number(amount.value) || 0;
      if (numericAmount <= 0) {
        new import_obsidian26.Notice("\u91D1\u989D\u5FC5\u987B\u5927\u4E8E 0\u3002");
        return;
      }
      await this.onSubmit({
        id: (_b2 = (_a2 = this.transaction) == null ? void 0 : _a2.id) != null ? _b2 : `tx-${Date.now()}`,
        type: this.type,
        category: category.value || "\u5176\u5B83",
        amount: Math.abs(numericAmount),
        date: date.value || today(),
        note: note.value.trim(),
        accountId: (_c2 = this.transaction) == null ? void 0 : _c2.accountId
      });
      this.close();
    });
  }
  getExpenseCategories() {
    const categories = this.budgets.map((budget) => budget.category).filter(Boolean);
    return categories.length > 0 ? categories : ["\u9910\u996E", "\u5C45\u4F4F", "\u4EA4\u901A", "\u8D2D\u7269", "\u5B66\u4E60", "\u5A31\u4E50", "\u5176\u5B83"];
  }
};

// src/components/finance/FinanceModals.ts
function today2() {
  return formatDateKey(/* @__PURE__ */ new Date());
}
function monthKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}
function currency(value) {
  return `\xA5${Math.round(value * 100) / 100}`;
}
function createInput(container, label, type, value) {
  const row = container.createDiv({ cls: `cow-finance-form-row ${type === "date" || type === "time" ? "is-picker" : ""}` });
  row.createEl("label", { text: label });
  const input = row.createEl("input", { attr: { type, value } });
  if (type === "date" || type === "time") {
    row.addEventListener("click", () => {
      var _a;
      input.focus();
      try {
        (_a = input.showPicker) == null ? void 0 : _a.call(input);
      } catch (e) {
        input.focus();
      }
    });
  }
  return input;
}
function createTextarea(container, label, value) {
  const row = container.createDiv({ cls: "cow-finance-form-row" });
  row.createEl("label", { text: label });
  return row.createEl("textarea", { text: value });
}
function setupEditModal(modal) {
  applyResizableModal(modal, {
    className: "cute-finance-edit-modal",
    width: "min(760px, 90vw)",
    maxWidth: "94vw",
    maxHeight: "88vh",
    minWidth: "min(420px, 90vw)",
    minHeight: "min(320px, 80vh)"
  });
}
function setupStatsModal(modal) {
  applyResizableModal(modal, {
    className: "cute-finance-stats-modal",
    width: "min(1050px, 92vw)",
    height: "min(720px, 86vh)",
    maxWidth: "96vw",
    maxHeight: "92vh",
    minWidth: "min(620px, 92vw)",
    minHeight: "min(420px, 86vh)"
  });
}
function transactionsForMonth(store, key) {
  return store.getTransactions().filter((item) => item.date.startsWith(key));
}
function sumTransactions(transactions, type) {
  return transactions.filter((item) => item.type === type).reduce((sum, item) => sum + item.amount, 0);
}
function renderSummaryCards(container, items) {
  const grid = container.createDiv({ cls: "cow-stats-card-grid" });
  items.forEach(([label, value]) => {
    const card = grid.createDiv({ cls: "cow-stats-card" });
    card.createEl("strong", { text: String(value) });
    card.createSpan({ text: label });
  });
}
var FinanceCalendar = class {
  constructor(getDots, renderDetails) {
    this.getDots = getDots;
    this.renderDetails = renderDetails;
    this.month = /* @__PURE__ */ new Date();
    this.selected = today2();
  }
  render(container) {
    container.empty();
    const root = container.createDiv({ cls: "cow-finance-calendar-layout" });
    const calendar = root.createDiv({ cls: "cow-finance-calendar-panel" });
    const details = root.createDiv({ cls: "cow-finance-calendar-details" });
    const header = calendar.createDiv({ cls: "cow-finance-calendar-header" });
    header.createEl("button", { text: "<", attr: { type: "button" } }).addEventListener("click", () => {
      this.month = new Date(this.month.getFullYear(), this.month.getMonth() - 1, 1);
      this.render(container);
    });
    header.createEl("strong", { text: `${this.month.getFullYear()}\u5E74${this.month.getMonth() + 1}\u6708` });
    header.createEl("button", { text: ">", attr: { type: "button" } }).addEventListener("click", () => {
      this.month = new Date(this.month.getFullYear(), this.month.getMonth() + 1, 1);
      this.render(container);
    });
    header.createEl("button", { text: "\u4ECA\u5929", attr: { type: "button" } }).addEventListener("click", () => {
      this.month = /* @__PURE__ */ new Date();
      this.selected = today2();
      this.render(container);
    });
    const grid = calendar.createDiv({ cls: "cow-finance-calendar-grid" });
    ["\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u65E5"].forEach((day) => grid.createSpan({ cls: "cow-weekday", text: day }));
    const first = new Date(this.month.getFullYear(), this.month.getMonth(), 1);
    const offset = (first.getDay() + 6) % 7;
    const days = new Date(this.month.getFullYear(), this.month.getMonth() + 1, 0).getDate();
    for (let index = 0; index < offset; index += 1) grid.createSpan({ cls: "cow-calendar-empty" });
    for (let day = 1; day <= days; day += 1) {
      const date = formatDateKey(new Date(this.month.getFullYear(), this.month.getMonth(), day));
      const button = grid.createEl("button", { cls: `cow-finance-calendar-day ${date === this.selected ? "is-selected" : ""} ${date === today2() ? "is-today" : ""}`, attr: { type: "button" } });
      button.createSpan({ text: String(day) });
      const dots = button.createDiv({ cls: "cow-calendar-dots" });
      this.getDots(date).slice(0, 4).forEach((dot) => dots.createSpan({ cls: dot }));
      button.addEventListener("click", () => {
        this.selected = date;
        this.render(container);
      });
    }
    details.createEl("h3", { text: this.selected });
    this.renderDetails(details, this.selected);
  }
};
var MonthlyFinanceSummaryModal = class extends import_obsidian27.Modal {
  constructor(app, store, onDone) {
    super(app);
    this.store = store;
    this.onDone = onDone;
    this.month = /* @__PURE__ */ new Date();
  }
  onOpen() {
    setupEditModal(this);
    this.render();
  }
  render() {
    const key = monthKey(this.month);
    const transactions = transactionsForMonth(this.store, key);
    const incomeValue = sumTransactions(transactions, "income");
    const expenseValue = sumTransactions(transactions, "expense");
    const remainingValue = this.store.getMonthlyBudgetLimit() - expenseValue;
    const savingRateValue = incomeValue > 0 ? Math.round((incomeValue - expenseValue) / incomeValue * 100) : 0;
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-finance-modal");
    const header = this.contentEl.createDiv({ cls: "cow-finance-month-header" });
    header.createEl("button", { text: "<", attr: { type: "button" } }).addEventListener("click", () => {
      this.month = new Date(this.month.getFullYear(), this.month.getMonth() - 1, 1);
      this.render();
    });
    header.createEl("h2", { text: `${this.month.getFullYear()}\u5E74${this.month.getMonth() + 1}\u6708` });
    header.createEl("button", { text: ">", attr: { type: "button" } }).addEventListener("click", () => {
      this.month = new Date(this.month.getFullYear(), this.month.getMonth() + 1, 1);
      this.render();
    });
    const form = this.contentEl.createDiv({ cls: "cow-finance-form-grid" });
    const income = createInput(form, "\u672C\u6708\u6536\u5165", "number", String(incomeValue));
    const expense = createInput(form, "\u672C\u6708\u652F\u51FA", "number", String(expenseValue));
    const remaining = createInput(form, "\u9884\u7B97\u5269\u4F59", "number", String(remainingValue));
    const savingRate = createInput(form, "\u50A8\u84C4\u7387\uFF08\u81EA\u52A8\uFF09", "number", String(savingRateValue));
    savingRate.disabled = true;
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "\u4FDD\u5B58", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      await this.applyAdjustment("income", Number(income.value) - incomeValue, key);
      await this.applyAdjustment("expense", Number(expense.value) - expenseValue, key);
      await this.store.setMonthlyBudgetLimit((Number(expense.value) || 0) + (Number(remaining.value) || 0));
      this.onDone();
      this.close();
    });
  }
  async applyAdjustment(type, delta, key) {
    if (Math.abs(delta) < 0.01) return;
    await this.store.addTransaction({
      id: `tx-adjust-${type}-${Date.now()}`,
      type,
      category: type === "income" ? "\u6708\u5EA6\u6536\u5165\u8C03\u6574" : "\u6708\u5EA6\u652F\u51FA\u8C03\u6574",
      amount: Math.abs(delta),
      date: `${key}-01`,
      note: "\u6708\u5EA6\u6536\u652F\u7BA1\u7406\u8C03\u6574"
    });
  }
};
var MonthlyBudgetStatisticsModal = class extends import_obsidian27.Modal {
  constructor(app, store) {
    super(app);
    this.store = store;
    this.year = (/* @__PURE__ */ new Date()).getFullYear();
  }
  onOpen() {
    setupStatsModal(this);
    this.render();
  }
  render() {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-finance-modal", "cow-finance-stats-modal");
    const header = this.contentEl.createDiv({ cls: "cow-finance-month-header" });
    header.createEl("button", { text: "\u4E0A\u4E00\u5E74", attr: { type: "button" } }).addEventListener("click", () => {
      this.year -= 1;
      this.render();
    });
    header.createEl("h2", { text: `${this.year} \u5E74\u9884\u7B97\u7EDF\u8BA1` });
    header.createEl("button", { text: "\u4E0B\u4E00\u5E74", attr: { type: "button" } }).addEventListener("click", () => {
      this.year += 1;
      this.render();
    });
    const grid = this.contentEl.createDiv({ cls: "cow-finance-year-grid" });
    for (let month = 1; month <= 12; month += 1) {
      const key = `${this.year}-${String(month).padStart(2, "0")}`;
      const tx = transactionsForMonth(this.store, key);
      const income = sumTransactions(tx, "income");
      const expense = sumTransactions(tx, "expense");
      const remaining = this.store.getMonthlyBudgetLimit() - expense;
      const card = grid.createDiv({ cls: "cow-data-card" });
      card.createEl("strong", { text: `${month}\u6708` });
      card.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `\u6536\u5165 ${currency(income)} \xB7 \u652F\u51FA ${currency(expense)}` });
      card.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `\u5269\u4F59 ${currency(remaining)} \xB7 \u50A8\u84C4\u7387 ${income > 0 ? Math.round((income - expense) / income * 100) : 0}%` });
    }
  }
};
function openExpenseCategoryModal(app, store, onDone, budget) {
  new ExpenseCategoryModal(app, store, onDone, budget).open();
}
var ExpenseCategoryModal = class extends import_obsidian27.Modal {
  constructor(app, store, onDone, budget) {
    super(app);
    this.store = store;
    this.onDone = onDone;
    this.budget = budget;
  }
  onOpen() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    setupEditModal(this);
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-finance-modal");
    this.contentEl.createEl("h2", { text: this.budget ? "\u7F16\u8F91\u5206\u7C7B" : "\u65B0\u589E\u5206\u7C7B" });
    const category = createInput(this.contentEl, "\u5206\u7C7B\u540D\u79F0", "text", (_b = (_a = this.budget) == null ? void 0 : _a.category) != null ? _b : "");
    const amount = createInput(this.contentEl, "\u9884\u7B97\u91D1\u989D", "number", String((_d = (_c = this.budget) == null ? void 0 : _c.amount) != null ? _d : 0));
    const color = createInput(this.contentEl, "\u989C\u8272", "color", (_f = (_e = this.budget) == null ? void 0 : _e.color) != null ? _f : "#ff7fb4");
    const icon = createInput(this.contentEl, "\u56FE\u6807", "text", (_h = (_g = this.budget) == null ? void 0 : _g.icon) != null ? _h : "wallet");
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "\u4FDD\u5B58", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      var _a2, _b2, _c2, _d2;
      const values = {
        id: (_b2 = (_a2 = this.budget) == null ? void 0 : _a2.id) != null ? _b2 : `budget-${Date.now()}`,
        category: category.value.trim() || "\u5176\u5B83",
        amount: Number(amount.value) || 0,
        spent: (_d2 = (_c2 = this.budget) == null ? void 0 : _c2.spent) != null ? _d2 : 0,
        color: color.value,
        icon: icon.value.trim() || "wallet"
      };
      if (this.budget) await this.store.updateBudget(this.budget.id, values);
      else await this.store.addBudget(values);
      this.onDone();
      this.close();
    });
  }
};
var ExpenseCategoryStatisticsModal = class extends import_obsidian27.Modal {
  constructor(app, store) {
    super(app);
    this.store = store;
    this.month = /* @__PURE__ */ new Date();
  }
  onOpen() {
    setupStatsModal(this);
    this.render();
  }
  render() {
    const key = monthKey(this.month);
    const expenses = transactionsForMonth(this.store, key).filter((tx) => tx.type === "expense");
    const total = sumTransactions(expenses, "expense");
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-finance-modal", "cow-finance-stats-modal");
    this.renderMonthHeader("\u652F\u51FA\u5206\u7C7B\u7EDF\u8BA1");
    const groups = /* @__PURE__ */ new Map();
    expenses.forEach((tx) => {
      var _a;
      const group = (_a = groups.get(tx.category)) != null ? _a : { amount: 0, count: 0 };
      group.amount += tx.amount;
      group.count += 1;
      groups.set(tx.category, group);
    });
    const list = this.contentEl.createDiv({ cls: "cow-data-list" });
    Array.from(groups.entries()).sort((a, b) => b[1].amount - a[1].amount).forEach(([category, value]) => {
      const row = list.createDiv({ cls: "cow-finance-category-row" });
      row.createEl("strong", { text: category });
      const percent = total > 0 ? Math.round(value.amount / total * 100) : 0;
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-pink", attr: { style: `width: ${percent}%` } });
      row.createSpan({ text: `${currency(value.amount)} \xB7 ${percent}% \xB7 ${value.count}\u7B14` });
    });
  }
  renderMonthHeader(title) {
    const header = this.contentEl.createDiv({ cls: "cow-finance-month-header" });
    header.createEl("button", { text: "<", attr: { type: "button" } }).addEventListener("click", () => {
      this.month = new Date(this.month.getFullYear(), this.month.getMonth() - 1, 1);
      this.render();
    });
    header.createEl("h2", { text: `${title} \xB7 ${this.month.getFullYear()}\u5E74${this.month.getMonth() + 1}\u6708` });
    header.createEl("button", { text: ">", attr: { type: "button" } }).addEventListener("click", () => {
      this.month = new Date(this.month.getFullYear(), this.month.getMonth() + 1, 1);
      this.render();
    });
  }
};
var TransactionManagerModal = class extends import_obsidian27.Modal {
  constructor(app, store, onDone) {
    super(app);
    this.store = store;
    this.onDone = onDone;
    this.filter = "";
  }
  onOpen() {
    setupStatsModal(this);
    this.render();
  }
  render() {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-finance-modal", "cow-finance-stats-modal");
    this.contentEl.createEl("h2", { text: "\u7BA1\u7406\u6536\u652F\u8BB0\u5F55" });
    const filter = createInput(this.contentEl, "\u7B5B\u9009", "text", this.filter);
    filter.addEventListener("input", () => {
      this.filter = filter.value;
      this.render();
    });
    const list = this.contentEl.createDiv({ cls: "cow-data-list" });
    this.store.getTransactions().filter((tx) => `${tx.date} ${tx.category} ${tx.note}`.includes(this.filter)).slice().reverse().forEach((tx) => this.renderTransactionRow(list, tx));
  }
  renderTransactionRow(container, tx) {
    const row = container.createDiv({ cls: "cow-data-card" });
    const head = row.createDiv({ cls: "cow-list-item-head" });
    const body = head.createDiv();
    body.createEl("strong", { text: `${tx.type === "income" ? "+" : "-"}${currency(tx.amount)} \xB7 ${tx.category}` });
    body.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${tx.date} \xB7 ${tx.note || "\u65E0\u5907\u6CE8"}` });
    const actions = head.createDiv({ cls: "cow-list-item-actions" });
    const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91" } });
    (0, import_obsidian27.setIcon)(edit, "pencil");
    edit.addEventListener("click", () => new AddTransactionModal(this.app, async (values) => {
      await this.store.updateTransaction(tx.id, values);
      this.onDone();
      this.render();
    }, tx, this.store.getBudgets()).open());
    const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664" } });
    (0, import_obsidian27.setIcon)(remove, "trash-2");
    remove.addEventListener("click", async () => {
      await this.store.deleteTransaction(tx.id);
      this.onDone();
      this.render();
    });
  }
};
var IncomeExpenseStatisticsModal = class extends import_obsidian27.Modal {
  constructor(app, store) {
    super(app);
    this.store = store;
    this.period = "month";
    this.month = /* @__PURE__ */ new Date();
  }
  onOpen() {
    setupStatsModal(this);
    this.render();
  }
  render() {
    const key = monthKey(this.month);
    let tx = this.store.getTransactions();
    if (this.period === "month") tx = transactionsForMonth(this.store, key);
    if (this.period === "year") tx = tx.filter((item) => item.date.startsWith(String(this.month.getFullYear())));
    if (this.period === "week") {
      const week = new Set(this.store.getCurrentWeekDates());
      tx = tx.filter((item) => week.has(item.date));
    }
    const income = sumTransactions(tx, "income");
    const expense = sumTransactions(tx, "expense");
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-finance-modal", "cow-finance-stats-modal");
    this.contentEl.createEl("h2", { text: "\u6536\u652F\u8D8B\u52BF\u7EDF\u8BA1" });
    const filters = this.contentEl.createDiv({ cls: "cow-focus-filter-row" });
    [["week", "\u672C\u5468"], ["month", "\u672C\u6708"], ["year", "\u672C\u5E74"]].forEach(([id, label]) => {
      filters.createEl("button", { cls: this.period === id ? "is-active" : "", text: label, attr: { type: "button" } }).addEventListener("click", () => {
        this.period = id;
        this.render();
      });
    });
    renderSummaryCards(this.contentEl, [["\u6536\u5165", currency(income)], ["\u652F\u51FA", currency(expense)], ["\u51C0\u7ED3\u4F59", currency(income - expense)]]);
    const list = this.contentEl.createDiv({ cls: "cow-data-list" });
    tx.slice().sort((a, b) => a.date.localeCompare(b.date)).forEach((item) => {
      list.createDiv({ cls: "cow-data-card" }).createEl("strong", { text: `${item.date} \xB7 ${item.type === "income" ? "+" : "-"}${currency(item.amount)} \xB7 ${item.category}` });
    });
  }
};
function openFinanceTodoModal(app, store, onDone, todo) {
  new FinanceTodoModal(app, store, onDone, todo).open();
}
var FinanceTodoModal = class extends import_obsidian27.Modal {
  constructor(app, store, onDone, todo) {
    super(app);
    this.store = store;
    this.onDone = onDone;
    this.todo = todo;
  }
  onOpen() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    setupEditModal(this);
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-finance-modal");
    this.contentEl.createEl("h2", { text: this.todo ? "\u7F16\u8F91\u8BB0\u8D26\u5F85\u529E" : "\u65B0\u5EFA\u8BB0\u8D26\u5F85\u529E" });
    const title = createInput(this.contentEl, "\u6807\u9898", "text", (_b = (_a = this.todo) == null ? void 0 : _a.title) != null ? _b : "");
    const date = createInput(this.contentEl, "\u65E5\u671F", "date", (_d = (_c = this.todo) == null ? void 0 : _c.date) != null ? _d : today2());
    const note = createTextarea(this.contentEl, "\u5907\u6CE8", (_f = (_e = this.todo) == null ? void 0 : _e.note) != null ? _f : "");
    const completedRow = this.contentEl.createDiv({ cls: "cow-finance-form-row is-inline" });
    const completed = completedRow.createEl("input", { attr: { type: "checkbox" } });
    completed.checked = (_h = (_g = this.todo) == null ? void 0 : _g.completed) != null ? _h : false;
    completedRow.createEl("label", { text: "\u5DF2\u5B8C\u6210" });
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "\u4FDD\u5B58", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      var _a2, _b2, _c2, _d2;
      const values = {
        id: (_b2 = (_a2 = this.todo) == null ? void 0 : _a2.id) != null ? _b2 : `finance-todo-${Date.now()}`,
        title: title.value.trim() || "\u7406\u8D22\u5F85\u529E",
        date: date.value || today2(),
        note: note.value.trim(),
        completed: completed.checked,
        createdAt: (_d2 = (_c2 = this.todo) == null ? void 0 : _c2.createdAt) != null ? _d2 : (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      if (this.todo) await this.store.updateFinanceTodo(this.todo.id, values);
      else await this.store.addFinanceTodo(values);
      this.onDone();
      this.close();
    });
  }
};
var FinanceTodoStatisticsModal = class extends import_obsidian27.Modal {
  constructor(app, store, onDone) {
    super(app);
    this.store = store;
    this.onDone = onDone;
  }
  onOpen() {
    setupStatsModal(this);
    this.render();
  }
  render() {
    const todos = this.store.getFinanceTodos();
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-finance-modal", "cow-finance-stats-modal");
    this.contentEl.createEl("h2", { text: "\u8BB0\u8D26\u5F85\u529E\u7EDF\u8BA1" });
    renderSummaryCards(this.contentEl, [["\u603B\u5F85\u529E", todos.length], ["\u5DF2\u5B8C\u6210", todos.filter((item) => item.completed).length], ["\u672A\u5B8C\u6210", todos.filter((item) => !item.completed).length], ["\u5B8C\u6210\u7387", `${todos.length ? Math.round(todos.filter((item) => item.completed).length / todos.length * 100) : 0}%`]]);
    new FinanceCalendar(
      (date) => todos.some((todo) => {
        var _a;
        return ((_a = todo.date) != null ? _a : today2()) === date;
      }) ? ["is-task"] : [],
      (container, date) => this.renderTodoDetails(container, date)
    ).render(this.contentEl.createDiv());
  }
  renderTodoDetails(container, date) {
    this.store.getFinanceTodos().filter((todo) => {
      var _a;
      return ((_a = todo.date) != null ? _a : today2()) === date;
    }).forEach((todo) => {
      const row = container.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: `${todo.completed ? "\u2713 " : ""}${todo.title}` });
      if (todo.note) row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: todo.note });
      const actions = row.createDiv({ cls: "cow-list-item-actions" });
      actions.createEl("button", { text: "\u7F16\u8F91", attr: { type: "button" } }).addEventListener("click", () => openFinanceTodoModal(this.app, this.store, () => {
        this.onDone();
        this.render();
      }, todo));
      actions.createEl("button", { text: todo.completed ? "\u53D6\u6D88\u5B8C\u6210" : "\u5B8C\u6210", attr: { type: "button" } }).addEventListener("click", async () => {
        await this.store.updateFinanceTodo(todo.id, { completed: !todo.completed });
        this.onDone();
        this.render();
      });
      actions.createEl("button", { text: "\u5220\u9664", cls: "mod-warning", attr: { type: "button" } }).addEventListener("click", async () => {
        await this.store.deleteFinanceTodo(todo.id);
        this.onDone();
        this.render();
      });
    });
  }
};
function openInvestmentModal(app, store, onDone, item) {
  new InvestmentModal(app, store, onDone, item).open();
}
var InvestmentModal = class extends import_obsidian27.Modal {
  constructor(app, store, onDone, item) {
    super(app);
    this.store = store;
    this.onDone = onDone;
    this.item = item;
  }
  onOpen() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    setupEditModal(this);
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-finance-modal");
    this.contentEl.createEl("h2", { text: this.item ? "\u7F16\u8F91\u6295\u8D44\u89C2\u5BDF" : "\u65B0\u589E\u6295\u8D44\u89C2\u5BDF" });
    const name = createInput(this.contentEl, "\u540D\u79F0", "text", (_b = (_a = this.item) == null ? void 0 : _a.name) != null ? _b : "");
    const code = createInput(this.contentEl, "\u4EE3\u7801", "text", (_d = (_c = this.item) == null ? void 0 : _c.code) != null ? _d : "");
    const price = createInput(this.contentEl, "\u5F53\u524D\u4EF7\u683C", "number", String((_f = (_e = this.item) == null ? void 0 : _e.price) != null ? _f : 0));
    const change = createInput(this.contentEl, "\u53D8\u5316\u767E\u5206\u6BD4", "number", String((_h = (_g = this.item) == null ? void 0 : _g.changePercent) != null ? _h : 0));
    const type = createInput(this.contentEl, "\u7C7B\u578B", "text", (_j = (_i = this.item) == null ? void 0 : _i.type) != null ? _j : "");
    const note = createTextarea(this.contentEl, "\u5907\u6CE8", (_l = (_k = this.item) == null ? void 0 : _k.note) != null ? _l : "");
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "\u4FDD\u5B58", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      var _a2, _b2;
      const values = {
        id: (_b2 = (_a2 = this.item) == null ? void 0 : _a2.id) != null ? _b2 : `watch-${Date.now()}`,
        name: name.value.trim() || "\u6295\u8D44\u89C2\u5BDF",
        code: code.value.trim(),
        price: Number(price.value) || 0,
        changePercent: Number(change.value) || 0,
        type: type.value.trim() || "\u5176\u5B83",
        note: note.value.trim()
      };
      if (this.item) await this.store.updateInvestmentWatchItem(this.item.id, values);
      else await this.store.addInvestmentWatchItem(values);
      this.onDone();
      this.close();
    });
  }
};
var InvestmentStatisticsModal = class extends import_obsidian27.Modal {
  constructor(app, store) {
    super(app);
    this.store = store;
  }
  onOpen() {
    setupStatsModal(this);
    this.render();
  }
  render() {
    const snapshots = this.store.getInvestmentSnapshots();
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-finance-modal", "cow-finance-stats-modal");
    this.contentEl.createEl("h2", { text: "\u6295\u8D44\u89C2\u5BDF\u7EDF\u8BA1" });
    new FinanceCalendar(
      (date) => snapshots.some((snapshot) => snapshot.date === date) ? ["is-note"] : [],
      (container, date) => {
        snapshots.filter((snapshot) => snapshot.date === date).forEach((snapshot) => {
          var _a;
          const item = this.store.getInvestmentWatchItems().find((watch) => watch.id === snapshot.investmentId);
          const row = container.createDiv({ cls: "cow-data-card" });
          row.createEl("strong", { text: (_a = item == null ? void 0 : item.name) != null ? _a : "\u6295\u8D44\u89C2\u5BDF" });
          row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${currency(snapshot.price)} \xB7 ${snapshot.changePercent}% \xB7 ${snapshot.note || "\u65E0\u5907\u6CE8"}` });
        });
      }
    ).render(this.contentEl.createDiv());
  }
};
var TransactionStatisticsModal = class extends import_obsidian27.Modal {
  constructor(app, store, onDone) {
    super(app);
    this.store = store;
    this.onDone = onDone;
  }
  onOpen() {
    setupStatsModal(this);
    this.render();
  }
  render() {
    const key = monthKey(/* @__PURE__ */ new Date());
    const tx = transactionsForMonth(this.store, key);
    const income = sumTransactions(tx, "income");
    const expense = sumTransactions(tx, "expense");
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-finance-modal", "cow-finance-stats-modal");
    this.contentEl.createEl("h2", { text: "\u8BB0\u8D26\u7EDF\u8BA1" });
    renderSummaryCards(this.contentEl, [["\u672C\u6708\u6536\u5165", currency(income)], ["\u672C\u6708\u652F\u51FA", currency(expense)], ["\u672C\u6708\u51C0\u7ED3\u4F59", currency(income - expense)], ["\u672C\u6708\u8BB0\u8D26\u7B14\u6570", tx.length]]);
    new FinanceCalendar(
      (date) => {
        const items = this.store.getTransactions().filter((item) => item.date === date);
        const dots = items.map((item) => item.type === "income" ? "is-task-done" : "is-task");
        return dots.length > 4 ? [...dots.slice(0, 4), "is-more"] : dots;
      },
      (container, date) => this.renderDayTransactions(container, date)
    ).render(this.contentEl.createDiv());
  }
  renderDayTransactions(container, date) {
    const tx = this.store.getTransactions().filter((item) => item.date === date);
    const income = sumTransactions(tx, "income");
    const expense = sumTransactions(tx, "expense");
    renderSummaryCards(container, [["\u5F53\u65E5\u6536\u5165", currency(income)], ["\u5F53\u65E5\u652F\u51FA", currency(expense)], ["\u51C0\u91D1\u989D", currency(income - expense)], ["\u8BB0\u8D26\u7B14\u6570", tx.length]]);
    tx.forEach((item) => {
      const row = container.createDiv({ cls: "cow-data-card" });
      const head = row.createDiv({ cls: "cow-list-item-head" });
      const body = head.createDiv();
      body.createEl("strong", { text: `${item.type === "income" ? "+" : "-"}${currency(item.amount)} \xB7 ${item.category}` });
      body.createDiv({ cls: "cow-meta-line" }).createSpan({ text: item.note || "\u65E0\u5907\u6CE8" });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      actions.createEl("button", { text: "\u7F16\u8F91", attr: { type: "button" } }).addEventListener("click", () => new AddTransactionModal(this.app, async (values) => {
        await this.store.updateTransaction(item.id, values);
        this.onDone();
        this.render();
      }, item, this.store.getBudgets()).open());
      actions.createEl("button", { text: "\u5220\u9664", cls: "mod-warning", attr: { type: "button" } }).addEventListener("click", async () => {
        await this.store.deleteTransaction(item.id);
        this.onDone();
        this.render();
      });
    });
  }
};

// src/components/finance/ExpenseCategoriesSection.ts
var ExpenseCategoriesSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    this.store.getBudgets().forEach((budget) => {
      const percent = budget.amount === 0 ? 0 : Math.round(budget.spent / budget.amount * 100);
      const row = container.createDiv({ cls: "cow-month-progress-row" });
      row.createSpan({ text: budget.category });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-pink", attr: { style: `width: ${Math.min(100, percent)}%` } });
      row.createSpan({ text: `${percent}%` });
      const actions = row.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u5206\u7C7B" } });
      (0, import_obsidian28.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => openExpenseCategoryModal(this.app, this.store, this.onDataChanged, budget));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u5206\u7C7B" } });
      (0, import_obsidian28.setIcon)(remove, "trash-2");
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

// src/components/finance/FinanceLedgerSection.ts
var import_obsidian29 = require("obsidian");
var FinanceLedgerSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const today5 = formatDateKey(/* @__PURE__ */ new Date());
    const todayTransactions = this.store.getTransactions().filter((item) => item.date === today5);
    const income = todayTransactions.filter((item) => item.type === "income").reduce((sum, item) => sum + item.amount, 0);
    const expense = todayTransactions.filter((item) => item.type === "expense").reduce((sum, item) => sum + item.amount, 0);
    const stats = container.createDiv({ cls: "cow-reading-stat-grid cow-finance-ledger-stats" });
    [
      ["\u4ECA\u65E5\u6536\u5165", `\xA5${income}`],
      ["\u4ECA\u65E5\u652F\u51FA", `\xA5${expense}`],
      ["\u4ECA\u65E5\u7B14\u6570", todayTransactions.length]
    ].forEach(([label, value]) => {
      const item = stats.createDiv();
      item.createEl("strong", { text: String(value) });
      item.createSpan({ text: String(label) });
    });
    const list = container.createDiv({ cls: "cow-data-list cow-compact-list" });
    this.store.getTransactions().slice(-5).reverse().forEach((transaction) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: `${transaction.type === "income" ? "+" : "-"}\xA5${transaction.amount} \xB7 ${transaction.category}` });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${transaction.date} \xB7 ${transaction.note || "\u65E0\u5907\u6CE8"}` });
    });
    const add = container.createEl("button", { cls: "finance-add-transaction-bar", attr: { type: "button" } });
    (0, import_obsidian29.setIcon)(add.createSpan(), "plus");
    add.createSpan({ text: "\u6DFB\u52A0" });
    add.addEventListener("click", () => {
      new AddTransactionModal(this.app, async (transaction) => {
        await this.store.addTransaction(transaction);
        this.onDataChanged();
      }, void 0, this.store.getBudgets()).open();
    });
  }
};

// src/components/finance/FinanceCheckinSection.ts
var import_obsidian30 = require("obsidian");
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
        if (done) (0, import_obsidian30.setIcon)(button, "check");
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
var import_obsidian31 = require("obsidian");
var FinanceTodosSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const list = container.createEl("ul", { cls: "cow-focus-list cow-editable-list" });
    this.store.getFinanceTodos().forEach((item) => {
      var _a;
      const row = list.createEl("li");
      const checkbox = row.createEl("input", { type: "checkbox" });
      checkbox.checked = item.completed;
      checkbox.addEventListener("change", async () => {
        await this.store.updateFinanceTodo(item.id, { completed: checkbox.checked });
        this.onDataChanged();
      });
      row.createSpan({ text: item.title });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${(_a = item.date) != null ? _a : ""}${item.note ? ` \xB7 ${item.note}` : ""}` });
      const actions = row.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u8BB0\u8D26\u5F85\u529E" } });
      (0, import_obsidian31.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => openFinanceTodoModal(this.app, this.store, this.onDataChanged, item));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u8BB0\u8D26\u5F85\u529E" } });
      (0, import_obsidian31.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteFinanceTodo(item.id);
        this.onDataChanged();
      });
    });
  }
};

// src/components/finance/IncomeExpenseTrendSection.ts
var import_obsidian32 = require("obsidian");
var IncomeExpenseTrendSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
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
    const list = container.createDiv({ cls: "cow-data-list cow-compact-list" });
    this.store.getTransactions().slice(-4).reverse().forEach((transaction) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      const head = row.createDiv({ cls: "cow-list-item-head" });
      const body = head.createDiv();
      body.createEl("strong", { text: `${transaction.type === "income" ? "\u6536\u5165" : "\u652F\u51FA"} \xA5${transaction.amount}` });
      body.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${transaction.date} \xB7 ${transaction.category} \xB7 ${transaction.note || "\u65E0\u5907\u6CE8"}` });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u6536\u652F" } });
      (0, import_obsidian32.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => new AddTransactionModal(this.app, async (values) => {
        await this.store.updateTransaction(transaction.id, values);
        this.onDataChanged();
      }, transaction, this.store.getBudgets()).open());
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u6536\u652F" } });
      (0, import_obsidian32.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteTransaction(transaction.id);
        this.onDataChanged();
      });
    });
  }
};

// src/components/finance/InvestmentWatchSection.ts
var import_obsidian33 = require("obsidian");
var InvestmentWatchSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getInvestmentWatchItems().forEach((item) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      const head = row.createDiv({ cls: "cow-list-item-head" });
      const body = head.createDiv();
      body.createEl("strong", { text: item.name });
      body.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${item.code} \xB7 ${item.type} \xB7 \xA5${item.price} \xB7 ${item.changePercent}%${item.note ? ` \xB7 ${item.note}` : ""}` });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u89C2\u5BDF" } });
      (0, import_obsidian33.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => openInvestmentModal(this.app, this.store, this.onDataChanged, item));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u89C2\u5BDF" } });
      (0, import_obsidian33.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteInvestmentWatchItem(item.id);
        this.onDataChanged();
      });
    });
  }
};

// src/components/finance/MonthlyBudgetSection.ts
var MonthlyBudgetSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const grid = container.createDiv({ cls: "cow-reading-stat-grid cow-finance-summary-grid" });
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
};

// src/components/finance/SavingGoalsSection.ts
var import_obsidian34 = require("obsidian");
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
      (0, import_obsidian34.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => openSavingGoalModal(this.app, async (values) => {
        await this.store.updateSavingGoal(goal.id, values);
        this.onDataChanged();
      }, goal));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u50A8\u84C4\u76EE\u6807" } });
      (0, import_obsidian34.setIcon)(remove, "trash-2");
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
var import_obsidian37 = require("obsidian");

// src/components/fitness/FitnessModals.ts
var import_obsidian36 = require("obsidian");

// src/components/fitness/StatisticsCalendar.ts
var import_obsidian35 = require("obsidian");
var StatisticsCalendar = class {
  constructor(options) {
    this.options = options;
    this.calendar = new CalendarService();
    var _a;
    const initial = (_a = options.initialDate) != null ? _a : /* @__PURE__ */ new Date();
    this.month = new Date(initial.getFullYear(), initial.getMonth(), 1);
    this.selectedDate = this.calendar.getDateKey(initial);
  }
  render(container) {
    container.empty();
    const root = container.createDiv({ cls: "cow-fitness-stats-calendar" });
    const calendarPanel = root.createDiv({ cls: "cow-fitness-calendar-panel" });
    const details = root.createDiv({ cls: "cow-fitness-calendar-details" });
    const header = calendarPanel.createDiv({ cls: "cow-fitness-calendar-header" });
    const previous = header.createEl("button", { attr: { type: "button", "aria-label": "\u4E0A\u4E00\u6708" } });
    (0, import_obsidian35.setIcon)(previous, "chevron-left");
    previous.addEventListener("click", () => {
      this.month = this.calendar.addMonths(this.month, -1);
      this.render(container);
    });
    header.createEl("strong", { text: this.calendar.getMonthTitle(this.month) });
    const next = header.createEl("button", { attr: { type: "button", "aria-label": "\u4E0B\u4E00\u6708" } });
    (0, import_obsidian35.setIcon)(next, "chevron-right");
    next.addEventListener("click", () => {
      this.month = this.calendar.addMonths(this.month, 1);
      this.render(container);
    });
    const today5 = header.createEl("button", { cls: "cow-calendar-today", text: "\u4ECA\u5929", attr: { type: "button" } });
    today5.addEventListener("click", () => {
      const now = /* @__PURE__ */ new Date();
      this.month = new Date(now.getFullYear(), now.getMonth(), 1);
      this.selectedDate = this.calendar.getDateKey(now);
      this.render(container);
    });
    const grid = calendarPanel.createDiv({ cls: "cow-fitness-calendar-grid" });
    ["\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u65E5"].forEach((weekday) => grid.createSpan({ cls: "cow-weekday", text: weekday }));
    this.calendar.getMonthCells(this.month, "monday").forEach((date) => {
      if (!date) {
        grid.createSpan({ cls: "cow-calendar-empty" });
        return;
      }
      const dateKey = this.calendar.getDateKey(date);
      const day = grid.createEl("button", {
        cls: `cow-fitness-calendar-day ${dateKey === this.calendar.getDateKey(/* @__PURE__ */ new Date()) ? "is-today" : ""} ${dateKey === this.selectedDate ? "is-selected" : ""}`,
        attr: { type: "button" }
      });
      day.createSpan({ cls: "cow-calendar-day-number", text: String(date.getDate()) });
      const indicators = this.options.getIndicators(dateKey).slice(0, 4);
      const dots = day.createDiv({ cls: "cow-calendar-dots" });
      indicators.forEach((indicator) => dots.createSpan({ cls: `is-${indicator}` }));
      day.addEventListener("click", () => {
        this.selectedDate = dateKey;
        this.render(container);
      });
    });
    details.createEl("h3", { text: this.selectedDate });
    details.createDiv({ cls: "cow-meta-line" }).createSpan({ text: this.calendar.getWeekdayLabel(/* @__PURE__ */ new Date(`${this.selectedDate}T00:00:00`)) });
    this.options.renderDayDetails(details, this.selectedDate);
  }
};

// src/components/fitness/FitnessModals.ts
function today3() {
  return formatDateKey(/* @__PURE__ */ new Date());
}
function nowIso2() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
function createField(container, label, type, value) {
  const isPicker = type === "date" || type === "time";
  const row = container.createDiv({ cls: `cow-fitness-form-row ${isPicker ? "is-picker" : ""}` });
  row.createEl("label", { text: label });
  const input = row.createEl("input", { attr: { type, value } });
  if (isPicker) {
    row.addEventListener("click", (event) => {
      var _a;
      if (event.target instanceof HTMLInputElement && event.target !== input) return;
      input.focus();
      try {
        (_a = input.showPicker) == null ? void 0 : _a.call(input);
      } catch (e) {
        input.focus();
      }
    });
  }
  return input;
}
function createTextArea(container, label, value) {
  const row = container.createDiv({ cls: "cow-fitness-form-row" });
  row.createEl("label", { text: label });
  return row.createEl("textarea", { text: value });
}
function toNumber(input) {
  return Number(input.value) || 0;
}
function setupEditModal2(modal, className) {
  applyResizableModal(modal, {
    className,
    width: "min(760px, 90vw)",
    maxWidth: "94vw",
    maxHeight: "88vh",
    minWidth: "min(420px, 90vw)",
    minHeight: "min(320px, 80vh)"
  });
}
function setupStatsModal2(modal, className) {
  applyResizableModal(modal, {
    className,
    width: "min(1050px, 92vw)",
    height: "min(720px, 86vh)",
    maxWidth: "96vw",
    maxHeight: "92vh",
    minWidth: "min(620px, 92vw)",
    minHeight: "min(420px, 86vh)"
  });
}
function openBodyMeasurementModal2(app, store, onDone, item) {
  new BodyMeasurementModal(app, store, onDone, item).open();
}
var BodyMeasurementModal = class extends import_obsidian36.Modal {
  constructor(app, store, onDone, item) {
    super(app);
    this.store = store;
    this.onDone = onDone;
    this.item = item;
  }
  onOpen() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
    setupEditModal2(this, "cute-fitness-edit-modal");
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-fitness-modal");
    this.contentEl.createEl("h2", { text: this.item ? "\u7F16\u8F91\u8EAB\u4F53\u6570\u636E" : "\u8BB0\u5F55\u8EAB\u4F53\u6570\u636E" });
    const form = this.contentEl.createDiv({ cls: "cow-fitness-form-grid" });
    const date = createField(form, "\u65E5\u671F", "date", (_b = (_a = this.item) == null ? void 0 : _a.date) != null ? _b : today3());
    const weight = createField(form, "\u4F53\u91CD", "number", String((_d = (_c = this.item) == null ? void 0 : _c.weight) != null ? _d : ""));
    const bmi = createField(form, "BMI", "number", String((_f = (_e = this.item) == null ? void 0 : _e.bmi) != null ? _f : ""));
    const waist = createField(form, "\u8170\u56F4", "number", String((_h = (_g = this.item) == null ? void 0 : _g.waist) != null ? _h : ""));
    const chest = createField(form, "\u80F8\u56F4", "number", String((_j = (_i = this.item) == null ? void 0 : _i.chest) != null ? _j : ""));
    const hip = createField(form, "\u81C0\u56F4", "number", String((_l = (_k = this.item) == null ? void 0 : _k.hip) != null ? _l : ""));
    const note = createTextArea(this.contentEl, "\u5907\u6CE8", (_n = (_m = this.item) == null ? void 0 : _m.note) != null ? _n : "");
    [weight, bmi, waist, chest, hip].forEach((input) => input.setAttr("step", "0.1"));
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "\u4FDD\u5B58", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      var _a2, _b2, _c2, _d2, _e2;
      const values = {
        id: (_b2 = (_a2 = this.item) == null ? void 0 : _a2.id) != null ? _b2 : `measure-${Date.now()}`,
        date: date.value || today3(),
        weight: toNumber(weight),
        bmi: toNumber(bmi),
        waist: toNumber(waist),
        chest: toNumber(chest),
        hip: toNumber(hip),
        note: note.value.trim(),
        createdAt: (_d2 = (_c2 = this.item) == null ? void 0 : _c2.createdAt) != null ? _d2 : nowIso2(),
        updatedAt: nowIso2()
      };
      if (this.item) {
        await this.store.updateBodyMeasurement((_e2 = this.item.id) != null ? _e2 : this.item.date, values);
        this.onDone();
        this.close();
        return;
      }
      const sameDate = this.store.getBodyMeasurements().find((record) => record.date === values.date);
      if (sameDate) {
        new SameDayMeasurementModal(this.app, async (mode) => {
          var _a3;
          if (mode === "update") {
            await this.store.updateBodyMeasurement((_a3 = sameDate.id) != null ? _a3 : sameDate.date, { ...values, id: sameDate.id });
          } else {
            await this.store.addBodyMeasurement({ ...values, id: `measure-${Date.now()}` });
          }
          this.onDone();
          this.close();
        }).open();
        return;
      }
      await this.store.addBodyMeasurement(values);
      this.onDone();
      this.close();
    });
  }
};
var SameDayMeasurementModal = class extends import_obsidian36.Modal {
  constructor(app, onChoose) {
    super(app);
    this.onChoose = onChoose;
  }
  onOpen() {
    setupEditModal2(this, "cute-fitness-confirm-modal");
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "\u5F53\u5929\u5DF2\u6709\u8BB0\u5F55" });
    this.contentEl.createEl("p", { text: "\u9ED8\u8BA4\u5EFA\u8BAE\u66F4\u65B0\u5F53\u5929\u8BB0\u5F55\uFF0C\u4E5F\u53EF\u4EE5\u4FDD\u7559\u4E3A\u65B0\u589E\u8BB0\u5F55\u3002" });
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "\u65B0\u589E\u8BB0\u5F55", attr: { type: "button" } }).addEventListener("click", async () => {
      await this.onChoose("new");
      this.close();
    });
    actions.createEl("button", { text: "\u66F4\u65B0\u5F53\u5929\u8BB0\u5F55", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      await this.onChoose("update");
      this.close();
    });
  }
};
var BodyMeasurementStatisticsModal = class extends import_obsidian36.Modal {
  constructor(app, store, onDone) {
    super(app);
    this.store = store;
    this.onDone = onDone;
  }
  onOpen() {
    setupStatsModal2(this, "cute-fitness-stats-modal");
    this.render();
  }
  render() {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-fitness-modal", "cow-fitness-stats-modal");
    this.contentEl.createEl("h2", { text: "\u8EAB\u4F53\u6570\u636E\u7EDF\u8BA1" });
    const measurements = this.store.getBodyMeasurements();
    const first = measurements[0];
    const latest = measurements[measurements.length - 1];
    const stats = this.contentEl.createDiv({ cls: "cow-stats-card-grid" });
    [
      ["\u4F53\u91CD\u53D8\u5316", this.formatDelta(latest == null ? void 0 : latest.weight, first == null ? void 0 : first.weight, "kg")],
      ["BMI\u53D8\u5316", this.formatDelta(latest == null ? void 0 : latest.bmi, first == null ? void 0 : first.bmi, "")],
      ["\u8170\u56F4\u53D8\u5316", this.formatDelta(latest == null ? void 0 : latest.waist, first == null ? void 0 : first.waist, "cm")],
      ["\u80F8\u56F4\u53D8\u5316", this.formatDelta(latest == null ? void 0 : latest.chest, first == null ? void 0 : first.chest, "cm")],
      ["\u81C0\u56F4\u53D8\u5316", this.formatDelta(latest == null ? void 0 : latest.hip, first == null ? void 0 : first.hip, "cm")]
    ].forEach(([label, value]) => {
      const card = stats.createDiv({ cls: "cow-stats-card" });
      card.createEl("strong", { text: value });
      card.createSpan({ text: label });
    });
    const calendarRoot = this.contentEl.createDiv();
    new StatisticsCalendar({
      getIndicators: (dateKey) => measurements.some((item) => item.date === dateKey) ? ["pink"] : [],
      renderDayDetails: (container, dateKey) => this.renderMeasurementDetails(container, dateKey)
    }).render(calendarRoot);
  }
  renderMeasurementDetails(container, dateKey) {
    const records = this.store.getBodyMeasurements().filter((item) => item.date === dateKey);
    if (records.length === 0) {
      container.createEl("p", { cls: "cow-empty-state", text: "\u8FD9\u4E00\u5929\u6CA1\u6709\u8EAB\u4F53\u6570\u636E\u3002" });
      return;
    }
    records.forEach((record) => {
      const row = container.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: `${record.weight}kg \xB7 BMI ${record.bmi}` });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `\u8170\u56F4 ${record.waist}cm \xB7 \u80F8\u56F4 ${record.chest}cm \xB7 \u81C0\u56F4 ${record.hip}cm` });
      if (record.note) row.createEl("p", { text: record.note });
      const actions = row.createDiv({ cls: "cow-list-item-actions" });
      actions.createEl("button", { text: "\u7F16\u8F91", attr: { type: "button" } }).addEventListener("click", () => openBodyMeasurementModal2(this.app, this.store, () => {
        this.onDone();
        this.render();
      }, record));
      actions.createEl("button", { text: "\u5220\u9664", cls: "mod-warning", attr: { type: "button" } }).addEventListener("click", async () => {
        var _a;
        await this.store.deleteBodyMeasurement((_a = record.id) != null ? _a : record.date);
        this.onDone();
        this.render();
      });
    });
  }
  formatDelta(latest, first, unit = "") {
    if (latest === void 0 || first === void 0) return "--";
    const delta = Math.round((latest - first) * 10) / 10;
    return `${delta > 0 ? "+" : ""}${delta}${unit}`;
  }
};
function openDailyHealthHabitModal(app, store, onDone, date = today3()) {
  new DailyHealthHabitModal(app, store, onDone, date).open();
}
var DailyHealthHabitModal = class extends import_obsidian36.Modal {
  constructor(app, store, onDone, date) {
    super(app);
    this.store = store;
    this.onDone = onDone;
    this.date = date;
  }
  onOpen() {
    setupEditModal2(this, "cute-fitness-edit-modal");
    this.render();
  }
  render() {
    var _a, _b, _c, _d;
    const record = this.store.getFitnessDailyRecord(this.date);
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-fitness-modal");
    this.contentEl.createEl("h2", { text: "\u7F16\u8F91\u4E60\u60EF" });
    const dateInput = createField(this.contentEl, "\u65E5\u671F", "date", this.date);
    dateInput.addEventListener("change", () => {
      this.date = dateInput.value || today3();
      this.render();
    });
    const water = this.contentEl.createDiv({ cls: "cow-fitness-form-section" });
    water.createEl("h3", { text: "\u996E\u6C34" });
    const waterGoal = createField(water, "\u996E\u6C34\u76EE\u6807\uFF08\u676F\uFF09", "number", String(record.waterGoal));
    const waterCups = createField(water, "\u4ECA\u65E5\u996E\u6C34\u676F\u6570", "number", String(record.waterCups));
    const waterStep = water.createDiv({ cls: "cow-fitness-stepper" });
    waterStep.createEl("button", { text: "-", attr: { type: "button" } }).addEventListener("click", () => waterCups.value = String(Math.max(0, toNumber(waterCups) - 1)));
    waterStep.createEl("button", { text: "+", attr: { type: "button" } }).addEventListener("click", () => waterCups.value = String(toNumber(waterCups) + 1));
    const waterNote = createTextArea(water, "\u996E\u6C34\u5907\u6CE8", (_a = record.waterNote) != null ? _a : "");
    const sleep = this.contentEl.createDiv({ cls: "cow-fitness-form-section" });
    sleep.createEl("h3", { text: "\u7761\u7720" });
    const sleepGoal = createField(sleep, "\u7761\u7720\u76EE\u6807\uFF08\u5C0F\u65F6\uFF09", "number", String(record.sleepGoal));
    const sleepHours = createField(sleep, "\u7761\u7720\u65F6\u957F\uFF08\u5C0F\u65F6\uFF09", "number", String(record.sleepHours));
    const bedtime = createField(sleep, "\u5165\u7761\u65F6\u95F4", "time", (_b = record.bedtime) != null ? _b : "");
    const wakeTime = createField(sleep, "\u8D77\u5E8A\u65F6\u95F4", "time", (_c = record.wakeTime) != null ? _c : "");
    const sleepNote = createTextArea(sleep, "\u7761\u7720\u5907\u6CE8", (_d = record.sleepNote) != null ? _d : "");
    const custom = this.contentEl.createDiv({ cls: "cow-fitness-form-section" });
    const customHead = custom.createDiv({ cls: "cow-fitness-subhead" });
    customHead.createEl("h3", { text: "\u81EA\u5B9A\u4E49\u4E60\u60EF" });
    customHead.createEl("button", { text: "+ \u6DFB\u52A0\u4E60\u60EF", attr: { type: "button" } }).addEventListener("click", () => {
      new FitnessHabitDefinitionModal(this.app, this.store, () => this.render()).open();
    });
    this.store.getFitnessHabitDefinitions().forEach((definition) => this.renderCustomHabit(custom, definition));
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "\u4FDD\u5B58", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      var _a2, _b2;
      await this.store.updateFitnessDailyRecord(this.date, {
        waterGoal: toNumber(waterGoal),
        waterCups: toNumber(waterCups),
        waterNote: waterNote.value.trim(),
        sleepGoal: toNumber(sleepGoal),
        sleepHours: toNumber(sleepHours),
        bedtime: bedtime.value,
        wakeTime: wakeTime.value,
        sleepNote: sleepNote.value.trim()
      });
      const rows = this.contentEl.querySelectorAll("[data-fitness-habit-id]");
      for (const input of Array.from(rows)) {
        const habitId = (_a2 = input.dataset.fitnessHabitId) != null ? _a2 : "";
        const note = this.contentEl.querySelector(`[data-fitness-habit-note-id="${habitId}"]`);
        await this.store.updateFitnessHabitRecord(this.date, habitId, { actualValue: toNumber(input), note: (_b2 = note == null ? void 0 : note.value.trim()) != null ? _b2 : "" });
      }
      this.onDone();
      this.close();
    });
  }
  renderCustomHabit(container, definition) {
    var _a, _b;
    const daily = this.store.getFitnessHabitRecords(this.date).find((item) => item.habitId === definition.id);
    const row = container.createDiv({ cls: "cow-fitness-habit-row" });
    const body = row.createDiv();
    body.createEl("strong", { text: definition.name });
    body.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${definition.targetName}: ${definition.targetValue}${definition.unit}` });
    const input = row.createEl("input", { attr: { type: "number", value: String((_a = daily == null ? void 0 : daily.actualValue) != null ? _a : 0) } });
    input.dataset.fitnessHabitId = definition.id;
    const note = row.createEl("textarea", { text: (_b = daily == null ? void 0 : daily.note) != null ? _b : "", attr: { placeholder: "\u4ECA\u65E5\u5907\u6CE8" } });
    note.dataset.fitnessHabitNoteId = definition.id;
    const actions = row.createDiv({ cls: "cow-list-item-actions" });
    actions.createEl("button", { text: "\u2191", attr: { type: "button", "aria-label": "\u4E0A\u79FB" } }).addEventListener("click", async () => {
      await this.store.moveFitnessHabitDefinition(definition.id, -1);
      this.render();
    });
    actions.createEl("button", { text: "\u2193", attr: { type: "button", "aria-label": "\u4E0B\u79FB" } }).addEventListener("click", async () => {
      await this.store.moveFitnessHabitDefinition(definition.id, 1);
      this.render();
    });
    const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u4E60\u60EF" } });
    (0, import_obsidian36.setIcon)(edit, "pencil");
    edit.addEventListener("click", () => new FitnessHabitDefinitionModal(this.app, this.store, () => this.render(), definition).open());
    const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u4E60\u60EF" } });
    (0, import_obsidian36.setIcon)(remove, "trash-2");
    remove.addEventListener("click", async () => {
      await this.store.deleteFitnessHabitDefinition(definition.id);
      this.render();
    });
  }
};
var FitnessHabitDefinitionModal = class extends import_obsidian36.Modal {
  constructor(app, store, onDone, definition) {
    super(app);
    this.store = store;
    this.onDone = onDone;
    this.definition = definition;
  }
  onOpen() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    setupEditModal2(this, "cute-fitness-edit-modal");
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-fitness-modal");
    this.contentEl.createEl("h2", { text: this.definition ? "\u7F16\u8F91\u81EA\u5B9A\u4E49\u4E60\u60EF" : "\u65B0\u589E\u81EA\u5B9A\u4E49\u4E60\u60EF" });
    const name = createField(this.contentEl, "\u4E60\u60EF\u540D\u79F0", "text", (_b = (_a = this.definition) == null ? void 0 : _a.name) != null ? _b : "");
    const targetName = createField(this.contentEl, "\u76EE\u6807\u540D\u79F0", "text", (_d = (_c = this.definition) == null ? void 0 : _c.targetName) != null ? _d : "");
    const targetValue = createField(this.contentEl, "\u76EE\u6807\u503C", "number", String((_f = (_e = this.definition) == null ? void 0 : _e.targetValue) != null ? _f : 0));
    const unit = createField(this.contentEl, "\u5355\u4F4D", "text", (_h = (_g = this.definition) == null ? void 0 : _g.unit) != null ? _h : "");
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "\u4FDD\u5B58", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      const values = {
        name: name.value.trim() || "\u81EA\u5B9A\u4E49\u4E60\u60EF",
        targetName: targetName.value.trim() || "\u6BCF\u65E5\u76EE\u6807",
        targetValue: toNumber(targetValue),
        unit: unit.value.trim()
      };
      if (this.definition) {
        await this.store.updateFitnessHabitDefinition(this.definition.id, values);
      } else {
        await this.store.addFitnessHabitDefinition(values);
      }
      this.onDone();
      this.close();
    });
  }
};
var HealthHabitStatisticsModal = class extends import_obsidian36.Modal {
  constructor(app, store) {
    super(app);
    this.store = store;
    this.mode = "all";
  }
  onOpen() {
    setupStatsModal2(this, "cute-fitness-stats-modal");
    this.render();
  }
  render() {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-fitness-modal", "cow-fitness-stats-modal");
    this.contentEl.createEl("h2", { text: "\u4E60\u60EF\u7EDF\u8BA1" });
    const filters = this.contentEl.createDiv({ cls: "cow-focus-filter-row" });
    [
      ["all", "\u5168\u90E8"],
      ["water", "\u996E\u6C34"],
      ["sleep", "\u7761\u7720"],
      ["custom", "\u81EA\u5B9A\u4E49\u4E60\u60EF"]
    ].forEach(([id, label]) => {
      const button = filters.createEl("button", { cls: this.mode === id ? "is-active" : "", text: label, attr: { type: "button" } });
      button.addEventListener("click", () => {
        this.mode = id;
        this.render();
      });
    });
    const root = this.contentEl.createDiv();
    new StatisticsCalendar({
      getIndicators: (dateKey) => this.getHabitIndicators(dateKey),
      renderDayDetails: (container, dateKey) => this.renderHealthDetails(container, dateKey)
    }).render(root);
  }
  getHabitIndicators(dateKey) {
    const record = this.store.getFitnessDailyRecord(dateKey);
    const custom = this.store.getFitnessHabitRecords(dateKey);
    const dots = [];
    if ((this.mode === "all" || this.mode === "water") && (record.waterCups > 0 || record.waterNote)) dots.push("blue");
    if ((this.mode === "all" || this.mode === "sleep") && (record.sleepHours > 0 || record.bedtime || record.wakeTime)) dots.push("purple");
    if ((this.mode === "all" || this.mode === "custom") && custom.length > 0) dots.push("green");
    return dots;
  }
  renderHealthDetails(container, dateKey) {
    const record = this.store.getFitnessDailyRecord(dateKey);
    const list = container.createDiv({ cls: "cow-data-list" });
    list.createDiv({ cls: "cow-data-card" }).createEl("strong", { text: `\u996E\u6C34 ${record.waterCups}/${record.waterGoal} \u676F` });
    if (record.waterNote) list.createDiv({ cls: "cow-data-card" }).createEl("p", { text: record.waterNote });
    list.createDiv({ cls: "cow-data-card" }).createEl("strong", { text: `\u7761\u7720 ${record.sleepHours}/${record.sleepGoal} \u5C0F\u65F6` });
    list.createDiv({ cls: "cow-data-card" }).createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${record.bedtime || "--"} - ${record.wakeTime || "--"}` });
    this.store.getFitnessHabitDefinitions().forEach((definition) => {
      var _a;
      const daily = this.store.getFitnessHabitRecords(dateKey).find((item) => item.habitId === definition.id);
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: definition.name });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${(_a = daily == null ? void 0 : daily.actualValue) != null ? _a : 0}/${definition.targetValue}${definition.unit}` });
    });
  }
};
function openFitnessGoalModal2(app, store, onDone, goal) {
  new FitnessGoalModal(app, store, onDone, goal).open();
}
var FitnessGoalModal = class extends import_obsidian36.Modal {
  constructor(app, store, onDone, goal) {
    super(app);
    this.store = store;
    this.onDone = onDone;
    this.goal = goal;
  }
  onOpen() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
    setupEditModal2(this, "cute-fitness-edit-modal");
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-fitness-modal");
    this.contentEl.createEl("h2", { text: this.goal ? "\u7F16\u8F91\u5065\u8EAB\u76EE\u6807" : "\u65B0\u589E\u5065\u8EAB\u76EE\u6807" });
    const title = createField(this.contentEl, "\u76EE\u6807\u540D\u79F0", "text", (_b = (_a = this.goal) == null ? void 0 : _a.title) != null ? _b : "");
    const current = createField(this.contentEl, "\u5F53\u524D\u503C", "number", String((_f = (_e = (_c = this.goal) == null ? void 0 : _c.currentValue) != null ? _e : (_d = this.goal) == null ? void 0 : _d.current) != null ? _f : 0));
    const target = createField(this.contentEl, "\u76EE\u6807\u503C", "number", String((_j = (_i = (_g = this.goal) == null ? void 0 : _g.targetValue) != null ? _i : (_h = this.goal) == null ? void 0 : _h.target) != null ? _j : 0));
    const unit = createField(this.contentEl, "\u5355\u4F4D", "text", (_l = (_k = this.goal) == null ? void 0 : _k.unit) != null ? _l : "");
    const startDate = createField(this.contentEl, "\u5F00\u59CB\u65E5\u671F", "date", (_n = (_m = this.goal) == null ? void 0 : _m.startDate) != null ? _n : today3());
    const deadline = createField(this.contentEl, "\u622A\u6B62\u65E5\u671F", "date", (_p = (_o = this.goal) == null ? void 0 : _o.deadline) != null ? _p : today3());
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "\u4FDD\u5B58", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      var _a2, _b2, _c2, _d2, _e2, _f2, _g2;
      const values = {
        id: (_b2 = (_a2 = this.goal) == null ? void 0 : _a2.id) != null ? _b2 : `fitness-goal-${Date.now()}`,
        title: title.value.trim() || "\u5065\u8EAB\u76EE\u6807",
        currentValue: toNumber(current),
        targetValue: toNumber(target),
        unit: unit.value.trim(),
        startDate: startDate.value || today3(),
        deadline: deadline.value || today3(),
        completedDate: (_c2 = this.goal) == null ? void 0 : _c2.completedDate,
        status: (_e2 = (_d2 = this.goal) == null ? void 0 : _d2.status) != null ? _e2 : "active",
        createdAt: (_g2 = (_f2 = this.goal) == null ? void 0 : _f2.createdAt) != null ? _g2 : nowIso2(),
        updatedAt: nowIso2()
      };
      if (this.goal) {
        await this.store.updateFitnessGoal(this.goal.id, values);
      } else {
        await this.store.addFitnessGoal(values);
      }
      this.onDone();
      this.close();
    });
  }
};
var FitnessGoalStatisticsModal = class extends import_obsidian36.Modal {
  constructor(app, store, onDone) {
    super(app);
    this.store = store;
    this.onDone = onDone;
    this.tab = "all";
  }
  onOpen() {
    setupStatsModal2(this, "cute-fitness-stats-modal");
    this.render();
  }
  render() {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-fitness-modal", "cow-fitness-stats-modal");
    this.contentEl.createEl("h2", { text: "\u5065\u8EAB\u76EE\u6807\u7EDF\u8BA1" });
    const goals = this.store.getFitnessGoals();
    const active = goals.filter((goal) => getGoalStatus(goal) === "active");
    const completed = goals.filter((goal) => getGoalStatus(goal) === "completed");
    const overdue = goals.filter((goal) => getGoalStatus(goal) === "overdue");
    const stats = this.contentEl.createDiv({ cls: "cow-stats-card-grid" });
    [
      ["\u8FDB\u884C\u4E2D", active.length],
      ["\u5DF2\u5B8C\u6210", completed.length],
      ["\u5DF2\u903E\u671F", overdue.length],
      ["\u5B8C\u6210\u7387", `${goals.length ? Math.round(completed.length / goals.length * 100) : 0}%`]
    ].forEach(([label, value]) => {
      const card = stats.createDiv({ cls: "cow-stats-card" });
      card.createEl("strong", { text: String(value) });
      card.createSpan({ text: String(label) });
    });
    const tabs = this.contentEl.createDiv({ cls: "cow-focus-filter-row" });
    [
      ["all", "\u5168\u90E8"],
      ["active", "\u8FDB\u884C\u4E2D"],
      ["completed", "\u5DF2\u5B8C\u6210"],
      ["overdue", "\u5DF2\u903E\u671F"],
      ["past", "\u5F80\u65E5\u76EE\u6807"]
    ].forEach(([id, label]) => {
      tabs.createEl("button", { cls: this.tab === id ? "is-active" : "", text: label, attr: { type: "button" } }).addEventListener("click", () => {
        this.tab = id;
        this.render();
      });
    });
    const calendarRoot = this.contentEl.createDiv();
    new StatisticsCalendar({
      getIndicators: (dateKey) => this.getGoalIndicators(dateKey),
      renderDayDetails: (container, dateKey) => this.renderGoalDetails(container, dateKey)
    }).render(calendarRoot);
    this.renderGoalList(this.contentEl.createDiv({ cls: "cow-data-list cow-fitness-history-list" }));
  }
  getGoalIndicators(dateKey) {
    const dots = [];
    this.store.getFitnessGoals().forEach((goal) => {
      if (goal.startDate === dateKey) dots.push("blue");
      if (goal.deadline === dateKey) dots.push("yellow");
      if (goal.completedDate === dateKey) dots.push("green");
    });
    return dots;
  }
  renderGoalDetails(container, dateKey) {
    const goals = this.store.getFitnessGoals().filter((goal) => goal.startDate === dateKey || goal.deadline === dateKey || goal.completedDate === dateKey);
    if (goals.length === 0) {
      container.createEl("p", { cls: "cow-empty-state", text: "\u8FD9\u4E00\u5929\u6CA1\u6709\u76F8\u5173\u76EE\u6807\u3002" });
      return;
    }
    goals.forEach((goal) => container.createDiv({ cls: "cow-data-card" }).createEl("strong", { text: goal.title }));
  }
  renderGoalList(container) {
    this.store.getFitnessGoals().filter((goal) => {
      const status = getGoalStatus(goal);
      if (this.tab === "past") return status === "completed" && Boolean(goal.completedDate && goal.completedDate < today3());
      if (this.tab === "all") return true;
      return status === this.tab;
    }).forEach((goal) => {
      var _a, _b, _c, _d;
      const row = container.createDiv({ cls: `cow-data-card cow-fitness-goal-${getGoalStatus(goal)}` });
      row.createEl("strong", { text: goal.title });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${(_b = (_a = goal.currentValue) != null ? _a : goal.current) != null ? _b : 0}/${(_d = (_c = goal.targetValue) != null ? _c : goal.target) != null ? _d : 0}${goal.unit} \xB7 ${goal.deadline}` });
    });
  }
};
function openHealthReminderModal(app, store, onDone, reminder) {
  new HealthReminderModal(app, store, onDone, reminder).open();
}
var HealthReminderModal = class extends import_obsidian36.Modal {
  constructor(app, store, onDone, reminder) {
    super(app);
    this.store = store;
    this.onDone = onDone;
    this.reminder = reminder;
  }
  onOpen() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    setupEditModal2(this, "cute-fitness-edit-modal");
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-fitness-modal");
    this.contentEl.createEl("h2", { text: this.reminder ? "\u7F16\u8F91\u5065\u5EB7\u63D0\u9192" : "\u65B0\u589E\u5065\u5EB7\u63D0\u9192" });
    const title = createField(this.contentEl, "\u63D0\u9192\u540D\u79F0", "text", (_b = (_a = this.reminder) == null ? void 0 : _a.title) != null ? _b : "");
    const date = createField(this.contentEl, "\u65E5\u671F", "date", (_d = (_c = this.reminder) == null ? void 0 : _c.date) != null ? _d : today3());
    const time = createField(this.contentEl, "\u65F6\u95F4", "time", (_f = (_e = this.reminder) == null ? void 0 : _e.time) != null ? _f : "09:00");
    const repeat = this.contentEl.createDiv({ cls: "cow-fitness-form-row" });
    repeat.createEl("label", { text: "\u91CD\u590D" });
    const repeatSelect = repeat.createEl("select");
    [
      ["once", "\u4EC5\u4E00\u6B21"],
      ["daily", "\u6BCF\u5929"],
      ["weekdays", "\u5DE5\u4F5C\u65E5"],
      ["weekly", "\u6BCF\u5468"],
      ["custom", "\u81EA\u5B9A\u4E49\u661F\u671F"]
    ].forEach(([value, label]) => repeatSelect.createEl("option", { text: label, value }));
    repeatSelect.value = (_h = (_g = this.reminder) == null ? void 0 : _g.repeatType) != null ? _h : "once";
    const note = createTextArea(this.contentEl, "\u5907\u6CE8", (_j = (_i = this.reminder) == null ? void 0 : _i.note) != null ? _j : "");
    const enabledRow = this.contentEl.createDiv({ cls: "cow-fitness-form-row is-inline" });
    const enabled = enabledRow.createEl("input", { attr: { type: "checkbox" } });
    enabled.checked = (_l = (_k = this.reminder) == null ? void 0 : _k.enabled) != null ? _l : true;
    enabledRow.createEl("label", { text: "\u542F\u7528\u63D0\u9192" });
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "\u4FDD\u5B58", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      var _a2, _b2, _c2, _d2, _e2, _f2;
      const values = {
        id: (_b2 = (_a2 = this.reminder) == null ? void 0 : _a2.id) != null ? _b2 : `health-${Date.now()}`,
        title: title.value.trim() || "\u5065\u5EB7\u63D0\u9192",
        date: date.value || today3(),
        time: time.value || "09:00",
        repeatType: repeatSelect.value,
        repeatDays: (_d2 = (_c2 = this.reminder) == null ? void 0 : _c2.repeatDays) != null ? _d2 : [],
        note: note.value.trim(),
        enabled: enabled.checked,
        createdAt: (_f2 = (_e2 = this.reminder) == null ? void 0 : _e2.createdAt) != null ? _f2 : nowIso2(),
        updatedAt: nowIso2()
      };
      if (this.reminder) {
        await this.store.updateHealthReminder(this.reminder.id, values);
      } else {
        await this.store.addHealthReminder(values);
      }
      this.onDone();
      this.close();
    });
  }
};
var HealthReminderStatisticsModal = class extends import_obsidian36.Modal {
  constructor(app, store) {
    super(app);
    this.store = store;
  }
  onOpen() {
    setupStatsModal2(this, "cute-fitness-stats-modal");
    this.render();
  }
  render() {
    const logs = this.store.getHealthReminderLogs();
    const week = new Set(this.store.getCurrentWeekDates());
    const weekLogs = logs.filter((log) => week.has(log.date));
    const completed = weekLogs.filter((log) => log.status === "completed" || log.status === "triggered").length;
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-fitness-modal", "cow-fitness-stats-modal");
    this.contentEl.createEl("h2", { text: "\u5065\u5EB7\u63D0\u9192\u7EDF\u8BA1" });
    const stats = this.contentEl.createDiv({ cls: "cow-stats-card-grid" });
    [
      ["\u672C\u5468\u63D0\u9192\u6B21\u6570", weekLogs.length],
      ["\u5DF2\u5B8C\u6210", completed],
      ["\u9519\u8FC7", weekLogs.filter((log) => log.status === "missed").length],
      ["\u5B8C\u6210\u7387", `${weekLogs.length ? Math.round(completed / weekLogs.length * 100) : 0}%`]
    ].forEach(([label, value]) => {
      const card = stats.createDiv({ cls: "cow-stats-card" });
      card.createEl("strong", { text: String(value) });
      card.createSpan({ text: String(label) });
    });
    const root = this.contentEl.createDiv();
    new StatisticsCalendar({
      getIndicators: (dateKey) => logs.some((log) => log.date === dateKey) ? ["red"] : [],
      renderDayDetails: (container, dateKey) => this.renderReminderDetails(container, dateKey)
    }).render(root);
  }
  renderReminderDetails(container, dateKey) {
    const logs = this.store.getHealthReminderLogs().filter((log) => log.date === dateKey);
    if (logs.length === 0) {
      container.createEl("p", { cls: "cow-empty-state", text: "\u8FD9\u4E00\u5929\u6CA1\u6709\u63D0\u9192\u8BB0\u5F55\u3002" });
      return;
    }
    logs.forEach((log) => {
      var _a;
      const reminder = this.store.getHealthReminders().find((item) => item.id === log.reminderId);
      const row = container.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: (_a = reminder == null ? void 0 : reminder.title) != null ? _a : "\u5065\u5EB7\u63D0\u9192" });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${log.scheduledTime} \xB7 ${log.triggeredAt ? new Date(log.triggeredAt).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }) : "--"} \xB7 ${log.status}` });
      if (log.note) row.createEl("p", { text: log.note });
    });
  }
};
function getGoalStatus(goal) {
  if (goal.status === "archived") return "archived";
  if (goal.status === "completed" || goal.completedDate) return "completed";
  if (goal.deadline && goal.deadline < today3()) return "overdue";
  return "active";
}

// src/components/fitness/BodyMeasurementsSection.ts
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
      (0, import_obsidian37.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => {
        openBodyMeasurementModal2(this.app, this.store, this.onDataChanged, item);
      });
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u8BB0\u5F55" } });
      (0, import_obsidian37.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        var _a2;
        await this.store.deleteBodyMeasurement((_a2 = item.id) != null ? _a2 : item.date);
        this.onDataChanged();
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
var import_obsidian38 = require("obsidian");
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
        if (done) (0, import_obsidian38.setIcon)(button, "check");
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
var import_obsidian39 = require("obsidian");
var FitnessGoalsSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getFitnessGoals().filter((goal) => !(getGoalStatus(goal) === "completed" && goal.completedDate && goal.completedDate < (/* @__PURE__ */ new Date()).toISOString().slice(0, 10))).forEach((goal) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      const status = getGoalStatus(goal);
      const row = list.createDiv({ cls: `cow-data-card cow-fitness-goal-${status}` });
      const head = row.createDiv({ cls: "cow-list-item-head" });
      const body = head.createDiv();
      body.createEl("strong", { text: `${status === "completed" ? "\u2713 " : ""}${goal.title}` });
      body.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${(_b = (_a = goal.currentValue) != null ? _a : goal.current) != null ? _b : 0}/${(_d = (_c = goal.targetValue) != null ? _c : goal.target) != null ? _d : 0}${goal.unit} \xB7 ${goal.deadline} \xB7 ${this.statusLabel(status)}` });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u76EE\u6807" } });
      (0, import_obsidian39.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => openFitnessGoalModal2(this.app, this.store, this.onDataChanged, goal));
      if (status !== "completed") {
        const complete = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5B8C\u6210\u76EE\u6807" } });
        (0, import_obsidian39.setIcon)(complete, "check");
        complete.addEventListener("click", async () => {
          await this.store.completeFitnessGoal(goal.id);
          this.onDataChanged();
        });
      }
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u76EE\u6807" } });
      (0, import_obsidian39.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteFitnessGoal(goal.id);
        this.onDataChanged();
      });
      const current = (_f = (_e = goal.currentValue) != null ? _e : goal.current) != null ? _f : 0;
      const target = (_h = (_g = goal.targetValue) != null ? _g : goal.target) != null ? _h : 0;
      const percent = target === 0 ? 0 : Math.round(current / target * 100);
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-green", attr: { style: `width: ${Math.min(100, percent)}%` } });
    });
  }
  statusLabel(status) {
    if (status === "completed") return "\u5DF2\u5B8C\u6210";
    if (status === "overdue") return "\u5DF2\u903E\u671F";
    if (status === "archived") return "\u5DF2\u5F52\u6863";
    return "\u8FDB\u884C\u4E2D";
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
var import_obsidian41 = require("obsidian");

// src/components/goals/GoalActionModals.ts
var import_obsidian40 = require("obsidian");
var GOAL_QUADRANTS = [
  { id: "important-urgent", label: "\u91CD\u8981\u4E14\u7D27\u6025", importance: "important", urgency: "urgent" },
  { id: "important-not-urgent", label: "\u91CD\u8981\u4E0D\u7D27\u6025", importance: "important", urgency: "not-urgent" },
  { id: "not-important-urgent", label: "\u4E0D\u91CD\u8981\u4F46\u7D27\u6025", importance: "not-important", urgency: "urgent" },
  { id: "not-important-not-urgent", label: "\u4E0D\u91CD\u8981\u4E0D\u7D27\u6025", importance: "not-important", urgency: "not-urgent" }
];
function today4() {
  return formatDateKey(/* @__PURE__ */ new Date());
}
function setupEditModal3(modal) {
  applyResizableModal(modal, {
    className: "cute-goal-edit-modal",
    width: "min(760px, 90vw)",
    maxWidth: "94vw",
    maxHeight: "88vh",
    minWidth: "min(420px, 90vw)",
    minHeight: "min(320px, 80vh)"
  });
}
function setupStatsModal3(modal) {
  applyResizableModal(modal, {
    className: "cute-goal-stats-modal",
    width: "min(1050px, 92vw)",
    height: "min(720px, 86vh)",
    maxWidth: "96vw",
    maxHeight: "92vh",
    minWidth: "min(620px, 92vw)",
    minHeight: "min(420px, 86vh)"
  });
}
function createInput2(container, label, type, value) {
  const row = container.createDiv({ cls: `cow-goal-form-row ${type === "date" ? "is-picker" : ""}` });
  row.createEl("label", { text: label });
  const input = row.createEl("input", { attr: { type, value } });
  if (type === "date") {
    row.addEventListener("click", () => {
      var _a;
      input.focus();
      try {
        (_a = input.showPicker) == null ? void 0 : _a.call(input);
      } catch (e) {
        input.focus();
      }
    });
  }
  return input;
}
function createTextarea2(container, label, value) {
  const row = container.createDiv({ cls: "cow-goal-form-row" });
  row.createEl("label", { text: label });
  return row.createEl("textarea", { text: value });
}
function createSelect(container, label, value, options) {
  const row = container.createDiv({ cls: "cow-goal-form-row" });
  row.createEl("label", { text: label });
  const select = row.createEl("select");
  options.forEach((option) => select.createEl("option", { value: option.value, text: option.label }));
  select.value = value;
  return select;
}
function getQuadrant(action) {
  var _a;
  const match = GOAL_QUADRANTS.find((quadrant) => quadrant.importance === action.importance && quadrant.urgency === action.urgency);
  return (_a = match == null ? void 0 : match.id) != null ? _a : "";
}
function applyQuadrant(action, quadrantId) {
  const quadrant = GOAL_QUADRANTS.find((item) => item.id === quadrantId);
  action.importance = quadrant == null ? void 0 : quadrant.importance;
  action.urgency = quadrant == null ? void 0 : quadrant.urgency;
}
function openGoalActionModal(app, store, onDone, action, preset) {
  new GoalActionModal(app, store, onDone, action, preset).open();
}
var GoalActionModal = class extends import_obsidian40.Modal {
  constructor(app, store, onDone, action, preset = {}) {
    super(app);
    this.store = store;
    this.onDone = onDone;
    this.action = action;
    this.preset = preset;
  }
  onOpen() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H;
    setupEditModal3(this);
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-goal-modal");
    this.contentEl.createEl("h2", { text: this.action ? "\u7F16\u8F91\u76EE\u6807\u4EFB\u52A1" : "\u65B0\u589E\u76EE\u6807\u4EFB\u52A1" });
    const goals = this.store.getGoals();
    if (goals.length === 0) {
      this.contentEl.createEl("p", { cls: "cow-empty-state", text: "\u8BF7\u5148\u521B\u5EFA\u5E74\u5EA6\u76EE\u6807\u3002" });
      return;
    }
    const goalId = createSelect(this.contentEl, "\u6240\u5C5E\u76EE\u6807", (_c = (_b = (_a = this.action) == null ? void 0 : _a.goalId) != null ? _b : this.preset.goalId) != null ? _c : goals[0].id, goals.map((goal) => ({ value: goal.id, label: goal.title })));
    const parentOptions = [{ value: "", label: "\u65E0\u7236\u7EA7" }, ...this.store.getGoalActions().filter((item) => {
      var _a2;
      return item.id !== ((_a2 = this.action) == null ? void 0 : _a2.id);
    }).map((item) => ({ value: item.id, label: item.title }))];
    const parentId = createSelect(this.contentEl, "\u7236\u7EA7\u62C6\u89E3\u8282\u70B9", (_f = (_e = (_d = this.action) == null ? void 0 : _d.parentId) != null ? _e : this.preset.parentId) != null ? _f : "", parentOptions);
    const title = createInput2(this.contentEl, "\u6807\u9898", "text", (_i = (_h = (_g = this.action) == null ? void 0 : _g.title) != null ? _h : this.preset.title) != null ? _i : "");
    const description = createTextarea2(this.contentEl, "\u63CF\u8FF0", (_l = (_k = (_j = this.action) == null ? void 0 : _j.description) != null ? _k : this.preset.description) != null ? _l : "");
    const progress = createInput2(this.contentEl, "\u8FDB\u5EA6", "number", String((_o = (_n = (_m = this.action) == null ? void 0 : _m.progress) != null ? _n : this.preset.progress) != null ? _o : 0));
    progress.min = "0";
    progress.max = "100";
    const status = createSelect(this.contentEl, "\u72B6\u6001", (_r = (_q = (_p = this.action) == null ? void 0 : _p.status) != null ? _q : this.preset.status) != null ? _r : "todo", [
      { value: "todo", label: "\u672A\u5F00\u59CB" },
      { value: "in-progress", label: "\u8FDB\u884C\u4E2D" },
      { value: "completed", label: "\u5DF2\u5B8C\u6210" },
      { value: "overdue", label: "\u5DF2\u903E\u671F" }
    ]);
    const startDate = createInput2(this.contentEl, "\u5F00\u59CB\u65E5\u671F", "date", (_u = (_t = (_s = this.action) == null ? void 0 : _s.startDate) != null ? _t : this.preset.startDate) != null ? _u : today4());
    const deadline = createInput2(this.contentEl, "\u622A\u6B62\u65E5\u671F", "date", (_x = (_w = (_v = this.action) == null ? void 0 : _v.deadline) != null ? _w : this.preset.deadline) != null ? _x : today4());
    const milestoneRow = this.contentEl.createDiv({ cls: "cow-goal-form-row is-inline" });
    const isMilestone = milestoneRow.createEl("input", { attr: { type: "checkbox" } });
    isMilestone.checked = (_A = (_z = (_y = this.action) == null ? void 0 : _y.isMilestone) != null ? _z : this.preset.isMilestone) != null ? _A : false;
    milestoneRow.createEl("label", { text: "\u8BBE\u4E3A\u91CC\u7A0B\u7891" });
    const milestoneDate = createInput2(this.contentEl, "\u91CC\u7A0B\u7891\u65E5\u671F", "date", (_D = (_C = (_B = this.action) == null ? void 0 : _B.milestoneDate) != null ? _C : this.preset.milestoneDate) != null ? _D : deadline.value);
    const quadrant = createSelect(this.contentEl, "\u4F18\u5148\u7EA7\u8C61\u9650", getQuadrant((_E = this.action) != null ? _E : this.preset), [{ value: "", label: "\u6682\u4E0D\u8FDB\u5165\u77E9\u9635" }, ...GOAL_QUADRANTS.map((item) => ({ value: item.id, label: item.label }))]);
    const note = createTextarea2(this.contentEl, "\u5907\u6CE8", (_H = (_G = (_F = this.action) == null ? void 0 : _F.note) != null ? _G : this.preset.note) != null ? _H : "");
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "\u4FDD\u5B58", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2;
      if (!title.value.trim()) {
        new import_obsidian40.Notice("\u8BF7\u8F93\u5165\u4EFB\u52A1\u6807\u9898\u3002");
        return;
      }
      const values = {
        id: (_b2 = (_a2 = this.action) == null ? void 0 : _a2.id) != null ? _b2 : `goal-action-${Date.now()}`,
        goalId: goalId.value,
        parentId: parentId.value || void 0,
        title: title.value.trim(),
        description: description.value.trim(),
        status: status.value,
        startDate: startDate.value || void 0,
        deadline: deadline.value || void 0,
        completedDate: status.value === "completed" ? (_d2 = (_c2 = this.action) == null ? void 0 : _c2.completedDate) != null ? _d2 : today4() : void 0,
        progress: Math.max(0, Math.min(100, Number(progress.value) || 0)),
        isMilestone: isMilestone.checked,
        milestoneDate: isMilestone.checked ? milestoneDate.value || deadline.value || today4() : void 0,
        note: note.value.trim(),
        collapsed: (_f2 = (_e2 = this.action) == null ? void 0 : _e2.collapsed) != null ? _f2 : false,
        createdAt: (_h2 = (_g2 = this.action) == null ? void 0 : _g2.createdAt) != null ? _h2 : Date.now(),
        updatedAt: Date.now()
      };
      applyQuadrant(values, quadrant.value);
      if (this.action) await this.store.updateGoalAction(this.action.id, values);
      else await this.store.addGoalAction(values);
      this.onDone();
      this.close();
    });
  }
};
function openAnnualGoalModal(app, store, onDone, goal) {
  new AnnualGoalModal(app, store, onDone, goal).open();
}
var AnnualGoalModal = class extends import_obsidian40.Modal {
  constructor(app, store, onDone, goal) {
    super(app);
    this.store = store;
    this.onDone = onDone;
    this.goal = goal;
  }
  onOpen() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
    setupEditModal3(this);
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-goal-modal");
    this.contentEl.createEl("h2", { text: this.goal ? "\u7F16\u8F91\u5E74\u5EA6\u76EE\u6807" : "\u65B0\u589E\u5E74\u5EA6\u76EE\u6807" });
    const title = createInput2(this.contentEl, "\u6807\u9898", "text", (_b = (_a = this.goal) == null ? void 0 : _a.title) != null ? _b : "");
    const description = createTextarea2(this.contentEl, "\u63CF\u8FF0", (_d = (_c = this.goal) == null ? void 0 : _c.description) != null ? _d : "");
    const category = createInput2(this.contentEl, "\u5206\u7C7B", "text", (_f = (_e = this.goal) == null ? void 0 : _e.category) != null ? _f : "\u4E2A\u4EBA");
    const progress = createInput2(this.contentEl, "\u8FDB\u5EA6", "number", String((_h = (_g = this.goal) == null ? void 0 : _g.progress) != null ? _h : 0));
    const startDate = createInput2(this.contentEl, "\u5F00\u59CB\u65E5\u671F", "date", (_j = (_i = this.goal) == null ? void 0 : _i.startDate) != null ? _j : today4());
    const deadline = createInput2(this.contentEl, "\u622A\u6B62\u65E5\u671F", "date", (_l = (_k = this.goal) == null ? void 0 : _k.deadline) != null ? _l : today4());
    const status = createSelect(this.contentEl, "\u72B6\u6001", (_n = (_m = this.goal) == null ? void 0 : _m.status) != null ? _n : "\u8FDB\u884C\u4E2D", ["\u672A\u5F00\u59CB", "\u8FDB\u884C\u4E2D", "\u5DF2\u5B8C\u6210", "\u6682\u505C"].map((item) => ({ value: item, label: item })));
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "\u4FDD\u5B58", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      var _a2, _b2, _c2, _d2;
      const values = {
        id: (_b2 = (_a2 = this.goal) == null ? void 0 : _a2.id) != null ? _b2 : `goal-${Date.now()}`,
        title: title.value.trim() || "\u5E74\u5EA6\u76EE\u6807",
        description: description.value.trim(),
        category: category.value.trim() || "\u4E2A\u4EBA",
        progress: Math.max(0, Math.min(100, Number(progress.value) || 0)),
        startDate: startDate.value,
        deadline: deadline.value,
        status: status.value,
        completedDate: status.value === "\u5DF2\u5B8C\u6210" ? (_d2 = (_c2 = this.goal) == null ? void 0 : _c2.completedDate) != null ? _d2 : today4() : void 0,
        updatedAt: Date.now()
      };
      if (this.goal) await this.store.updateGoal(this.goal.id, values);
      else await this.store.addGoal(values);
      this.onDone();
      this.close();
    });
  }
};
function openRiskModal(app, store, onDone, risk) {
  new GoalRiskModal(app, store, onDone, risk).open();
}
var GoalRiskModal = class extends import_obsidian40.Modal {
  constructor(app, store, onDone, risk) {
    super(app);
    this.store = store;
    this.onDone = onDone;
    this.risk = risk;
  }
  onOpen() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
    setupEditModal3(this);
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-goal-modal");
    this.contentEl.createEl("h2", { text: this.risk ? "\u7F16\u8F91\u98CE\u9669" : "\u65B0\u589E\u98CE\u9669" });
    const title = createInput2(this.contentEl, "\u540D\u79F0", "text", (_b = (_a = this.risk) == null ? void 0 : _a.title) != null ? _b : "");
    const goalOptions = [{ value: "", label: "\u4E0D\u5173\u8054\u76EE\u6807" }, ...this.store.getGoals().map((goal) => ({ value: goal.id, label: goal.title }))];
    const goalId = createSelect(this.contentEl, "\u5173\u8054\u76EE\u6807", (_d = (_c = this.risk) == null ? void 0 : _c.goalId) != null ? _d : "", goalOptions);
    const level = createSelect(this.contentEl, "\u4E25\u91CD\u7A0B\u5EA6", (_f = (_e = this.risk) == null ? void 0 : _e.level) != null ? _f : "medium", [{ value: "high", label: "\u9AD8" }, { value: "medium", label: "\u4E2D" }, { value: "low", label: "\u4F4E" }]);
    const status = createSelect(this.contentEl, "\u72B6\u6001", (_h = (_g = this.risk) == null ? void 0 : _g.status) != null ? _h : "todo", [{ value: "todo", label: "\u5F85\u5904\u7406" }, { value: "in-progress", label: "\u5904\u7406\u4E2D" }, { value: "resolved", label: "\u5DF2\u89E3\u51B3" }]);
    const discoveredDate = createInput2(this.contentEl, "\u53D1\u73B0\u65E5\u671F", "date", (_j = (_i = this.risk) == null ? void 0 : _i.discoveredDate) != null ? _j : today4());
    const resolvedDate = createInput2(this.contentEl, "\u89E3\u51B3\u65E5\u671F", "date", (_l = (_k = this.risk) == null ? void 0 : _k.resolvedDate) != null ? _l : today4());
    const solution = createTextarea2(this.contentEl, "\u89E3\u51B3\u65B9\u6848 / \u5907\u6CE8", (_n = (_m = this.risk) == null ? void 0 : _m.solution) != null ? _n : "");
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "\u53D6\u6D88", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "\u4FDD\u5B58", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      var _a2, _b2;
      const values = {
        id: (_b2 = (_a2 = this.risk) == null ? void 0 : _a2.id) != null ? _b2 : `risk-${Date.now()}`,
        title: title.value.trim() || "\u98CE\u9669",
        goalId: goalId.value || void 0,
        level: level.value,
        status: status.value,
        discoveredDate: discoveredDate.value,
        resolvedDate: status.value === "resolved" ? resolvedDate.value : void 0,
        solution: solution.value.trim(),
        note: solution.value.trim()
      };
      if (this.risk) await this.store.updateRisk(this.risk.id, values);
      else await this.store.addRisk(values);
      this.onDone();
      this.close();
    });
  }
};
var AnnualGoalStatisticsModal = class extends import_obsidian40.Modal {
  constructor(app, store) {
    super(app);
    this.store = store;
    this.year = (/* @__PURE__ */ new Date()).getFullYear();
  }
  onOpen() {
    setupStatsModal3(this);
    this.render();
  }
  render() {
    const goals = this.store.getGoals().filter((goal) => (goal.deadline || "").startsWith(String(this.year)) || (goal.startDate || "").startsWith(String(this.year)));
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-goal-modal", "cow-goal-stats-modal");
    this.renderYearHeader("\u5E74\u5EA6\u76EE\u6807\u7EDF\u8BA1");
    const completed = goals.filter((goal) => goal.status === "\u5DF2\u5B8C\u6210").length;
    const overdue = goals.filter((goal) => goal.status !== "\u5DF2\u5B8C\u6210" && goal.deadline < today4()).length;
    renderStats(this.contentEl, [["\u5E74\u5EA6\u76EE\u6807\u6570", goals.length], ["\u5B8C\u6210\u6570", completed], ["\u8FDB\u884C\u4E2D", goals.filter((goal) => goal.status === "\u8FDB\u884C\u4E2D").length], ["\u903E\u671F", overdue], ["\u5E73\u5747\u5B8C\u6210\u7387", `${goals.length ? Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length) : 0}%`]]);
    this.renderGoalRows(goals);
  }
  renderYearHeader(title) {
    const header = this.contentEl.createDiv({ cls: "cow-goal-stats-header" });
    header.createEl("button", { text: "<", attr: { type: "button" } }).addEventListener("click", () => {
      this.year -= 1;
      this.render();
    });
    header.createEl("h2", { text: `${title} \xB7 ${this.year}` });
    header.createEl("button", { text: ">", attr: { type: "button" } }).addEventListener("click", () => {
      this.year += 1;
      this.render();
    });
  }
  renderGoalRows(goals) {
    const list = this.contentEl.createDiv({ cls: "cow-data-list" });
    goals.forEach((goal) => {
      const actions = this.store.getGoalActionsForGoal(goal.id);
      const milestones = actions.filter((action) => action.isMilestone);
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: goal.title });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${goal.progress}% \xB7 \u5B50\u4EFB\u52A1\u5B8C\u6210 ${actions.filter((item) => item.status === "completed").length}/${actions.length} \xB7 \u91CC\u7A0B\u7891\u5B8C\u6210 ${milestones.filter((item) => item.status === "completed").length}/${milestones.length} \xB7 \u903E\u671F ${actions.filter((item) => item.status === "overdue").length}` });
    });
  }
};
var GoalBreakdownStatisticsModal = class extends import_obsidian40.Modal {
  constructor(app, store) {
    super(app);
    this.store = store;
  }
  onOpen() {
    setupStatsModal3(this);
    this.render();
  }
  render() {
    const actions = this.store.getGoalActions();
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-goal-modal", "cow-goal-stats-modal");
    this.contentEl.createEl("h2", { text: "\u76EE\u6807\u62C6\u89E3\u7EDF\u8BA1" });
    renderStats(this.contentEl, [["\u603B\u4EFB\u52A1\u6570", actions.length], ["\u5DF2\u5B8C\u6210", actions.filter((item) => item.status === "completed").length], ["\u8FDB\u884C\u4E2D", actions.filter((item) => item.status === "in-progress").length], ["\u903E\u671F", actions.filter((item) => item.status === "overdue").length], ["\u6574\u4F53\u5B8C\u6210\u7387", `${actions.length ? Math.round(actions.reduce((sum, item) => {
      var _a;
      return sum + ((_a = item.progress) != null ? _a : 0);
    }, 0) / actions.length) : 0}%`]]);
    this.store.getGoals().forEach((goal) => {
      const goalActions = this.store.getGoalActionsForGoal(goal.id);
      const row = this.contentEl.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: goal.title });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `\u5B8C\u6210\u7387 ${goalActions.length ? Math.round(goalActions.reduce((sum, item) => {
        var _a;
        return sum + ((_a = item.progress) != null ? _a : 0);
      }, 0) / goalActions.length) : goal.progress}% \xB7 \u5C42\u7EA7\u4EFB\u52A1 ${goalActions.length} \xB7 \u903E\u671F ${goalActions.filter((item) => item.status === "overdue").length}` });
    });
  }
};
var MilestoneStatisticsModal = class extends import_obsidian40.Modal {
  constructor(app, store) {
    super(app);
    this.store = store;
  }
  onOpen() {
    setupStatsModal3(this);
    this.render();
  }
  render() {
    const milestones = this.store.getGoalActions().filter((item) => item.isMilestone);
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-goal-modal", "cow-goal-stats-modal");
    this.contentEl.createEl("h2", { text: "\u91CC\u7A0B\u7891\u7EDF\u8BA1" });
    renderStats(this.contentEl, [["\u91CC\u7A0B\u7891\u603B\u6570", milestones.length], ["\u5DF2\u5B8C\u6210", milestones.filter((item) => item.status === "completed").length], ["\u672A\u5B8C\u6210", milestones.filter((item) => item.status !== "completed").length], ["\u5DF2\u903E\u671F", milestones.filter((item) => item.status === "overdue").length], ["\u6309\u65F6\u5B8C\u6210\u7387", `${getOnTimeRate(milestones)}%`]]);
    renderTimeline(this.contentEl, this.store, milestones);
  }
};
var PriorityStatisticsModal = class extends import_obsidian40.Modal {
  constructor(app, store) {
    super(app);
    this.store = store;
  }
  onOpen() {
    setupStatsModal3(this);
    this.render();
  }
  render() {
    const items = this.store.getGoalActions().filter((item) => item.importance && item.urgency);
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-goal-modal", "cow-goal-stats-modal");
    this.contentEl.createEl("h2", { text: "\u4F18\u5148\u7EA7\u7EDF\u8BA1" });
    renderStats(this.contentEl, [["\u5F53\u524D\u4EFB\u52A1", items.length], ["\u5DF2\u5B8C\u6210", items.filter((item) => item.status === "completed").length], ["\u903E\u671F", items.filter((item) => item.status === "overdue").length], ["\u5B8C\u6210\u7387", `${items.length ? Math.round(items.filter((item) => item.status === "completed").length / items.length * 100) : 0}%`]]);
    GOAL_QUADRANTS.forEach((quadrant) => this.contentEl.createDiv({ cls: "cow-data-card" }).createEl("strong", { text: `${quadrant.label}\uFF1A${items.filter((item) => item.importance === quadrant.importance && item.urgency === quadrant.urgency).length}` }));
  }
};
var RiskStatisticsModal = class extends import_obsidian40.Modal {
  constructor(app, store) {
    super(app);
    this.store = store;
  }
  onOpen() {
    setupStatsModal3(this);
    this.render();
  }
  render() {
    const risks = this.store.getRisks();
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-goal-modal", "cow-goal-stats-modal");
    this.contentEl.createEl("h2", { text: "\u98CE\u9669\u7EDF\u8BA1" });
    renderStats(this.contentEl, [["\u603B\u98CE\u9669", risks.length], ["\u5F85\u5904\u7406", risks.filter((item) => {
      var _a;
      return ((_a = item.status) != null ? _a : "todo") === "todo";
    }).length], ["\u5904\u7406\u4E2D", risks.filter((item) => item.status === "in-progress").length], ["\u5DF2\u89E3\u51B3", risks.filter((item) => item.status === "resolved").length], ["\u9AD8\u98CE\u9669\u6570\u91CF", risks.filter((item) => item.level === "high").length]]);
    risks.forEach((risk) => {
      var _a;
      return this.contentEl.createDiv({ cls: "cow-data-card" }).createEl("strong", { text: `${risk.title} \xB7 ${risk.level} \xB7 ${(_a = risk.status) != null ? _a : "todo"}` });
    });
  }
};
var SimpleGoalStatisticsModal = class extends import_obsidian40.Modal {
  constructor(app, store, title) {
    super(app);
    this.store = store;
    this.title = title;
  }
  onOpen() {
    setupStatsModal3(this);
    this.render();
  }
  render() {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-goal-modal", "cow-goal-stats-modal");
    this.contentEl.createEl("h2", { text: this.title });
    renderStats(this.contentEl, [
      ["Objective", this.store.getObjectives().length],
      ["KR", this.store.getKeyResults().length],
      ["\u5DF2\u5B8C\u6210 KR", this.store.getKeyResults().filter((item) => item.completed).length],
      ["\u76EE\u6807\u6253\u5361\u9879", this.store.getGoalActions().length]
    ]);
  }
};
function renderStats(container, items) {
  const grid = container.createDiv({ cls: "cow-stats-card-grid" });
  items.forEach(([label, value]) => {
    const card = grid.createDiv({ cls: "cow-stats-card" });
    card.createEl("strong", { text: String(value) });
    card.createSpan({ text: label });
  });
}
function renderTimeline(container, store, milestones) {
  const timeline = container.createDiv({ cls: "cow-goal-timeline" });
  milestones.slice().sort((left, right) => {
    var _a, _b, _c, _d;
    return ((_b = (_a = left.milestoneDate) != null ? _a : left.deadline) != null ? _b : "").localeCompare((_d = (_c = right.milestoneDate) != null ? _c : right.deadline) != null ? _d : "");
  }).forEach((action) => {
    var _a, _b, _c;
    const goal = store.getGoals().find((item2) => item2.id === action.goalId);
    const item = timeline.createDiv({ cls: `cow-goal-timeline-item is-${action.status}` });
    item.createEl("time", { text: (_b = (_a = action.milestoneDate) != null ? _a : action.deadline) != null ? _b : "--" });
    item.createEl("strong", { text: action.title });
    item.createSpan({ text: `${(_c = goal == null ? void 0 : goal.title) != null ? _c : "\u672A\u5173\u8054\u76EE\u6807"} \xB7 ${statusLabel(action.status)}` });
  });
}
function getOnTimeRate(milestones) {
  const completed = milestones.filter((item) => item.status === "completed");
  if (completed.length === 0) return 0;
  const onTime = completed.filter((item) => !item.completedDate || !item.milestoneDate || item.completedDate <= item.milestoneDate).length;
  return Math.round(onTime / completed.length * 100);
}
function statusLabel(status) {
  if (status === "completed") return "\u5DF2\u5B8C\u6210";
  if (status === "overdue") return "\u5DF2\u903E\u671F";
  if (status === "in-progress") return "\u8FDB\u884C\u4E2D";
  return "\u672A\u5F00\u59CB";
}

// src/components/goals/GoalBreakdownSection.ts
var GoalBreakdownSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const list = container.createDiv({ cls: "cow-goal-tree-list" });
    this.store.getGoals().forEach((goal) => {
      const goalActions = this.store.getGoalActionsForGoal(goal.id);
      const rootActions = goalActions.filter((action) => !action.parentId);
      const group = list.createDiv({ cls: "cow-goal-tree-group" });
      const header = group.createDiv({ cls: "cow-goal-tree-goal" });
      header.createEl("strong", { text: goal.title });
      header.createSpan({ text: `${goal.progress}% \xB7 ${goalActions.length} \u4E2A\u62C6\u89E3\u4EFB\u52A1` });
      if (rootActions.length === 0) {
        group.createDiv({ cls: "cow-empty-state", text: "\u8FD8\u6CA1\u6709\u62C6\u89E3\u4EFB\u52A1\uFF0C\u70B9\u51FB\u53F3\u4E0A\u89D2\u65B0\u589E\u62C6\u89E3\u3002" });
      }
      rootActions.forEach((action) => this.renderAction(group, action, goalActions, 0));
    });
  }
  renderAction(container, action, allActions, depth) {
    var _a, _b;
    const children = allActions.filter((item) => item.parentId === action.id);
    const row = container.createDiv({ cls: `cow-goal-action-row is-depth-${Math.min(depth, 3)} is-${action.status}` });
    row.style.setProperty("--goal-depth", String(Math.min(depth, 3)));
    const toggle = row.createEl("button", { cls: "cow-icon-button", attr: { type: "button", "aria-label": action.collapsed ? "\u5C55\u5F00\u5B50\u4EFB\u52A1" : "\u6536\u8D77\u5B50\u4EFB\u52A1" } });
    (0, import_obsidian41.setIcon)(toggle, children.length > 0 ? action.collapsed ? "chevron-right" : "chevron-down" : "circle");
    toggle.disabled = children.length === 0;
    toggle.addEventListener("click", async () => {
      await this.store.updateGoalAction(action.id, { collapsed: !action.collapsed });
      this.onDataChanged();
    });
    const check = row.createEl("input", { attr: { type: "checkbox", "aria-label": `${action.title} \u5B8C\u6210\u72B6\u6001` } });
    check.checked = action.status === "completed";
    check.addEventListener("change", async () => {
      await this.store.toggleGoalActionCompleted(action.id);
      this.onDataChanged();
    });
    const body = row.createDiv({ cls: "cow-goal-action-body" });
    body.createEl("strong", { text: action.title });
    const dateText = [action.startDate ? `\u5F00\u59CB ${action.startDate}` : "", action.deadline ? `\u622A\u6B62 ${action.deadline}` : ""].filter(Boolean).join(" \xB7 ");
    body.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${statusLabel(action.status)} \xB7 ${(_a = action.progress) != null ? _a : 0}%${dateText ? ` \xB7 ${dateText}` : ""}` });
    if (action.description || action.note) body.createEl("p", { text: action.description || action.note || "" });
    const track = body.createDiv({ cls: "cow-month-progress-track" });
    track.createDiv({ cls: "cow-month-progress-fill is-blue", attr: { style: `width: ${(_b = action.progress) != null ? _b : 0}%` } });
    const actions = row.createDiv({ cls: "cow-list-item-actions" });
    const addChild = actions.createEl("button", { attr: { type: "button", "aria-label": "\u65B0\u589E\u5B50\u4EFB\u52A1" } });
    (0, import_obsidian41.setIcon)(addChild, "plus");
    addChild.addEventListener("click", () => openGoalActionModal(this.app, this.store, this.onDataChanged, void 0, { goalId: action.goalId, parentId: action.id }));
    const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u4EFB\u52A1" } });
    (0, import_obsidian41.setIcon)(edit, "pencil");
    edit.addEventListener("click", () => openGoalActionModal(this.app, this.store, this.onDataChanged, action));
    const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u4EFB\u52A1" } });
    (0, import_obsidian41.setIcon)(remove, "trash-2");
    remove.addEventListener("click", async () => {
      await this.store.deleteGoalAction(action.id);
      this.onDataChanged();
    });
    if (!action.collapsed) {
      children.forEach((child) => this.renderAction(container, child, allActions, depth + 1));
    }
  }
};

// src/components/goals/GoalsCheckinSection.ts
var import_obsidian42 = require("obsidian");
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
        if (done) (0, import_obsidian42.setIcon)(button, "check");
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
var import_obsidian43 = require("obsidian");
var MilestoneTimelineSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const milestones = this.store.getGoalActions().filter((action) => action.isMilestone).sort((left, right) => {
      var _a, _b, _c, _d;
      return ((_b = (_a = left.milestoneDate) != null ? _a : left.deadline) != null ? _b : "").localeCompare((_d = (_c = right.milestoneDate) != null ? _c : right.deadline) != null ? _d : "");
    });
    const timeline = container.createDiv({ cls: "cow-goal-timeline" });
    if (milestones.length === 0) {
      timeline.createDiv({ cls: "cow-empty-state", text: "\u8FD8\u6CA1\u6709\u91CC\u7A0B\u7891\uFF0C\u70B9\u51FB\u53F3\u4E0A\u89D2\u65B0\u589E\u91CC\u7A0B\u7891\u3002" });
    }
    milestones.forEach((milestone) => {
      var _a, _b, _c;
      const goal = this.store.getGoals().find((item2) => item2.id === milestone.goalId);
      const date = (_b = (_a = milestone.milestoneDate) != null ? _a : milestone.deadline) != null ? _b : "";
      const item = timeline.createDiv({ cls: `cow-goal-timeline-item is-${milestone.status}` });
      item.createEl("time", { text: date || "--" });
      item.createEl("strong", { text: milestone.title });
      item.createSpan({ text: `${(_c = goal == null ? void 0 : goal.title) != null ? _c : "\u672A\u5173\u8054\u76EE\u6807"} \xB7 ${statusLabel(milestone.status)}` });
      const actions = item.createDiv({ cls: "cow-list-item-actions" });
      const complete = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5207\u6362\u5B8C\u6210\u72B6\u6001" } });
      (0, import_obsidian43.setIcon)(complete, milestone.status === "completed" ? "rotate-ccw" : "check");
      complete.addEventListener("click", async () => {
        await this.store.toggleGoalActionCompleted(milestone.id);
        this.onDataChanged();
      });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u91CC\u7A0B\u7891" } });
      (0, import_obsidian43.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => openGoalActionModal(this.app, this.store, this.onDataChanged, milestone));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u91CC\u7A0B\u7891" } });
      (0, import_obsidian43.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteGoalAction(milestone.id);
        this.onDataChanged();
      });
    });
  }
};

// src/components/goals/MonthlyKeyResultsSection.ts
var import_obsidian44 = require("obsidian");
var MonthlyKeyResultsSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
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
      (0, import_obsidian44.setIcon)(edit, "pencil");
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
      (0, import_obsidian44.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteKeyResult(kr.id);
        this.onDataChanged();
      });
    });
  }
};

// src/components/goals/PriorityMatrixSection.ts
var import_obsidian45 = require("obsidian");
var PriorityMatrixSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const grid = container.createDiv({ cls: "cow-priority-grid" });
    const matrixItems = this.store.getGoalActions().filter((item) => item.importance && item.urgency);
    GOAL_QUADRANTS.forEach((quadrant) => {
      const cell = grid.createDiv({ cls: `cow-priority-cell ${quadrant.id}` });
      cell.createEl("strong", { text: quadrant.label });
      cell.addEventListener("dragover", (event) => event.preventDefault());
      cell.addEventListener("drop", async (event) => {
        var _a;
        event.preventDefault();
        const id = (_a = event.dataTransfer) == null ? void 0 : _a.getData("text/plain");
        if (!id) return;
        await this.store.updateGoalAction(id, { importance: quadrant.importance, urgency: quadrant.urgency });
        this.onDataChanged();
      });
      matrixItems.filter((item) => item.importance === quadrant.importance && item.urgency === quadrant.urgency).forEach((item) => this.renderMatrixItem(cell, item));
    });
  }
  renderMatrixItem(container, item) {
    var _a;
    const row = container.createDiv({ cls: `cow-priority-item is-${item.status}`, attr: { draggable: "true" } });
    row.addEventListener("dragstart", (event) => {
      var _a2, _b;
      (_a2 = event.dataTransfer) == null ? void 0 : _a2.setData("text/plain", item.id);
      (_b = event.dataTransfer) == null ? void 0 : _b.setData("application/cute-goal-action", item.id);
    });
    const body = row.createDiv({ cls: "cow-priority-item-body" });
    body.createSpan({ cls: item.status === "completed" ? "is-complete" : "", text: item.title });
    body.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${statusLabel(item.status)} \xB7 ${(_a = item.progress) != null ? _a : 0}%${item.deadline ? ` \xB7 ${item.deadline}` : ""}` });
    const actions = row.createDiv({ cls: "cow-list-item-actions" });
    const complete = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5207\u6362\u5B8C\u6210\u72B6\u6001" } });
    (0, import_obsidian45.setIcon)(complete, item.status === "completed" ? "rotate-ccw" : "check");
    complete.addEventListener("click", async () => {
      await this.store.toggleGoalActionCompleted(item.id);
      this.onDataChanged();
    });
    const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u4EFB\u52A1" } });
    (0, import_obsidian45.setIcon)(edit, "pencil");
    edit.addEventListener("click", () => openGoalActionModal(this.app, this.store, this.onDataChanged, item));
    const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u4EFB\u52A1" } });
    (0, import_obsidian45.setIcon)(remove, "trash-2");
    remove.addEventListener("click", async () => {
      await this.store.deleteGoalAction(item.id);
      this.onDataChanged();
    });
  }
};

// src/components/goals/QuarterlyOkrSection.ts
var import_obsidian46 = require("obsidian");
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
      (0, import_obsidian46.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => openObjectiveModal(this.app, async (values) => {
        await this.store.updateObjective(objective.id, values);
        this.onDataChanged();
      }, objective));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664 OKR" } });
      (0, import_obsidian46.setIcon)(remove, "trash-2");
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
var import_obsidian47 = require("obsidian");
var RisksBlockersSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getRisks().forEach((risk) => {
      var _a;
      const goal = risk.goalId ? this.store.getGoals().find((item) => item.id === risk.goalId) : void 0;
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: risk.title });
      const actions = row.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u98CE\u9669" } });
      (0, import_obsidian47.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => openRiskModal(this.app, this.store, this.onDataChanged, risk));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u98CE\u9669" } });
      (0, import_obsidian47.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteRisk(risk.id);
        this.onDataChanged();
      });
      const meta = row.createDiv({ cls: "cow-meta-line" });
      meta.createSpan({ cls: `cow-status is-${risk.level === "high" ? "yellow" : "blue"}`, text: risk.level });
      meta.createSpan({ text: `${(_a = risk.status) != null ? _a : "todo"}${goal ? ` \xB7 ${goal.title}` : ""}${risk.discoveredDate ? ` \xB7 ${risk.discoveredDate}` : ""}` });
      row.createEl("p", { text: risk.solution });
    });
  }
};

// src/components/goals/YearlyGoalsSection.ts
var import_obsidian48 = require("obsidian");
var YearlyGoalsSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getGoals().forEach((goal) => {
      const actions = this.store.getGoalActionsForGoal(goal.id);
      const milestones = actions.filter((action) => action.isMilestone);
      const row = list.createDiv({ cls: "cow-data-card" });
      const title = row.createDiv({ cls: "cow-inline-title" });
      title.createEl("strong", { text: goal.title });
      const edit = title.createEl("button", { attr: { type: "button", "aria-label": "\u4FEE\u6539\u76EE\u6807" } });
      (0, import_obsidian48.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => openAnnualGoalModal(this.app, this.store, this.onDataChanged, goal));
      const remove = title.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u76EE\u6807" } });
      (0, import_obsidian48.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteGoal(goal.id);
        this.onDataChanged();
      });
      row.createEl("p", { text: goal.description });
      const meta = row.createDiv({ cls: "cow-meta-line" });
      meta.createSpan({ cls: "cow-status is-green", text: goal.status });
      meta.createSpan({ text: `${goal.category} \xB7 ${goal.deadline} \xB7 \u62C6\u89E3 ${actions.length} \xB7 \u91CC\u7A0B\u7891 ${milestones.filter((item) => item.status === "completed").length}/${milestones.length}` });
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
var import_obsidian49 = require("obsidian");
var HealthRemindersSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    const list = container.createEl("ul", { cls: "cow-memo-list" });
    this.store.getHealthReminders().forEach((item) => {
      var _a, _b;
      const row = list.createEl("li");
      const head = row.createDiv({ cls: "cow-list-item-head" });
      const body = head.createDiv();
      body.createSpan({ text: item.title });
      body.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${(_a = item.date) != null ? _a : "--"} ${(_b = item.time) != null ? _b : "--"} \xB7 ${this.repeatLabel(item.repeatType)} \xB7 ${item.enabled === false ? "\u5DF2\u505C\u7528" : "\u5DF2\u542F\u7528"}` });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u63D0\u9192" } });
      (0, import_obsidian49.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => openHealthReminderModal(this.app, this.store, this.onDataChanged, item));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u63D0\u9192" } });
      (0, import_obsidian49.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteHealthReminder(item.id);
        this.onDataChanged();
      });
    });
  }
  repeatLabel(repeatType) {
    if (repeatType === "daily") return "\u6BCF\u5929";
    if (repeatType === "weekdays") return "\u5DE5\u4F5C\u65E5";
    if (repeatType === "weekly") return "\u6BCF\u5468";
    if (repeatType === "custom") return "\u81EA\u5B9A\u4E49\u661F\u671F";
    return "\u4EC5\u4E00\u6B21";
  }
};

// src/components/fitness/TodayWorkoutSection.ts
var TodayWorkoutSection = class {
  constructor(store) {
    this.store = store;
  }
  render(container) {
    var _a, _b;
    const today5 = formatDateKey(/* @__PURE__ */ new Date());
    const workout = (_a = this.store.getWorkouts().find((item) => item.date === today5)) != null ? _a : this.store.getWorkouts()[0];
    const card = container.createDiv({ cls: "cow-feature-card" });
    card.createEl("strong", { text: (_b = workout == null ? void 0 : workout.note) != null ? _b : "\u4ECA\u5929\u5B89\u6392\u8F7B\u91CF\u6D3B\u52A8" });
    card.createSpan({ text: workout ? `${workout.type} \xB7 ${workout.duration} \u5206\u949F \xB7 ${workout.calories} kcal` : "\u7ED9\u8EAB\u4F53\u4E00\u70B9\u6E29\u67D4\u7684\u542F\u52A8" });
    card.createEl("p", { text: (workout == null ? void 0 : workout.completed) ? "\u5DF2\u5B8C\u6210\uFF0C\u592A\u7A33\u4E86\uFF01" : "\u8FD8\u6CA1\u5B8C\u6210\uFF0C\u7559\u4E00\u70B9\u65F6\u95F4\u7ED9\u81EA\u5DF1\u3002" });
  }
};

// src/components/fitness/WaterSleepHabitsSection.ts
var WaterSleepHabitsSection = class {
  constructor(app, store, onDataChanged) {
    this.app = app;
    this.store = store;
    this.onDataChanged = onDataChanged;
  }
  render(container) {
    var _a, _b;
    const today5 = formatDateKey(/* @__PURE__ */ new Date());
    const record = this.store.getFitnessDailyRecord(today5);
    const list = container.createDiv({ cls: "cow-data-list" });
    [
      ["\u996E\u6C34", `${record.waterCups} / ${record.waterGoal} \u676F`, (_a = record.waterNote) != null ? _a : "", record.waterGoal === 0 ? 0 : Math.round(record.waterCups / record.waterGoal * 100)],
      ["\u7761\u7720", `${record.sleepHours} / ${record.sleepGoal} \u5C0F\u65F6`, (_b = record.sleepNote) != null ? _b : "", record.sleepGoal === 0 ? 0 : Math.round(record.sleepHours / record.sleepGoal * 100)]
    ].forEach(([label, status, note, percent]) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: String(label) });
      const meta = row.createDiv({ cls: "cow-fitness-metric-line" });
      meta.createSpan({ cls: "cow-fitness-metric-value", text: String(status) });
      if (note) {
        meta.createSpan({ cls: "cow-fitness-note", text: String(note) });
      }
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-blue", attr: { style: `width: ${Math.min(100, Number(percent))}%` } });
    });
    this.store.getFitnessHabitDefinitions().slice(0, 3).forEach((definition) => {
      var _a2;
      const daily = this.store.getFitnessHabitRecords(today5).find((item) => item.habitId === definition.id);
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: definition.name });
      const meta = row.createDiv({ cls: "cow-fitness-metric-line" });
      meta.createSpan({ cls: "cow-fitness-metric-value", text: `${(_a2 = daily == null ? void 0 : daily.actualValue) != null ? _a2 : 0} / ${definition.targetValue} ${definition.unit}` });
      if (daily == null ? void 0 : daily.note) {
        meta.createSpan({ cls: "cow-fitness-note", text: daily.note });
      }
    });
  }
};

// src/components/fitness/WorkoutLogSection.ts
var import_obsidian50 = require("obsidian");
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
      (0, import_obsidian50.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => openWorkoutModal(this.app, async (values) => {
        await this.store.updateWorkout(workout.id, values);
        this.onDataChanged();
      }, true, workout));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u8FD0\u52A8\u65E5\u5FD7" } });
      (0, import_obsidian50.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteWorkout(workout.id);
        this.onDataChanged();
      });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${workout.date} \xB7 ${workout.type} \xB7 ${workout.duration}min` });
    });
  }
};

// src/components/fitness/WorkoutPlanSection.ts
var import_obsidian51 = require("obsidian");
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
      (0, import_obsidian51.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => openWorkoutModal(this.app, async (values) => {
        await this.store.updateWorkout(workout.id, values);
        this.onDataChanged();
      }, workout.completed, workout));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u8BAD\u7EC3\u8BA1\u5212" } });
      (0, import_obsidian51.setIcon)(remove, "trash-2");
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
var import_obsidian52 = require("obsidian");
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
      (0, import_obsidian52.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => new AddBookModal(this.app, async (updated) => {
        await this.store.updateBook(book.id, updated);
        this.onDataChanged();
      }, book).open());
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u4E66\u7C4D" } });
      (0, import_obsidian52.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteBook(book.id);
        this.onDataChanged();
      });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${book.author} \xB7 ${book.tags.join(" / ")}` });
    });
  }
};

// src/components/reading/BookshelfSection.ts
var import_obsidian54 = require("obsidian");

// src/components/reading/BookCard.ts
var import_obsidian53 = require("obsidian");
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
    (0, import_obsidian53.setIcon)(open, "notebook-tabs");
    open.addEventListener("click", () => void this.openNote());
    const done = controls.createEl("button", { attr: { type: "button", "aria-label": "\u5B8C\u6210\u9605\u8BFB" } });
    (0, import_obsidian53.setIcon)(done, "check");
    done.addEventListener("click", async () => {
      await this.store.completeBook(this.book.id);
      this.onDataChanged();
    });
    const edit = controls.createEl("button", { attr: { type: "button", "aria-label": "\u7F16\u8F91\u4E66\u7C4D" } });
    (0, import_obsidian53.setIcon)(edit, "pencil");
    edit.addEventListener("click", () => {
      new AddBookModal(this.app, async (book) => {
        await this.store.updateBook(this.book.id, book);
        this.onDataChanged();
      }, this.book).open();
    });
    const remove = controls.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u4E66\u7C4D" } });
    (0, import_obsidian53.setIcon)(remove, "trash-2");
    remove.addEventListener("click", async () => {
      await this.store.deleteBook(this.book.id);
      this.onDataChanged();
    });
  }
  async openNote() {
    if (!this.book.notePath) {
      new import_obsidian53.Notice("\u8FD9\u672C\u4E66\u8FD8\u6CA1\u6709\u7ED1\u5B9A\u9605\u8BFB\u7B14\u8BB0\u3002");
      return;
    }
    const file = this.app.vault.getFileByPath(this.book.notePath);
    if (!file) {
      new import_obsidian53.Notice(`\u6CA1\u6709\u627E\u5230\u7B14\u8BB0\uFF1A${this.book.notePath}`);
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
    (0, import_obsidian54.setIcon)(add.createSpan(), "plus");
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
var import_obsidian55 = require("obsidian");
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
        if (done) (0, import_obsidian55.setIcon)(button, "check");
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
var import_obsidian56 = require("obsidian");
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
      (0, import_obsidian56.setIcon)(edit, "pencil");
      edit.addEventListener("click", (event) => {
        event.stopPropagation();
        new AddBookModal(this.app, async (updated) => {
          await this.store.updateBook(book.id, updated);
          this.onDataChanged();
        }, book).open();
      });
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u9605\u8BFB\u7B14\u8BB0" } });
      (0, import_obsidian56.setIcon)(remove, "trash-2");
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
      new import_obsidian56.Notice("\u8FD9\u672C\u4E66\u8FD8\u6CA1\u6709\u7ED1\u5B9A\u9605\u8BFB\u7B14\u8BB0\u3002");
      return;
    }
    const file = this.app.vault.getFileByPath(book.notePath);
    if (file) await this.app.workspace.getLeaf(false).openFile(file);
  }
};

// src/components/reading/ReadingPlanSection.ts
var import_obsidian57 = require("obsidian");
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
      (0, import_obsidian57.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => new AddBookModal(this.app, async (updated) => {
        await this.store.updateBook(book.id, updated);
        this.onDataChanged();
      }, book).open());
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u9605\u8BFB\u8BA1\u5212" } });
      (0, import_obsidian57.setIcon)(remove, "trash-2");
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
var import_obsidian58 = require("obsidian");
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
      (0, import_obsidian58.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => openQuoteModal(this.app, async (values) => {
        await this.store.updateReadingQuote(quote.id, values);
        this.onDataChanged();
      }, quote));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u91D1\u53E5" } });
      (0, import_obsidian58.setIcon)(remove, "trash-2");
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
var import_obsidian59 = require("obsidian");
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
      (0, import_obsidian59.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => openDataAnalysisTaskModal(this.app, async (values) => {
        await this.store.updateDataAnalysisTask(task.id, values);
        this.onDataChanged();
      }, task));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u4EFB\u52A1" } });
      (0, import_obsidian59.setIcon)(remove, "trash-2");
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
var import_obsidian60 = require("obsidian");
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
      (0, import_obsidian60.setIcon)(edit, "pencil");
      edit.addEventListener("click", (event) => {
        event.stopPropagation();
        openExperimentModal(this.app, async (values) => {
          await this.store.updateExperiment(this.mode, item.id, values);
          this.onDataChanged();
        }, item);
      });
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u5B9E\u9A8C" } });
      (0, import_obsidian60.setIcon)(remove, "trash-2");
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
      new import_obsidian60.Notice("\u8FD9\u6761\u5B9E\u9A8C\u8BB0\u5F55\u8FD8\u6CA1\u6709\u7ED1\u5B9A Markdown\u3002");
      return;
    }
    const file = this.app.vault.getFileByPath(notePath);
    if (!file) {
      new import_obsidian60.Notice(`\u6CA1\u6709\u627E\u5230\u7B14\u8BB0\uFF1A${notePath}`);
      return;
    }
    await this.app.workspace.getLeaf(false).openFile(file);
  }
};

// src/components/research/LiteratureNotesSection.ts
var import_obsidian61 = require("obsidian");
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
      (0, import_obsidian61.setIcon)(edit, "pencil");
      edit.addEventListener("click", (event) => {
        event.stopPropagation();
        openResearchPaperModal(this.app, async (values) => {
          await this.store.updateResearchPaper(paper.id, values);
          this.onDataChanged();
        }, paper);
      });
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u6587\u732E\u7B14\u8BB0" } });
      (0, import_obsidian61.setIcon)(remove, "trash-2");
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
      new import_obsidian61.Notice("\u8FD8\u6CA1\u6709\u7ED1\u5B9A\u6587\u732E\u7B14\u8BB0\u3002");
      return;
    }
    const file = this.app.vault.getFileByPath(notePath);
    if (file) await this.app.workspace.getLeaf(false).openFile(file);
  }
};

// src/components/research/PaperQueueSection.ts
var import_obsidian62 = require("obsidian");
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
      (0, import_obsidian62.setIcon)(edit, "pencil");
      edit.addEventListener("click", (event) => {
        event.stopPropagation();
        openResearchPaperModal(this.app, async (values) => {
          await this.store.updateResearchPaper(paper.id, values);
          this.onDataChanged();
        }, paper);
      });
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u8BBA\u6587" } });
      (0, import_obsidian62.setIcon)(remove, "trash-2");
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
      new import_obsidian62.Notice("\u8FD9\u7BC7\u6587\u732E\u8FD8\u6CA1\u6709\u7ED1\u5B9A\u7B14\u8BB0\u3002");
      return;
    }
    const file = this.app.vault.getFileByPath(notePath);
    if (!file) {
      new import_obsidian62.Notice(`\u6CA1\u6709\u627E\u5230\u7B14\u8BB0\uFF1A${notePath}`);
      return;
    }
    await this.app.workspace.getLeaf(false).openFile(file);
  }
};

// src/components/research/ResearchCheckinSection.ts
var import_obsidian63 = require("obsidian");
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
        if (done) (0, import_obsidian63.setIcon)(button, "check");
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
var import_obsidian64 = require("obsidian");
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
      (0, import_obsidian64.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => openTextModal(this.app, "\u7F16\u8F91\u79D1\u7814 Memo", "Memo", memo, async (value) => {
        await this.store.updateResearchMemo(index, value);
        this.onDataChanged();
      }));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664 Memo" } });
      (0, import_obsidian64.setIcon)(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteResearchMemo(index);
        this.onDataChanged();
      });
    });
  }
};

// src/components/research/ResearchProjectsSection.ts
var import_obsidian65 = require("obsidian");
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
      (0, import_obsidian65.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => {
        openResearchProjectModal(this.app, async (values) => {
          await this.store.updateResearchProject(project.id, { ...values, tags: values.tagsText.split(/[,，]/).map((tag) => tag.trim()).filter(Boolean) });
          this.onDataChanged();
        }, project);
      });
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664\u9879\u76EE" } });
      (0, import_obsidian65.setIcon)(remove, "trash-2");
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
var import_obsidian66 = require("obsidian");
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
      (0, import_obsidian66.setIcon)(edit, "pencil");
      edit.addEventListener("click", () => openDeadlineModal(this.app, async (values) => {
        await this.store.updateResearchDeadline(ddl.id, values);
        this.onDataChanged();
      }, ddl));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "\u5220\u9664 DDL" } });
      (0, import_obsidian66.setIcon)(remove, "trash-2");
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
    (0, import_obsidian67.setIcon)(title.createSpan(), this.getIcon());
    title.createEl("h3", { text: this.section.title });
    const actions = header.createDiv({ cls: "cow-section-actions" });
    if (getSectionCapabilities(this.section.type).canAdd) {
      const addButton = actions.createEl("button", {
        cls: "cow-section-add-button",
        attr: { type: "button", "aria-label": `\u6DFB\u52A0${this.section.title}\u5185\u5BB9` }
      });
      (0, import_obsidian67.setIcon)(addButton.createSpan(), "plus");
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
      (0, import_obsidian67.setIcon)(statsButton.createSpan(), "bar-chart-3");
      statsButton.createSpan({ text: "\u7EDF\u8BA1" });
      statsButton.addEventListener("click", () => this.openStats());
    }
    this.renderFitnessHeaderActions(actions);
    this.renderFinanceHeaderActions(actions);
    this.renderGoalHeaderActions(actions);
    const menuButton = actions.createEl("button", {
      cls: "cow-icon-button",
      attr: { type: "button", "aria-label": `${this.section.title}\u64CD\u4F5C\u83DC\u5355` }
    });
    (0, import_obsidian67.setIcon)(menuButton, "more-horizontal");
    menuButton.addEventListener("click", (event) => {
      new SectionActionMenu(this.app, this.store, this.section, this.onRemove, this.onDataChanged).show(event);
    });
    const content = sectionEl.createDiv({ cls: "cow-section-content" });
    this.renderContent(content);
  }
  renderFitnessHeaderActions(actions) {
    const addAction = (label, icon, onClick) => {
      const button = actions.createEl("button", {
        cls: "cow-section-add-button",
        attr: { type: "button", "aria-label": label }
      });
      (0, import_obsidian67.setIcon)(button.createSpan(), icon);
      button.createSpan({ text: label });
      button.addEventListener("click", onClick);
    };
    if (this.section.type === "body-measurements") {
      addAction("\u8BB0\u5F55\u6570\u636E", "plus", () => openBodyMeasurementModal2(this.app, this.store, this.onDataChanged));
      addAction("\u7EDF\u8BA1", "bar-chart-3", () => new BodyMeasurementStatisticsModal(this.app, this.store, this.onDataChanged).open());
    }
    if (this.section.type === "water-sleep-habits") {
      addAction("\u7F16\u8F91\u4ECA\u65E5", "pencil", () => openDailyHealthHabitModal(this.app, this.store, this.onDataChanged));
      addAction("\u7EDF\u8BA1", "bar-chart-3", () => new HealthHabitStatisticsModal(this.app, this.store).open());
    }
    if (this.section.type === "fitness-goals") {
      addAction("\u65B0\u589E\u76EE\u6807", "plus", () => openFitnessGoalModal2(this.app, this.store, this.onDataChanged));
      addAction("\u7EDF\u8BA1", "bar-chart-3", () => new FitnessGoalStatisticsModal(this.app, this.store, this.onDataChanged).open());
    }
    if (this.section.type === "health-reminders") {
      addAction("\u65B0\u589E\u63D0\u9192", "plus", () => openHealthReminderModal(this.app, this.store, this.onDataChanged));
      addAction("\u7EDF\u8BA1", "bar-chart-3", () => new HealthReminderStatisticsModal(this.app, this.store).open());
    }
  }
  renderFinanceHeaderActions(actions) {
    const addAction = (label, icon, onClick) => {
      const button = actions.createEl("button", {
        cls: "cow-section-add-button",
        attr: { type: "button", "aria-label": label }
      });
      (0, import_obsidian67.setIcon)(button.createSpan(), icon);
      button.createSpan({ text: label });
      button.addEventListener("click", onClick);
    };
    if (this.section.type === "monthly-budget") {
      addAction("\u7BA1\u7406\u6536\u652F", "list-checks", () => new MonthlyFinanceSummaryModal(this.app, this.store, this.onDataChanged).open());
      addAction("\u7EDF\u8BA1", "bar-chart-3", () => new MonthlyBudgetStatisticsModal(this.app, this.store).open());
    }
    if (this.section.type === "expense-categories") {
      addAction("\u65B0\u589E\u5206\u7C7B", "plus", () => openExpenseCategoryModal(this.app, this.store, this.onDataChanged));
      addAction("\u7EDF\u8BA1", "bar-chart-3", () => new ExpenseCategoryStatisticsModal(this.app, this.store).open());
    }
    if (this.section.type === "income-expense-trend") {
      addAction("\u7BA1\u7406\u8BB0\u5F55", "list-checks", () => new TransactionManagerModal(this.app, this.store, this.onDataChanged).open());
      addAction("\u7EDF\u8BA1", "bar-chart-3", () => new IncomeExpenseStatisticsModal(this.app, this.store).open());
    }
    if (this.section.type === "finance-todos") {
      addAction("\u65B0\u5EFA\u5F85\u529E", "plus", () => openFinanceTodoModal(this.app, this.store, this.onDataChanged));
      addAction("\u7EDF\u8BA1", "bar-chart-3", () => new FinanceTodoStatisticsModal(this.app, this.store, this.onDataChanged).open());
    }
    if (this.section.type === "investment-watch") {
      addAction("\u65B0\u589E\u89C2\u5BDF", "plus", () => openInvestmentModal(this.app, this.store, this.onDataChanged));
      addAction("\u7EDF\u8BA1", "bar-chart-3", () => new InvestmentStatisticsModal(this.app, this.store).open());
    }
    if (this.section.type === "finance-ledger") {
      addAction("\u7EDF\u8BA1", "bar-chart-3", () => new TransactionStatisticsModal(this.app, this.store, this.onDataChanged).open());
    }
  }
  renderGoalHeaderActions(actions) {
    const addAction = (label, icon, onClick) => {
      const button = actions.createEl("button", {
        cls: "cow-section-add-button",
        attr: { type: "button", "aria-label": label }
      });
      (0, import_obsidian67.setIcon)(button.createSpan(), icon);
      button.createSpan({ text: label });
      button.addEventListener("click", onClick);
    };
    if (this.section.type === "yearly-goals") {
      addAction("\u65B0\u589E\u76EE\u6807", "plus", () => openAnnualGoalModal(this.app, this.store, this.onDataChanged));
      addAction("\u7EDF\u8BA1", "bar-chart-3", () => new AnnualGoalStatisticsModal(this.app, this.store).open());
    }
    if (this.section.type === "quarterly-okr") {
      addAction("\u65B0\u589E OKR", "plus", () => openObjectiveModal(this.app, async (objective) => {
        await this.store.addObjective({ id: `objective-${Date.now()}`, ...objective });
        this.onDataChanged();
      }));
      addAction("\u7EDF\u8BA1", "bar-chart-3", () => new SimpleGoalStatisticsModal(this.app, this.store, "OKR \u7EDF\u8BA1").open());
    }
    if (this.section.type === "monthly-key-results") {
      addAction("\u65B0\u589E KR", "plus", () => {
        new KeyResultModal(this.app, this.store.getObjectives(), async (kr) => {
          await this.store.addKeyResult(kr);
          this.onDataChanged();
        }).open();
      });
      addAction("\u7EDF\u8BA1", "bar-chart-3", () => new SimpleGoalStatisticsModal(this.app, this.store, "\u6708\u5EA6\u5173\u952E\u7ED3\u679C\u7EDF\u8BA1").open());
    }
    if (this.section.type === "goal-breakdown") {
      addAction("\u65B0\u589E\u62C6\u89E3", "plus", () => openGoalActionModal(this.app, this.store, this.onDataChanged));
      addAction("\u7EDF\u8BA1", "bar-chart-3", () => new GoalBreakdownStatisticsModal(this.app, this.store).open());
    }
    if (this.section.type === "milestone-timeline") {
      addAction("\u65B0\u589E\u91CC\u7A0B\u7891", "plus", () => openGoalActionModal(this.app, this.store, this.onDataChanged, void 0, { isMilestone: true, status: "todo" }));
      addAction("\u7EDF\u8BA1", "bar-chart-3", () => new MilestoneStatisticsModal(this.app, this.store).open());
    }
    if (this.section.type === "priority-matrix") {
      addAction("\u65B0\u589E\u4EFB\u52A1", "plus", () => openGoalActionModal(this.app, this.store, this.onDataChanged, void 0, { importance: "important", urgency: "urgent", status: "todo" }));
      addAction("\u7EDF\u8BA1", "bar-chart-3", () => new PriorityStatisticsModal(this.app, this.store).open());
    }
    if (this.section.type === "goals-checkin") {
      addAction("\u7EDF\u8BA1", "bar-chart-3", () => new SimpleGoalStatisticsModal(this.app, this.store, "\u672C\u5468\u76EE\u6807\u6253\u5361\u7EDF\u8BA1").open());
    }
    if (this.section.type === "risks-blockers") {
      addAction("\u65B0\u589E\u98CE\u9669", "plus", () => openRiskModal(this.app, this.store, this.onDataChanged));
      addAction("\u7EDF\u8BA1", "bar-chart-3", () => new RiskStatisticsModal(this.app, this.store).open());
    }
    if (this.section.type === "long-term-progress") {
      addAction("\u7EDF\u8BA1", "bar-chart-3", () => new SimpleGoalStatisticsModal(this.app, this.store, "\u957F\u671F\u8FDB\u5C55\u7EDF\u8BA1").open());
    }
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
      case "finance-ledger":
        new FinanceLedgerSection(this.app, this.store, this.onDataChanged).render(container);
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
        new GoalBreakdownSection(this.app, this.store, this.onDataChanged).render(container);
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
      "finance-ledger": "circle-plus",
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
var import_obsidian68 = require("obsidian");
var AddSectionModal = class extends import_obsidian68.Modal {
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
      const icon = button.createSpan({ cls: "cow-add-module-icon" });
      (0, import_obsidian68.setIcon)(icon, module2.icon);
      button.createEl("strong", { cls: "cow-add-module-title", text: module2.title });
      button.createEl("span", { cls: "cow-add-module-description", text: module2.description });
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
    (0, import_obsidian68.setIcon)(button.createSpan(), "plus");
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
var import_obsidian69 = require("obsidian");
var ResetDefaultsModal = class extends import_obsidian69.Modal {
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
    (0, import_obsidian69.setIcon)(importButton.createSpan(), "upload");
    importButton.createSpan({ text: "\u5BFC\u5165\u914D\u7F6E" });
    importButton.addEventListener("click", () => importInput.click());
    importInput.addEventListener("change", () => {
      var _a;
      const file = (_a = importInput.files) == null ? void 0 : _a[0];
      if (!file) return;
      readJsonFile(file, async (data) => {
        await this.store.importData(data);
        new import_obsidian69.Notice("\u914D\u7F6E\u5DF2\u5BFC\u5165\u3002");
        this.onDataChanged();
      });
    });
    const exportButton = actions.createEl("button", { attr: { type: "button" } });
    (0, import_obsidian69.setIcon)(exportButton.createSpan(), "download");
    exportButton.createSpan({ text: "\u5BFC\u51FA\u914D\u7F6E" });
    exportButton.addEventListener("click", () => {
      downloadJson("cute-obsidian-workbench-config.json", this.store.exportData());
    });
    const resetButton = actions.createEl("button", { cls: "mod-warning", attr: { type: "button" } });
    (0, import_obsidian69.setIcon)(resetButton.createSpan(), "rotate-ccw");
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
var import_obsidian70 = require("obsidian");
var QuickCreateModal = class extends import_obsidian70.Modal {
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
      new import_obsidian70.Notice("\u5DF2\u6DFB\u52A0\u5230\u4ECA\u65E5\u7126\u70B9\u3002");
    });
    this.renderAction(grid, "\u6DFB\u52A0\u6253\u5361\u9879\u76EE", "badge-plus", async () => {
      await this.store.addCustomHabit("\u65B0\u7684\u6253\u5361");
      this.onDataChanged();
      new import_obsidian70.Notice("\u5DF2\u6DFB\u52A0\u6253\u5361\u9879\u76EE\uFF0C\u53EF\u5728\u6A21\u5757\u7BA1\u7406\u4E2D\u7F16\u8F91\u3002");
    });
    this.renderAction(grid, "\u6DFB\u52A0\u529F\u80FD\u5206\u533A", "layout-grid", async () => {
      this.close();
      this.openAddSectionModal();
    }, false);
  }
  renderAction(container, label, icon, action, closeAfter = true) {
    const button = container.createEl("button", { cls: "cow-quick-create-card", attr: { type: "button" } });
    (0, import_obsidian70.setIcon)(button.createSpan(), icon);
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
var import_obsidian71 = require("obsidian");
var WorkbenchCustomizeModal = class extends import_obsidian71.Modal {
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
      (0, import_obsidian71.setIcon)(button.createSpan(), "image");
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
    new import_obsidian71.Setting(this.contentEl).setName("\u672C\u5730\u56FE\u7247").setDesc("\u4FDD\u5B58\u4E3A data URL\uFF0CBRAT \u5B89\u88C5\u540E\u4E0D\u4F9D\u8D56\u989D\u5916\u8D44\u6E90\u8DEF\u5F84\u3002").addButton((button) => button.setButtonText("\u9009\u62E9\u56FE\u7247").onClick(() => fileInput.click()));
    new import_obsidian71.Setting(this.contentEl).setName("\u5DE6\u4FA7\u5934\u50CF").setDesc("\u9009\u62E9\u9884\u8BBE\u56FE\u6807\u6216\u4E0A\u4F20\u56FE\u7247\uFF0C\u5237\u65B0\u540E\u4ECD\u4FDD\u7559\u3002").addButton((button) => button.setButtonText("\u4FEE\u6539\u5DE6\u4FA7\u5934\u50CF").onClick(() => {
      const current = this.store.getData().banner.sidebarAvatar;
      new AvatarPickerModal(this.app, "\u4FEE\u6539\u5DE6\u4FA7\u5934\u50CF", current, async (avatar) => {
        await this.store.updateSidebarAvatar(avatar);
        this.onDataChanged();
      }).open();
    }));
    new import_obsidian71.Setting(this.contentEl).setName("Banner \u56FE\u6807").setDesc("\u9009\u62E9 Banner \u5DE6\u4FA7\u663E\u793A\u7684\u53EF\u7231\u56FE\u6807\u3002").addButton((button) => button.setButtonText("\u4FEE\u6539 Banner \u56FE\u6807").onClick(() => {
      const current = this.store.getData().banner.bannerAvatar;
      new AvatarPickerModal(this.app, "\u4FEE\u6539 Banner \u56FE\u6807", current, async (avatar) => {
        await this.store.updateBannerAvatar(avatar);
        this.onDataChanged();
      }).open();
    }));
    new import_obsidian71.Setting(this.contentEl).setName("Banner \u4E3B\u6807\u9898").addText((text) => text.setValue(this.titleValue).onChange((value) => {
      this.titleValue = value;
    }));
    new import_obsidian71.Setting(this.contentEl).setName("Banner \u526F\u6807\u9898").addText((text) => text.setValue(this.subtitleValue).onChange((value) => {
      this.subtitleValue = value;
    }));
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    const addSection = actions.createEl("button", { attr: { type: "button" } });
    (0, import_obsidian71.setIcon)(addSection.createSpan(), "plus");
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
      new import_obsidian71.Notice("Banner \u6587\u6848\u5DF2\u4FDD\u5B58\u3002");
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
var import_obsidian72 = require("obsidian");
var DayDetailModal = class extends import_obsidian72.Modal {
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
    (0, import_obsidian72.setIcon)(button.createSpan(), dailyNote ? "file-text" : "file-plus");
    button.createSpan({ text: dailyNote ? "\u6253\u5F00\u6BCF\u65E5\u7B14\u8BB0" : "\u521B\u5EFA\u6BCF\u65E5\u7B14\u8BB0" });
    button.addEventListener("click", async () => {
      await this.notes.openOrCreateDailyNote(this.date);
      this.close();
    });
  }
};

// src/components/NotesManagerModal.ts
var import_obsidian73 = require("obsidian");
var NotesManagerModal = class extends import_obsidian73.Modal {
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
var WorkbenchView = class extends import_obsidian74.ItemView {
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
      new import_obsidian74.Notice("\u672A\u80FD\u6FC0\u6D3B Obsidian \u6587\u4EF6\u7BA1\u7406\u5668\u3002");
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
var CuteObsidianWorkbenchPlugin = class extends import_obsidian75.Plugin {
  async onload() {
    this.store = new DashboardStore(
      () => this.loadData(),
      (data) => this.saveData(data)
    );
    await this.store.load();
    const healthReminderService = new HealthReminderService(this.app, this.store);
    await healthReminderService.checkMissedReminders();
    this.registerInterval(window.setInterval(() => void healthReminderService.tick(), 30 * 1e3));
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

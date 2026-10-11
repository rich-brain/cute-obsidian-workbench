import { App, setIcon } from "obsidian";
import type { DashboardPage } from "../types/dashboard";
import { PAGE_LABELS } from "../core/PageLabels";
import type { WorkbenchData } from "../types/dashboard";
import { renderWorkbenchAvatar } from "./AvatarPickerModal";

interface SidebarAction {
  label: string;
  icon: string;
  page?: DashboardPage;
  group?: string;
  onClick: () => void;
}

export class Sidebar {
  private static readonly COLLAPSED_KEY = "cute-obsidian-workbench.sidebar-collapsed";
  private sidebarEl?: HTMLElement;
  private clockEl?: HTMLElement;
  private dateEl?: HTMLElement;
  private timeEl?: HTMLElement;
  private pageLabelEl?: HTMLElement;
  private timer?: number;

  constructor(
    private readonly app: App,
    private readonly currentPage: DashboardPage,
    private readonly actions: SidebarAction[],
    private readonly onQuickCreate: () => void,
    private readonly onOpenDay: (date: Date) => void,
    private readonly getData: () => WorkbenchData,
    private readonly onCustomizeAvatar: () => void
  ) {}

  render(container: HTMLElement): void {
    const sidebar = container.createDiv({ cls: "cow-sidebar" });
    this.sidebarEl = sidebar;
    const initiallyCollapsed = window.localStorage.getItem(Sidebar.COLLAPSED_KEY) === "true";
    if (initiallyCollapsed) sidebar.addClass("is-collapsed");
    const header = sidebar.createDiv({ cls: "cow-sidebar-header" });
    const collapse = header.createEl("button", {
      cls: "cow-sidebar-collapse-button",
      attr: { type: "button", "aria-label": "收起侧栏", title: "收起侧栏" }
    });
    setIcon(collapse, initiallyCollapsed ? "chevron-right" : "chevron-left");
    collapse.addEventListener("click", () => this.toggleCollapsed(collapse));
    const profile = sidebar.createDiv({ cls: "cow-profile" });
    const avatarButton = profile.createEl("button", {
      cls: "cow-profile-avatar-button",
      attr: { type: "button", "aria-label": "修改左侧头像" }
    });
    renderWorkbenchAvatar(avatarButton, this.getData().banner.sidebarAvatar, "cow-profile-avatar");
    avatarButton.addEventListener("click", this.onCustomizeAvatar);
    profile.createEl("h2", { text: "我的工作台" });
    profile.createEl("p", { text: "记录、思考、成长、可爱向前" });

    this.clockEl = sidebar.createDiv({ cls: "cow-clock" });
    this.dateEl = this.clockEl.createEl("p");
    this.timeEl = this.clockEl.createEl("strong");
    this.pageLabelEl = this.clockEl.createEl("span");
    this.updateClock();
    this.timer = window.setInterval(() => this.updateClock(), 30_000);

    this.renderActions(sidebar);
  }

  destroy(): void {
    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  private renderActions(container: HTMLElement): void {
    const actions = container.createDiv({ cls: "cow-sidebar-actions" });
    let currentGroup: string | undefined;
    this.actions.forEach((action) => {
      if (action.group !== currentGroup) {
        currentGroup = action.group;
        if (currentGroup) actions.createEl("p", { cls: "cow-sidebar-group-label", text: currentGroup });
      }
      const button = actions.createEl("button", {
        cls: `cow-sidebar-action${action.page === this.currentPage ? " is-active" : ""}`,
        attr: { type: "button", title: action.label, "aria-label": action.label }
      });
      setIcon(button.createSpan(), action.icon);
      button.createSpan({ text: action.label });
      button.addEventListener("click", action.onClick);
    });

    const fileHint = actions.createDiv({ cls: "cow-file-shortcut" });
    setIcon(fileHint.createSpan(), "folder-open");
    fileHint.createSpan({ text: `文件库：${this.app.vault.getName()}` });

    const quickAccess = actions.createEl("button", {
      cls: "cow-sidebar-action cow-sidebar-quick-access",
      attr: { type: "button", title: "快捷方式", "aria-label": "快捷方式" }
    });
    setIcon(quickAccess.createSpan(), "plus");
    quickAccess.createSpan({ text: "快捷方式" });
    quickAccess.addEventListener("click", this.onQuickCreate);
  }

  private toggleCollapsed(button: HTMLButtonElement): void {
    if (!this.sidebarEl) return;
    const collapsed = this.sidebarEl.classList.toggle("is-collapsed");
    window.localStorage.setItem(Sidebar.COLLAPSED_KEY, String(collapsed));
    button.setAttribute("aria-label", collapsed ? "展开侧栏" : "收起侧栏");
    button.setAttribute("title", collapsed ? "展开侧栏" : "收起侧栏");
    setIcon(button, collapsed ? "chevron-right" : "chevron-left");
  }

  private updateClock(): void {
    if (!this.dateEl || !this.timeEl || !this.pageLabelEl) {
      return;
    }

    const now = new Date();
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

    this.dateEl.setText(dateText);
    this.timeEl.setText(timeText);
    this.pageLabelEl.setText(PAGE_LABELS[this.currentPage]);
  }
}

import { setIcon } from "obsidian";
import type { DashboardPage, DashboardPageDefinition } from "../types/dashboard";

export interface PageHeaderActions {
  onSearch: () => void;
  onReminder: () => void;
  onSettings: () => void;
  onCustomize: () => void;
}

export class PageHeader {
  constructor(
    private readonly page: DashboardPageDefinition,
    private readonly currentPage: DashboardPage,
    private readonly actions: PageHeaderActions
  ) {}

  render(container: HTMLElement): void {
    const heading = container.createDiv({ cls: "cow-page-header" });
    const identity = heading.createDiv({ cls: "cow-page-identity" });
    const icon = identity.createDiv({ cls: "cow-page-icon" });
    setIcon(icon, this.page.icon);

    const text = identity.createDiv({ cls: "cow-page-identity-text" });
    text.createEl("h1", { text: this.page.label });
    text.createEl("p", { text: this.page.description });

    const toolbar = heading.createDiv({ cls: "cow-page-toolbar" });
    this.addAction(toolbar, "搜索", "search", this.actions.onSearch, "cow-page-toolbar-search");
    this.addAction(toolbar, "提醒", "bell", this.actions.onReminder);
    this.addAction(toolbar, "设置", "settings", this.actions.onSettings);
    this.addAction(toolbar, "自定义", "plus", this.actions.onCustomize, "cow-page-toolbar-customize");
  }

  private addAction(container: HTMLElement, label: string, iconName: string, onClick: () => void, className?: string): void {
    const button = container.createEl("button", {
      cls: `cow-page-toolbar-button${className ? ` ${className}` : ""}`,
      attr: { type: "button", "aria-label": label, title: label }
    });
    setIcon(button.createSpan({ cls: "cow-page-toolbar-icon" }), iconName);
    button.createSpan({ cls: "cow-page-toolbar-label", text: label });
    button.addEventListener("click", onClick);
  }
}

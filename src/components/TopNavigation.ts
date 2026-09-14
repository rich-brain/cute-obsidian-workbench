import { setIcon } from "obsidian";
import type { DashboardPage, DashboardPageDefinition } from "../types/dashboard";

export class TopNavigation {
  constructor(
    private readonly pages: DashboardPageDefinition[],
    private readonly getCurrentPage: () => DashboardPage,
    private readonly onNavigate: (page: DashboardPage) => void
  ) {}

  render(container: HTMLElement): void {
    const nav = container.createDiv({ cls: "cow-top-nav" });

    this.pages.forEach((page) => {
      const button = nav.createEl("button", {
        cls: `cow-nav-button ${this.getCurrentPage() === page.id ? "is-active" : ""}`,
        attr: { type: "button", "aria-label": page.label }
      });
      const icon = button.createSpan({ cls: "cow-nav-icon" });
      setIcon(icon, page.icon);
      button.createSpan({ text: page.label });
      button.addEventListener("click", () => this.onNavigate(page.id));
    });
  }
}

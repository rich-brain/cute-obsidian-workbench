import { App, Modal, setIcon } from "obsidian";
import type { AvailableModuleDefinition, DashboardPage } from "../types/dashboard";
import { PAGE_LABELS } from "../core/PageLabels";

export class AddSectionModal extends Modal {
  constructor(
    app: App,
    private readonly page: DashboardPage,
    private readonly modules: AvailableModuleDefinition[],
    private readonly onSelect: (moduleType: string) => Promise<void>
  ) {
    super(app);
  }

  onOpen(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "添加功能分区" });
    this.contentEl.createEl("p", { text: "选择一个模块后会立即加入当前页面并保存布局。" });

    const grid = this.contentEl.createDiv({ cls: "cow-add-module-grid" });
    this.modules.forEach((module) => {
      const button = grid.createEl("button", {
        cls: "cow-add-module-card",
        attr: { type: "button" }
      });
      const icon = button.createSpan({ cls: "cow-add-module-icon" });
      setIcon(icon, module.icon);
      button.createEl("strong", { cls: "cow-add-module-title", text: module.title });
      button.createEl("span", { cls: "cow-add-module-description", text: module.description });
      button.addEventListener("click", async () => {
        await this.onSelect(module.type);
        this.close();
      });
    });

    if (this.modules.length === 0) {
      grid.createEl("p", { text: `${PAGE_LABELS[this.page]}页面暂无可添加模块。` });
    }
  }
}

export class AddSectionButton {
  constructor(
    private readonly app: App,
    private readonly page: DashboardPage,
    private readonly modules: AvailableModuleDefinition[],
    private readonly onAdd: (moduleType: string) => Promise<void>
  ) {}

  render(container: HTMLElement): void {
    const button = container.createEl("button", {
      cls: "cow-add-section-button",
      attr: { type: "button" }
    });
    setIcon(button.createSpan(), "plus");
    button.createSpan({ text: "添加功能分区" });
    button.addEventListener("click", () => {
      new AddSectionModal(this.app, this.page, this.modules, this.onAdd).open();
    });
  }
}

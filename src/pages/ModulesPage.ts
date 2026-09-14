import { App, Modal, Notice, setIcon } from "obsidian";
import type { DashboardPage, DashboardPageDefinition } from "../types/dashboard";
import type { DashboardStore } from "../core/DashboardStore";
import { DashboardGrid } from "../components/DashboardGrid";
import { downloadJson, readJsonFile } from "../components/modules/ModulesControls";

class ResetDefaultsModal extends Modal {
  constructor(
    app: App,
    private readonly onConfirm: () => Promise<void>
  ) {
    super(app);
  }

  onOpen(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "恢复默认配置？" });
    this.contentEl.createEl("p", { text: "这会重置工作台布局、主题、模块和内部示例数据。" });
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "恢复默认", cls: "mod-warning", attr: { type: "button" } }).addEventListener("click", async () => {
      await this.onConfirm();
      this.close();
    });
  }
}

export class ModulesPage {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly page: DashboardPage,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const definition = this.store.getPages().find((item) => item.id === this.page) as DashboardPageDefinition;
    const pageEl = container.createDiv({ cls: "cow-page" });
    const heading = pageEl.createDiv({ cls: "cow-page-heading cow-modules-heading" });
    const title = heading.createDiv();
    title.createEl("h1", { text: definition.label });
    title.createEl("p", { text: definition.description });
    this.renderActions(heading);
    new DashboardGrid(this.app, this.store, this.page, this.onDataChanged).render(pageEl);
  }

  private renderActions(container: HTMLElement): void {
    const actions = container.createDiv({ cls: "cow-config-actions" });
    const importInput = actions.createEl("input", { type: "file", attr: { accept: "application/json" } });
    importInput.addClass("cow-hidden-input");

    const importButton = actions.createEl("button", { attr: { type: "button" } });
    setIcon(importButton.createSpan(), "upload");
    importButton.createSpan({ text: "导入配置" });
    importButton.addEventListener("click", () => importInput.click());
    importInput.addEventListener("change", () => {
      const file = importInput.files?.[0];
      if (!file) return;
      readJsonFile(file, async (data) => {
        await this.store.importData(data);
        new Notice("配置已导入。");
        this.onDataChanged();
      });
    });

    const exportButton = actions.createEl("button", { attr: { type: "button" } });
    setIcon(exportButton.createSpan(), "download");
    exportButton.createSpan({ text: "导出配置" });
    exportButton.addEventListener("click", () => {
      downloadJson("cute-obsidian-workbench-config.json", this.store.exportData());
    });

    const resetButton = actions.createEl("button", { cls: "mod-warning", attr: { type: "button" } });
    setIcon(resetButton.createSpan(), "rotate-ccw");
    resetButton.createSpan({ text: "恢复默认" });
    resetButton.addEventListener("click", () => {
      new ResetDefaultsModal(this.app, async () => {
        await this.store.resetToDefaults();
        this.onDataChanged();
      }).open();
    });
  }
}

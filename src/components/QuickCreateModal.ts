import { App, Modal, Notice, setIcon } from "obsidian";
import { AddSectionModal } from "./AddSectionButton";
import { type DashboardStore } from "../core/DashboardStore";
import type { DashboardPage } from "../types/dashboard";
import { NoteService } from "../services/NoteService";

export class QuickCreateModal extends Modal {
  private readonly notes: NoteService;

  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly getCurrentPage: () => DashboardPage,
    private readonly onDataChanged: () => void
  ) {
    super(app);
    this.notes = new NoteService(app);
  }

  onOpen(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "快速创建" });
    this.contentEl.createEl("p", { text: "选择一个入口，马上开始记录。" });

    const grid = this.contentEl.createDiv({ cls: "cow-quick-create-grid" });
    this.renderAction(grid, "新建笔记", "file-plus", async () => {
      await this.notes.createNote();
    });
    this.renderAction(grid, "打开/创建今日笔记", "calendar-days", async () => {
      await this.notes.openOrCreateDailyNote(new Date());
    });
    this.renderAction(grid, "添加任务", "list-plus", async () => {
      await this.store.addTodayFocusTask("新的待办任务");
      this.onDataChanged();
      new Notice("已添加到今日焦点。");
    });
    this.renderAction(grid, "添加打卡项目", "badge-plus", async () => {
      await this.store.addCustomHabit("新的打卡");
      this.onDataChanged();
      new Notice("已添加打卡项目，可在模块管理中编辑。");
    });
    this.renderAction(grid, "添加功能分区", "layout-grid", async () => {
      this.close();
      this.openAddSectionModal();
    }, false);
  }

  private renderAction(container: HTMLElement, label: string, icon: string, action: () => Promise<void>, closeAfter = true): void {
    const button = container.createEl("button", { cls: "cow-quick-create-card", attr: { type: "button" } });
    setIcon(button.createSpan(), icon);
    button.createSpan({ text: label });
    button.addEventListener("click", async () => {
      await action();
      if (closeAfter) this.close();
    });
  }

  private openAddSectionModal(): void {
    const page = this.getCurrentPage();
    new AddSectionModal(this.app, page, this.store.getAvailableModules(page), async (moduleType) => {
      await this.store.addSection(page, moduleType);
      this.onDataChanged();
    }).open();
  }

}

import { App, Notice, setIcon, TFile } from "obsidian";
import { formatDateKey, type DashboardStore } from "../../core/DashboardStore";
import type { QuickActionConfig } from "../../types/dashboard";

interface CommandEnabledApp extends App {
  commands?: {
    executeCommandById(commandId: string): boolean;
  };
}

export class QuickActionsSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const actions = this.store.getData().quickActions
      .filter((action) => action.enabled)
      .sort((a, b) => a.order - b.order);

    const grid = container.createDiv({ cls: "cow-quick-action-grid" });
    actions.forEach((action) => {
      const button = grid.createEl("button", { attr: { type: "button" } });
      setIcon(button.createSpan(), this.getIcon(action));
      button.createSpan({ text: action.label });
      button.addEventListener("click", () => void this.runAction(action));
    });
  }

  private async runAction(action: QuickActionConfig): Promise<void> {
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
        new Notice(action.target ? `自定义入口：${action.target}` : "自定义快捷入口已触发。");
    }
  }

  private getIcon(action: QuickActionConfig): string {
    const icons: Record<QuickActionConfig["type"], string> = {
      "new-note": "file-plus",
      "daily-note": "calendar-days",
      search: "search",
      templates: "layout-template",
      graph: "git-fork",
      custom: "star"
    };
    return icons[action.type];
  }

  private executeCommand(commandId: string): void {
    const didRun = (this.app as CommandEnabledApp).commands?.executeCommandById(commandId);
    if (!didRun) {
      new Notice("这个 Obsidian 命令暂时不可用。");
    }
  }

  private async createNote(): Promise<void> {
    const file = await this.createUniqueFile("Cute Workbench Notes", "未命名笔记", "# 未命名笔记\n\n");
    await this.app.workspace.getLeaf(false).openFile(file);
  }

  private async openDailyNote(): Promise<void> {
    const folder = "Daily Notes";
    const path = `${folder}/${formatDateKey(new Date())}.md`;
    const existing = this.app.vault.getFileByPath(path);
    const file = existing ?? await this.createUniqueFile(folder, formatDateKey(new Date()), `# ${formatDateKey(new Date())}\n\n`);
    await this.app.workspace.getLeaf(false).openFile(file);
  }

  private async addTask(): Promise<void> {
    await this.store.addTodayFocusTask("新的待办任务");
    this.onDataChanged();
    new Notice("已添加到今日焦点。");
  }

  private async createUniqueFile(folder: string, basename: string, content: string): Promise<TFile> {
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
}

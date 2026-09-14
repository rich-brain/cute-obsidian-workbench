import { App, Modal, TFile } from "obsidian";
import { NoteService } from "../services/NoteService";

export class NotesManagerModal extends Modal {
  private readonly notes: NoteService;
  private listEl?: HTMLElement;
  private searchValue = "";

  constructor(app: App) {
    super(app);
    this.notes = new NoteService(app);
  }

  onOpen(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "笔记管理" });
    this.contentEl.createEl("p", { text: "轻量查看最近 Markdown 笔记，点击即可打开。" });

    const search = this.contentEl.createEl("input", {
      cls: "cow-notes-search",
      attr: { type: "search", placeholder: "搜索文件名或路径" }
    });
    search.addEventListener("input", () => {
      this.searchValue = search.value.trim().toLowerCase();
      this.renderList();
    });

    this.listEl = this.contentEl.createDiv({ cls: "cow-notes-manager-list" });
    this.renderList();
  }

  private renderList(): void {
    if (!this.listEl) return;
    this.listEl.empty();

    const files = this.notes.getRecentMarkdownFiles(80)
      .filter((file) => this.matchesSearch(file))
      .slice(0, 20);

    if (files.length === 0) {
      this.listEl.createEl("p", { text: "没有找到匹配笔记。" });
      return;
    }

    files.forEach((file) => {
      const button = this.listEl!.createEl("button", { cls: "cow-note-manager-item", attr: { type: "button" } });
      button.createEl("strong", { text: file.basename });
      button.createEl("span", { text: file.path });
      button.createEl("time", { text: new Date(file.stat.mtime).toLocaleString("zh-CN") });
      button.addEventListener("click", async () => {
        await this.app.workspace.getLeaf(false).openFile(file);
        this.close();
      });
    });
  }

  private matchesSearch(file: TFile): boolean {
    if (!this.searchValue) return true;
    return file.basename.toLowerCase().includes(this.searchValue) || file.path.toLowerCase().includes(this.searchValue);
  }
}

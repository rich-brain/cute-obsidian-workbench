import { App, Notice, TFile } from "obsidian";

export interface MarkdownFilePickerOptions {
  label: string;
  placeholder?: string;
  value?: string;
  onChange: (path: string) => void;
}

export class MarkdownFilePicker {
  private readonly markdownFiles: TFile[];
  private notePath: string;
  private query = "";
  private searchInput?: HTMLInputElement;
  private selectedFileEl?: HTMLElement;
  private resultsEl?: HTMLElement;

  constructor(private readonly app: App, private readonly options: MarkdownFilePickerOptions) {
    this.markdownFiles = this.app.vault.getMarkdownFiles();
    this.notePath = options.value ?? "";
  }

  render(container: HTMLElement): void {
    const root = container.createDiv({ cls: "cow-markdown-picker" });
    const row = root.createDiv({ cls: "cow-book-form-row cow-markdown-picker-search" });
    row.createEl("label", { text: this.options.label });
    this.searchInput = row.createEl("input", { attr: { type: "text", placeholder: this.options.placeholder ?? "搜索 Obsidian 中的 Markdown……" } });
    this.searchInput.value = this.query;
    this.searchInput.addEventListener("input", () => {
      this.query = this.searchInput?.value ?? "";
      this.renderResults();
    });
    this.selectedFileEl = root.createDiv({ cls: "cow-selected-note-file" });
    this.resultsEl = root.createDiv({ cls: "cow-note-picker-list" });
    this.renderSelectedFile();
    this.renderResults();
  }

  private renderResults(): void {
    const list = this.resultsEl;
    if (!list) return;
    list.empty();
    const query = this.query.trim().toLowerCase();
    const files = (query
      ? this.markdownFiles.filter((file) => `${file.basename} ${file.name} ${file.path}`.toLowerCase().includes(query))
      : [...this.markdownFiles].sort((a, b) => b.stat.mtime - a.stat.mtime))
      .slice(0, 50);
    if (files.length === 0) {
      list.createDiv({ cls: "cow-empty-state", text: query ? "没有找到匹配的 Markdown 文件。" : "Vault 中暂无 Markdown 文件。" });
      return;
    }
    files.forEach((file) => {
      const button = list.createEl("button", { cls: "cow-data-card cow-click-card", attr: { type: "button" } });
      button.createEl("strong", { text: file.basename });
      button.createDiv({ cls: "cow-meta-line", text: file.path });
      button.addEventListener("click", () => {
        this.notePath = file.path;
        this.query = "";
        if (this.searchInput) this.searchInput.value = "";
        this.options.onChange(file.path);
        this.renderSelectedFile();
        this.renderResults();
      });
    });
  }

  private renderSelectedFile(): void {
    const container = this.selectedFileEl;
    if (!container) return;
    container.empty();
    container.createEl("strong", { text: "已关联" });
    if (!this.notePath) {
      container.createDiv({ cls: "cow-meta-line", text: "尚未选择 Markdown 文件。" });
      return;
    }
    const file = this.app.vault.getAbstractFileByPath(this.notePath);
    container.createDiv({ cls: "cow-selected-note-title", text: `📄 ${file instanceof TFile ? file.name : fileName(this.notePath)}` });
    container.createDiv({ cls: "cow-meta-line", text: this.notePath });
    const actions = container.createDiv({ cls: "cow-list-item-actions" });
    actions.createEl("button", { text: "打开", attr: { type: "button" } }).addEventListener("click", () => void openVaultMarkdown(this.app, this.notePath));
    actions.createEl("button", { text: "更换", attr: { type: "button" } }).addEventListener("click", () => this.searchInput?.focus());
    actions.createEl("button", { text: "解除关联", attr: { type: "button" } }).addEventListener("click", () => {
      this.notePath = "";
      this.options.onChange("");
      this.renderSelectedFile();
    });
  }
}

export async function openVaultMarkdown(app: App, path: string | undefined): Promise<void> {
  if (!path) {
    new Notice("尚未关联 Obsidian 文档。");
    return;
  }
  const file = app.vault.getAbstractFileByPath(path);
  if (!(file instanceof TFile)) {
    new Notice("未找到关联的 Obsidian 文档。");
    return;
  }
  await app.workspace.getLeaf(false).openFile(file);
}

function fileName(path: string): string {
  return path.split(/[\\/]/).pop() || path;
}

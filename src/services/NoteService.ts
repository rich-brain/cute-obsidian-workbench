import { TFile, type App } from "obsidian";
import { CalendarService } from "./CalendarService";

export interface CalendarNoteGroup {
  dailyNote: TFile | null;
  created: TFile[];
  modified: TFile[];
  linked: TFile[];
}

export class NoteService {
  private readonly calendar = new CalendarService();

  constructor(private readonly app: App) {}

  getVaultName(): string {
    return this.app.vault.getName();
  }

  getDailyNotePath(date: Date): string {
    return `Daily Notes/${this.calendar.getDateKey(date)}.md`;
  }

  getDailyNote(date: Date): TFile | null {
    return this.app.vault.getFileByPath(this.getDailyNotePath(date));
  }

  async openOrCreateDailyNote(date: Date): Promise<TFile> {
    const existing = this.getDailyNote(date);
    const file = existing ?? await this.createUniqueFile(
      "Daily Notes",
      this.calendar.getDateKey(date),
      `# ${this.calendar.getDateKey(date)}\n\n`
    );
    await this.app.workspace.getLeaf(false).openFile(file);
    return file;
  }

  getRecentMarkdownFiles(limit = 12): TFile[] {
    return this.app.vault.getMarkdownFiles()
      .sort((left, right) => right.stat.mtime - left.stat.mtime)
      .slice(0, limit);
  }

  getNotesForDate(date: Date): CalendarNoteGroup {
    const dateKey = this.calendar.getDateKey(date);
    const dailyNote = this.getDailyNote(date);
    const markdownFiles = this.app.vault.getMarkdownFiles();
    const dailyPath = dailyNote?.path;
    const isNotDaily = (file: TFile): boolean => file.path !== dailyPath;

    const created = markdownFiles
      .filter((file) => isNotDaily(file) && this.calendar.getDateKey(new Date(file.stat.ctime)) === dateKey)
      .sort((left, right) => right.stat.ctime - left.stat.ctime);

    const modified = markdownFiles
      .filter((file) => isNotDaily(file) && this.calendar.getDateKey(new Date(file.stat.mtime)) === dateKey)
      .sort((left, right) => right.stat.mtime - left.stat.mtime);

    const linked = markdownFiles
      .filter((file) => isNotDaily(file) && this.isExplicitlyLinkedToDate(file, dateKey))
      .sort((left, right) => right.stat.mtime - left.stat.mtime);

    return { dailyNote, created, modified, linked };
  }

  hasNotesForDate(date: Date): boolean {
    const notes = this.getNotesForDate(date);
    return Boolean(notes.dailyNote || notes.created.length > 0 || notes.modified.length > 0 || notes.linked.length > 0);
  }

  getNoteCountForDate(date: Date): number {
    const notes = this.getNotesForDate(date);
    const paths = new Set<string>();
    if (notes.dailyNote) paths.add(notes.dailyNote.path);
    notes.created.forEach((file) => paths.add(file.path));
    notes.modified.forEach((file) => paths.add(file.path));
    notes.linked.forEach((file) => paths.add(file.path));
    return paths.size;
  }

  async createNote(): Promise<TFile> {
    const file = await this.createUniqueFile("Cute Workbench Notes", "未命名笔记", "# 未命名笔记\n\n");
    await this.app.workspace.getLeaf(false).openFile(file);
    return file;
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

  private isExplicitlyLinkedToDate(file: TFile, dateKey: string): boolean {
    const cache = this.app.metadataCache.getFileCache(file);
    const frontmatter = cache?.frontmatter;
    const frontmatterValues = [
      frontmatter?.date,
      frontmatter?.day,
      frontmatter?.created,
      frontmatter?.updated,
      frontmatter?.workbenchDate
    ];

    if (frontmatterValues.some((value) => this.valueContainsDate(value, dateKey))) {
      return true;
    }

    const links = [...(cache?.links ?? []), ...(cache?.embeds ?? [])];
    return links.some((link) => link.link.includes(dateKey));
  }

  private valueContainsDate(value: unknown, dateKey: string): boolean {
    if (Array.isArray(value)) {
      return value.some((item) => this.valueContainsDate(item, dateKey));
    }

    return typeof value === "string" && value.includes(dateKey);
  }
}

import { ItemView, Notice, WorkspaceLeaf } from "obsidian";
import type CuteObsidianWorkbenchPlugin from "../main";
import { DashboardRouter, ROUTE_CHANGED_EVENT } from "../core/DashboardRouter";
import { EventBus } from "../core/EventBus";
import { Sidebar } from "../components/Sidebar";
import { PageHeader } from "../components/PageHeader";
import type { DashboardPage } from "../types/dashboard";
import { OverviewPage } from "../pages/OverviewPage";
import { ResearchPage } from "../pages/ResearchPage";
import { ReadingPage } from "../pages/ReadingPage";
import { FitnessPage } from "../pages/FitnessPage";
import { FinancePage } from "../pages/FinancePage";
import { TasksPage } from "../pages/TasksPage";
import { GoalsPage } from "../pages/GoalsPage";
import { ModulesPage } from "../pages/ModulesPage";
import { QuickCreateModal } from "../components/QuickCreateModal";
import { WorkbenchCustomizeModal } from "../components/WorkbenchCustomizeModal";
import { DayDetailModal } from "../components/DayDetailModal";
import { NotesManagerModal } from "../components/NotesManagerModal";
import { NoteService } from "../services/NoteService";
import { AvatarPickerModal } from "../components/AvatarPickerModal";
import { WorkbenchReminderModal } from "../components/WorkbenchReminderModal";

interface CommandEnabledApp {
  commands?: {
    executeCommandById(commandId: string): boolean;
  };
}

export const WORKBENCH_VIEW_TYPE = "cute-obsidian-workbench-view";

export class WorkbenchView extends ItemView {
  private readonly eventBus = new EventBus();
  private readonly router: DashboardRouter;
  private sidebar?: Sidebar;
  private pageHost?: HTMLElement;
  private sectionHeightObserver?: ResizeObserver;
  private dateWatcher?: number;
  private lastDateKey = this.getDateKey(new Date());

  constructor(
    leaf: WorkspaceLeaf,
    private readonly plugin: CuteObsidianWorkbenchPlugin
  ) {
    super(leaf);
    this.router = new DashboardRouter(this.eventBus, this.plugin.store.getData().currentPage);
  }

  getViewType(): string {
    return WORKBENCH_VIEW_TYPE;
  }

  getDisplayText(): string {
    return "Cute Workbench";
  }

  getIcon(): string {
    return "leaf";
  }

  async onOpen(): Promise<void> {
    this.eventBus.on<DashboardPage>(ROUTE_CHANGED_EVENT, async (page) => {
      await this.plugin.store.setCurrentPage(page);
      this.render();
    });
    this.dateWatcher = window.setInterval(() => this.checkDateChange(), 60_000);
    this.render();
  }

  async onClose(): Promise<void> {
    this.pageHost?.querySelectorAll(".cow-dashboard-grid").forEach((grid) => grid.dispatchEvent(new Event("cow-layout-destroy")));
    if (this.dateWatcher) {
      window.clearInterval(this.dateWatcher);
      this.dateWatcher = undefined;
    }
    this.sectionHeightObserver?.disconnect();
    this.sectionHeightObserver = undefined;
    this.sidebar?.destroy();
    this.eventBus.clear();
  }

  private render(): void {
    const container = this.containerEl.children[1] as HTMLElement;
    this.pageHost?.querySelectorAll(".cow-dashboard-grid").forEach((grid) => grid.dispatchEvent(new Event("cow-layout-destroy")));
    this.sectionHeightObserver?.disconnect();
    this.sectionHeightObserver = undefined;
    container.empty();
    container.addClass("cute-obsidian-workbench");
    this.applyTheme(container);
    this.sidebar?.destroy();

    const shell = container.createDiv({ cls: "cow-shell" });
    this.sidebar = new Sidebar(this.app, this.router.getCurrentPage(), [
      { label: "总览", icon: "home", page: "overview", group: "", onClick: () => this.router.navigate("overview") },
      { label: "科研", icon: "flask-conical", page: "research", group: "工作模块", onClick: () => this.router.navigate("research") },
      { label: "阅读", icon: "book-open", page: "reading", group: "工作模块", onClick: () => this.router.navigate("reading") },
      { label: "健身", icon: "dumbbell", page: "fitness", group: "工作模块", onClick: () => this.router.navigate("fitness") },
      { label: "理财", icon: "wallet-cards", page: "finance", group: "工作模块", onClick: () => this.router.navigate("finance") },
      { label: "任务管理", icon: "list-checks", page: "tasks", group: "工作模块", onClick: () => this.router.navigate("tasks") },
      { label: "目标管理", icon: "target", page: "goals", group: "工作模块", onClick: () => this.router.navigate("goals") },
      { label: "每日笔记", icon: "calendar-days", group: "知识管理", onClick: () => void new NoteService(this.app).openOrCreateDailyNote(new Date()) },
      { label: "笔记管理", icon: "notebook-tabs", group: "知识管理", onClick: () => new NotesManagerModal(this.app).open() },
      { label: "模块管理", icon: "layout-grid", page: "modules", group: "", onClick: () => this.router.navigate("modules") },
      { label: "设置", icon: "settings", group: "", onClick: () => this.openSettings() }
    ], () => {
      new QuickCreateModal(this.app, this.plugin.store, () => this.router.getCurrentPage(), () => this.render()).open();
    }, (date) => {
      new DayDetailModal(this.app, this.plugin.store, date).open();
    }, this.plugin.store.getData.bind(this.plugin.store), () => this.openAvatarPicker("sidebar"));
    this.sidebar.render(shell);

    const main = shell.createDiv({ cls: "cow-main" });
    const pageHost = main.createDiv({ cls: "cow-page-host" });
    this.pageHost = pageHost;
    const definition = this.plugin.store.getPages().find((item) => item.id === this.router.getCurrentPage());
    if (definition) {
      new PageHeader(definition, this.router.getCurrentPage(), {
        onSearch: () => new NotesManagerModal(this.app).open(),
        onReminder: () => new WorkbenchReminderModal(this.app, this.plugin.store).open(),
        onSettings: () => this.openSettings(),
        onCustomize: () => new WorkbenchCustomizeModal(this.app, this.plugin.store, () => this.router.getCurrentPage(), () => this.render()).open()
      }).render(pageHost);
    }
    const pageContent = pageHost.createDiv({ cls: "cow-page-content" });
    this.renderPage(pageContent, this.router.getCurrentPage());
    this.observeSectionHeight(container, pageHost);
  }

  private observeSectionHeight(root: HTMLElement, pageHost: HTMLElement): void {
    const update = () => {
      const visibleHeight = Math.max(1, pageHost.clientHeight);
      root.style.setProperty("--wb-section-max-height", `${Math.floor(visibleHeight * 2 / 3)}px`);
    };
    update();
    if (typeof ResizeObserver === "undefined") return;
    this.sectionHeightObserver = new ResizeObserver(update);
    this.sectionHeightObserver.observe(pageHost);
  }

  private renderPage(container: HTMLElement, page: DashboardPage): void {
    const refresh = () => this.renderPreservingScroll();
    const pageMap = {
      overview: new OverviewPage(this.app, this.plugin.store, "overview", refresh),
      research: new ResearchPage(this.app, this.plugin.store, "research", refresh),
      reading: new ReadingPage(this.app, this.plugin.store, "reading", refresh),
      fitness: new FitnessPage(this.app, this.plugin.store, "fitness", refresh),
      finance: new FinancePage(this.app, this.plugin.store, "finance", refresh),
      tasks: new TasksPage(this.app, this.plugin.store, "tasks", refresh),
      goals: new GoalsPage(this.app, this.plugin.store, "goals", refresh),
      modules: new ModulesPage(this.app, this.plugin.store, "modules", refresh)
    };

    pageMap[page].render(container);
  }

  private renderPreservingScroll(): void {
    const scrollTop = this.pageHost?.scrollTop ?? 0;
    this.render();
    window.requestAnimationFrame(() => {
      if (this.pageHost) this.pageHost.scrollTop = scrollTop;
    });
  }

  private applyTheme(container: HTMLElement): void {
    const theme = this.plugin.store.getData().theme;
    container.style.setProperty("--cute-bg", theme.cuteBg);
    container.style.setProperty("--cute-card", theme.cuteCard);
    container.style.setProperty("--cute-primary", theme.cutePrimary);
    container.style.setProperty("--cute-secondary", theme.cuteSecondary);
    container.style.setProperty("--cute-text", theme.cuteText);
    container.style.setProperty("--cute-border", theme.cuteBorder);
    container.style.setProperty("--cute-radius", `${theme.cuteRadius}px`);
    container.style.setProperty("--cute-shadow", theme.cuteShadow);
    container.style.setProperty("--cute-card-opacity", String(theme.cardOpacity));
    container.style.setProperty("--cute-texture-strength", String(theme.textureStrength));
    container.style.setProperty("--cute-font-size", `${theme.fontSize}px`);
  }

  private openFileExplorer(): void {
    const didRun = (this.app as CommandEnabledApp).commands?.executeCommandById("file-explorer:open");
    if (!didRun) {
      new Notice("未能激活 Obsidian 文件管理器。");
    }
  }

  private openSettings(): void {
    const didRun = (this.app as CommandEnabledApp).commands?.executeCommandById("app:open-settings");
    if (!didRun) new Notice("无法打开 Obsidian 设置。请从左下角设置入口打开。 ");
  }

  private openAvatarPicker(target: "sidebar" | "banner"): void {
    const banner = this.plugin.store.getData().banner;
    new AvatarPickerModal(
      this.app,
      target === "sidebar" ? "修改左侧头像" : "修改 Banner 图标",
      target === "sidebar" ? banner.sidebarAvatar : banner.bannerAvatar,
      async (avatar) => {
        if (target === "sidebar") {
          await this.plugin.store.updateSidebarAvatar(avatar);
        } else {
          await this.plugin.store.updateBannerAvatar(avatar);
        }
        this.render();
      }
    ).open();
  }

  private checkDateChange(): void {
    const current = this.getDateKey(new Date());
    if (current === this.lastDateKey) return;
    this.lastDateKey = current;
    this.pageHost?.querySelectorAll(".cow-checkin-section").forEach((section) => {
      section.dispatchEvent(new CustomEvent("cow-checkin-date-change"));
    });
  }

  private getDateKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
}

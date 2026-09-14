import { ItemView, Notice, WorkspaceLeaf } from "obsidian";
import type CuteObsidianWorkbenchPlugin from "../main";
import { DashboardRouter, ROUTE_CHANGED_EVENT } from "../core/DashboardRouter";
import { EventBus } from "../core/EventBus";
import { Sidebar } from "../components/Sidebar";
import { TopBanner } from "../components/TopBanner";
import { TopNavigation } from "../components/TopNavigation";
import type { DashboardPage } from "../types/dashboard";
import { OverviewPage } from "../pages/OverviewPage";
import { ResearchPage } from "../pages/ResearchPage";
import { ReadingPage } from "../pages/ReadingPage";
import { FitnessPage } from "../pages/FitnessPage";
import { FinancePage } from "../pages/FinancePage";
import { GoalsPage } from "../pages/GoalsPage";
import { ModulesPage } from "../pages/ModulesPage";
import { QuickCreateModal } from "../components/QuickCreateModal";
import { WorkbenchCustomizeModal } from "../components/WorkbenchCustomizeModal";
import { DayDetailModal } from "../components/DayDetailModal";
import { NotesManagerModal } from "../components/NotesManagerModal";
import { NoteService } from "../services/NoteService";
import { AvatarPickerModal } from "../components/AvatarPickerModal";

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
    this.render();
  }

  async onClose(): Promise<void> {
    this.sidebar?.destroy();
    this.eventBus.clear();
  }

  private render(): void {
    const container = this.containerEl.children[1] as HTMLElement;
    container.empty();
    container.addClass("cute-obsidian-workbench");
    this.applyTheme(container);
    this.sidebar?.destroy();

    const shell = container.createDiv({ cls: `cow-shell cow-layout-${this.plugin.store.getData().userSettings.overviewLayout}` });
    this.sidebar = new Sidebar(this.app, this.router.getCurrentPage(), [
      { label: "工作台", icon: "home", onClick: () => this.router.navigate("overview") },
      { label: "每日笔记", icon: "calendar-days", onClick: () => void new NoteService(this.app).openOrCreateDailyNote(new Date()) },
      { label: "笔记管理", icon: "notebook-tabs", onClick: () => new NotesManagerModal(this.app).open() },
      { label: "全部文件", icon: "files", onClick: () => this.openFileExplorer() },
      { label: "模块管理", icon: "layout-grid", onClick: () => this.router.navigate("modules") }
    ], () => {
      new QuickCreateModal(this.app, this.plugin.store, () => this.router.getCurrentPage(), () => this.render()).open();
    }, (date) => {
      new DayDetailModal(this.app, this.plugin.store, date).open();
    }, this.plugin.store.getData.bind(this.plugin.store), () => this.openAvatarPicker("sidebar"));
    this.sidebar.render(shell);

    const main = shell.createDiv({ cls: "cow-main" });
    new TopBanner(this.plugin.store.getData.bind(this.plugin.store), () => {
      new WorkbenchCustomizeModal(this.app, this.plugin.store, () => this.router.getCurrentPage(), () => this.render()).open();
    }, () => this.openAvatarPicker("banner")).render(main);

    new TopNavigation(this.plugin.store.getPages(), () => this.router.getCurrentPage(), (page) => {
      this.router.navigate(page);
    }).render(main);

    const pageHost = main.createDiv({ cls: "cow-page-host" });
    this.renderPage(pageHost, this.router.getCurrentPage());
  }

  private renderPage(container: HTMLElement, page: DashboardPage): void {
    const refresh = () => this.render();
    const pageMap = {
      overview: new OverviewPage(this.app, this.plugin.store, "overview", refresh),
      research: new ResearchPage(this.app, this.plugin.store, "research", refresh),
      reading: new ReadingPage(this.app, this.plugin.store, "reading", refresh),
      fitness: new FitnessPage(this.app, this.plugin.store, "fitness", refresh),
      finance: new FinancePage(this.app, this.plugin.store, "finance", refresh),
      goals: new GoalsPage(this.app, this.plugin.store, "goals", refresh),
      modules: new ModulesPage(this.app, this.plugin.store, "modules", refresh)
    };

    pageMap[page].render(container);
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
}

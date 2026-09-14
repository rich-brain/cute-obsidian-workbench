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
      { label: "每日笔记", icon: "calendar-days", onClick: () => new Notice("每日笔记服务将在下一阶段接入。") },
      { label: "笔记管理", icon: "notebook-tabs", onClick: () => new Notice("笔记管理服务将在下一阶段接入。") },
      { label: "全部文件", icon: "files", onClick: () => new Notice("文件目录快捷入口已预留。") },
      { label: "模块管理", icon: "layout-grid", onClick: () => this.router.navigate("modules") }
    ]);
    this.sidebar.render(shell);

    const main = shell.createDiv({ cls: "cow-main" });
    new TopBanner(this.plugin.store.getData.bind(this.plugin.store), async () => {
      const current = this.plugin.store.getData().banner.background;
      const next = current === "pink-paper" ? "cream-stars" : current === "cream-stars" ? "soft-hearts" : "pink-paper";
      await this.plugin.store.updateBanner({ background: next, imageDataUrl: undefined });
      this.render();
      new Notice("已更换 Banner 背景。");
    }).render(main);

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
}

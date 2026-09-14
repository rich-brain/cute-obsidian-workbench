import { Plugin, WorkspaceLeaf } from "obsidian";
import { DashboardStore } from "./core/DashboardStore";
import { WorkbenchSettingTab } from "./settings/WorkbenchSettingTab";
import { WORKBENCH_VIEW_TYPE, WorkbenchView } from "./views/WorkbenchView";

export default class CuteObsidianWorkbenchPlugin extends Plugin {
  store!: DashboardStore;

  async onload(): Promise<void> {
    this.store = new DashboardStore(
      () => this.loadData(),
      (data) => this.saveData(data)
    );
    await this.store.load();

    this.registerView(
      WORKBENCH_VIEW_TYPE,
      (leaf: WorkspaceLeaf) => new WorkbenchView(leaf, this)
    );

    this.addRibbonIcon("leaf", "打开 Cute Workbench", async () => {
      await this.activateWorkbenchView();
    });

    this.addCommand({
      id: "open-cute-workbench",
      name: "Open Cute Workbench",
      callback: async () => {
        await this.activateWorkbenchView();
      }
    });

    this.addSettingTab(new WorkbenchSettingTab(this.app, this));
  }

  onunload(): void {
    this.app.workspace.detachLeavesOfType(WORKBENCH_VIEW_TYPE);
  }

  async activateWorkbenchView(): Promise<void> {
    const existingLeaves = this.app.workspace.getLeavesOfType(WORKBENCH_VIEW_TYPE);
    let leaf = existingLeaves[0];

    if (!leaf) {
      leaf = this.app.workspace.getLeaf("tab");
      await leaf.setViewState({
        type: WORKBENCH_VIEW_TYPE,
        active: true
      });
    }

    this.app.workspace.revealLeaf(leaf);
  }
}

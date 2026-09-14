import { App, PluginSettingTab, Setting } from "obsidian";
import type CuteObsidianWorkbenchPlugin from "../main";

export class WorkbenchSettingTab extends PluginSettingTab {
  constructor(app: App, private readonly plugin: CuteObsidianWorkbenchPlugin) {
    super(app, plugin);
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Cute Obsidian Workbench" });

    new Setting(containerEl)
      .setName("Banner 文案")
      .setDesc("显示在工作台顶部 Banner 中的激励文案。")
      .addText((text) => {
        text
          .setValue(this.plugin.store.getData().banner.message)
          .onChange(async (value) => {
            await this.plugin.store.updateBannerMessage(value.trim() || "要成功，先发疯，不顾一切向前冲。");
          });
      });
  }
}

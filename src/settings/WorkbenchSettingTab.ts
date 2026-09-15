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

    new Setting(containerEl)
      .setName("Zotero / Better BibTeX JSON 路径")
      .setDesc("填写 Vault 内 JSON 文件路径，例如 Zotero/library.json。用于论文队列导入，不依赖 Zotero Integration 私有 API。")
      .addText((text) => {
        text
          .setPlaceholder("Zotero/library.json")
          .setValue(this.plugin.store.getData().userSettings.zoteroJsonPath ?? "")
          .onChange(async (value) => {
            await this.plugin.store.updateUserSettings({ zoteroJsonPath: value.trim() });
          });
      });
  }
}

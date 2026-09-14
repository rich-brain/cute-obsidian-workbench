import { App, Modal, Notice, setIcon, Setting } from "obsidian";
import { AddSectionModal } from "./AddSectionButton";
import { type DashboardStore } from "../core/DashboardStore";
import type { DashboardPage } from "../types/dashboard";

export class WorkbenchCustomizeModal extends Modal {
  private titleValue: string;
  private subtitleValue: string;

  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly getCurrentPage: () => DashboardPage,
    private readonly onDataChanged: () => void
  ) {
    super(app);
    const banner = this.store.getData().banner;
    this.titleValue = banner.message;
    this.subtitleValue = banner.subtitle ?? "把想法变成行动，让每一天都更靠近理想的自己。";
  }

  onOpen(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "自定义工作台" });
    this.contentEl.createEl("p", { text: "调整 Banner 和当前页面入口。" });

    const backgrounds = [
      { id: "pink-paper", label: "粉色纸张" },
      { id: "cream-stars", label: "奶油星星" },
      { id: "soft-hearts", label: "柔和爱心" }
    ];
    const choices = this.contentEl.createDiv({ cls: "cow-background-choice-grid" });
    backgrounds.forEach((background) => {
      const button = choices.createEl("button", {
        cls: this.store.getData().banner.background === background.id ? "is-active" : "",
        attr: { type: "button" }
      });
      setIcon(button.createSpan(), "image");
      button.createSpan({ text: background.label });
      button.addEventListener("click", async () => {
        await this.store.updateBanner({ background: background.id, imageDataUrl: undefined });
        this.onDataChanged();
        this.close();
      });
    });

    const fileInput = this.contentEl.createEl("input", {
      cls: "cow-hidden-input",
      attr: { type: "file", accept: "image/*" }
    });
    fileInput.addEventListener("change", async () => {
      const file = fileInput.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async () => {
        await this.store.updateBanner({ background: "local-image", imageDataUrl: String(reader.result) });
        this.onDataChanged();
        this.close();
      };
      reader.readAsDataURL(file);
    });

    new Setting(this.contentEl)
      .setName("本地图片")
      .setDesc("保存为 data URL，BRAT 安装后不依赖额外资源路径。")
      .addButton((button) => button.setButtonText("选择图片").onClick(() => fileInput.click()));

    new Setting(this.contentEl)
      .setName("Banner 主标题")
      .addText((text) => text.setValue(this.titleValue).onChange((value) => {
        this.titleValue = value;
      }));

    new Setting(this.contentEl)
      .setName("Banner 副标题")
      .addText((text) => text.setValue(this.subtitleValue).onChange((value) => {
        this.subtitleValue = value;
      }));

    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    const addSection = actions.createEl("button", { attr: { type: "button" } });
    setIcon(addSection.createSpan(), "plus");
    addSection.createSpan({ text: "添加当前页面功能分区" });
    addSection.addEventListener("click", () => {
      this.close();
      this.openAddSectionModal();
    });

    const save = actions.createEl("button", { cls: "mod-cta", text: "保存", attr: { type: "button" } });
    save.addEventListener("click", async () => {
      await this.store.updateBanner({
        message: this.titleValue.trim() || "今天也要可爱地推进一点点",
        subtitle: this.subtitleValue.trim() || "把想法变成行动，让每一天都更靠近理想的自己。"
      });
      this.onDataChanged();
      new Notice("Banner 文案已保存。");
      this.close();
    });
  }

  private openAddSectionModal(): void {
    const page = this.getCurrentPage();
    new AddSectionModal(this.app, page, this.store.getAvailableModules(page), async (moduleType) => {
      await this.store.addSection(page, moduleType);
      this.onDataChanged();
    }).open();
  }
}

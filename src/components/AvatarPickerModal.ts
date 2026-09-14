import { App, Modal, Notice, setIcon } from "obsidian";
import type { WorkbenchAvatarSettings } from "../types/dashboard";

export const AVATAR_PRESETS = [
  { id: "dog", label: "手绘狗狗", icon: "dog" },
  { id: "heart", label: "爱心", icon: "heart" },
  { id: "star", label: "星星", icon: "sparkles" },
  { id: "flower", label: "小花", icon: "flower-2" },
  { id: "moon", label: "月亮", icon: "moon" }
];

export function renderWorkbenchAvatar(container: HTMLElement, avatar: WorkbenchAvatarSettings | undefined, className: string): HTMLElement {
  const value = avatar ?? { type: "preset", value: "dog" };
  const wrapperClass = className === "cow-banner-dog" ? "cow-banner-avatar-wrapper" : "cow-sidebar-avatar-wrapper";
  const imageClass = className === "cow-banner-dog" ? "cow-banner-avatar-image" : "cow-sidebar-avatar-image";
  const root = container.createDiv({ cls: `${className} ${wrapperClass} cow-custom-avatar cow-avatar-${value.type === "preset" ? value.value : "image"}` });
  if (value.type === "image") {
    root.createEl("img", { cls: imageClass, attr: { src: value.value, alt: "" } });
    return root;
  }

  if (value.value === "dog") {
    root.createDiv({ cls: className === "cow-banner-dog" ? "cow-dog-face" : "cow-mini-dog" });
    return root;
  }

  const preset = AVATAR_PRESETS.find((item) => item.id === value.value) ?? AVATAR_PRESETS[0];
  setIcon(root.createSpan(), preset.icon);
  return root;
}

export class AvatarPickerModal extends Modal {
  constructor(
    app: App,
    private readonly title: string,
    private readonly current: WorkbenchAvatarSettings | undefined,
    private readonly onPick: (avatar: WorkbenchAvatarSettings) => Promise<void>
  ) {
    super(app);
  }

  onOpen(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: this.title });
    this.contentEl.createEl("p", { text: "选择预设图标，或上传一张本地图片保存为 data URL。" });

    const grid = this.contentEl.createDiv({ cls: "cow-avatar-choice-grid" });
    AVATAR_PRESETS.forEach((preset) => {
      const button = grid.createEl("button", {
        cls: this.current?.type === "preset" && this.current.value === preset.id ? "is-active" : "",
        attr: { type: "button" }
      });
      const preview = button.createDiv({ cls: `cow-avatar-preview cow-avatar-${preset.id}` });
      if (preset.id === "dog") {
        preview.createDiv({ cls: "cow-mini-dog" });
      } else {
        setIcon(preview.createSpan(), preset.icon);
      }
      button.createSpan({ text: preset.label });
      button.addEventListener("click", async () => {
        await this.onPick({ type: "preset", value: preset.id });
        new Notice("图标已保存。");
        this.close();
      });
    });

    const fileInput = this.contentEl.createEl("input", {
      cls: "cow-hidden-input",
      attr: { type: "file", accept: "image/*" }
    });
    fileInput.addEventListener("change", () => {
      const file = fileInput.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async () => {
        await this.onPick({ type: "image", value: String(reader.result) });
        new Notice("图片图标已保存。");
        this.close();
      };
      reader.readAsDataURL(file);
    });

    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    const upload = actions.createEl("button", { attr: { type: "button" } });
    setIcon(upload.createSpan(), "image-plus");
    upload.createSpan({ text: "上传图片" });
    upload.addEventListener("click", () => fileInput.click());
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
  }
}

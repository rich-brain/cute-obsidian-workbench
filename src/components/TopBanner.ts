import { setIcon } from "obsidian";
import type { WorkbenchData } from "../types/dashboard";
import { renderWorkbenchAvatar } from "./AvatarPickerModal";

export class TopBanner {
  constructor(
    private readonly getData: () => WorkbenchData,
    private readonly onCustomize: () => void,
    private readonly onCustomizeAvatar: () => void
  ) {}

  render(container: HTMLElement): void {
    const banner = container.createDiv({ cls: "cow-top-banner" });
    const data = this.getData();
    banner.addClass(`cow-banner-bg-${data.banner.background}`);
    banner.style.backgroundPosition = data.banner.backgroundPosition;
    banner.style.opacity = String(data.banner.opacity);
    if (data.banner.imageDataUrl) {
      banner.style.backgroundImage = `linear-gradient(rgba(255, 224, 237, ${data.banner.overlay ? "0.45" : "0"}), rgba(255, 247, 223, ${data.banner.overlay ? "0.45" : "0"})), url("${data.banner.imageDataUrl}")`;
      banner.style.backgroundSize = "cover";
    }
    const dog = banner.createEl("button", {
      cls: "cow-banner-avatar-button",
      attr: { type: "button", "aria-label": "修改 Banner 图标" }
    });
    renderWorkbenchAvatar(dog, data.banner.bannerAvatar, "cow-banner-dog");
    dog.addEventListener("click", this.onCustomizeAvatar);

    const copy = banner.createDiv({ cls: "cow-banner-copy" });
    copy.createEl("p", { cls: "cow-banner-kicker", text: "冲鸭！" });
    copy.createEl("h2", { text: data.banner.message });
    copy.createEl("p", { text: data.banner.subtitle ?? "把想法变成行动，让每一天都更靠近理想的自己。" });

    const button = banner.createEl("button", {
      cls: "cow-banner-button",
      attr: { type: "button", "aria-label": "自定义工作台" }
    });
    setIcon(button.createSpan(), "plus");
    button.createSpan({ text: "自定义" });
    button.addEventListener("click", this.onCustomize);
  }
}

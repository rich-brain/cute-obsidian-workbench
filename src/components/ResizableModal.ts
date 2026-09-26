import type { Modal } from "obsidian";

export interface ResizableModalOptions {
  className: string;
  width: string;
  height?: string;
  maxWidth: string;
  maxHeight: string;
  minWidth?: string;
  minHeight?: string;
}

export function applyResizableModal(modal: Modal, options: ResizableModalOptions): void {
  const classNames = options.className.split(/\s+/).filter(Boolean);
  const kind = inferModalLayoutKind(classNames);
  modal.modalEl.addClass("cute-resizable-modal", "cow-modal-layout", `cow-modal-kind-${kind}`, ...classNames);
  modal.modalEl.setAttr("data-cow-modal-kind", kind);
  modal.modalEl.style.resize = "both";
  modal.modalEl.style.overflow = "hidden";
  modal.modalEl.style.width = options.width;
  if (options.height) {
    modal.modalEl.style.height = options.height;
  } else {
    modal.modalEl.style.removeProperty("height");
  }
  modal.modalEl.style.maxWidth = options.maxWidth;
  modal.modalEl.style.maxHeight = options.maxHeight;
  if (options.minWidth) {
    modal.modalEl.style.minWidth = options.minWidth;
  }
  if (options.minHeight) {
    modal.modalEl.style.minHeight = options.minHeight;
  }
}

type ModalLayoutKind = "form" | "manager" | "detail" | "statistics";

function inferModalLayoutKind(classNames: string[]): ModalLayoutKind {
  const name = classNames.join(" ").toLowerCase();
  if (/(manager|all-books|zotero)/.test(name)) return "manager";
  if (/(statistics|stats|history|records)/.test(name)) return "statistics";
  if (/detail/.test(name)) return "detail";
  return "form";
}

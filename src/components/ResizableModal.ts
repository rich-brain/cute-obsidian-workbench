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
  modal.modalEl.addClass("cute-resizable-modal", options.className);
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

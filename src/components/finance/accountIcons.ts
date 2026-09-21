import { setIcon } from "obsidian";
import type { Account } from "../../types/dashboard";

export function getAccountTypeIcon(type?: Account["type"]): string {
  if (type === "现金") return "wallet";
  if (type === "储蓄卡") return "landmark";
  if (type === "信用卡") return "credit-card";
  if (type === "支付宝" || type === "微信钱包") return "smartphone";
  if (type === "投资账户" || type === "证券") return "chart-no-axes-combined";
  return "circle-dollar-sign";
}

export function renderAccountIcon(container: HTMLElement, type?: Account["type"]): HTMLElement {
  const icon = container.createSpan({ cls: "cow-account-icon" });
  setIcon(icon, getAccountTypeIcon(type));
  return icon;
}

export function accountLabel(account?: Account): string {
  return account ? `${account.type} · ${account.name}` : "未选择账户";
}

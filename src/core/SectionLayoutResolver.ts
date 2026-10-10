import type { DashboardSectionConfig, ModuleLayoutConfig, SectionLayoutConfig } from "../types/dashboard";

export interface ResolvedSectionLayout extends Required<SectionLayoutConfig> {
  columns: number;
  gridColumn: string;
  gridRow: string;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, Number(value) || min));
}

function defaultColSpan(section: DashboardSectionConfig): number {
  if (section.width === "full") return 12;
  if (section.width === "lg") return 8;
  if (section.width === "sm") return 3;
  return 4;
}

export function resolveSectionLayout(
  section: DashboardSectionConfig,
  layout: ModuleLayoutConfig
): ResolvedSectionLayout {
  const columns = Math.max(1, Number(layout.columns) || 12);
  const config = layout.sections?.[section.id];
  const colSpan = clamp(config?.colSpan ?? defaultColSpan(section), 1, columns);
  const rowSpan = clamp(config?.rowSpan ?? 1, 1, 12);
  const order = Number(config?.order ?? section.order) || section.order;

  return {
    order,
    colSpan,
    rowSpan,
    columns,
    gridColumn: `span ${colSpan}`,
    gridRow: `span ${rowSpan}`
  };
}

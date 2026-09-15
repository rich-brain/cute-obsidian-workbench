export interface GoalStatisticsPeriodAction {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function renderGoalStatisticsLayout(
  container: HTMLElement,
  title: string,
  periodActions: GoalStatisticsPeriodAction[] = [],
  renderExtraControls?: (toolbar: HTMLElement) => void
): HTMLElement {
  const shell = container.createDiv({ cls: "cow-goal-stats-layout" });
  const header = shell.createDiv({ cls: "cow-goal-stats-header" });
  header.createEl("h2", { text: title });
  const toolbar = header.createDiv({ cls: "cow-goal-stats-toolbar" });
  periodActions.forEach((action) => {
    const button = toolbar.createEl("button", {
      text: action.label,
      cls: action.active ? "is-active" : "",
      attr: { type: "button" }
    });
    if (action.onClick) button.addEventListener("click", action.onClick);
  });
  renderExtraControls?.(toolbar);
  return shell.createDiv({ cls: "cow-goal-stats-content" });
}

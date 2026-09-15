import { App, Modal, Setting } from "obsidian";
import type { Goal, KeyResult, Milestone, Objective, Risk } from "../../types/dashboard";
import { formatDateKey } from "../../core/DashboardStore";

export class GoalEditorModal extends Modal {
  private title: string;
  private description: string;
  private category: string;
  private progress: number;
  private deadline: string;
  private status: Goal["status"];

  constructor(
    app: App,
    private readonly goal: Goal | undefined,
    private readonly onSubmit: (goal: Goal) => Promise<void>
  ) {
    super(app);
    this.title = goal?.title ?? "";
    this.description = goal?.description ?? "";
    this.category = goal?.category ?? "个人";
    this.progress = goal?.progress ?? 0;
    this.deadline = goal?.deadline ?? formatDateKey(new Date());
    this.status = goal?.status ?? "进行中";
  }

  onOpen(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: this.goal ? "修改目标" : "新增目标" });
    new Setting(this.contentEl).setName("标题").addText((text) => text.setValue(this.title).onChange((value) => (this.title = value.trim())));
    new Setting(this.contentEl).setName("描述").addTextArea((text) => text.setValue(this.description).onChange((value) => (this.description = value.trim())));
    new Setting(this.contentEl).setName("分类").addText((text) => text.setValue(this.category).onChange((value) => (this.category = value.trim() || "个人")));
    new Setting(this.contentEl).setName("进度").addText((text) => {
      text.inputEl.type = "number";
      text.setValue(String(this.progress));
      text.onChange((value) => (this.progress = Number(value) || 0));
    });
    new Setting(this.contentEl).setName("截止日期").addText((text) => text.setValue(this.deadline).onChange((value) => (this.deadline = value.trim())));
    new Setting(this.contentEl).setName("状态").addDropdown((dropdown) => {
      ["未开始", "进行中", "已完成", "暂停"].forEach((status) => dropdown.addOption(status, status));
      dropdown.setValue(this.status);
      dropdown.onChange((value) => (this.status = value as Goal["status"]));
    });
    this.renderActions(async () => {
      if (!this.title) return;
      await this.onSubmit({
        id: this.goal?.id ?? `goal-${Date.now()}`,
        title: this.title,
        description: this.description,
        category: this.category,
        progress: Math.max(0, Math.min(100, this.progress)),
        deadline: this.deadline,
        status: this.status
      });
    });
  }

  private renderActions(onSave: () => Promise<void>): void {
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存", attr: { type: "button" } }).addEventListener("click", async () => {
      await onSave();
      this.close();
    });
  }
}

export class KeyResultModal extends Modal {
  private objectiveId: string;
  private title = "";
  private progress = 0;

  constructor(
    app: App,
    objectives: Objective[],
    private readonly onSubmit: (keyResult: KeyResult) => Promise<void>
  ) {
    super(app);
    this.objectiveId = objectives[0]?.id ?? "";
    this.objectives = objectives;
  }

  private readonly objectives: Objective[];

  onOpen(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "新增月度目标" });
    new Setting(this.contentEl).setName("季度目标").addDropdown((dropdown) => {
      this.objectives.forEach((objective) => dropdown.addOption(objective.id, `${objective.quarter} · ${objective.title}`));
      dropdown.setValue(this.objectiveId);
      dropdown.onChange((value) => (this.objectiveId = value));
    });
    new Setting(this.contentEl).setName("标题").addText((text) => text.onChange((value) => (this.title = value.trim())));
    new Setting(this.contentEl).setName("进度").addText((text) => {
      text.inputEl.type = "number";
      text.onChange((value) => (this.progress = Number(value) || 0));
    });
    this.renderActions(async () => {
      if (!this.title || !this.objectiveId) return;
      await this.onSubmit({
        id: `kr-${Date.now()}`,
        objectiveId: this.objectiveId,
        title: this.title,
        progress: Math.max(0, Math.min(100, this.progress)),
        completed: false
      });
    });
  }

  private renderActions(onSave: () => Promise<void>): void {
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "添加", attr: { type: "button" } }).addEventListener("click", async () => {
      await onSave();
      this.close();
    });
  }
}

export class MilestoneModal extends Modal {
  private goalId: string;
  private title = "";
  private date = formatDateKey(new Date());

  constructor(
    app: App,
    private readonly goals: Goal[],
    private readonly onSubmit: (milestone: Milestone) => Promise<void>
  ) {
    super(app);
    this.goalId = goals[0]?.id ?? "";
  }

  onOpen(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "新增里程碑" });
    new Setting(this.contentEl).setName("目标").addDropdown((dropdown) => {
      this.goals.forEach((goal) => dropdown.addOption(goal.id, goal.title));
      dropdown.setValue(this.goalId);
      dropdown.onChange((value) => (this.goalId = value));
    });
    new Setting(this.contentEl).setName("标题").addText((text) => text.onChange((value) => (this.title = value.trim())));
    new Setting(this.contentEl).setName("日期").addText((text) => text.setValue(this.date).onChange((value) => (this.date = value.trim())));
    this.renderActions(async () => {
      if (!this.title || !this.goalId) return;
      await this.onSubmit({
        id: `milestone-${Date.now()}`,
        goalId: this.goalId,
        title: this.title,
        date: this.date,
        status: "未开始"
      });
    });
  }

  private renderActions(onSave: () => Promise<void>): void {
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "添加", attr: { type: "button" } }).addEventListener("click", async () => {
      await onSave();
      this.close();
    });
  }
}

export class RiskModal extends Modal {
  private title = "";
  private level: Risk["level"] = "medium";
  private solution = "";

  constructor(
    app: App,
    private readonly onSubmit: (risk: Risk) => Promise<void>
  ) {
    super(app);
  }

  onOpen(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "添加风险" });
    new Setting(this.contentEl).setName("风险").addText((text) => text.onChange((value) => (this.title = value.trim())));
    new Setting(this.contentEl).setName("等级").addDropdown((dropdown) => {
      dropdown.addOption("low", "低");
      dropdown.addOption("medium", "中");
      dropdown.addOption("high", "高");
      dropdown.setValue(this.level);
      dropdown.onChange((value) => (this.level = value as Risk["level"]));
    });
    new Setting(this.contentEl).setName("方案").addTextArea((text) => text.onChange((value) => (this.solution = value.trim())));
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "添加", attr: { type: "button" } }).addEventListener("click", async () => {
      if (!this.title) return;
      await this.onSubmit({ id: `risk-${Date.now()}`, title: this.title, level: this.level, solution: this.solution });
      this.close();
    });
  }
}

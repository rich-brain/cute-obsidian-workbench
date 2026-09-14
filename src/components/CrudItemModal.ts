import { App, Modal, Setting } from "obsidian";

export interface CrudField<T extends Record<string, unknown>> {
  key: keyof T & string;
  name: string;
  type?: "text" | "textarea" | "number" | "checkbox" | "select";
  options?: Array<{ value: string; label: string }>;
}

export class CrudItemModal<T extends Record<string, unknown>> extends Modal {
  private values: T;

  constructor(
    app: App,
    private readonly title: string,
    initialValues: T,
    private readonly fields: CrudField<T>[],
    private readonly onSubmit: (values: T) => Promise<void>
  ) {
    super(app);
    this.values = { ...initialValues };
  }

  onOpen(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: this.title });

    this.fields.forEach((field) => this.renderField(field));

    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      await this.onSubmit(this.values);
      this.close();
    });
  }

  private renderField(field: CrudField<T>): void {
    const currentValue = this.values[field.key];
    const setting = new Setting(this.contentEl).setName(field.name);

    if (field.type === "textarea") {
      setting.addTextArea((text) => text.setValue(String(currentValue ?? "")).onChange((value) => {
        this.values[field.key] = value as T[keyof T & string];
      }));
      return;
    }

    if (field.type === "number") {
      setting.addText((text) => {
        text.inputEl.type = "number";
        text.setValue(String(currentValue ?? 0));
        text.onChange((value) => {
          this.values[field.key] = Number(value) as T[keyof T & string];
        });
      });
      return;
    }

    if (field.type === "checkbox") {
      setting.addToggle((toggle) => toggle.setValue(Boolean(currentValue)).onChange((value) => {
        this.values[field.key] = value as T[keyof T & string];
      }));
      return;
    }

    if (field.type === "select") {
      setting.addDropdown((dropdown) => {
        field.options?.forEach((option) => dropdown.addOption(option.value, option.label));
        dropdown.setValue(String(currentValue ?? field.options?.[0]?.value ?? ""));
        dropdown.onChange((value) => {
          this.values[field.key] = value as T[keyof T & string];
        });
      });
      return;
    }

    setting.addText((text) => text.setValue(String(currentValue ?? "")).onChange((value) => {
      this.values[field.key] = value as T[keyof T & string];
    }));
  }
}

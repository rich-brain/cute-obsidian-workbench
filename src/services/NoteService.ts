import type { App } from "obsidian";

export class NoteService {
  constructor(private readonly app: App) {}

  getVaultName(): string {
    return this.app.vault.getName();
  }
}

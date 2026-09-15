import type { App } from "obsidian";
import type { ZoteroPaperImportInput } from "../core/DashboardStore";

export interface ZoteroImportCandidate extends ZoteroPaperImportInput {
  authors: string;
}

export class ZoteroService {
  constructor(private readonly app: App) {}

  getRegisteredZoteroCommands(): Array<{ id: string; name: string }> {
    const commands = (this.app as App & { commands?: { commands?: Record<string, { id?: string; name?: string }> } }).commands?.commands ?? {};
    return Object.entries(commands)
      .map(([id, command]) => ({ id, name: command.name ?? id }))
      .filter((command) => `${command.id} ${command.name}`.toLowerCase().includes("zotero"));
  }

  async loadBetterBibtexJson(vaultPath: string): Promise<ZoteroImportCandidate[]> {
    if (!vaultPath) return [];
    const exists = await this.app.vault.adapter.exists(vaultPath);
    if (!exists) return [];
    const text = await this.app.vault.adapter.read(vaultPath);
    const parsed = JSON.parse(text) as unknown;
    const items = this.extractItems(parsed);
    return items.map((item) => this.toCandidate(item)).filter((item) => item.title);
  }

  private extractItems(parsed: unknown): Record<string, unknown>[] {
    if (Array.isArray(parsed)) return parsed.filter(isRecord);
    if (isRecord(parsed)) {
      const graph = parsed["@graph"];
      if (Array.isArray(graph)) return graph.filter(isRecord);
      const items = parsed.items;
      if (Array.isArray(items)) return items.filter(isRecord);
      const references = parsed.references;
      if (Array.isArray(references)) return references.filter(isRecord);
    }
    return [];
  }

  private toCandidate(item: Record<string, unknown>): ZoteroImportCandidate {
    const title = stringValue(item.title) || stringValue(item["container-title"]);
    const venue = firstString(item.publicationTitle)
      || firstString(item.conferenceName)
      || firstString(item["container-title"])
      || firstString(item["event-title"]);
    const year = this.extractYear(item);
    const doi = firstString(item.DOI) || firstString(item.doi);
    const url = firstString(item.URL) || firstString(item.url) || (doi ? `https://doi.org/${doi}` : undefined);
    return {
      zoteroItemKey: firstString(item.itemKey) || firstString(item.key) || firstString(item.id),
      citekey: firstString(item.citekey) || firstString(item.citationKey) || firstString(item["citation-key"]),
      title,
      venue,
      year,
      doi,
      paperUrl: url,
      tags: this.extractTags(item),
      authors: this.extractAuthors(item)
    };
  }

  private extractYear(item: Record<string, unknown>): number | undefined {
    const direct = firstString(item.year) || firstString(item.date) || firstString(item.issued);
    const match = direct?.match(/\d{4}/);
    if (match) return Number(match[0]);
    const issued = item.issued;
    if (isRecord(issued) && Array.isArray(issued["date-parts"])) {
      const first = issued["date-parts"][0];
      if (Array.isArray(first) && typeof first[0] === "number") return first[0];
    }
    return undefined;
  }

  private extractTags(item: Record<string, unknown>): string[] {
    const tags = item.tags ?? item.keyword ?? item.keywords;
    if (Array.isArray(tags)) {
      return tags
        .map((tag) => isRecord(tag) ? firstString(tag.tag) || firstString(tag.name) : String(tag))
        .filter((tag): tag is string => Boolean(tag));
    }
    if (typeof tags === "string") {
      return tags.split(/[,;，；]/).map((tag) => tag.trim()).filter(Boolean);
    }
    return [];
  }

  private extractAuthors(item: Record<string, unknown>): string {
    const creators = item.creators ?? item.author ?? item.authors;
    if (!Array.isArray(creators)) return "";
    return creators.map((creator) => {
      if (!isRecord(creator)) return String(creator);
      const literal = firstString(creator.literal) || firstString(creator.name);
      if (literal) return literal;
      return [firstString(creator.given), firstString(creator.family)].filter(Boolean).join(" ");
    }).filter(Boolean).join(", ");
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function stringValue(value: unknown): string {
  if (Array.isArray(value)) return String(value[0] ?? "");
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return "";
}

function firstString(value: unknown): string | undefined {
  const text = stringValue(value).trim();
  return text || undefined;
}

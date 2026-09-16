import type { DashboardStore } from "../core/DashboardStore";
import type { ResearchPaper, VenueDefinition } from "../types/dashboard";
import type { ZoteroPaperItem } from "./ZoteroLocalApiService";

export interface PaperZoteroSyncResult {
  created: number;
  updated: number;
  unchanged: number;
  failed: number;
}

export class PaperZoteroSyncService {
  constructor(private readonly store: DashboardStore) {}

  async importOrUpdateMany(items: ZoteroPaperItem[]): Promise<PaperZoteroSyncResult> {
    const result: PaperZoteroSyncResult = { created: 0, updated: 0, unchanged: 0, failed: 0 };
    for (const item of items) {
      try {
        const status = await this.importOrUpdate(item);
        result[status] += 1;
      } catch {
        result.failed += 1;
      }
    }
    return result;
  }

  async importOrUpdate(item: ZoteroPaperItem): Promise<"created" | "updated" | "unchanged"> {
    const existing = this.store.getResearchPapers().find((paper) => paper.zoteroItemKey === item.itemKey);
    const venueId = await this.resolveVenue(item);
    if (!existing) {
      await this.store.addResearchPaper(this.createPaper(item, venueId));
      return "created";
    }
    const merged = this.mergePaper(existing, item, venueId);
    if (!merged) return "unchanged";
    await this.store.updateResearchPaper(existing.id, merged);
    return "updated";
  }

  async resolveVenue(item: ZoteroPaperItem): Promise<string | undefined> {
    const venue = item.venue?.trim();
    if (!venue) return undefined;
    const existing = this.store.getPaperVenues().find((definition) => sameVenue(definition.name, venue));
    if (existing) return existing.id;
    const next: VenueDefinition = {
      id: `venue-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: venue,
      type: "other",
      color: "#f7c66a"
    };
    await this.store.addPaperVenue(next);
    return next.id;
  }

  mergePaper(existing: ResearchPaper, incoming: ZoteroPaperItem, venueId: string | undefined): Partial<ResearchPaper> | undefined {
    const updates: Partial<ResearchPaper> = {};
    if (existing.title !== incoming.title) updates.title = incoming.title;
    if ((existing.year ?? undefined) !== (incoming.year ?? undefined)) updates.year = incoming.year;
    if ((existing.venueId ?? undefined) !== (venueId ?? undefined)) {
      updates.venueId = venueId;
    }
    if (!existing.paperUrl && incoming.paperUrl) updates.paperUrl = incoming.paperUrl;
    if (Object.keys(updates).length === 0) return undefined;
    updates.updatedAt = Date.now();
    return updates;
  }

  private createPaper(item: ZoteroPaperItem, venueId: string | undefined): ResearchPaper {
    const now = Date.now();
    return {
      id: `paper-${now}-${item.itemKey}`,
      title: item.title,
      venue: "",
      venueId,
      year: item.year,
      statusId: this.store.getPaperStatuses()[0]?.id ?? "paper-status-unread",
      readingProgress: 0,
      readingStartDate: undefined,
      readingEndDate: undefined,
      researchProjectId: undefined,
      tagIds: [],
      paperUrl: item.paperUrl,
      createdAt: now,
      updatedAt: now,
      zoteroItemKey: item.itemKey
    };
  }
}

function sameVenue(left: string, right: string): boolean {
  return left.trim().toLowerCase() === right.trim().toLowerCase();
}

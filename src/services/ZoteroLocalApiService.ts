export interface ZoteroPaperItem {
  itemKey: string;
  title: string;
  venue?: string;
  year?: number;
}

interface ZoteroTopItem {
  key?: string;
  data?: {
    itemType?: string;
    title?: string;
    conferenceName?: string;
    publicationTitle?: string;
    proceedingsTitle?: string;
    date?: string;
  };
}

const ZOTERO_LOCAL_API_BASE = "http://localhost:23119/api";
const PAPER_TYPES = new Set(["journalArticle", "conferencePaper", "preprint", "thesis"]);

export class ZoteroLocalApiService {
  async checkConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${ZOTERO_LOCAL_API_BASE}/`, { method: "GET" });
      return response.ok;
    } catch {
      return false;
    }
  }

  async getTopItems(): Promise<ZoteroTopItem[]> {
    const items: ZoteroTopItem[] = [];
    const limit = 100;
    let start = 0;
    for (;;) {
      const response = await fetch(`${ZOTERO_LOCAL_API_BASE}/users/0/items/top?format=json&limit=${limit}&start=${start}`, { method: "GET" });
      if (!response.ok) throw new Error(`Zotero Local API returned ${response.status}`);
      const page = await response.json() as unknown;
      if (!Array.isArray(page)) break;
      items.push(...page.filter(isZoteroTopItem));
      if (page.length < limit) break;
      start += limit;
    }
    return items;
  }

  async getPapers(): Promise<ZoteroPaperItem[]> {
    const items = await this.getTopItems();
    return items
      .filter((item) => PAPER_TYPES.has(item.data?.itemType ?? ""))
      .map((item) => ({
        itemKey: item.key ?? "",
        title: item.data?.title?.trim() ?? "",
        venue: firstText(item.data?.conferenceName, item.data?.publicationTitle, item.data?.proceedingsTitle),
        year: extractYear(item.data?.date)
      }))
      .filter((item) => item.itemKey && item.title);
  }
}

function isZoteroTopItem(value: unknown): value is ZoteroTopItem {
  return typeof value === "object" && value !== null && "data" in value;
}

function firstText(...values: Array<string | undefined>): string | undefined {
  return values.map((value) => value?.trim()).find(Boolean);
}

function extractYear(value: string | undefined): number | undefined {
  const match = value?.match(/\b(19|20)\d{2}\b/);
  return match ? Number(match[0]) : undefined;
}

import { requestUrl, type RequestUrlResponse } from "obsidian";

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

export interface ZoteroLocalApiDiagnostic {
  url: string;
  status?: number;
  message: string;
  kind: "connection-refused" | "forbidden" | "items-failed" | "request-failed";
}

class ZoteroLocalApiError extends Error {
  constructor(readonly diagnostic: ZoteroLocalApiDiagnostic) {
    super(diagnostic.message);
    this.name = "ZoteroLocalApiError";
  }
}

const ZOTERO_LOCAL_API_BASES = ["http://127.0.0.1:23119/api", "http://localhost:23119/api"];
const PAPER_TYPES = new Set(["journalArticle", "conferencePaper", "preprint", "thesis"]);

export class ZoteroLocalApiService {
  private activeBaseUrl?: string;
  private diagnostic?: ZoteroLocalApiDiagnostic;

  async checkConnection(): Promise<boolean> {
    this.activeBaseUrl = undefined;
    this.diagnostic = undefined;
    for (const baseUrl of ZOTERO_LOCAL_API_BASES) {
      try {
        const response = await this.requestZotero("/", baseUrl);
        if (isOk(response.status)) {
          this.activeBaseUrl = baseUrl;
          return true;
        }
        this.diagnostic = createDiagnostic(baseUrl, response.status);
        this.logDiagnostic(this.diagnostic);
      } catch (error) {
        this.diagnostic = toDiagnostic(baseUrl, error);
        this.logDiagnostic(this.diagnostic);
      }
    }
    return false;
  }

  async getTopItems(): Promise<ZoteroTopItem[]> {
    if (!this.activeBaseUrl && !await this.checkConnection()) {
      throw new ZoteroLocalApiError(this.diagnostic ?? {
        url: ZOTERO_LOCAL_API_BASES[0],
        message: "Zotero Local API 请求失败。",
        kind: "request-failed"
      });
    }
    const items: ZoteroTopItem[] = [];
    const limit = 100;
    let start = 0;
    for (;;) {
      const path = `/users/0/items/top?format=json&limit=${limit}&start=${start}`;
      const response = await this.requestZotero(path, this.activeBaseUrl);
      if (!isOk(response.status)) {
        this.diagnostic = {
          url: `${this.activeBaseUrl}${path}`,
          status: response.status,
          message: `Zotero 已连接，但读取文献列表失败（HTTP ${response.status}）。`,
          kind: "items-failed"
        };
        this.logDiagnostic(this.diagnostic);
        throw new ZoteroLocalApiError(this.diagnostic);
      }
      const page = response.json as unknown;
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

  getDiagnostic(): ZoteroLocalApiDiagnostic | undefined {
    return this.diagnostic;
  }

  private async requestZotero(path: string, baseUrl = this.activeBaseUrl ?? ZOTERO_LOCAL_API_BASES[0]): Promise<RequestUrlResponse> {
    const url = `${baseUrl}${path}`;
    try {
      return await requestUrl({
        url,
        method: "GET",
        headers: {
          "Zotero-Allowed-Request": "true",
          "Zotero-API-Version": "3"
        },
        throw: false
      });
    } catch (error) {
      const diagnostic = toDiagnostic(url, error);
      this.logDiagnostic(diagnostic);
      throw new ZoteroLocalApiError(diagnostic);
    }
  }

  private logDiagnostic(diagnostic: ZoteroLocalApiDiagnostic): void {
    console.warn("[Cute Workbench][Zotero]", diagnostic);
  }
}

export function zoteroErrorMessage(diagnostic: ZoteroLocalApiDiagnostic | undefined): string {
  if (!diagnostic) return "Zotero Local API 请求失败。";
  if (diagnostic.kind === "connection-refused") return "Zotero Desktop 未运行，或本地 API 暂不可达。";
  if (diagnostic.kind === "forbidden") return "Zotero Local API 拒绝请求，请检查 Allow other applications... 设置。";
  if (diagnostic.kind === "items-failed") return "Zotero 已连接，但读取文献列表失败。";
  return "Zotero Local API 请求失败。";
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

function isOk(status: number): boolean {
  return status >= 200 && status < 300;
}

function createDiagnostic(url: string, status: number): ZoteroLocalApiDiagnostic {
  return {
    url,
    status,
    message: `Zotero Local API returned HTTP ${status}`,
    kind: status === 403 ? "forbidden" : "request-failed"
  };
}

function toDiagnostic(url: string, error: unknown): ZoteroLocalApiDiagnostic {
  const message = error instanceof Error ? error.message : String(error);
  const lower = message.toLowerCase();
  const refused = lower.includes("econnrefused") || lower.includes("failed to fetch") || lower.includes("network") || lower.includes("connect");
  return {
    url,
    message,
    kind: refused ? "connection-refused" : "request-failed"
  };
}

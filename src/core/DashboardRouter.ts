import type { DashboardPage } from "../types/dashboard";
import { EventBus } from "./EventBus";

export const ROUTE_CHANGED_EVENT = "route-changed";

export class DashboardRouter {
  constructor(
    private readonly eventBus: EventBus,
    private currentPage: DashboardPage
  ) {}

  getCurrentPage(): DashboardPage {
    return this.currentPage;
  }

  navigate(page: DashboardPage): void {
    if (this.currentPage === page) {
      return;
    }

    this.currentPage = page;
    this.eventBus.emit<DashboardPage>(ROUTE_CHANGED_EVENT, page);
  }
}

import { formatDateKey, type DashboardStore } from "../core/DashboardStore";
import type { CheckInDefinition, CheckInRecord } from "../types/dashboard";

export class CheckInService {
  constructor(private readonly store: DashboardStore) {}

  getDefinitions(moduleId?: string): CheckInDefinition[] {
    return this.store.getActiveCheckInDefinitions(moduleId);
  }

  getAllDefinitions(): CheckInDefinition[] {
    return this.store.getActiveCheckInDefinitions();
  }

  getTodayStatus(checkInId: string): boolean {
    return this.isCompleted(checkInId, formatDateKey(new Date()));
  }

  isCompleted(checkInId: string, date: string): boolean {
    return this.store.isCheckInCompleted(checkInId, date);
  }

  async toggleCheckIn(checkInId: string, date: string): Promise<boolean> {
    return this.store.toggleCheckIn(checkInId, date);
  }

  getRecords(checkInId: string): CheckInRecord[] {
    return this.store.getCheckInRecords(checkInId);
  }

  getRecordsByDate(date: string): CheckInRecord[] {
    return this.store.getCheckInRecordsByDate(date);
  }
}

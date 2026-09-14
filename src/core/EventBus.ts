export type EventHandler<T = unknown> = (payload: T) => void;

export class EventBus {
  private handlers = new Map<string, Set<EventHandler>>();

  on<T = unknown>(eventName: string, handler: EventHandler<T>): () => void {
    const eventHandlers = this.handlers.get(eventName) ?? new Set<EventHandler>();
    eventHandlers.add(handler as EventHandler);
    this.handlers.set(eventName, eventHandlers);

    return () => this.off(eventName, handler);
  }

  off<T = unknown>(eventName: string, handler: EventHandler<T>): void {
    this.handlers.get(eventName)?.delete(handler as EventHandler);
  }

  emit<T = unknown>(eventName: string, payload: T): void {
    this.handlers.get(eventName)?.forEach((handler) => handler(payload));
  }

  clear(): void {
    this.handlers.clear();
  }
}

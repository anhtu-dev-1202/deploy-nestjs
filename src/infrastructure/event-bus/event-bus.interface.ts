import { DomainEvent } from "shared/domain/domain-event";

export interface EventBus {
  publish(event: DomainEvent): Promise<void>;
}
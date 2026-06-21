import { BaseEntity } from './base.entity';
import { DomainEvent } from './domain-event';

export abstract class AggregateRoot extends BaseEntity {
  private events: DomainEvent[] = [];

  protected addEvent(event: DomainEvent) {
    this.events.push(event);
  }

  pullEvents(): DomainEvent[] {
    const events = [...this.events];
    this.events = [];
    return events;
  }
}
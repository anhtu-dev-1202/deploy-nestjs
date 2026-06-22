import { BaseEntity } from './base.entity';
import { DomainEvent } from './domain-event';

export abstract class AggregateRoot extends BaseEntity {
  private events: DomainEvent<any>[] = [];

  protected addEvent(event: DomainEvent<any>) {
    this.events.push(event);
  }

  pullEvents(): DomainEvent<any>[] {
    const events = [...this.events];
    this.events = [];
    return events;
  }
}

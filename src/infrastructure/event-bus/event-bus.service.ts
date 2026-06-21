import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventBus } from './event-bus.interface';
import { DomainEvent } from 'shared/domain/domain-event';

@Injectable()
export class EventBusService implements EventBus {
  constructor(
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async publish(event: DomainEvent): Promise<void> {
    await this.eventEmitter.emitAsync(
      event.name,
      event,
    );
  }
}
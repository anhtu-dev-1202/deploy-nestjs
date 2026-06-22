import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EVENT_BUS } from 'shared/constants/events.constants';
import { EventBusService } from './event-bus.service';

@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [
    {
      provide: EVENT_BUS,
      useClass: EventBusService,
    },
  ],
  exports: [EVENT_BUS],
})
export class EventBusModule {}

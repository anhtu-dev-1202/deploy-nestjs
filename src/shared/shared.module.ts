import { Module } from '@nestjs/common';
import { AppLogger } from 'infrastructure/logger/logger.service';

@Module({
  providers: [AppLogger],
  exports: [AppLogger],
})
export class SharedModule {}

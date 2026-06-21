import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppLogger {
  private logger = new Logger('App');

  info(message: string) {
    this.logger.log(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  error(message: string, trace?: string) {
    this.logger.error(message, trace);
  }
}
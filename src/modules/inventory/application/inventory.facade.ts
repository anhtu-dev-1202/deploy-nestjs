import { Injectable } from '@nestjs/common';
import { ReserveStockUseCase } from './commands/reserve-stock.usecase';
import { ReleaseStockUseCase } from './commands/release-stock.usecase';
import { CheckAvailabilityUseCase } from './commands/check-availability.usecase';

@Injectable()
export class InventoryFacade {
  constructor(
    private readonly reserve: ReserveStockUseCase,
    private readonly release: ReleaseStockUseCase,
    private readonly check: CheckAvailabilityUseCase,
  ) {}

  reserveStock(productId: string, qty: number) {
    return this.reserve.execute(productId, qty);
  }

  releaseStock(productId: string, qty: number) {
    return this.release.execute(productId, qty);
  }

  checkStock(productId: string, qty: number) {
    return this.check.execute(productId, qty);
  }
}
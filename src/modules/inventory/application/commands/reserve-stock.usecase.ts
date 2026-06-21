import { Inject, Injectable } from '@nestjs/common';
import { InventoryRepository } from 'modules/inventory/domain/repositories/inventory.repository';
import { StockAllocationService } from 'modules/inventory/domain/services/stock-allocation.service';
import { INVENTORY_REPOSITORY } from 'modules/shared/common/token';

@Injectable()
export class ReserveStockUseCase {
  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly repo: InventoryRepository,
    private readonly allocator: StockAllocationService,
  ) {}

  async execute(productId: string, qty: number) {
    // 1. load tất cả warehouse stock
    const inventories = await this.repo.findByProductIdAcrossWarehouses(productId);

    // 2. allocate logic (DOMAIN SERVICE)
    const allocations = this.allocator.allocate(inventories, qty);

    // 3. persist
    for (const inv of inventories) {
      await this.repo.save(inv);
    }

    return allocations;
  }
}
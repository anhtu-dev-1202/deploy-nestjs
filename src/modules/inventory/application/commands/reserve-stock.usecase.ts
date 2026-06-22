import { Inject, Injectable } from '@nestjs/common';
import { InventoryRepository } from 'modules/inventory/domain/repositories/inventory.repository';
import {
  AllocationResult,
  StockAllocationService,
} from 'modules/inventory/domain/services/stock-allocation.service';
import { map } from 'rxjs/internal/operators/map';
import { INVENTORY_REPOSITORY } from 'shared/constants/repositories-impl.constants';
import { DataSource } from 'typeorm';

@Injectable()
export class ReserveStockUseCase {
  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly repo: InventoryRepository,
    private readonly allocator: StockAllocationService,
    private readonly dataSource: DataSource,
  ) {}

  async execute(productId: string, qty: number) {
    // 1. load tất cả warehouse stock
    const inventories = await this.repo.findByProductIdAcrossWarehouses(
      productId,
    );

    // 2. allocate logic (DOMAIN SERVICE)
    const allocations = this.allocator.allocate(inventories, qty);

    // 3. persist
    for (const inv of inventories) {
      await this.repo.save(inv);
    }

    return allocations;
  }

  async batchExecute(
    items: {
      productId: string;
      quantity: number;
    }[],
  ): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const inventoriesOfItems = await this.repo.findByProductIdsForUpdate(
        manager,
        items.map((i) => i.productId),
      );

      for (const item of items) {
        const inventories = inventoriesOfItems.filter(
          (i) => i.productId === item.productId,
        );

        this.allocator.allocate(inventories, item.quantity);
      }

      await this.repo.saveMany(manager, inventoriesOfItems);
    });
  }
}

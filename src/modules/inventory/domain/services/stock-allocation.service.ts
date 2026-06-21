import { Injectable } from "@nestjs/common";
import { Inventory } from "../entities/inventory.entity";
import { Quantity } from "../value-objects/quantity.vo";

export interface AllocationResult {
  warehouseId: string;
  productId: string;
  quantity: number;
}

@Injectable()
export class StockAllocationService {
  allocate(
    inventories: Inventory[],
    requiredQty: number,
  ): AllocationResult[] {
    let remaining = requiredQty;
    const result: AllocationResult[] = [];

    for (const inv of inventories) {
      if (remaining <= 0) break;

      const take = Math.min(inv.available.value, remaining);

      if (take > 0) {
        inv.reserve(new Quantity(take));

        result.push({
          warehouseId: inv.warehouseId,
          productId: inv.productId,
          quantity: take,
        });

        remaining -= take;
      }
    }

    if (remaining > 0) {
      throw new Error('INSUFFICIENT_STOCK');
    }

    return result;
  }
}
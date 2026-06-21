import { Inject, Injectable } from '@nestjs/common';
import { InventoryRepository } from 'modules/inventory/domain/repositories/inventory.repository';
import { INVENTORY_REPOSITORY } from 'modules/shared/common/token';

@Injectable()
export class CheckAvailabilityUseCase {
  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly repo: InventoryRepository
  ) {}

  async execute(productId: string, quantity: number) {
    const inventory = await this.repo.findByProductId(productId);

    if (!inventory) return false;

    return inventory.available.value >= quantity;
  }
}
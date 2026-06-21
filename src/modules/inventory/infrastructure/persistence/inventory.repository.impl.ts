import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryOrmEntity } from '../orm/inventory.orm';
import { Inventory } from 'modules/inventory/domain/entities/inventory.entity';
import { InventoryRepository } from 'modules/inventory/domain/repositories/inventory.repository';
import { Quantity } from 'modules/inventory/domain/value-objects/quantity.vo';

@Injectable()
export class InventoryRepositoryImpl implements InventoryRepository {
  constructor(
    @InjectRepository(InventoryOrmEntity)
    private readonly repo: Repository<InventoryOrmEntity>,
  ) {}

  async findByProductId(productId: string): Promise<Inventory | null> {
    const data = await this.repo.findOneBy({ productId });
    if (!data) return null;

    return new Inventory(data.warehouseId, data.productId, new Quantity(data.available), new Quantity(data.reserved));
  }

  async save(inv: Inventory): Promise<void> {
    const newInv = new InventoryOrmEntity();
    newInv.warehouseId = inv.warehouseId;
    newInv.productId = inv.productId;
    newInv.available = inv.available.value;
    newInv.reserved = inv.reserved.value;

    await this.repo.save(newInv);
  }

  async findByProductIdAcrossWarehouses(productId: string): Promise<Inventory[]> {
    const data = await this.repo.findBy({ productId });
    
    return data.map(
      (d) => new Inventory(d.warehouseId, d.productId, new Quantity(d.available), new Quantity(d.reserved)),
    );
  }
}
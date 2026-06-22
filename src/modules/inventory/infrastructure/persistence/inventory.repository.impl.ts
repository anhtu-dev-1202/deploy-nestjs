import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import { InventoryOrmEntity } from '../orm/inventory.orm';
import { Inventory } from 'modules/inventory/domain/entities/inventory.entity';
import { InventoryRepository } from 'modules/inventory/domain/repositories/inventory.repository';
import { InventoryMapper } from '../mapper/inventory.mapper';

@Injectable()
export class InventoryRepositoryImpl implements InventoryRepository {
  constructor(
    @InjectRepository(InventoryOrmEntity)
    private readonly repo: Repository<InventoryOrmEntity>,
  ) {}

  async findByProductId(productId: string): Promise<Inventory | null> {
    const data = await this.repo.findOneBy({ productId });
    if (!data) return null;

    return InventoryMapper.toDomain(data);
  }

  async save(inv: Inventory): Promise<void> {
    const newInv = InventoryMapper.toOrm(inv);

    await this.repo.save(newInv);
  }

  async findByProductIdAcrossWarehouses(
    productId: string,
  ): Promise<Inventory[]> {
    const data = await this.repo.findBy({ productId });

    return data.map(InventoryMapper.toDomain);
  }

  async findByProductIdsForUpdate(
    manager: EntityManager,
    productIds: string[],
  ): Promise<Inventory[]> {
    const entities = await manager.find(InventoryOrmEntity, {
      where: {
        productId: In(productIds),
      },
      lock: {
        mode: 'pessimistic_write',
      },
    });

    return entities.map(InventoryMapper.toDomain);
  }

  async saveMany(
    manager: EntityManager,
    inventories: Inventory[],
  ): Promise<void> {
    const entities = inventories.map(InventoryMapper.toOrm);

    await manager.save(InventoryOrmEntity, entities);
  }
}

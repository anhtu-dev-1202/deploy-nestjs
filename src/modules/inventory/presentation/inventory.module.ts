import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryOrmEntity } from '../infrastructure/orm/inventory.orm';
import { InventoryRepositoryImpl } from '../infrastructure/persistence/inventory.repository.impl';
import { InventoryFacade } from '../application/inventory.facade';
import { inventoryUseCases } from '../application/inventory.use-cases';
import { inventoryServices } from '../domain/inventory.services';
import { OrderCreatedListener } from '../application/listeners/order-created.listener';
import { INVENTORY_REPOSITORY } from 'shared/constants/repositories-impl.constants';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryOrmEntity])],
  providers: [
    InventoryFacade,
    ...inventoryUseCases,
    ...inventoryServices,
    OrderCreatedListener,
    {
      provide: INVENTORY_REPOSITORY,
      useClass: InventoryRepositoryImpl,
    },
  ],
})
export class InventoryModule {}

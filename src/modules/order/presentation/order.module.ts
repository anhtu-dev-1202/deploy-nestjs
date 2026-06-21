import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderOrmEntity } from '../infrastructure/orm/order.orm-entity';
import { OrderController } from './order.controller';
import { OrderRepositoryImpl } from '../infrastructure/persistence/order.repository.impl';
import { OrderFacade } from '../application/order.facade';
import { orderUseCases } from '../application/order.use-cases';
import { SharedModule } from 'shared/shared.module';
import { ORDER_REPOSITORY } from 'shared/constants/repositories-impl.contants';

@Module({
  imports: [TypeOrmModule.forFeature([OrderOrmEntity]), SharedModule],
  controllers: [OrderController],
  providers: [
    OrderFacade,
    ...orderUseCases,
    {
      provide: ORDER_REPOSITORY,
      useClass: OrderRepositoryImpl,
    },
  ],
})
export class OrderModule {}
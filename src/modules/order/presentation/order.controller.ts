import { Body, Controller, Patch, Post } from '@nestjs/common';
import { CreateOrderDto } from '../application/dto/create-order.dto';
import { OrderFacade } from '../application/order.facade';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderFacade: OrderFacade) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.orderFacade.createOrder(dto);
  }

  @Patch('cancel')
  cancel(@Body() dto: { orderId: string }) {
    return this.orderFacade.cancelOrder(dto.orderId);
  }
}

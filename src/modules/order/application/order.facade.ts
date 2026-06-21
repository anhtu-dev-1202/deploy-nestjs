import { Injectable } from "@nestjs/common";
import { CreateOrderUseCase } from "./commands/create-order.usecase";
import { CancelOrderUseCase } from "./commands/cancel-order.usecase";

@Injectable()
export class OrderFacade { 
     constructor(
        private readonly create: CreateOrderUseCase,
        private readonly cancel: CancelOrderUseCase,
      ) {}

      createOrder(dto: any) {
        return this.create.execute(dto);
      }

      cancelOrder(id: string) {
        return this.cancel.execute(id);
      }
}
import { CancelOrderUseCase } from "./commands/cancel-order.usecase";
import { CreateOrderUseCase } from "./commands/create-order.usecase";

export const orderUseCases = [CreateOrderUseCase, CancelOrderUseCase];
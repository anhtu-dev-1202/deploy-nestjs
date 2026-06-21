import { CheckAvailabilityUseCase } from "./commands/check-availability.usecase";
import { ReleaseStockUseCase } from "./commands/release-stock.usecase";
import { ReserveStockUseCase } from "./commands/reserve-stock.usecase";


export const inventoryUseCases = [ReserveStockUseCase, ReleaseStockUseCase, CheckAvailabilityUseCase];
import { Body, Controller, Post } from '@nestjs/common';
import { ReserveStockDto } from '../application/dto/reserve-stock.dto';
import { InventoryFacade } from '../application/inventory.facade';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryFacade: InventoryFacade) {}

  @Post('reserve')
  async reserve(@Body() dto: ReserveStockDto) {
    const inventory = await this.inventoryFacade.reserveStock(dto.productId, dto.quantity);
    return inventory;
  }
}
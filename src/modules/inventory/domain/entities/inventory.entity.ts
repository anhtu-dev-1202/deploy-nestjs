import { Quantity } from "../value-objects/quantity.vo";

export class Inventory {
  constructor(
    public warehouseId: string,
    public productId: string,
    public available: Quantity,
    public reserved: Quantity,
  ) {}

  reserve(quantity: Quantity) {
    if (this.available.value < quantity.value) {
      throw new Error('Not enough stock');
    }

    this.available = this.available.subtract(quantity);
    this.reserved = this.reserved.add(quantity);
  }

  release(quantity: Quantity) {
    this.reserved = this.reserved.subtract(quantity);
    this.available = this.available.add(quantity);
  }
}
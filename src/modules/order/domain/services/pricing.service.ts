export class PricingService {
  calculateTotal(items: { price: number; quantity: number }[]) {
    return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }
}
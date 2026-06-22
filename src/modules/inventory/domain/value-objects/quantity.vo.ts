import { ValueObject } from 'shared/domain/value-object';

interface QuantityProps {
  value: number;
}

export class Quantity extends ValueObject<QuantityProps> {
  constructor(value: number) {
    if (value <= 0) {
      throw new Error('Quantity must be greater than zero');
    }

    super({
      value,
    });
  }

  get value() {
    return this.props.value;
  }

  add(quantity: Quantity): Quantity {
    return new Quantity(this.value + quantity.value);
  }

  subtract(quantity: Quantity): Quantity {
    return new Quantity(this.value - quantity.value);
  }
}

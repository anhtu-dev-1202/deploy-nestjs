import { ValueObject } from 'shared/domain/value-object';

interface MoneyProps {
  amount: number;
  currency: string;
}

export class Money extends ValueObject<MoneyProps> {
  constructor(amount: number, currency = 'USD') {
    if (amount < 0) {
      throw new Error('Amount must be positive');
    }

    super({
      amount,
      currency,
    });
  }

  get amount() {
    return this.props.amount;
  }

  get currency() {
    return this.props.currency;
  }

  add(money: Money): Money {
    if (money.currency !== this.currency) {
      throw new Error('Currency mismatch');
    }

    return new Money(this.amount + money.amount, this.currency);
  }
}

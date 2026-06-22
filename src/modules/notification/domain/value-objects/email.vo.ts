import { ValueObject } from 'shared/domain/value-object';

interface EmailProps {
  value: string;
}

export class Email extends ValueObject<EmailProps> {
  constructor(value: string) {
    super({ value });

    if (!Email.isValid(value)) {
      throw new Error('Invalid email');
    }
  }

  get value() {
    return this.props.value;
  }

  private static isValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

export abstract class DomainEvent<T> {
  abstract readonly eventName: string;

  readonly occurredAt = new Date();

  constructor(
    public readonly payload: T,
  ) {}
}
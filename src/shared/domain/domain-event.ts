export abstract class DomainEvent<T> {
  abstract readonly name: string;

  readonly occurredAt = new Date();

  constructor(public readonly payload: T) {}
}

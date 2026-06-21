# Architecture Guide

## Overview

This project follows:

* **Domain-Driven Design (DDD)**
* **Clean Architecture**
* **Modular Monolith (Microservice-ready)**
* **NestJS**
* **TypeORM**

Core principles:

* Business rules belong to Domain.
* Use cases orchestrate workflows.
* Infrastructure implements contracts.
* Modules communicate through events.
* Dependencies point inward.

---

# Module Structure

```text
modules/
├── order/
├── inventory/
├── product/
├── customer/
└── shared/
```

Each module is a bounded context and owns its own domain.

---

# Module Layout

Example: Inventory

```text
inventory/
│
├── domain/
│   ├── entities/
│   │     inventory.entity.ts
│   │
│   ├── repositories/
│   │     inventory.repository.ts
│   │
│   ├── services/
│   │     stock-allocation.service.ts
│   │
│   ├── events/
│   │     stock-reserved.event.ts
│   │
│   └── value-objects/
│
├── application/
│   ├── commands/
│   │
│   ├── queries/
│   │
│   ├── use-cases/
│   │     reserve-stock.usecase.ts
│   │     release-stock.usecase.ts
│   │     check-availability.usecase.ts
│   │
│   ├── listeners/
│   │     order-created.listener.ts
│   │
│   └── inventory.facade.ts
│
├── infrastructure/
│   ├── orm/
│   │     inventory.orm.entity.ts
│   │
│   ├── persistence/
│   │     inventory.repository.impl.ts
│   │
│   └── mappers/
│
├── presentation/
│   ├── controllers/
│   ├── dto/
│   └── responses/
│
├── providers/
│     inventory.providers.ts
│
└── inventory.module.ts
```

---

# Layers

## Domain Layer

Contains:

* Entities
* Value Objects
* Domain Services
* Repository Interfaces
* Domain Events

Domain must not depend on:

* NestJS
* TypeORM
* Redis
* Kafka
* HTTP

Example:

```ts
inventory.reserve(quantity);
inventory.release(quantity);
```

---

## Application Layer

Responsible for orchestration.

Contains:

* Use Cases
* Event Listeners
* Facades
* Command Handlers
* Query Handlers

Example:

```ts
ReserveStockUseCase
CreateOrderUseCase
CancelOrderUseCase
```

Responsibilities:

* Load entities
* Invoke domain logic
* Save aggregates
* Publish events

---

## Infrastructure Layer

Contains implementation details.

Examples:

* TypeORM repositories
* Redis
* Kafka
* EventBus
* External APIs

Example:

```ts
InventoryRepositoryImpl
OrderRepositoryImpl
```

Infrastructure implements interfaces defined by Domain.

---

## Presentation Layer

Responsible for:

* Controllers
* DTO validation
* Request/Response mapping

Example:

```ts
POST /orders
GET /inventory
```

Presentation must not contain business logic.

---

# Entity Responsibilities

Entities protect business invariants.

Example:

```ts
inventory.reserve(quantity);
```

Business rule:

```ts
if (available < quantity)
    throw new NotEnoughStockException();
```

Entities own state transitions.

---

# Domain Services

Domain services contain business rules that do not belong to a single entity.

Example:

```ts
StockAllocationService
PricingService
ShippingFeeCalculator
```

Example:

```ts
allocator.allocate(
    inventories,
    requiredQuantity,
);
```

---

# Use Cases

Use cases coordinate workflows.

Example:

```ts
ReserveStockUseCase
ReleaseStockUseCase
CreateOrderUseCase
```

Responsibilities:

1. Load aggregates
2. Invoke domain logic
3. Persist changes
4. Emit domain events

---

# Events

Modules communicate through events.

Example:

```text
Order
  ↓
order.created
  ↓
Inventory
  ↓
reserve stock
```

Example:

```ts
@OnEvent('order.created')
handle(event) {
    return reserveStockUseCase.execute(event);
}
```

Listeners should contain no business logic.

---

# Providers

Avoid huge modules.

Create provider groups.

Example:

```ts
export const InventoryUseCases = [
    ReserveStockUseCase,
    ReleaseStockUseCase,
];

export const InventoryListeners = [
    OrderCreatedListener,
];

export const InventoryRepositories = [
    {
        provide: INVENTORY_REPOSITORY,
        useClass: InventoryRepositoryImpl,
    },
];
```

Module:

```ts
providers: [
    InventoryFacade,
    ...InventoryUseCases,
    ...InventoryListeners,
    ...InventoryRepositories,
];
```

---

# Validation

## DTO Validation

Presentation layer only.

Examples:

* required fields
* string
* UUID
* quantity > 0

Example:

```ts
@Min(1)
quantity: number;
```

---

## Domain Validation

Business rules.

Examples:

* insufficient stock
* minimum order amount
* credit limit exceeded
* customer blacklisted

Example:

```ts
inventory.reserve(quantity);
```

---

# Communication

Preferred:

```text
Controller
    ↓
Facade
    ↓
Use Case
    ↓
Domain
    ↓
Repository
```

Cross-module:

```text
Order
    ↓
Domain Event
    ↓
Inventory Listener
    ↓
ReserveStockUseCase
```

Never:

```text
OrderService
    ↓
InventoryService
```

---

# Shared Module

```text
shared/
│
├── domain/
├── exceptions/
├── infrastructure/
├── utils/
└── constants/
```

Contains:

* BaseEntity
* AggregateRoot
* DomainEvent
* EventBus abstraction
* Logger
* Exceptions

---

# Dependency Rule

Allowed:

```text
Presentation
    ↓
Application
    ↓
Domain
```

Infrastructure implements Domain contracts.

Forbidden:

```text
Domain
    ↓
Infrastructure
```

```text
Domain
    ↓
NestJS
```

```text
Domain
    ↓
Database
```

---

# Architectural Principles

* Rich Domain Model
* Thin Controllers
* Thin Listeners
* Use Cases orchestrate workflows
* Domain owns business rules
* Infrastructure contains implementation details
* Event-driven module communication
* Microservice-ready boundaries

# Todo List App (Next.js 16)

A single-list Todo application built with Next.js 16 + TypeScript, build on top of the clean MVVM template repository.

## Features

### Main Features
- Single todo list with default title: `Shopping List`
- Rename list title through a modal dialog form
- Add, edit, delete, and complete/uncomplete todo items
- Dynamic progress (`done / total`) and completion percentage
- Sorting modes:
  - Manual order
  - Name A-Z
  - Name Z-A
- Real-time, case-insensitive search

### Bonus Features (Implemented)
- LocalStorage persistence for list title and items
- Enter key shortcut to add todo
- Smooth transitions/animations across UI interactions
- Empty state UI (no items / no filtered results)
- Toast notifications for key actions
- Drag-and-drop manual sorting
- Move up/down controls in manual mode
- Progress bar for completion percentage
- Query param status persistence (for example `?status=completed`)

## Tech Stack
- Next.js 16
- TypeScript
- React Query
- Inversify
- Tailwind CSS + shadcn primitives
- React Hook Form + Zod

## Project Structure

Todo feature files are organized by clean architecture layer:

- `src/app/domain/todos/` - entities, repository interfaces, use cases
- `src/app/interfaces/dtos/todos/` - raw DTO contracts
- `src/app/interfaces/adapters/todos/` - DTO/domain adapters
- `src/app/infrastructure/api/todos/` - repository implementation (LocalStorage)
- `src/app/data/todos/` - data service entrypoints used by UI hooks
- `src/app/ui/features/todos/` - components, hooks, schemas, models

## Getting Started

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
bun run lint
bun run build
bun start
```

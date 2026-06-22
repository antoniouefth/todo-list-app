"use client";

import type { ITodoItem } from "@/app/domain/todos/entities/todo-item";
import { TodoProgressSummary } from "@/app/ui/features/todos/components/todo-progress-summary";
import { TodoToolbar } from "@/app/ui/features/todos/components/todo-toolbar";
import { useTodoList } from "@/app/ui/features/todos/hooks/use-todo-list";
import { canReorderTodos } from "@/app/ui/features/todos/hooks/todo-reorder-rule";
import { AddTodoForm } from "@/app/ui/features/todos/components/todo-form-add";
import { TodoItemList } from "@/app/ui/features/todos/components/todo-item-list";
import { Card, CardContent, CardHeader } from "@/app/ui/shared/components/ui/card";

export default function TodoApp() {
  const {
    todoList,
    filteredItems,
    searchText,
    setSearchText,
    statusFilter,
    setStatusFilter,
    sortMode,
    setSortMode,
    completedCount,
    completionPercentage,
    addTodoItem,
    renameList,
    editTodoItem,
    toggleTodoItem,
    deleteTodoItem,
    moveTodoItem,
    reorderTodoItems,
    draggingTodoId,
    setDraggingTodoId,
    isLoading,
    isSaving,
  } = useTodoList();

  if (isLoading || !todoList) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 md:py-16">
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            Loading todo list...
          </CardContent>
        </Card>
      </div>
    );
  }

  const pendingCount = todoList.items.length - completedCount;
  const canReorder = canReorderTodos({ sortMode, statusFilter });


  return (
    <div className="mx-auto max-w-5xl overflow-x-auto px-4 py-10 md:py-16">
      <Card className="min-w-[610px] shadow-sm">
        <CardHeader className="space-y-6">
          <TodoToolbar
            title={todoList.title}
            sortMode={sortMode}
            statusFilter={statusFilter}
            searchText={searchText}
            onSortModeChange={setSortMode}
            onStatusFilterChange={setStatusFilter}
            onSearchTextChange={setSearchText}
            onRenameList={renameList}
          />

          <TodoProgressSummary
            completedCount={completedCount}
            totalCount={todoList.items.length}
            pendingCount={pendingCount}
            completionPercentage={completionPercentage}
          />

          <AddTodoForm onSubmit={addTodoItem} />
        </CardHeader>

        <CardContent className="space-y-3 transition-all duration-300">
          {isSaving ? (
            <p className="text-xs text-muted-foreground">Saving changes...</p>
          ) : null}
          <TodoItemList
            filteredItems={filteredItems}
            allItems={todoList.items}
            canReorder={canReorder}
            draggingTodoId={draggingTodoId}
            onMoveTodoItem={moveTodoItem}
            onToggleTodoItem={toggleTodoItem}
            onDeleteTodoItem={deleteTodoItem}
            onEditTodoItem={editTodoItem}
            onDragStart={setDraggingTodoId}
            onDragEnd={() => setDraggingTodoId(null)}
            onReorderTodoItems={reorderTodoItems}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export type { ITodoItem };

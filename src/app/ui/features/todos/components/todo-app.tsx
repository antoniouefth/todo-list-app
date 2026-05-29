"use client";

import type { ITodoItem } from "@/app/domain/todos/entities/todo-item";
import { TodoProgressSummary } from "@/app/ui/features/todos/components/todo-progress-summary";
import { TodoToolbar } from "@/app/ui/features/todos/components/todo-toolbar";
import { useTodoList } from "@/app/ui/features/todos/hooks/use-todo-list";
import { canReorderTodos } from "@/app/ui/features/todos/hooks/todo-reorder-rule";
import { AddTodoForm } from "@/app/ui/features/todos/components/todo-form-add";
import { TodoItemRow } from "@/app/ui/features/todos/components/todo-item-row";
import { Card, CardContent, CardHeader } from "@/app/ui/shared/components/ui/card";
import { ListChecks, Search } from "lucide-react";

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

  const renderContent = () => {
    if (filteredItems.length === 0 && todoList.items.length === 0) {
      return (
        <div className="rounded-xl border border-dashed p-10 text-center">
          <ListChecks className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
          <p className="text-lg font-medium">No todo items yet</p>
          <p className="text-sm text-muted-foreground">
            Add your first item to start tracking your progress.
          </p>
        </div>
      );
    }

    if (filteredItems.length === 0) {
      return (
        <div className="rounded-xl border border-dashed p-10 text-center">
          <Search className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
          <p className="text-lg font-medium">No matching items</p>
          <p className="text-sm text-muted-foreground">
            Adjust the search or filters to find existing todos.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {filteredItems.map((item) => (
          <TodoItemRow
            key={item.id}
            item={item}
            isManualSort={canReorder}
            canMoveUp={todoList.items.findIndex((todo) => todo.id === item.id) > 0}
            canMoveDown={
              todoList.items.findIndex((todo) => todo.id === item.id) <
              todoList.items.length - 1
            }
            isDragging={draggingTodoId === item.id}
            onMoveUp={() => moveTodoItem(item.id, "up")}
            onMoveDown={() => moveTodoItem(item.id, "down")}
            onToggle={() => toggleTodoItem(item.id)}
            onDelete={() => deleteTodoItem(item.id)}
            onEdit={(name) => editTodoItem(item.id, name)}
            onDragStart={() => setDraggingTodoId(item.id)}
            onDragEnd={() => setDraggingTodoId(null)}
            onDropOn={(fromTodoId) => reorderTodoItems(fromTodoId, item.id)}
          />
        ))}
      </div>
    );
  };

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
          {renderContent()}
        </CardContent>
      </Card>
    </div>
  );
}

export type { ITodoItem };

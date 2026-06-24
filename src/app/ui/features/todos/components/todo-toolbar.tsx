import { TodoToolbarHeading } from "@/app/ui/features/todos/components/todo-toolbar-heading";
import { TodoRenameListControl } from "@/app/ui/features/todos/components/todo-rename-list-control";
import { TodoSortSelect } from "@/app/ui/features/todos/components/todo-sort-select";
import { TodoStatusFilterSelect } from "@/app/ui/features/todos/components/todo-status-filter-select";
import { TodoSearchInput } from "@/app/ui/features/todos/components/todo-search-input";

// Server Component: pure layout. The interactive controls below are each their
// own client island, so the toolbar shell ships as static HTML.
export function TodoToolbar() {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
      <TodoToolbarHeading />
      <div className="flex items-center gap-1.5 overflow-x-auto lg:flex-nowrap lg:pt-0.5">
        <TodoRenameListControl />
        <TodoSortSelect />
        <TodoStatusFilterSelect />
        <TodoSearchInput />
      </div>
    </div>
  );
}

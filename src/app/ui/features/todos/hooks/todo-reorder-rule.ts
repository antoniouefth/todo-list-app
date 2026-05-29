import { ETodoSortMode, ETodoStatusFilter } from "@/app/ui/features/todos/models/todo-filters";

export const canReorderTodos = (params: {
  sortMode: ETodoSortMode;
  statusFilter: ETodoStatusFilter;
}): boolean => {
  return (
    params.sortMode === ETodoSortMode.Manual &&
    params.statusFilter === ETodoStatusFilter.All
  );
};

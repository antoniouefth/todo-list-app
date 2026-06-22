"use client";

import { create } from "zustand";
import {
  ETodoSortMode,
  ETodoStatusFilter,
} from "@/app/ui/features/todos/models/todo-filters";

interface ITodoUIState {
  draggingTodoId: string | null;
  setDraggingTodoId: (id: string | null) => void;
  searchText: string;
  setSearchText: (text: string) => void;
  sortMode: ETodoSortMode;
  setSortMode: (mode: ETodoSortMode) => void;
  statusFilter: ETodoStatusFilter;
  setStatusFilter: (filter: ETodoStatusFilter) => void;
}

export const useTodoUIStore = create<ITodoUIState>((set) => ({
  draggingTodoId: null,
  setDraggingTodoId: (id) => set({ draggingTodoId: id }),
  searchText: "",
  setSearchText: (text) => set({ searchText: text }),
  sortMode: ETodoSortMode.Manual,
  setSortMode: (mode) => set({ sortMode: mode }),
  statusFilter: ETodoStatusFilter.All,
  setStatusFilter: (filter) => set({ statusFilter: filter }),
}));

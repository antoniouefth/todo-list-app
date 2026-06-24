"use client";

import { create } from "zustand";

interface ITodoUIState {
  draggingTodoId: string | null;
  setDraggingTodoId: (id: string | null) => void;
  searchText: string;
  setSearchText: (text: string) => void;
}

export const useTodoUIStore = create<ITodoUIState>((set) => ({
  draggingTodoId: null,
  setDraggingTodoId: (id) => set({ draggingTodoId: id }),
  searchText: "",
  setSearchText: (text) => set({ searchText: text }),
}));

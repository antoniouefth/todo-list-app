"use client";

import { RenameListDialog } from "@/app/ui/features/todos/components/todo-rename-dialog";
import {
  ETodoSortMode,
  ETodoStatusFilter,
} from "@/app/ui/features/todos/models/todo-filters";
import { Input } from "@/app/ui/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/ui/shared/components/ui/select";

interface TodoToolbarProps {
  title: string;
  sortMode: ETodoSortMode;
  statusFilter: ETodoStatusFilter;
  searchText: string;
  onSortModeChange: (mode: ETodoSortMode) => void;
  onStatusFilterChange: (status: ETodoStatusFilter) => void;
  onSearchTextChange: (value: string) => void;
  onRenameList: (title: string) => Promise<void>;
}

export function TodoToolbar({
  title,
  sortMode,
  statusFilter,
  searchText,
  onSortModeChange,
  onStatusFilterChange,
  onSearchTextChange,
  onRenameList,
}: TodoToolbarProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight lg:whitespace-nowrap">{title}</h1>
        <p className="text-sm text-muted-foreground">Single Todo List</p>
      </div>
      <div className="flex items-center gap-1.5 overflow-x-auto lg:flex-nowrap lg:pt-0.5">
        <RenameListDialog currentTitle={title} onSubmit={onRenameList} />
        <Select value={sortMode} onValueChange={(value) => onSortModeChange(value as ETodoSortMode)}>
          <SelectTrigger
            className="h-9 w-[126px] text-xs"
            aria-label="Sort todo items"
          >
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ETodoSortMode.Manual}>Sort: Manual</SelectItem>
            <SelectItem value={ETodoSortMode.NameAsc}>Sort: Name A-Z</SelectItem>
            <SelectItem value={ETodoSortMode.NameDesc}>Sort: Name Z-A</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={statusFilter}
          onValueChange={(value) => onStatusFilterChange(value as ETodoStatusFilter)}
        >
          <SelectTrigger
            className="h-9 w-[126px] text-xs"
            aria-label="Filter todo status"
          >
            <SelectValue placeholder="Status" className="truncate" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ETodoStatusFilter.All}>
              <span className="block max-w-[110px] truncate">Status: All</span>
            </SelectItem>
            <SelectItem value={ETodoStatusFilter.Active}>
              <span className="block max-w-[110px] truncate">Status: Active</span>
            </SelectItem>
            <SelectItem value={ETodoStatusFilter.Completed}>
              <span className="block max-w-[110px] truncate">Status: Completed</span>
            </SelectItem>
          </SelectContent>
        </Select>
        <Input
          value={searchText}
          onChange={(event) => onSearchTextChange(event.target.value)}
          placeholder="Filter..."
          aria-label="Search todo items"
          className="h-9 min-w-[145px] rounded-md border bg-background px-2 text-xs"
        />
      </div>
    </div>
  );
}

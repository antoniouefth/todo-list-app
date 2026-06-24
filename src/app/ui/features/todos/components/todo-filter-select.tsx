"use client";

import { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/ui/shared/components/ui/select";

export interface TodoFilterOption<T extends string> {
  value: T;
  label: string;
}

interface TodoFilterSelectProps<T extends string> {
  value: T;
  onValueChange: (value: T) => void;
  options: TodoFilterOption<T>[];
  placeholder: string;
  ariaLabel: string;
}

export function TodoFilterSelect<T extends string>({
  value,
  onValueChange,
  options,
  placeholder,
  ariaLabel,
}: TodoFilterSelectProps<T>) {
  console.log("[render] TodoFilterSelect")

  const handleValueChange = useCallback(
    (next: string) => onValueChange(next as T),
    [onValueChange],
  );

  return (
    <Select value={value} onValueChange={handleValueChange}>
      <SelectTrigger className="h-9 w-[126px] text-xs" aria-label={ariaLabel}>
        <SelectValue placeholder={placeholder} className="truncate" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <span className="block max-w-[110px] truncate">{option.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

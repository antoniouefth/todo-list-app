import type { LucideIcon } from "lucide-react";

interface TodoEmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

// Pure presentational, no hooks — server-eligible in principle (it renders as a
// client island here only because the client list imports it).
export function TodoEmptyState({ icon: Icon, title, description }: TodoEmptyStateProps) {
  console.log("[render] TodoEmptyState")
  return (
    <div className="rounded-xl border border-dashed p-10 text-center">
      <Icon className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
      <p className="text-lg font-medium">{title}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

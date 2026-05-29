import { Progress } from "@/app/ui/shared/components/ui/progress";

interface TodoProgressSummaryProps {
  completedCount: number;
  totalCount: number;
  pendingCount: number;
  completionPercentage: number;
}

export function TodoProgressSummary({
  completedCount,
  totalCount,
  pendingCount,
  completionPercentage,
}: TodoProgressSummaryProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {completedCount} / {totalCount} done
        </span>
        <span className="text-muted-foreground">{pendingCount} pending</span>
      </div>
      <Progress value={completionPercentage} />
    </div>
  );
}

import { CardHeader } from "@/app/ui/shared/components/ui/card";

export function TodoAppCardHeader({children} : {children: React.ReactNode}){
    return (
        <CardHeader className="space-y-6">
            {children}
        </CardHeader>
    );
}
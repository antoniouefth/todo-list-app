import { CardContent } from "@/app/ui/shared/components/ui/card";

export function TodoAppCardContent( {children} : {children: React.ReactNode}){
    return (
        <CardContent className="space-y-3 transition-all duration-300">
            {children}
        </CardContent>
    );
}
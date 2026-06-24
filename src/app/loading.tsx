import { Card, CardContent } from "@/app/ui/shared/components/ui/card";

// Route-level Suspense fallback shown while the page server-fetches the list.
export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-10 md:py-16">
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            Loading todo list...
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

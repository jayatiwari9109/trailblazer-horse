import { createFileRoute } from "@tanstack/react-router";
import { Download, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { trails } from "@/lib/data";

export const Route = createFileRoute("/dashboard/bookings")({
  component: Bookings,
});

const statuses = [
  { key: "upcoming", label: "Upcoming", items: trails.slice(0, 2), variant: "bg-forest/10 text-forest" },
  { key: "completed", label: "Completed", items: trails.slice(2, 5), variant: "bg-gold/20 text-saddle" },
  { key: "cancelled", label: "Cancelled", items: trails.slice(5, 6), variant: "bg-destructive/15 text-destructive" },
];

function Bookings() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold text-forest">My bookings</h1>
      <Tabs defaultValue="upcoming">
        <TabsList className="glass rounded-full p-1">
          {statuses.map((s) => <TabsTrigger key={s.key} value={s.key} className="rounded-full">{s.label}</TabsTrigger>)}
        </TabsList>
        {statuses.map((s) => (
          <TabsContent key={s.key} value={s.key} className="mt-6 space-y-3">
            {s.items.map((t) => (
              <div key={t.id} className="glass flex flex-col gap-4 rounded-2xl p-4 sm:flex-row sm:items-center">
                <img src={t.image} alt="" className="h-24 w-full rounded-xl object-cover sm:w-32" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Badge className={s.variant}>{s.label}</Badge>
                    <span className="text-xs text-muted-foreground">#HT-{t.id}0421</span>
                  </div>
                  <div className="mt-1 font-semibold text-forest">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.location} · Mar 24, 2026 · 06:00</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" className="gap-1"><Download className="h-4 w-4" />Invoice</Button>
                  <Button size="sm" variant="outline" className="gap-1"><MessageCircle className="h-4 w-4" />Guide</Button>
                  {s.key === "upcoming" && <Button size="sm" className="bg-forest text-forest-foreground">Reschedule</Button>}
                  {s.key === "completed" && <Button size="sm" className="bg-gold text-gold-foreground">Rate</Button>}
                </div>
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

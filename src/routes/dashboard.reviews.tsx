import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { trails } from "@/lib/data";

export const Route = createFileRoute("/dashboard/reviews")({
  component: Reviews,
});

function Reviews() {
  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl font-bold text-forest">Reviews</h1>

      <div className="glass rounded-3xl p-6">
        <h2 className="font-display text-xl font-bold text-forest">Rate your last ride</h2>
        <div className="mt-4 flex gap-3">
          <img src={trails[0].image} alt="" className="h-20 w-24 rounded-2xl object-cover" />
          <div>
            <div className="font-semibold text-forest">{trails[0].name}</div>
            <div className="text-xs text-muted-foreground">{trails[0].location} · Mar 02, 2026</div>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <RatingRow label="Overall experience" />
          <RatingRow label="Horse rating" />
          <RatingRow label="Guide rating" />
          <RatingRow label="Value for money" />
        </div>
        <div className="mt-4">
          <Label>Your review</Label>
          <Textarea rows={4} className="mt-1 bg-card" placeholder="Tell other riders about your experience..." />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div><Label>Upload photos</Label><input type="file" multiple className="mt-1 block w-full text-sm" /></div>
          <div><Label>Upload videos</Label><input type="file" multiple accept="video/*" className="mt-1 block w-full text-sm" /></div>
        </div>
        <Button className="mt-6 bg-forest text-forest-foreground shadow-glow">Submit review</Button>
      </div>

      <div className="glass rounded-3xl p-6">
        <h2 className="font-display text-xl font-bold text-forest">Your past reviews</h2>
        <div className="mt-4 space-y-3">
          {trails.slice(1, 4).map((t) => (
            <div key={t.id} className="rounded-2xl border border-border/60 bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-forest">{t.name}</div>
                <div className="flex gap-0.5">{Array.from({length:5}).map((_,i)=><Star key={i} className="h-3 w-3 fill-gold text-gold" />)}</div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Absolutely wonderful. Would ride again in a heartbeat.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RatingRow({ label }: { label: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-1 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-6 w-6 cursor-pointer fill-gold text-gold" />)}
      </div>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CalendarCheck, Heart, Star, Wallet, ArrowRight } from "lucide-react";
import { trails } from "@/lib/data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/")({
  component: Overview,
});

function Overview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-forest">Welcome back, Sophia 👋</h1>
        <p className="mt-1 text-muted-foreground">You have 2 upcoming rides and 3 saved trails.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: CalendarCheck, label: "Upcoming", value: "2" },
          { icon: Star, label: "Reviews", value: "14" },
          { icon: Heart, label: "Wishlist", value: "8" },
          { icon: Wallet, label: "Wallet", value: "$120" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-2xl p-5">
            <div className="grid h-10 w-10 place-items-center rounded-xl gradient-forest text-forest-foreground shadow-glow"><s.icon className="h-4 w-4" /></div>
            <div className="mt-3 font-display text-2xl font-bold text-forest">{s.value}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-3xl p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-forest">Upcoming bookings</h2>
          <Button asChild variant="ghost" size="sm" className="gap-1 text-forest"><Link to="/dashboard/bookings">See all <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
        <div className="mt-4 space-y-3">
          {trails.slice(0, 2).map((t) => (
            <div key={t.id} className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card p-4 sm:flex-row sm:items-center">
              <img src={t.image} alt="" className="h-20 w-full rounded-xl object-cover sm:w-28" />
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-forest">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.location} · Mar 24, 2026 · 06:00</div>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-forest/10 px-2 py-0.5 text-forest">Confirmed</span>
                  <span className="rounded-full bg-cream px-2 py-0.5">Booking #HT-{t.id}0421</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Reschedule</Button>
                <Button size="sm" className="bg-forest text-forest-foreground">Details</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

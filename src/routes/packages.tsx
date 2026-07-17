import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { images } from "@/lib/data";

const packages = [
  { name: "Weekend Escape", tag: "Most popular", price: 899, image: images.t1, features: ["2 nights luxury lodge","2 half-day guided rides","Gourmet dinners","All gear included","Airport transfer"] },
  { name: "Multi-Day Trek", tag: "Adventure", price: 1699, image: images.t4, features: ["4 nights on trail","Progressive skill days","Canvas camp with chef","Trail insurance","Professional photos"] },
  { name: "Private Safari", tag: "Luxury", price: 3499, image: images.t8, features: ["5 nights safari camp","Daily wildlife rides","Private ranger","Champagne sundowners","Charter flights"] },
];

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Adventure Packages — Horse Trails" },
      { name: "description", content: "Multi-day horse riding packages with lodging, meals, and professional guiding." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <section className="container-wide">
        <SectionHeading eyebrow="All-inclusive" title="Adventure packages" subtitle="Everything handled — you just show up and ride." />
        <div className="grid gap-6 lg:grid-cols-3">
          {packages.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group overflow-hidden rounded-3xl border border-border/60 bg-card shadow-elegant">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-gold-foreground shadow-glow">{p.tag}</div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-forest">{p.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-display text-3xl font-bold text-forest">${p.price}</span>
                  <span className="text-sm text-muted-foreground">/ per person</span>
                </div>
                <ul className="mt-4 space-y-2 text-sm">
                  {p.features.map((f) => <li key={f} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-forest" />{f}</li>)}
                </ul>
                <Button asChild className="mt-6 w-full bg-forest text-forest-foreground shadow-glow hover:bg-forest/90">
                  <Link to="/checkout">Book package</Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl gradient-forest p-8 text-forest-foreground md:p-12">
          <div className="flex items-center gap-2 text-gold"><Sparkles className="h-4 w-4" /> Bespoke</div>
          <h3 className="mt-2 font-display text-3xl font-bold md:text-4xl">Need something custom?</h3>
          <p className="mt-2 max-w-xl text-forest-foreground/70">Our concierge team builds fully bespoke multi-country horse itineraries for private groups and families.</p>
          <Button asChild className="mt-6 bg-gold text-gold-foreground hover:bg-gold/90"><Link to="/contact">Talk to concierge</Link></Button>
        </div>
      </section>
    </SiteLayout>
  ),
});

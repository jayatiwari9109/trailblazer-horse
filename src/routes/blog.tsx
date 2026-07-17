import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { posts } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal — Horse Trails" },
      { name: "description", content: "Guides, safety notes, and stories from our team of expert equestrians." },
    ],
  }),
  component: Blog,
});

function Blog() {
  const [featured, ...rest] = posts;
  return (
    <SiteLayout>
      <section className="container-wide">
        <SectionHeading eyebrow="Journal" title="Stories from the trail" />

        <Link to="/blog" className="group grid gap-6 overflow-hidden rounded-3xl border border-border/60 bg-card shadow-elegant lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img src={featured.image} alt={featured.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-12">
            <Badge className="w-fit bg-gold text-gold-foreground">{featured.category}</Badge>
            <h2 className="mt-4 font-display text-3xl font-bold text-forest md:text-4xl">{featured.title}</h2>
            <p className="mt-3 text-muted-foreground">{featured.excerpt}</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"><Calendar className="h-4 w-4" />{featured.date}</div>
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest">Read article <ArrowRight className="h-4 w-4" /></div>
          </div>
        </Link>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {rest.map((p, i) => (
            <motion.div key={p.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to="/blog" className="group block overflow-hidden rounded-3xl border border-border/60 bg-card shadow-elegant">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-5">
                  <Badge variant="outline">{p.category}</Badge>
                  <h3 className="mt-2 font-display text-lg font-semibold text-forest">{p.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
                  <div className="mt-3 text-xs text-muted-foreground">{p.date}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

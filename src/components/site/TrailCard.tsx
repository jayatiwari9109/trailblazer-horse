import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Clock,
  Heart,
  MapPin,
  Route as RouteIcon,
  Share2,
  Star,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import type { Trail } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { BookingPopup } from "@/components/site/BookingPopup";

type TrailCardProps = {
  trail: Trail;
  index?: number;
};

export function TrailCard({
  trail,
  index = 0,
}: TrailCardProps) {
  const [liked, setLiked] = useState(false);

  const handleLike = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setLiked((current) => !current);

    toast.success(
      liked
        ? "Removed from favourites"
        : "Added to favourites",
    );
  };

  const handleShare = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const shareUrl =
      `${window.location.origin}/trails/${trail.slug}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: trail.name,
          text: trail.short,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(
          shareUrl,
        );

        toast.success(
          "Trail link copied!",
        );
      }
    } catch (error) {
      console.error(
        "Share failed:",
        error,
      );
    }
  };

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "-50px",
      }}
      transition={{
        duration: 0.5,
        delay: (index % 6) * 0.05,
      }}
      whileHover={{
        y: -6,
      }}
      className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-elegant"
    >
      {/* Image and card content link */}
      <Link
        to="/trails/$id"
        params={{
          id: trail.slug,
        }}
        className="block"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={trail.image}
            alt={trail.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {trail.tags
              .slice(0, 2)
              .map((tag) => (
                <Badge
                  key={tag}
                  className="bg-gold text-gold-foreground shadow-glow"
                >
                  {tag}
                </Badge>
              ))}

            {trail.instant && (
              <Badge className="gap-1 bg-forest text-forest-foreground">
                <Zap className="h-3 w-3" />
                Instant
              </Badge>
            )}
          </div>

          {trail.originalPrice && (
            <div className="absolute bottom-3 left-3 rounded-full bg-destructive px-2.5 py-1 text-xs font-semibold text-destructive-foreground">
              Save $
              {trail.originalPrice -
                trail.price}
            </div>
          )}
        </div>

        <div className="p-5 pb-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-gold text-gold" />

              <span className="font-semibold">
                {trail.rating}
              </span>

              <span className="text-muted-foreground">
                ({trail.reviews})
              </span>
            </div>

            <Badge
              variant="outline"
              className="text-[10px]"
            >
              {trail.difficulty}
            </Badge>
          </div>

          <h3 className="mt-2 font-display text-lg font-semibold leading-tight text-forest">
            {trail.name}
          </h3>

          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {trail.location}
          </div>

          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {trail.short}
          </p>

          <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {trail.duration}
            </span>

            <span className="inline-flex items-center gap-1">
              <RouteIcon className="h-3.5 w-3.5" />
              {trail.distanceKm} km
            </span>

            <span className="ml-auto text-forest">
              {trail.slots} slots
            </span>
          </div>
        </div>
      </Link>

      {/* Like and share */}
      <div className="absolute right-3 top-3 z-20 flex gap-1.5">
        <button
          type="button"
          onClick={handleLike}
          aria-label={
            liked
              ? "Remove from favourites"
              : "Add to favourites"
          }
          className="glass grid h-9 w-9 place-items-center rounded-full transition-transform hover:scale-110"
        >
          <Heart
            className={`h-4 w-4 ${
              liked
                ? "fill-red-500 text-red-500"
                : "text-forest"
            }`}
          />
        </button>

        <button
          type="button"
          onClick={handleShare}
          aria-label="Share trail"
          className="glass grid h-9 w-9 place-items-center rounded-full transition-transform hover:scale-110"
        >
          <Share2 className="h-4 w-4 text-forest" />
        </button>
      </div>

      {/* Price and actual popup button */}
      <div className="p-5 pt-0">
        <div className="mt-4 flex items-end justify-between gap-4 border-t border-border/60 pt-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold text-forest">
                ${trail.price}
              </span>

              {trail.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${trail.originalPrice}
                </span>
              )}
            </div>

            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
              per rider
            </div>
          </div>

          <BookingPopup
            trailName={trail.name}
            price={trail.price}
          />
        </div>
      </div>
    </motion.article>
  );
}
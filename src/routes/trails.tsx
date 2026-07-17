import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  List,
  Map,
  MapPin,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { SiteLayout } from "@/components/site/Layout";
import { TrailCard } from "@/components/site/TrailCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { trails } from "@/lib/data";

export const Route = createFileRoute("/trails")({
  head: () => ({
    meta: [
      {
        title: "All Horse Trails — Horse Trails",
      },
      {
        name: "description",
        content:
          "Browse and filter every horse riding trail on Horse Trails — by location, difficulty, price, breed, and duration.",
      },
    ],
  }),

  component: TrailsPage,
});

const difficulties = [
  "Easy",
  "Moderate",
  "Challenging",
] as const;

const breeds = Array.from(
  new Set(trails.map((trail) => trail.breed)),
);

function TrailsPage() {
  const [priceMax, setPriceMax] =
    useState(700);

  const [minRating, setMinRating] =
    useState(0);

  const [selectedDifficulties, setSelectedDifficulties] =
    useState<string[]>([]);

  const [selectedBreeds, setSelectedBreeds] =
    useState<string[]>([]);

  const [privateOnly, setPrivateOnly] =
    useState(false);

  const [instantOnly, setInstantOnly] =
    useState(false);

  const [sort, setSort] =
    useState("popular");

  const [view, setView] =
    useState<"list" | "map">("list");

  const [openFilters, setOpenFilters] =
    useState(false);

  const filteredTrails = useMemo(() => {
    let result = trails.filter(
      (trail) =>
        trail.price <= priceMax &&
        trail.rating >= minRating &&
        (selectedDifficulties.length === 0 ||
          selectedDifficulties.includes(
            trail.difficulty,
          )) &&
        (selectedBreeds.length === 0 ||
          selectedBreeds.includes(
            trail.breed,
          )) &&
        (!privateOnly || trail.private) &&
        (!instantOnly || trail.instant),
    );

    if (sort === "rating") {
      result = [...result].sort(
        (a, b) =>
          b.rating - a.rating,
      );
    }

    if (sort === "price") {
      result = [...result].sort(
        (a, b) =>
          a.price - b.price,
      );
    }

    if (sort === "newest") {
      result = [...result].reverse();
    }

    return result;
  }, [
    priceMax,
    minRating,
    selectedDifficulties,
    selectedBreeds,
    privateOnly,
    instantOnly,
    sort,
  ]);

  const toggleItem = (
    list: string[],
    value: string,
    setList: (items: string[]) => void,
  ) => {
    setList(
      list.includes(value)
        ? list.filter(
            (item) => item !== value,
          )
        : [...list, value],
    );
  };

  const clearFilters = () => {
    setPriceMax(700);
    setMinRating(0);
    setSelectedDifficulties([]);
    setSelectedBreeds([]);
    setPrivateOnly(false);
    setInstantOnly(false);
  };

  const filters = (
    <div className="space-y-6">
      {/* Price */}
      <div>
        <Label className="font-display text-sm font-semibold text-forest">
          Max price
        </Label>

        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>$50</span>

          <span className="font-semibold text-forest">
            ${priceMax}
          </span>
        </div>

        <Slider
          value={[priceMax]}
          onValueChange={(value) =>
            setPriceMax(value[0])
          }
          min={50}
          max={700}
          step={10}
          className="mt-2"
        />
      </div>

      {/* Rating */}
      <div>
        <Label className="font-display text-sm font-semibold text-forest">
          Minimum rating
        </Label>

        <div className="mt-3 flex flex-wrap gap-2">
          {[0, 4, 4.5, 4.8].map(
            (rating) => (
              <button
                key={rating}
                type="button"
                onClick={() =>
                  setMinRating(rating)
                }
                className={`rounded-full border px-3 py-1 text-xs transition ${
                  minRating === rating
                    ? "border-forest bg-forest text-forest-foreground"
                    : "border-border bg-card text-foreground hover:border-forest/50"
                }`}
              >
                {rating === 0
                  ? "Any"
                  : `${rating}+`}
              </button>
            ),
          )}
        </div>
      </div>

      {/* Difficulty */}
      <FilterGroup title="Difficulty">
        {difficulties.map(
          (difficulty) => (
            <label
              key={difficulty}
              className="flex cursor-pointer items-center gap-2 text-sm"
            >
              <Checkbox
                checked={selectedDifficulties.includes(
                  difficulty,
                )}
                onCheckedChange={() =>
                  toggleItem(
                    selectedDifficulties,
                    difficulty,
                    setSelectedDifficulties,
                  )
                }
              />

              {difficulty}
            </label>
          ),
        )}
      </FilterGroup>

      {/* Horse breed */}
      <FilterGroup title="Horse breed">
        {breeds.map((breed) => (
          <label
            key={breed}
            className="flex cursor-pointer items-center gap-2 text-sm"
          >
            <Checkbox
              checked={selectedBreeds.includes(
                breed,
              )}
              onCheckedChange={() =>
                toggleItem(
                  selectedBreeds,
                  breed,
                  setSelectedBreeds,
                )
              }
            />

            {breed}
          </label>
        ))}
      </FilterGroup>

      {/* Booking options */}
      <FilterGroup title="Booking">
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <Checkbox
            checked={privateOnly}
            onCheckedChange={(value) =>
              setPrivateOnly(Boolean(value))
            }
          />

          Private rides only
        </label>

        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <Checkbox
            checked={instantOnly}
            onCheckedChange={(value) =>
              setInstantOnly(Boolean(value))
            }
          />

          Instant booking
        </label>
      </FilterGroup>

      <Button
        type="button"
        variant="outline"
        className="w-full rounded-full"
        onClick={clearFilters}
      >
        Clear filters
      </Button>
    </div>
  );

  return (
    <SiteLayout>
      <section className="container-wide">
        {/* Page header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-saddle">
              Horse Trails
            </div>

            <h1 className="mt-1 font-display text-4xl font-bold text-forest md:text-5xl">
              All experiences
            </h1>

            <p className="mt-2 text-muted-foreground">
              {filteredTrails.length} trails available
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* View switch */}
            <div className="glass flex gap-1 rounded-full p-1">
              <button
                type="button"
                onClick={() =>
                  setView("list")
                }
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition ${
                  view === "list"
                    ? "bg-forest text-forest-foreground"
                    : "text-forest hover:bg-cream"
                }`}
              >
                <List className="h-4 w-4" />
                List
              </button>

              <button
                type="button"
                onClick={() =>
                  setView("map")
                }
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition ${
                  view === "map"
                    ? "bg-forest text-forest-foreground"
                    : "text-forest hover:bg-cream"
                }`}
              >
                <Map className="h-4 w-4" />
                Map
              </button>
            </div>

            {/* Sort */}
            <Select
              value={sort}
              onValueChange={setSort}
            >
              <SelectTrigger className="w-40 bg-card">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="popular">
                  Popular
                </SelectItem>

                <SelectItem value="rating">
                  Highest Rated
                </SelectItem>

                <SelectItem value="price">
                  Lowest Price
                </SelectItem>

                <SelectItem value="newest">
                  Newest
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Mobile filters */}
            <Button
              type="button"
              variant="outline"
              className="lg:hidden"
              onClick={() =>
                setOpenFilters(true)
              }
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <div className="glass sticky top-28 rounded-2xl p-6">
              <div className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-forest">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </div>

              {filters}
            </div>
          </aside>

          {/* Content */}
          <div>
            {view === "map" ? (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 16,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-elegant"
              >
                <iframe
                  title="Horse Trails map"
                  src="https://www.google.com/maps?q=42%20Bridle%20Lane%20Aspen%20CO%2081611&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[520px] w-full border-0 md:h-[600px]"
                />

                <div className="flex flex-col gap-4 border-t border-border/60 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-forest text-forest-foreground">
                      <MapPin className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="font-semibold text-forest">
                        Horse Trails Office
                      </p>

                      <p className="text-sm text-muted-foreground">
                        42 Bridle Lane, Aspen, CO 81611
                      </p>
                    </div>
                  </div>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=42+Bridle+Lane+Aspen+CO+81611"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 items-center justify-center rounded-full bg-forest px-5 text-sm font-semibold text-forest-foreground transition hover:bg-forest/90"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </motion.div>
            ) : (
              <>
                {/* Active filters */}
                {(selectedDifficulties.length > 0 ||
                  selectedBreeds.length > 0 ||
                  privateOnly ||
                  instantOnly ||
                  minRating > 0 ||
                  priceMax < 700) && (
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    {selectedDifficulties.map(
                      (difficulty) => (
                        <Badge
                          key={difficulty}
                          variant="outline"
                          className="gap-1 bg-card"
                        >
                          {difficulty}

                          <button
                            type="button"
                            onClick={() =>
                              toggleItem(
                                selectedDifficulties,
                                difficulty,
                                setSelectedDifficulties,
                              )
                            }
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ),
                    )}

                    {selectedBreeds.map(
                      (breed) => (
                        <Badge
                          key={breed}
                          variant="outline"
                          className="gap-1 bg-card"
                        >
                          {breed}

                          <button
                            type="button"
                            onClick={() =>
                              toggleItem(
                                selectedBreeds,
                                breed,
                                setSelectedBreeds,
                              )
                            }
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ),
                    )}

                    {privateOnly && (
                      <Badge
                        variant="outline"
                        className="gap-1 bg-card"
                      >
                        Private rides

                        <button
                          type="button"
                          onClick={() =>
                            setPrivateOnly(false)
                          }
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}

                    {instantOnly && (
                      <Badge
                        variant="outline"
                        className="gap-1 bg-card"
                      >
                        Instant booking

                        <button
                          type="button"
                          onClick={() =>
                            setInstantOnly(false)
                          }
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}

                    <button
                      type="button"
                      onClick={clearFilters}
                      className="text-xs font-semibold text-forest hover:underline"
                    >
                      Clear all
                    </button>
                  </div>
                )}

                {/* Results */}
                {filteredTrails.length === 0 ? (
                  <div className="glass rounded-3xl p-16 text-center">
                    <div className="font-display text-xl font-semibold text-forest">
                      No trails match your filters
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground">
                      Try loosening a few filters to see more results.
                    </p>

                    <Button
                      type="button"
                      className="mt-5 rounded-full bg-forest text-forest-foreground"
                      onClick={clearFilters}
                    >
                      Reset filters
                    </Button>
                  </div>
                ) : (
                  <motion.div
                    layout
                    className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                  >
                    {filteredTrails.map(
                      (trail, index) => (
                        <TrailCard
                          key={trail.id}
                          trail={trail}
                          index={index}
                        />
                      ),
                    )}
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Mobile filter drawer */}
        {openFilters && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <button
              type="button"
              aria-label="Close filters"
              className="absolute inset-0 bg-forest/40 backdrop-blur-sm"
              onClick={() =>
                setOpenFilters(false)
              }
            />

            <motion.div
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              className="absolute right-0 top-0 h-full w-80 max-w-[90vw] overflow-y-auto bg-background p-6 shadow-2xl"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="font-display text-lg font-semibold text-forest">
                  Filters
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setOpenFilters(false)
                  }
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {filters}

              <Button
                type="button"
                className="mt-6 w-full rounded-full bg-forest text-forest-foreground"
                onClick={() =>
                  setOpenFilters(false)
                }
              >
                Show {filteredTrails.length} results
              </Button>
            </motion.div>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}

type FilterGroupProps = {
  title: string;
  children: ReactNode;
};

function FilterGroup({
  title,
  children,
}: FilterGroupProps) {
  return (
    <div>
      <Label className="font-display text-sm font-semibold text-forest">
        {title}
      </Label>

      <div className="mt-3 space-y-2">
        {children}
      </div>
    </div>
  );
}
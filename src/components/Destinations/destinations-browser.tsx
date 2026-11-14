"use client";

import { useMemo, useState } from "react";
import { cn } from "cn";

import { DestinationCard } from "@/components/common/destination-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Destination } from "@/lib/destinations";

const priceRanges = [
  { value: "all", label: "All Prices" },
  { value: "under-1500", label: "Under $1,500" },
  { value: "1500-2500", label: "$1,500 - $2,500" },
  { value: "over-2500", label: "Over $2,500" },
];

const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name: A - Z" },
];

function formatCategory(category: string) {
  return category
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function matchesPriceRange(price: number, range: string | null) {
  if (!range || range === "all" || !Number.isFinite(price)) return true;
  if (range === "under-1500") return price < 1500;
  if (range === "1500-2500") return price >= 1500 && price <= 2500;
  if (range === "over-2500") return price > 2500;
  return true;
}

export function DestinationsBrowser({
  destinations,
}: {
  destinations: Destination[];
}) {
  const [category, setCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);

  const categoryOptions = useMemo(() => {
    const unique = Array.from(
      new Set(
        destinations.map((destination) => destination.category).filter(Boolean),
      ),
    );

    return [
      { value: "all", label: "All Categories" },
      ...unique.map((value) => ({ value, label: formatCategory(value) })),
    ];
  }, [destinations]);

  const visibleDestinations = useMemo(() => {
    const filtered = destinations.filter((destination) => {
      const matchesCategory =
        !category || category === "all" || destination.category === category;
      const matchesPrice = matchesPriceRange(
        Number(destination.price),
        priceRange,
      );

      return matchesCategory && matchesPrice;
    });

    if (sortBy === "price-asc" || sortBy === "price-desc") {
      const direction = sortBy === "price-asc" ? 1 : -1;
      return [...filtered].sort((a, b) => {
        const priceA = Number(a.price);
        const bPrice = Number(b.price);
        return (
          ((Number.isFinite(priceA) ? priceA : 0) -
            (Number.isFinite(bPrice) ? bPrice : 0)) *
          direction
        );
      });
    }

    if (sortBy === "name") {
      return [...filtered].sort((a, b) =>
        a.destinationName.localeCompare(b.destinationName),
      );
    }

    return filtered;
  }, [destinations, category, priceRange, sortBy]);

  return (
    <div>
      <div className="mt-8 grid grid-cols-1 overflow-hidden border border-border sm:grid-cols-3">
        <FilterSelect
          placeholder="Category"
          value={category}
          onChange={setCategory}
          options={categoryOptions}
          className="border-b border-border sm:border-r sm:border-b-0"
        />
        <FilterSelect
          placeholder="Price Range"
          value={priceRange}
          onChange={setPriceRange}
          options={priceRanges}
          className="border-b border-border sm:border-r sm:border-b-0"
        />
        <FilterSelect
          placeholder="Sort By"
          value={sortBy}
          onChange={setSortBy}
          options={sortOptions}
        />
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        Showing {visibleDestinations.length} destination
        {visibleDestinations.length === 1 ? "" : "s"}
      </p>

      {visibleDestinations.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {visibleDestinations.map((destination, index) => (
            <DestinationCard
              key={destination._id}
              destination={destination}
              preload={index === 0}
            />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-sm text-muted-foreground">
          No destinations match your filters.
        </p>
      )}
    </div>
  );
}

function FilterSelect({
  placeholder,
  value,
  onChange,
  options,
  className,
}: {
  placeholder: string;
  value: string | null;
  onChange: (value: string | null) => void;
  options: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <Select items={options} value={value} onValueChange={onChange}>
      <SelectTrigger
        className={cn(
          "h-12 w-full justify-between rounded-none border-0 bg-transparent px-4 text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase shadow-none focus-visible:ring-0 dark:bg-transparent",
          className,
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent align="start" alignItemWithTrigger={false}>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

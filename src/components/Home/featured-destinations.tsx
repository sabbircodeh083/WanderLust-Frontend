import { io } from "next/cache";

import { FeaturedDestinationsCarousel } from "@/components/Home/featured-destinations-carousel";
import { Skeleton } from "@/components/ui/skeleton";
import type { Destination } from "@/lib/destinations";

export async function FeaturedDestinations() {
  let destinations: Destination[] = [];

  await io();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/destinations-top`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch destinations");
    }

    destinations = await response.json();
  } catch (error) {
    console.error(error);
    destinations = [];
  }

  return (
    <section className="bg-background py-16 md:py-20">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <FeaturedDestinationsCarousel destinations={destinations} />
      </div>
    </section>
  );
}

export function FeaturedDestinationsLoading() {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Skeleton className="h-11 w-80 rounded-none" />
            <Skeleton className="mt-4 h-3 w-64 rounded-none" />
          </div>
          <Skeleton className="h-10 w-40 rounded-none" />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 overflow-hidden pb-10 sm:grid-cols-[repeat(2,47%)]">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index}>
              <Skeleton className="aspect-3/2 w-full rounded-none" />
              <Skeleton className="mt-4 h-3 w-24 rounded-none" />
              <Skeleton className="mt-2 h-6 w-40 rounded-none" />
              <Skeleton className="mt-2 h-3 w-32 rounded-none" />
            </div>
          ))}
        </div>

        <Skeleton className="mt-8 h-px w-full rounded-none" />
      </div>
    </section>
  );
}

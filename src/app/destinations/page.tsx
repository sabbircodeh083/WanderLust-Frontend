import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { DestinationsBrowser } from "@/components/Destinations/destinations-browser";
import { Skeleton } from "@/components/ui/skeleton";
import { getDestinations, type Destination } from "@/lib/destinations";

export const metadata: Metadata = {
  title: "Explore All Destinations | Wanderlast",
  description:
    "Find your perfect travel experience from our curated collection.",
};

export default function DestinationsPage() {
  return (
    <main className="min-h-svh bg-background px-6 py-12 md:px-10 md:py-16">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="text-4xl font-light tracking-tight text-foreground md:text-[42px]">
          Explore All Destinations
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Find your perfect travel experience from our curated collection
        </p>

        <Suspense fallback={<DestinationsLoading />}>
          <DestinationsContent />
        </Suspense>
      </div>
    </main>
  );
}

async function DestinationsContent() {
  let destinations: Destination[];

  try {
    destinations = await getDestinations();
  } catch {
    return (
      <p className="mt-16 text-sm text-muted-foreground">
        We couldn&apos;t load destinations right now. Please try again later.
      </p>
    );
  }

  if (destinations.length === 0) {
    return (
      <p className="mt-16 text-sm text-muted-foreground">
        No destinations yet.{" "}
        <Link href="/add-destination" className="text-brand hover:underline">
          Add the first travel package
        </Link>
        .
      </p>
    );
  }

  return <DestinationsBrowser destinations={destinations} />;
}

function DestinationsLoading() {
  return (
    <div className="mt-8">
      <Skeleton className="h-12 w-full rounded-none" />
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index}>
            <Skeleton className="aspect-video w-full rounded-none" />
            <Skeleton className="mt-3 h-3 w-24" />
            <Skeleton className="mt-2 h-4 w-40" />
            <Skeleton className="mt-2 h-3 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

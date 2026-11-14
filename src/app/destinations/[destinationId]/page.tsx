import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  ArrowLeftIcon,
  CalendarIcon,
  CheckIcon,
  MapPinIcon,
  StarIcon,
} from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import {
  getDestination,
  isValidDestinationId,
  type Destination,
} from "@/lib/destinations";
import { EditDestination } from "@/components/Destinations/edit-destination";
import { DeleteDestinationDialog } from "@/components/Destinations/deleteDestination";
import BookingCard from "@/components/Booking/bookingCard";

export async function generateMetadata({
  params,
}: PageProps<"/destinations/[destinationId]">): Promise<Metadata> {
  const { destinationId } = await params;

  if (!isValidDestinationId(destinationId)) {
    return { title: "Destination not found | Wanderlast" };
  }

  const destination = await getDestination(destinationId).catch(() => null);

  if (!destination) {
    return { title: "Destination not found | Wanderlast" };
  }

  return {
    title: `${destination.destinationName} | Wanderlast`,
    description: destination.description,
  };
}

const highlights = [
  "Luxury beachfront accommodation",
  "Traditional Balinese spa treatment",
  "Sunrise trek to Mount Batur",
  "Visit Uluwatu Temple at sunset",
  "Private beach dinner experience",
];

export default function DestinationPage({
  params,
}: PageProps<"/destinations/[destinationId]">) {
  return (
    <main className="min-h-svh bg-background px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto w-full max-w-5xl">
        <Suspense fallback={<DestinationLoading />}>
          <DestinationContent params={params} />
        </Suspense>
      </div>
    </main>
  );
}

async function DestinationContent({
  params,
}: {
  params: PageProps<"/destinations/[destinationId]">["params"];
}) {
  const { destinationId } = await params;

  let destination: Destination | null;

  try {
    destination = await getDestination(destinationId);
  } catch {
    return (
      <>
        <DestinationToolbar currentDestination={null} />
        <p className="mt-16 text-sm text-muted-foreground">
          We couldn&apos;t load this destination right now. Please try again
          later.
        </p>
      </>
    );
  }

  if (!destination) {
    notFound();
  }

  const rating = destination.rating ?? 4.5;

  return (
    <>
      <DestinationToolbar currentDestination={destination} />

      <div className="relative mt-4 aspect-[2.4/1] w-full overflow-hidden bg-muted">
        {destination.imageUrl ? (
          <Image
            src={destination.imageUrl}
            alt={destination.destinationName}
            fill
            preload
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
        <div>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPinIcon className="size-3.5" />
            {destination.country}
          </p>

          <h1 className="mt-2 text-3xl font-normal tracking-tight text-foreground md:text-4xl">
            {destination.destinationName}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <StarIcon className="size-3.5 fill-emerald-600 text-emerald-600" />
              <span className="font-semibold text-foreground">{rating}</span>
              <span>(24 reviews)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarIcon className="size-3.5" />
              {destination.duration}
            </span>
          </div>

          <section className="mt-8">
            <h2 className="text-base font-semibold text-foreground">
              Overview
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {destination.description}
            </p>
          </section>

          <section className="mt-7">
            <h2 className="text-base font-semibold text-foreground">
              Highlights
            </h2>
            <ul className="mt-3 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2 text-sm text-foreground/80"
                >
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                  {highlight}
                </li>
              ))}
            </ul>
          </section>
        </div>
        <BookingCard destination={destination} />
      </div>
    </>
  );
}

function DestinationToolbar({
  currentDestination,
}: {
  currentDestination: Destination | null;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <Link
        href="/destinations"
        className="inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeftIcon className="size-3.5" />
        Back to Destinations
      </Link>

      <div className="flex items-center gap-2">
        <EditDestination currentDestination={currentDestination} />
        <DeleteDestinationDialog
          currentDestination={currentDestination ?? null}
        />
      </div>
    </div>
  );
}

function DestinationLoading() {
  return (
    <>
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>

      <Skeleton className="mt-4 aspect-[2.4/1] w-full rounded-none" />

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
        <div>
          <Skeleton className="h-3 w-20" />
          <Skeleton className="mt-3 h-9 w-64" />
          <Skeleton className="mt-4 h-3 w-48" />
          <Skeleton className="mt-8 h-4 w-24" />
          <Skeleton className="mt-3 h-3 w-full" />
          <Skeleton className="mt-2 h-3 w-full" />
          <Skeleton className="mt-2 h-3 w-4/5" />
        </div>
        <Skeleton className="h-72 w-full rounded-none" />
      </div>
    </>
  );
}

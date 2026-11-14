import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getBookings } from "@/lib/bookings";
import { BookingList } from "@/components/Booking/booking-list";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "My Bookings | Wanderlast",
  description: "View the trips you have booked with Wanderlast.",
};

export default function BookingsPage() {
  return (
    <main className="min-h-svh bg-background px-6 py-12 md:px-10 md:py-16">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="text-4xl font-light tracking-tight text-foreground md:text-[42px]">
          My Bookings
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Trips you have booked with Wanderlast
        </p>

        <Suspense fallback={<BookingsLoading />}>
          <UserBookings />
        </Suspense>
      </div>
    </main>
  );
}

async function UserBookings() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session?.user?.email) {
    return (
      <p className="mt-16 text-sm text-muted-foreground">
        Please{" "}
        <Link href="/signin" className="text-brand hover:underline">
          sign in
        </Link>{" "}
        to see your bookings.
      </p>
    );
  }

  let bookings;

  try {
    bookings = await getBookings();
  } catch {
    return (
      <p className="mt-16 text-sm text-muted-foreground">
        We couldn&apos;t load your bookings right now. Please try again later.
      </p>
    );
  }

  if (bookings.length === 0) {
    return (
      <p className="mt-16 text-sm text-muted-foreground">
        No booking yet.{" "}
        <Link href="/destinations" className="text-brand hover:underline">
          Explore destinations
        </Link>{" "}
        to plan your next trip.
      </p>
    );
  }

  return <BookingList bookings={bookings} />;
}

function BookingsLoading() {
  return (
    <div className="mt-8 divide-y divide-border border-y border-border">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center"
        >
          <Skeleton className="aspect-video w-full shrink-0 sm:aspect-square sm:w-28" />
          <div className="flex-1">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="mt-2 h-4 w-48" />
            <Skeleton className="mt-3 h-3 w-64" />
          </div>
          <Skeleton className="h-5 w-20" />
        </div>
      ))}
    </div>
  );
}

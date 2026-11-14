"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  CalendarIcon,
  CircleCheckIcon,
  EyeIcon,
  Loader2Icon,
  MapPinIcon,
  Trash2Icon,
} from "lucide-react";

import type { Booking } from "@/lib/bookings";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getClientJwtToken } from "@/lib/Token/getClientToken";

function formatDate(value?: string) {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(date);
}

export function BookedCard({ booking }: { booking: Booking }) {
  const router = useRouter();
  const [isCancelling, setIsCancelling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const href = `/destinations/${booking._id}`;
  const price = Number(booking.price);

  const handleCancel = async () => {
    setIsCancelling(true);
    setError(null);
    const token = await getClientJwtToken();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/destination-booking/${booking._id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error(`Failed to cancel booking (${res.status})`);
      }

      router.refresh();
    } catch {
      setError("Could not cancel this booking. Please try again.");
      setIsCancelling(false);
    }
  };

  return (
    <article className="flex flex-col gap-3 rounded-md border border-border bg-card p-2.5 sm:flex-row sm:items-stretch sm:gap-4 sm:p-3">
      <Link
        href={href}
        className="relative block aspect-video w-full shrink-0 overflow-hidden rounded-sm bg-muted sm:aspect-auto sm:h-33 sm:w-45"
      >
        {booking.imageUrl ? (
          <Image
            src={booking.imageUrl}
            alt={booking.destinationName}
            fill
            sizes="(max-width: 640px) 100vw, 180px"
            className="object-cover"
          />
        ) : null}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 px-1 sm:py-1">
        <Badge
          variant="outline"
          className="border-emerald-600/20 bg-emerald-50 text-emerald-700"
        >
          <CircleCheckIcon data-icon="inline-start" />
          Confirmed
        </Badge>

        <h2 className="truncate text-lg font-semibold tracking-tight text-foreground">
          <Link href={href} className="hover:text-brand">
            {booking.destinationName}
          </Link>
        </h2>

        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarIcon className="size-3.5 shrink-0" />
          Departure: {formatDate(booking.departureDate)}
        </p>
        <p className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
          <MapPinIcon className="size-3.5 shrink-0" />
          <span className="truncate">Booking ID: {booking._id}</span>
        </p>

        <p className="mt-1 text-2xl font-semibold text-brand">
          {Number.isFinite(price) ? `$${price.toLocaleString()}` : "$—"}
        </p>

        {error ? (
          <p role="alert" className="text-xs text-destructive">
            {error}
          </p>
        ) : null}
      </div>

      <div className="flex items-center justify-end gap-2 px-1 sm:pr-1">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={handleCancel}
          disabled={isCancelling}
          className="h-9 gap-1.5 px-4 text-xs text-destructive border-destructive/30 hover:bg-destructive/5 hover:text-destructive"
        >
          {isCancelling ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <Trash2Icon className="size-4" />
          )}
          Cancel
        </Button>

        <Button
          size="lg"
          nativeButton={false}
          render={<Link href={href} />}
          className="h-9 gap-1.5 bg-brand px-4 text-xs text-brand-foreground hover:bg-brand/90"
        >
          <EyeIcon className="size-4" />
          View
        </Button>
      </div>
    </article>
  );
}

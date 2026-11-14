import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  CalendarIcon,
  MapPinIcon,
  StarIcon,
} from "lucide-react";

import type { Destination } from "@/lib/destinations";

export function DestinationCard({
  destination,
  preload = false,
}: {
  destination: Destination;
  preload?: boolean;
}) {
  const href = `/destinations/${destination._id}`;
  const price = Number(destination.price);
  const rating = destination.rating ?? 4.5;

  return (
    <article className="group flex flex-col">
      <Link
        href={href}
        className="relative block aspect-video overflow-hidden bg-muted"
      >
        {destination.imageUrl ? (
          <Image
            src={destination.imageUrl}
            alt={destination.destinationName}
            fill
            preload={preload}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : null}
        <span className="absolute top-3 right-3 flex items-center gap-1 rounded-sm bg-white px-2 py-1 text-xs font-semibold text-neutral-900 shadow-sm">
          {rating}
          <StarIcon className="size-3 fill-current" />
        </span>
      </Link>

      <div className="pt-3">
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPinIcon className="size-3.5" />
          {destination.country}
        </p>

        <h3 className="mt-1.5 text-base font-medium tracking-tight text-foreground">
          <Link href={href} className="hover:text-brand">
            {destination.destinationName}
          </Link>
        </h3>

        <div className="mt-2 flex items-center justify-between gap-3">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarIcon className="size-3.5" />
            {destination.duration}
          </span>
          <span className="text-sm whitespace-nowrap text-foreground">
            <span className="font-semibold">
              {Number.isFinite(price) ? `$${price.toLocaleString()}` : "$—"}
            </span>
            <span className="text-xs text-muted-foreground">/Person</span>
          </span>
        </div>

        <Link
          href={href}
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-brand uppercase transition-colors hover:text-brand/80"
        >
          Book Now
          <ArrowUpRightIcon className="size-3.5" />
        </Link>
      </div>
    </article>
  );
}

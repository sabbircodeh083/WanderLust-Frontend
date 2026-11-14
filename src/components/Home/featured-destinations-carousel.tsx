"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { DestinationCard } from "@/components/common/destination-card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { Destination } from "@/lib/destinations";

export function FeaturedDestinationsCarousel({
  destinations,
}: {
  destinations: Destination[];
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(destinations.length);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) return;

    const update = () => {
      setCurrent(api.selectedScrollSnap() + 1);
      setCount(api.scrollSnapList().length);
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    update();
    api.on("select", update);
    api.on("reInit", update);

    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  const progress = count > 0 ? (current / count) * 100 : 0;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-normal tracking-tight text-foreground md:text-[44px]">
            Featured Destinations
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Handpicked travel experiences for the adventure seekers
          </p>
        </div>

        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/destinations" />}
          className="h-10 gap-3 rounded-none border-brand/40 px-5 text-[11px] font-semibold tracking-[0.12em] text-brand uppercase hover:bg-brand/5 hover:text-brand"
        >
          All Destinations
          <ArrowRightIcon className="size-4" />
        </Button>
      </div>

      {destinations.length === 0 ? (
        <p className="mt-10 text-sm text-muted-foreground">
          No destinations to feature yet.
        </p>
      ) : (
        <>
          <Carousel
            setApi={setApi}
            opts={{ align: "start", loop: false }}
            className="mt-8"
          >
            <CarouselContent className="-ml-5">
              {destinations.map((destination) => (
                <CarouselItem
                  key={destination._id}
                  className="basis-[86%] pl-5 sm:basis-[47%]"
                >
                  <DestinationCard destination={destination} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="mt-8 flex items-center gap-6">
            <span className="text-sm tabular-nums text-foreground">
              {current}/{count}
            </span>

            <div className="relative h-px flex-1 bg-border" aria-hidden="true">
              <div
                className="absolute inset-y-0 left-0 bg-brand transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                aria-label="Previous destinations"
                disabled={!canScrollPrev}
                onClick={() => api?.scrollPrev()}
                className="size-10 rounded-full border-border text-muted-foreground hover:text-foreground"
              >
                <ArrowLeftIcon className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label="Next destinations"
                disabled={!canScrollNext}
                onClick={() => api?.scrollNext()}
                className="size-10 rounded-full border-border text-muted-foreground hover:text-foreground"
              >
                <ArrowRightIcon className="size-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

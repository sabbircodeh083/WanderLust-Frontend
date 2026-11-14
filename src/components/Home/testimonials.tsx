"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

type Testimonial = {
  quote: string;
  name: string;
  location: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image: "/person2.png",
  },
  {
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/person1.png",
  },
  {
    quote:
      "A Seamless Journey From Start To Finish. Every Stop Felt Handpicked, And The Hidden Gems We Discovered Made The Trip Truly Special.",
    name: "Amelia Brown",
    location: "Sydney, Australia",
    image: "/person1.png",
  },
  {
    quote:
      "The Safari Was The Adventure Of A Lifetime. Our Guide Knew Every Trail And The Sunsets Over The Plains Are Something I Will Never Forget.",
    name: "David Okafor",
    location: "Toronto, Canada",
    image: "/person2.png",
  },
];

export function Testimonials() {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) return;

    const update = () => {
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

  return (
    <section className="bg-background py-16 md:py-20">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="text-4xl font-normal tracking-tight text-foreground md:text-[44px]">
              What Travelers Say
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Real experiences from our happy travelers
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              aria-label="Previous testimonials"
              disabled={!canScrollPrev}
              onClick={() => api?.scrollPrev()}
              className="size-10 rounded-full border-border text-muted-foreground hover:text-foreground"
            >
              <ArrowLeftIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label="Next testimonials"
              disabled={!canScrollNext}
              onClick={() => api?.scrollNext()}
              className="size-10 rounded-full border-border text-muted-foreground hover:text-foreground"
            >
              <ArrowRightIcon className="size-4" />
            </Button>
          </div>
        </div>

        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: false }}
          className="mt-8 border border-border"
        >
          <CarouselContent className="-ml-0">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.name}
                className="basis-full border-l border-border pl-0 first:border-l-0 md:basis-1/2"
              >
                <figure className="flex h-full flex-col-reverse justify-between gap-6 p-6 sm:flex-row sm:items-stretch md:gap-8 md:p-8">
                  <div className="flex flex-1 flex-col justify-between">
                    <blockquote className="text-lg leading-snug text-foreground md:text-xl">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>

                    <figcaption className="mt-8 flex items-start gap-3">
                      <span
                        className="mt-2.5 h-px w-5 shrink-0 bg-brand"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-sm font-medium text-brand">
                          {testimonial.name}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {testimonial.location}
                        </p>
                      </div>
                    </figcaption>
                  </div>

                  <Image
                    src={testimonial.image}
                    alt={`Portrait of ${testimonial.name}`}
                    width={218}
                    height={264}
                    sizes="(min-width: 768px) 218px, 160px"
                    className="aspect-[218/264] w-full max-w-[218px] shrink-0 self-start object-cover sm:w-32 md:w-[180px] lg:w-[218px]"
                  />
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

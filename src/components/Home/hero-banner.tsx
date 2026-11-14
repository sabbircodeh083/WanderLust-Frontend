import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden">
      <Image
        src="/Banner.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="flex flex-1 flex-col items-center justify-center px-6 pt-16 pb-12 text-center">
        <h1 className="max-w-4xl text-balance text-5xl font-light leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[84px]">
          Discover Your
          <br />
          Next Adventure
        </h1>

        <p className="mt-6 max-w-155 text-pretty text-sm leading-relaxed text-white/90 sm:text-base lg:text-lg">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
          <Button
            nativeButton={false}
            render={<Link href="/destinations" />}
            className="h-11 gap-2 rounded-none bg-brand px-6 text-xs font-semibold tracking-[0.15em] text-brand-foreground uppercase hover:bg-brand/90 md:h-12 md:px-8"
          >
            Explore Now
            <ArrowRightIcon className="size-4" />
          </Button>
          <Button
            variant="secondary"
            nativeButton={false}
            render={<Link href="/destinations" />}
            className="h-11 rounded-none bg-white/30 px-6 text-xs font-semibold tracking-[0.15em] text-white uppercase backdrop-blur-sm hover:bg-white/40 md:h-12 md:px-8"
          >
            View Destination
          </Button>
        </div>
      </div>

      <SearchBar />
    </section>
  );
}

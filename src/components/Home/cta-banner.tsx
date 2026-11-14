import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="relative isolate flex min-h-85 items-center justify-center overflow-hidden px-6 py-16 md:min-h-110">
      <Image
        src="/CTA.png"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-black/25" />

      <div className="flex flex-col items-center text-center">
        <h2 className="text-balance text-3xl font-light tracking-tight text-white sm:text-4xl md:text-5xl">
          Ready To Start Your Journey?
        </h2>

        <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-white/90 sm:text-base">
          Join thousands of travelers who have discovered the world with us
        </p>

        <Button
          nativeButton={false}
          render={<Link href="/destinations" />}
          className="mt-8 h-11 gap-3 rounded-none bg-white px-6 text-xs font-semibold tracking-[0.15em] text-neutral-900 uppercase hover:bg-white/90 md:h-12 md:px-8"
        >
          Book Your Trip Today
          <ArrowRightIcon className="size-4" />
        </Button>
      </div>
    </section>
  );
}

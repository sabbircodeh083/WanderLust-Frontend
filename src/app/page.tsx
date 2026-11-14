import { Suspense } from "react";

import { CtaBanner } from "@/components/Home/cta-banner";
import {
  FeaturedDestinations,
  FeaturedDestinationsLoading,
} from "@/components/Home/featured-destinations";
import { HeroBanner } from "@/components/Home/hero-banner";
import { WhyChooseUs } from "@/components/Home/why-choose-us";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <main className="flex-1">
        <HeroBanner />
        <Suspense fallback={<FeaturedDestinationsLoading />}>
          <FeaturedDestinations />
        </Suspense>
        <WhyChooseUs />
        <CtaBanner />
      </main>
    </div>
  );
}

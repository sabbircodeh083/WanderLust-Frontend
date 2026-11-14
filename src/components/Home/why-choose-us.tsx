import {
  HeadsetIcon,
  MapIcon,
  ShieldCheckIcon,
  type LucideIcon,
} from "lucide-react";

import { Card } from "@/components/ui/card";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: ShieldCheckIcon,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: MapIcon,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: HeadsetIcon,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-brand/10 py-16 md:py-20 mb-10 lg:mb-30">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <div className="text-center">
          <h2 className="text-4xl font-normal tracking-tight text-foreground md:text-[44px]">
            Why Choose Wanderlust
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <Card
              key={title}
              className="gap-0 rounded-none px-8 py-9 shadow-sm ring-0"
            >
              <Icon
                className="size-9 text-brand"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h3 className="mt-8 text-2xl font-normal tracking-tight text-foreground">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

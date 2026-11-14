import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/bookings" },
  { label: "My Profile", href: "/profile" },
];

const supportLinks = [
  { label: "Help Center", href: "/help" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

const socialLinks = [
  { label: "X", href: "#", icon: XIcon },
  { label: "LinkedIn", href: "#", icon: LinkedInIcon },
  { label: "Instagram", href: "#", icon: InstagramIcon },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#0c0b0b] text-white">
      <div className="mx-auto w-full max-w-7xl px-6 pt-16 pb-10 md:px-10 md:pt-20">
        <Image
          src="/Wanderlast-1.png"
          alt="Wanderlast"
          width={542}
          height={80}
          className="h-13 w-auto md:h-20"
        />
        <p className="mt-5 text-sm text-white/60">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-x-12">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xs font-medium tracking-[0.08em] text-white/50 uppercase">
              Newsletter
            </h3>
            <p className="mt-3 text-sm text-white/60">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form className="mt-2 flex w-full max-w-[320px] items-stretch bg-white/15">
              <Input
                type="email"
                placeholder="Enter email"
                aria-label="Email address"
                className="h-12 flex-1 rounded-none border-0 bg-transparent px-4 text-sm text-white placeholder:text-white/50 focus-visible:ring-0 dark:bg-transparent"
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                aria-label="Subscribe"
                className="size-12 shrink-0 rounded-none text-white hover:bg-white/10 hover:text-white"
              >
                <ArrowUpRightIcon className="size-5" />
              </Button>
            </form>
          </div>

          <FooterColumn title="Quick Links" links={quickLinks} />
          <FooterColumn title="Support" links={supportLinks} />

          <div>
            <h3 className="text-xs font-medium tracking-[0.08em] text-white/50 uppercase">
              Contact Us
            </h3>
            <div className="mt-3 flex flex-col gap-2.5 text-sm text-white/70">
              <a
                href="tel:+17869011622"
                className="w-fit transition-colors hover:text-white"
              >
                786 901 1622
              </a>
              <a
                href="mailto:info@wandarland.com"
                className="w-fit transition-colors hover:text-white"
              >
                info@wandarland.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/5 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">
            © 2026 Wanderlust. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-white/90 transition-colors hover:text-white"
              >
                <social.icon />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-medium tracking-[0.08em] text-white/50 uppercase">
        {title}
      </h3>
      <div className="mt-3 flex flex-col gap-2.5 text-sm text-white/70">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="w-fit transition-colors hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="size-5"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="size-5"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-5"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

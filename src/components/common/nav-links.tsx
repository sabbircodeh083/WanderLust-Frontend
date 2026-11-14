"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavigationMenuLink } from "@/components/ui/navigation-menu";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Add Destination", href: "/add-destination" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/bookings" },
  { label: "Admin", href: "/admin" },
];

export type NavVariant = "desktop" | "mobile";

type NavLinkProps = {
  label: string;
  href: string;
  variant: NavVariant;
  active?: boolean;
};

// "/" only matches the home page; other items also match their nested routes,
// e.g. /destinations/bali should still highlight "Destinations".
function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLink({
  label,
  href,
  variant,
  active = false,
}: NavLinkProps) {
  if (variant === "mobile") {
    return (
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={
          active
            ? "rounded-md border-l-2 border-brand bg-brand/10 px-3 py-2 text-sm font-medium text-brand"
            : "rounded-md border-l-2 border-transparent px-3 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-foreground"
        }
      >
        {label}
      </Link>
    );
  }

  return (
    <NavigationMenuLink
      active={active}
      aria-current={active ? "page" : undefined}
      render={<Link href={href} />}
      className="rounded-none px-0 py-0 text-[15px] font-normal text-foreground/80 hover:bg-transparent hover:text-foreground focus:bg-transparent data-active:bg-transparent data-active:text-brand data-active:underline data-active:underline-offset-4 data-active:decoration-2"
    >
      {label}
    </NavigationMenuLink>
  );
}

export function ActiveNavLink(props: Omit<NavLinkProps, "active">) {
  const pathname = usePathname();

  return <NavLink {...props} active={isActivePath(pathname, props.href)} />;
}

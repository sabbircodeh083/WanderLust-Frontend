"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { MenuIcon, UserIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";

import { ActiveNavLink, NavLink, navItems } from "@/components/common/nav-links";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignoutPopover } from "./avatarIcon";

type AuthItem = {
  label: string;
  href: string;
  icon?: typeof UserIcon;
};

const guestAuthItems: AuthItem[] = [
  { label: "Login", href: "/signin" },
  { label: "Sign Up", href: "/signup" },
];

const profileItem: AuthItem = {
  label: "Profile",
  href: "/profile",
  icon: UserIcon,
};

export function SiteHeader() {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const initials = user?.name?.trim().slice(0, 2).toUpperCase() ?? "";

  return (
    <header className="relative z-20 grid h-16 grid-cols-[1fr_auto_1fr] items-center bg-background px-4 md:px-6">
      <div className="flex items-center justify-between">
        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="xl:hidden"
                aria-label="Open menu"
              />
            }
          >
            <MenuIcon />
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <SheetHeader>
              <SheetTitle>Wanderlast</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-2">
              {navItems.map((item) => (
                <Suspense
                  key={item.href}
                  fallback={<NavLink {...item} variant="mobile" />}
                >
                  <ActiveNavLink {...item} variant="mobile" />
                </Suspense>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-1 border-t p-2">
              {isPending ? null : user ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-2">
                    <SignoutPopover user={user} initials={initials} />
                  </div>
                  <Link
                    href={profileItem.href}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-foreground"
                  >
                    <UserIcon className="size-4" />
                    {profileItem.label}
                  </Link>
                </>
              ) : (
                guestAuthItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))
              )}
            </div>
          </SheetContent>
        </Sheet>

        <NavigationMenu className="hidden flex-none justify-start xl:flex">
          <NavigationMenuList className="justify-start gap-9">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <Suspense fallback={<NavLink {...item} variant="desktop" />}>
                  <ActiveNavLink {...item} variant="desktop" />
                </Suspense>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <Link
        href="/"
        aria-label="Wanderlast home"
        className="justify-self-center"
      >
        <Image
          src="/Wanderlast.png"
          alt="Wanderlast"
          width={162}
          height={24}
          priority
          className="h-5 w-auto md:h-6"
        />
      </Link>

      <div className="hidden items-center justify-end gap-2 xl:flex">
        {isPending ? null : user ? (
          <>
            <div className="flex items-center gap-3 px-3 py-2">
              <SignoutPopover user={user} initials={initials} />
            </div>
            <Link
              href={profileItem.href}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-foreground"
            >
              <UserIcon className="size-4" />
              {profileItem.label}
            </Link>
          </>
        ) : (
          guestAuthItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              size="sm"
              nativeButton={false}
              render={<Link href={item.href} />}
              className="text-foreground/80 hover:bg-transparent hover:text-foreground"
            >
              {item.label}
            </Button>
          ))
        )}
      </div>
    </header>
  );
}

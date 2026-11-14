"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";

interface SignoutPopoverProps {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
  initials: string;
}

export function SignoutPopover({ user, initials }: SignoutPopoverProps) {
  const router = useRouter();

  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/"); // redirect to login page
        },
      },
    });
  };
  return (
    <>
      <Popover>
        <PopoverTrigger
          nativeButton={false}
          render={
            <Avatar className="cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brand/50">
              {user.image ? (
                <AvatarImage src={user.image} alt={user.name} />
              ) : null}
              <AvatarFallback className="bg-brand/10 text-xs font-semibold text-brand">
                {initials}
              </AvatarFallback>
            </Avatar>
          }
        />
        <PopoverContent align="start">
          <h1>{user?.name}</h1>
          <h2 className="text-gray-500">{user?.email}</h2>
          <button
            className="bg-red-200 cursor-pointer hover:text-red-500 w-[25%] rounded-2xl p-1"
            onClick={handleSignout}
          >
            Signout
          </button>
        </PopoverContent>
      </Popover>
    </>
  );
}

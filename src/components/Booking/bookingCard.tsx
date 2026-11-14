"use client";

import { Destination } from "@/lib/destinations";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { getClientJwtToken } from "@/lib/Token/getClientToken";
import { useRouter } from "next/navigation";

const bookingPerks = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

const inputClassName =
  "h-10 rounded-md border-0 bg-muted px-3 shadow-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/30 dark:bg-muted";

// <input type="date"> only accepts YYYY-MM-DD. The API stores MM/DD/YYYY.
function toDateInputValue(value?: string) {
  if (!value) return "";

  // Already ISO, e.g. "2026-12-31" or a full timestamp.
  const iso = value.slice(0, 10);
  if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;

  const match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(value.trim());
  if (match) {
    const [, month, day, year] = match;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  return "";
}

function BookingCard({ destination }: { destination: Destination }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = session?.user;
    const formData = new FormData(e.currentTarget);
    const departureDate = formData.get("departureDate");

    const bookingObject = {
      email: user?.email,
      userName: user?.name,
      ...destination,
      departureDate,
      bookingDate: new Date(),
    };
    const token = await getClientJwtToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/destination-booking`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingObject),
      },
    );

    console.log(await res.json());
    router.push("/bookings");
  };
  const price = Number(destination.price);
  return (
    <aside className="h-fit border border-border bg-card p-5">
      <p className="text-xs text-muted-foreground">Starting from</p>
      <p className="mt-1 text-3xl font-medium text-brand">
        {Number.isFinite(price) ? `$${price.toLocaleString()}` : "$—"}
      </p>
      <p className="mt-0.5 text-xs text-muted-foreground">per person</p>

      <div className="my-4 h-px bg-border" />

      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <Field>
            <FieldLabel
              htmlFor="departure-date"
              className="text-xs font-semibold"
            >
              Departure Date
            </FieldLabel>
            <Input
              type="date"
              id="departure-date"
              name="departureDate"
              defaultValue={toDateInputValue(destination.departureDate)}
              className={inputClassName}
            />
          </Field>

          <Button
            type="submit"
            className="mt-3 h-10 w-full bg-brand text-sm font-medium text-brand-foreground hover:bg-brand/90"
          >
            Book Now
            <ArrowRightIcon className="size-4" />
          </Button>
        </FieldGroup>
      </form>

      <ul className="mt-4 flex flex-col gap-2">
        {bookingPerks.map((perk) => (
          <li
            key={perk}
            className="flex items-start gap-2 text-xs text-muted-foreground"
          >
            <CheckIcon className="mt-0.5 size-3.5 shrink-0 text-emerald-600" />
            {perk}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default BookingCard;

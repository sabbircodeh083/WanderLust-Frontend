import type { Destination } from "@/lib/destinations";
import { getServerJwtToken } from "./Token/getServerToken";

export type Booking = Omit<Destination, "departureDate"> & {
  email: string;
  userName?: string;
  departureDate?: string;
  bookingDate?: string;
};

function getApiUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_API;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API is not configured");
  }

  return apiUrl;
}

export async function getBookings(): Promise<Booking[]> {
  const res = await fetch(`${getApiUrl()}/destination-booking`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${await getServerJwtToken()}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch bookings (${res.status})`);
  }

  return res.json();
}

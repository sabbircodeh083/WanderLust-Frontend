import { getServerJwtToken } from "./Token/getServerToken";

export type Destination = {
  _id: string;
  destinationName: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
  rating?: number;
};

function getApiUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_API;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API is not configured");
  }

  return apiUrl;
}

export async function getDestinations(): Promise<Destination[]> {
  const res = await fetch(`${getApiUrl()}/destinations`, {
    headers: {
      Authorization: `Bearer ${await getServerJwtToken()}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch destinations (${res.status})`);
  }

  return res.json();
}

export async function getDestination(id: string): Promise<Destination | null> {
  if (!isValidDestinationId(id)) {
    return null;
  }

  const res = await fetch(`${getApiUrl()}/destinations/${id}`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${await getServerJwtToken()}`,
    },
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch destination (${res.status})`);
  }

  return res.json();
}

// The API casts ids with `new ObjectId(id)`, which throws on malformed ids.
export function isValidDestinationId(id: string) {
  return /^[0-9a-f]{24}$/i.test(id);
}

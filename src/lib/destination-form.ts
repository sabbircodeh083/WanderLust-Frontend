import type { Destination } from "@/lib/destinations";

export const categories = [
  { value: "beach", label: "Beach" },
  { value: "mountain", label: "Mountain" },
  { value: "city", label: "City" },
  { value: "adventure", label: "Adventure" },
  { value: "island", label: "Island" },
  { value: "desert", label: "Desert" },
] as const;

export type DestinationFormValues = {
  destinationName: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

export type DestinationFormErrors = Partial<
  Record<keyof DestinationFormValues, string>
>;

const MAX_PRICE = 1_000_000;

export function emptyDestinationForm(): DestinationFormValues {
  return {
    destinationName: "",
    country: "",
    category: "",
    price: "",
    duration: "",
    departureDate: "",
    imageUrl: "",
    description: "",
  };
}

export function toDestinationFormValues(
  destination?: Destination | null,
): DestinationFormValues {
  return {
    destinationName: destination?.destinationName ?? "",
    country: destination?.country ?? "",
    category: destination?.category ?? "",
    price: destination?.price ?? "",
    duration: destination?.duration ?? "",
    departureDate: destination?.departureDate ?? "",
    imageUrl: destination?.imageUrl ?? "",
    description: destination?.description ?? "",
  };
}

function parseDepartureDate(value: string): Date | null {
  const iso = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(value);
  const us = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(value);

  let year: number;
  let month: number;
  let day: number;

  if (iso) {
    year = Number(iso[1]);
    month = Number(iso[2]);
    day = Number(iso[3]);
  } else if (us) {
    year = Number(us[3]);
    month = Number(us[1]);
    day = Number(us[2]);
  } else {
    return null;
  }

  const date = new Date(Date.UTC(year, month - 1, day));

  // Reject rolled-over dates such as 02/31/2026.
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return date;
}

function validatePrice(value: string): string | undefined {
  if (!value) return "Price is required.";

  if (!/^\d+(\.\d{1,2})?$/.test(value)) {
    return "Enter a valid price with up to 2 decimal places.";
  }

  const price = Number(value);

  if (!Number.isFinite(price) || price <= 0) {
    return "Price must be greater than 0.";
  }

  if (price > MAX_PRICE) {
    return `Price must be ${MAX_PRICE.toLocaleString()} or less.`;
  }

  return undefined;
}

function validateImageUrl(value: string): string | undefined {
  if (!value) return "Image URL is required.";

  try {
    const url = new URL(value);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return "Image URL must start with http:// or https://.";
    }
  } catch {
    return "Enter a valid image URL.";
  }

  return undefined;
}

/**
 * Validates trimmed form values and returns one message per invalid field.
 * An empty object means the form is valid.
 */
export function validateDestinationForm(
  values: DestinationFormValues,
): DestinationFormErrors {
  const errors: DestinationFormErrors = {};

  const destinationName = values.destinationName.trim();
  if (!destinationName) {
    errors.destinationName = "Destination name is required.";
  } else if (destinationName.length < 2) {
    errors.destinationName = "Destination name must be at least 2 characters.";
  } else if (destinationName.length > 80) {
    errors.destinationName = "Destination name must be 80 characters or less.";
  }

  const country = values.country.trim();
  if (!country) {
    errors.country = "Country is required.";
  } else if (country.length < 2) {
    errors.country = "Country must be at least 2 characters.";
  } else if (country.length > 60) {
    errors.country = "Country must be 60 characters or less.";
  }

  if (!categories.some((category) => category.value === values.category)) {
    errors.category = "Choose a category.";
  }

  const priceError = validatePrice(values.price.trim());
  if (priceError) errors.price = priceError;

  const duration = values.duration.trim();
  if (!duration) {
    errors.duration = "Duration is required.";
  } else if (duration.length < 2) {
    errors.duration = "Duration must be at least 2 characters.";
  } else if (duration.length > 60) {
    errors.duration = "Duration must be 60 characters or less.";
  }

  const departureDate = values.departureDate.trim();
  if (!departureDate) {
    errors.departureDate = "Departure date is required.";
  } else if (!parseDepartureDate(departureDate)) {
    errors.departureDate = "Enter a valid date, e.g. 05/15/2026.";
  }

  const imageUrlError = validateImageUrl(values.imageUrl.trim());
  if (imageUrlError) errors.imageUrl = imageUrlError;

  const description = values.description.trim();
  if (!description) {
    errors.description = "Description is required.";
  } else if (description.length < 20) {
    errors.description = "Description must be at least 20 characters.";
  } else if (description.length > 2000) {
    errors.description = "Description must be 2000 characters or less.";
  }

  return errors;
}

export function hasDestinationFormErrors(
  errors: DestinationFormErrors,
): boolean {
  return Object.keys(errors).length > 0;
}

export function trimDestinationFormValues(
  values: DestinationFormValues,
): DestinationFormValues {
  return {
    destinationName: values.destinationName.trim(),
    country: values.country.trim(),
    category: values.category.trim(),
    price: values.price.trim(),
    duration: values.duration.trim(),
    departureDate: values.departureDate.trim(),
    imageUrl: values.imageUrl.trim(),
    description: values.description.trim(),
  };
}

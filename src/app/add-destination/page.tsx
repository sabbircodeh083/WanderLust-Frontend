"use client";

import * as React from "react";
import Link from "next/link";
import { SaveIcon, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "cn";
import {
  categories,
  emptyDestinationForm,
  hasDestinationFormErrors,
  trimDestinationFormValues,
  validateDestinationForm,
  type DestinationFormErrors,
  type DestinationFormValues,
} from "@/lib/destination-form";
import { getClientJwtToken } from "@/lib/Token/getClientToken";

const inputClassName =
  "h-10 rounded-md border-0 bg-muted px-3 shadow-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/30 dark:bg-muted";

export default function AddDestinationPage() {
  const [formValues, setFormValues] =
    React.useState<DestinationFormValues>(emptyDestinationForm);
  const [errors, setErrors] = React.useState<DestinationFormErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<string | null>(null);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  function clearError(name: keyof DestinationFormValues) {
    setErrors((previous) => {
      if (!previous[name]) return previous;

      const next = { ...previous };
      delete next[name];
      return next;
    });
  }

  function updateField(name: keyof DestinationFormValues, value: string) {
    setFormValues((previous) => ({ ...previous, [name]: value }));
    clearError(name);
    setStatus(null);
    setSubmitError(null);
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    updateField(
      event.target.name as keyof DestinationFormValues,
      event.target.value,
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const values = trimDestinationFormValues(formValues);
    const nextErrors = validateDestinationForm(values);
    setErrors(nextErrors);

    if (hasDestinationFormErrors(nextErrors)) {
      setStatus(null);
      setSubmitError(null);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setStatus(null);

    try {
      const token = await getClientJwtToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/destinations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error(`Failed to add destination (${res.status})`);
      }

      const result = await res.json();
      console.log("Destination added:", result);

      setFormValues(emptyDestinationForm());
      setStatus("Travel package added successfully.");
    } catch (error) {
      console.error("Add destination:", error);
      setSubmitError("Could not add this travel package. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-svh bg-background px-6 py-10 md:px-12 md:py-14">
      <h1 className="text-3xl  tracking-tight text-foreground ">
        Add New Travel Package
      </h1>

      <div className="mx-auto mt-14 w-full max-w-160 rounded-md border bg-card p-6 shadow-sm">
        <form onSubmit={handleSubmit} noValidate>
          <FieldGroup className="gap-4">
            <Field data-invalid={errors.destinationName ? true : undefined}>
              <FieldLabel
                htmlFor="destination-name"
                className="text-xs font-semibold"
              >
                Destination Name
              </FieldLabel>
              <Input
                id="destination-name"
                name="destinationName"
                value={formValues.destinationName}
                onChange={handleChange}
                placeholder="Bali Paradise"
                aria-invalid={errors.destinationName ? true : undefined}
                aria-describedby={
                  errors.destinationName ? "destination-name-error" : undefined
                }
                className={inputClassName}
              />
              <FieldError id="destination-name-error" className="text-xs">
                {errors.destinationName}
              </FieldError>
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field data-invalid={errors.country ? true : undefined}>
                <FieldLabel htmlFor="country" className="text-xs font-semibold">
                  Country
                </FieldLabel>
                <Input
                  id="country"
                  name="country"
                  value={formValues.country}
                  onChange={handleChange}
                  placeholder="Indonesia"
                  aria-invalid={errors.country ? true : undefined}
                  aria-describedby={
                    errors.country ? "country-error" : undefined
                  }
                  className={inputClassName}
                />
                <FieldError id="country-error" className="text-xs">
                  {errors.country}
                </FieldError>
              </Field>

              <Field data-invalid={errors.category ? true : undefined}>
                <FieldLabel
                  htmlFor="category"
                  className="text-xs font-semibold"
                >
                  Category
                </FieldLabel>
                <Select
                  items={categories}
                  value={formValues.category || null}
                  onValueChange={(value) =>
                    updateField("category", value ?? "")
                  }
                >
                  <SelectTrigger
                    id="category"
                    aria-invalid={errors.category ? true : undefined}
                    aria-describedby={
                      errors.category ? "category-error" : undefined
                    }
                    className={cn(
                      "h-10 w-full rounded-md border-0 bg-muted px-3 shadow-none focus-visible:ring-2 focus-visible:ring-ring/30 dark:bg-muted",
                      errors.category && "ring-1 ring-destructive/50",
                    )}
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError id="category-error" className="text-xs">
                  {errors.category}
                </FieldError>
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field data-invalid={errors.price ? true : undefined}>
                <FieldLabel htmlFor="price" className="text-xs font-semibold">
                  Price (USD)
                </FieldLabel>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min={0}
                  step="0.01"
                  value={formValues.price}
                  onChange={handleChange}
                  placeholder="e.g., 1299"
                  aria-invalid={errors.price ? true : undefined}
                  aria-describedby={errors.price ? "price-error" : undefined}
                  className={inputClassName}
                />
                <FieldError id="price-error" className="text-xs">
                  {errors.price}
                </FieldError>
              </Field>

              <Field data-invalid={errors.duration ? true : undefined}>
                <FieldLabel
                  htmlFor="duration"
                  className="text-xs font-semibold"
                >
                  Duration
                </FieldLabel>
                <Input
                  id="duration"
                  name="duration"
                  value={formValues.duration}
                  onChange={handleChange}
                  placeholder="e.g., 7 Days/6 Nights"
                  aria-invalid={errors.duration ? true : undefined}
                  aria-describedby={
                    errors.duration ? "duration-error" : undefined
                  }
                  className={inputClassName}
                />
                <FieldError id="duration-error" className="text-xs">
                  {errors.duration}
                </FieldError>
              </Field>
            </div>

            <Field data-invalid={errors.departureDate ? true : undefined}>
              <FieldLabel
                htmlFor="departure-date"
                className="text-xs font-semibold"
              >
                Departure Date
              </FieldLabel>
              <Input
                id="departure-date"
                name="departureDate"
                value={formValues.departureDate}
                onChange={handleChange}
                placeholder="mm/dd/yyyy"
                aria-invalid={errors.departureDate ? true : undefined}
                aria-describedby={
                  errors.departureDate ? "departure-date-error" : undefined
                }
                className={inputClassName}
              />
              <FieldError id="departure-date-error" className="text-xs">
                {errors.departureDate}
              </FieldError>
            </Field>

            <Field data-invalid={errors.imageUrl ? true : undefined}>
              <FieldLabel htmlFor="image-url" className="text-xs font-semibold">
                Image URL
              </FieldLabel>
              <Input
                id="image-url"
                name="imageUrl"
                type="url"
                value={formValues.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                aria-invalid={errors.imageUrl ? true : undefined}
                aria-describedby={
                  errors.imageUrl ? "image-url-error" : undefined
                }
                className={inputClassName}
              />
              <FieldError id="image-url-error" className="text-xs">
                {errors.imageUrl}
              </FieldError>
            </Field>

            <Field data-invalid={errors.description ? true : undefined}>
              <FieldLabel
                htmlFor="description"
                className="text-xs font-semibold"
              >
                Description
              </FieldLabel>
              <Textarea
                id="description"
                name="description"
                value={formValues.description}
                onChange={handleChange}
                placeholder="Describe the travel experience..."
                aria-invalid={errors.description ? true : undefined}
                aria-describedby={
                  errors.description ? "description-error" : undefined
                }
                className="min-h-28 resize-none rounded-md border-0 bg-muted px-3 py-2 shadow-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/30 dark:bg-muted"
              />
              <FieldError id="description-error" className="text-xs">
                {errors.description}
              </FieldError>
            </Field>
          </FieldGroup>

          {submitError ? (
            <p role="alert" className="mt-4 text-sm text-destructive">
              {submitError}
            </p>
          ) : null}
          {status ? (
            <p role="status" className="mt-4 text-sm text-emerald-600">
              {status}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href="/" />}
              className="border-destructive/40 text-destructive hover:bg-destructive/5 hover:text-destructive"
            >
              <Trash2Icon className="size-4" />
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-brand text-brand-foreground hover:bg-brand/90"
            >
              <SaveIcon className="size-4" />
              {isSubmitting ? "Adding..." : "Add Travel Package"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}

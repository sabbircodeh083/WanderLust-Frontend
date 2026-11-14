import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const searchFields = [
  { label: "Location", placeholder: "Address, City Or Zip" },
  { label: "Date/Duration", placeholder: "Anytime/3 Days" },
  { label: "Budget", placeholder: "$0-$3000" },
  { label: "People", placeholder: "5-10" },
];

export function SearchBar() {
  return (
    <form
      role="search"
      className="relative z-10 grid w-full grid-cols-2 border-t border-white/20 bg-white/40 backdrop-blur-md md:grid-cols-[1fr_1fr_1fr_1fr_auto]"
    >
      {searchFields.map((field) => (
        <label
          key={field.label}
          className="flex cursor-text flex-col justify-center border-r border-white/20 px-5 py-3"
        >
          <span className="text-[13px] font-semibold text-white">
            {field.label}
          </span>
          <Input
            type="text"
            placeholder={field.placeholder}
            aria-label={field.label}
            className="mt-0.5 h-auto w-full rounded-none border-0 bg-transparent p-0 text-xs text-white/80 placeholder:text-white/70 focus-visible:border-0 focus-visible:ring-0 md:text-xs dark:bg-transparent"
          />
        </label>
      ))}

      <Button
        type="submit"
        className="col-span-2 h-full min-h-14 rounded-none bg-brand px-12 text-sm font-medium text-brand-foreground hover:bg-brand/90 md:col-span-1 md:min-h-18 md:w-48"
      >
        Search
      </Button>
    </form>
  );
}

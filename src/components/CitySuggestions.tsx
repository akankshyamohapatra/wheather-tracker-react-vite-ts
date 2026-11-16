import { Button } from "@/components/ui/button";
import type { CitySuggestionsProps } from "@/types/types";



function CitySuggestions({
  cities,
  isLoading,
  error,
  hasSearched,
  onSelect,
}: CitySuggestionsProps) {
  if (isLoading) {
    return (
      <div className="mt-2 rounded-lg border bg-white p-4 text-sm text-slate-500">
        Searching cities...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-2 rounded-lg border bg-white p-4 text-sm text-red-500">
        {error}
      </div>
    );
  }

  if (hasSearched && cities.length === 0) {
    return (
      <div className="mt-2 rounded-lg border bg-white p-4 text-sm text-slate-500">
        No cities found.
      </div>
    );
  }

  if (cities.length === 0) {
    return null;
  }

  return (
    <div className="mt-2 w-full rounded-lg border bg-white shadow-sm">
      {cities.map((city) => (
        <Button
          key={city.id}
          variant="ghost"
          onClick={() => onSelect(city)}
          className="h-auto w-full justify-start rounded-none px-4 py-3"
        >
          <div className="flex flex-col items-start">
            <span className="font-medium">
              {city.name}
            </span>

            <span className="text-sm text-slate-500">
              {[city.admin1, city.country]
                .filter(Boolean)
                .join(", ")}
            </span>
          </div>
        </Button>
      ))}
    </div>
  );
}

export default CitySuggestions;
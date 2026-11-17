import { Input } from './ui/input';
import { Button } from './ui/button';
import "../App.css";
import "../index.css";
import { useEffect, useState } from "react";
import CitySuggestions from './CitySuggestions';
import { searchCities } from '@/services/apiService';
import type { City,SearchInputProps } from '@/types/types';




// function SearchInput() {
// return(
// <div className="search-container">

// <Input 
// type="text"
// placeholder="search for a city ..."
// className="search-input"
// />

// <Button className="search-button">
// Search 
// </Button>

// </div>

// )
// }


// export default SearchInput;











function SearchInput({ onCitySelect }: SearchInputProps) {
  const [query, setQuery] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const [searchCount, setSearchCount] = useState(0);

  const [cities, setCities] = useState<City[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const [hasSearched, setHasSearched] = useState(false);

  // Search cities with debounce
  useEffect(() => {
    if (!searchQuery.trim()) {
      setCities([]);
      setError("");
      setIsLoading(false);
      setHasSearched(false);
      return;
    }

    let ignore = false;

    const timeoutId = setTimeout(async () => {
      try {
        setIsLoading(true);
        setError("");
        setHasSearched(false);

        const results = await searchCities(searchQuery.trim());

        if (!ignore) {
          setCities(results);
          setHasSearched(true);
        }
      } catch {
        if (!ignore) {
          setError("Unable to search cities. Please try again.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }, 500);

    return () => {
      ignore = true;
      clearTimeout(timeoutId);
    };
  }, [searchQuery, searchCount]);

  // Handle input changes
  function handleChange(value: string) {
    setQuery(value);
    setSearchQuery("");
    setCities([]);
    setError("");
    setHasSearched(false);
  }

  // Handle city selection
  function handleCitySelect(city: City) {
    setQuery(city.name);
    setSearchQuery("");
    setCities([]);
    setHasSearched(false);

    onCitySelect(city);
  }

  // Handle search button
  function handleSearch() {
    if (!query.trim()) {
      return;
    }


    setSearchQuery(query.trim());
    setSearchCount((prev) => prev + 1);

    // The automatic debounced search handles the API request.
  }

  return (
    <div className="relative w-full">

      <div className="flex w-full gap-2">
        <Input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={(event) => handleChange(event.target.value)}
          className="h-12"
        />

        <Button
          className="h-12 px-6"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>

      {query.trim() && (
        <CitySuggestions
          cities={cities}
          isLoading={isLoading}
          error={error}
          hasSearched={hasSearched}
          onSelect={handleCitySelect}
        />
      )}

    </div>
  );
}

export default SearchInput;
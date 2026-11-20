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











function SearchInput({ onCitySelect, onSearchChange }: SearchInputProps) {
  const [query, setQuery] = useState("");

  const [cities, setCities] = useState<City[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const [hasSearched, setHasSearched] = useState(false);

  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);

  // Search cities with debounce
  useEffect(() => {
    if (!query.trim()) {
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

        const results = await searchCities(query.trim());

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
  }, [query]);

  // Handle input changes
  function handleChange(value: string) {
    setQuery(value);
    setCities([]);
    setError("");
    setHasSearched(false);
    setIsSuggestionsOpen(true);

    //onSearchChange();
  }

  // Handle city selection
  function handleCitySelect(city: City) {
    setQuery(city.name);
    setCities([]);
    setHasSearched(false);
    setIsSuggestionsOpen(false);

    onCitySelect(city);
  }

 

  return (
    <div className="relative w-full">

      <div className="flex w-full gap-2">
        <Input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={(event) => handleChange(event.target.value)}
          onFocus={() => {setIsSuggestionsOpen(true);
                          onSearchChange();
                          }}
          onClick={() => setIsSuggestionsOpen(true)}
          className="h-12"
        />

       
      </div>

      {isSuggestionsOpen && query.trim() && (
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
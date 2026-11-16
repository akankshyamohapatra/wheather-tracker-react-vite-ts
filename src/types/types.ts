
export interface City {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country: string;
    admin1?: string;
  }
  
  export interface GeocodingResponse {
    results?: City[];
  }
  
  export interface CurrentWeather {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    weather_code: number;
    wind_speed_10m: number;
  }
  
  export interface WeatherResponse {
    latitude: number;
    longitude: number;
    current: CurrentWeather;
  }

  export interface CitySuggestionsProps {
    cities: City[];
    isLoading: boolean;
    error: string;
    hasSearched: boolean;
    onSelect: (city: City) => void;
  }

  export interface WeatherCardProps {
    city: City;
    weather: WeatherResponse;
  }

  export interface SearchInputProps {
    onCitySelect: (city: City) => void;
  }
  
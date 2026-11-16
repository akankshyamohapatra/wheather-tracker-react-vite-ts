import type { City, GeocodingResponse, WeatherResponse } from "@/types/types";



//function to search for cities
export async function searchCities (cityName: string): Promise<City[]> {

const params = new URLSearchParams({

name: cityName,
count: "5",
language: "en",
format: "json",

})



const response = await fetch(

    `https://geocoding-api.open-meteo.com/v1/search?${params}`
);


if(!response.ok){
    throw new Error("Failed to fetch cities");
}


const data: GeocodingResponse = await response.json();


return data.results ?? [];


}





//function to fetch current wheather
export async function getCurrentWeather(
    latitude: number, 
    longitude: number): Promise<WeatherResponse> {


const params = new URLSearchParams({
   latitude: String(latitude),
   longitude: String(longitude),
   current: [
    "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "is_day",
      "weather_code",
      "wind_speed_10m",
   ]. join(","),
});


const response = await fetch (`https://api.open-meteo.com/v1/forecast?${params}`);

if(!response.ok){
    throw new Error("Failed to fetch weather")
}

const data: WeatherResponse = await response.json();

return data;

    }
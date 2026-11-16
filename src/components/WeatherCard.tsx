import { Card,
    CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
 } from "./ui/card";

 import type {  WeatherCardProps } from "@/types/types";
  
 
  
  function WeatherCard({ city, weather }: WeatherCardProps) {
    const current = weather.current;
  
    return (
      <Card className="mt-8 w-full">
        <CardHeader>
          <CardTitle>
            {city.name}, {city.country}
          </CardTitle>
  
          <CardDescription>
            {city.admin1 ? `${city.admin1} · ` : ""}
            Current weather
          </CardDescription>
        </CardHeader>
  
        <CardContent>
          <div className="mb-6">
            <h2 className="text-5xl font-bold text-slate-900">
              {Math.round(current.temperature_2m)}°C
            </h2>
  
            <p className="mt-2 text-slate-500">
              Feels like {Math.round(current.apparent_temperature)}°C
            </p>
          </div>
  
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm text-slate-500">Humidity</p>
              <p className="text-lg font-semibold">
                {current.relative_humidity_2m}%
              </p>
            </div>
  
            <div>
              <p className="text-sm text-slate-500">Wind speed</p>
              <p className="text-lg font-semibold">
                {current.wind_speed_10m} km/h
              </p>
            </div>
  
            <div>
              <p className="text-sm text-slate-500">Condition code</p>
              <p className="text-lg font-semibold">
                {current.weather_code}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  export default WeatherCard;
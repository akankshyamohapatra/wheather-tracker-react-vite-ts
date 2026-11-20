import { useState } from 'react'
import './App.css'
import './index.css'
import SearchInput from './components/SearchInput'
import WeatherCard from './components/WeatherCard'
import { getCurrentWeather } from './services/apiService'
import type { City, WeatherResponse } from './types/types'




// function App() {
  

//   return (
//     //body
//     <div className="bg-black min-h-screen flex justify-center items-center">  
//     <div className="min-h-screen bg-[#3c3b3b] p-6 border-green-600 w-[800px]">
//      <header className="max-w-3xl h-[100px] flex flex-col justify-center items-center">
//       <h1 style={{fontSize: '50px', color: 'white',marginBottom: '10px'}}>Weather Tracker</h1>

// <p style={{fontSize: '15px', color: 'white'}}>Check the current weather in your city</p>


      
// </header>

// <div className="mt-8">
//   <SearchInput/>
// </div>
//     </div>
//     </div>
//   )
// }

// export default App






function App() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const [weather, setWeather] = useState<WeatherResponse | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleCitySelect(city: City) {
    setSelectedCity(city);
    setWeather(null);
    setError("");
    setIsLoading(true);

    try {
      const data = await getCurrentWeather(
        city.latitude,
        city.longitude
      );

      setWeather(data);
    } catch {
      setError("Unable to fetch weather. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <main className="mx-auto max-w-3xl">
        <header>
          <h1 className="text-3xl font-bold text-slate-900">
            Weather Tracker
          </h1>

          <p className="mt-2 text-slate-600">
            Check the current weather in your city
          </p>
        </header>

        <div className="mt-8">
          <SearchInput onCitySelect={handleCitySelect} />
        </div>

        {isLoading && (
          <p className="mt-6 text-center text-slate-500">
            Fetching weather...
          </p>
        )}

        {error && (
          <p className="mt-6 text-center text-red-500">
            {error}
          </p>
        )}

        {selectedCity && weather && (
          <WeatherCard
            city={selectedCity}
            weather={weather}
          />
        )}
      </main>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import SearchInput from "./components/SearchInput";
import WeatherCard from "./components/WeatherCard";
import ToggleSwitch from "./components/ToggleSwitch";
import "./index.css";

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [isTomorrow, setIsTomorrow] = useState(false);
    const [showToggle, setShowToggle] = useState(false);
    const [city, setCity] = useState("");
    const [localizedCity, setLocalizedCity] = useState("");
    const [searchPerformed, setSearchPerformed] = useState(false); // Додаємо стан, який визначає, чи було здійснено пошук

    useEffect(() => {
        if (city && searchPerformed) {
            fetchWeather(city, isTomorrow);
        }
    }, [isTomorrow]);

    const fetchWeather = async (selectedCity, day) => {
      if (!selectedCity) return;
  
      console.log("Fetching weather for:", selectedCity, "Day:", day ? "Tomorrow" : "Today");
  
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      let userInputCity = selectedCity; // Зберігаємо оригінальне введене місто
      let localizedCity = selectedCity; // Початкове значення, що оновиться, якщо буде локалізоване значення
  
      try {
          const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${selectedCity}&limit=1&appid=${apiKey}&lang=uk`;
          const geoResponse = await fetch(geoUrl);
          const geoData = await geoResponse.json();
  
          if (geoData.length > 0 && geoData[0].local_names?.uk) {
              localizedCity = geoData[0].local_names.uk; // Отримуємо локалізовану назву
          }
      } catch (error) {
          console.error("Error fetching city name:", error);
      }
  
      let url = day
          ? `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${apiKey}&units=metric&lang=uk`
          : `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=metric&lang=uk`;
  
      try {
          const response = await fetch(url);
          const data = await response.json();
          console.log("API Response:", data);
  
          setSearchPerformed(true); // Підтверджуємо, що пошук було виконано
  
          if (data.cod !== 200 && data.cod !== "200") {
              console.error("Помилка API:", data.message);
              setWeatherData(null);
              return;
          }
  
          let newWeatherData = {};
          if (!day) {
              newWeatherData = {
                  city: selectedCity.match(/[а-яА-ЯёЁіІїЇєЄ]/) ? localizedCity : userInputCity, // Відображаємо введену мову
                  temperature: Math.round(data.main.temp),
                  description: data.weather[0].description,
                  humidity: data.main.humidity,
                  pressure: data.main.pressure,
                  windSpeed: data.wind.speed,
                  icon: data.weather[0].icon
              };
          } else {
              const tomorrowDate = new Date(Date.now() + 86400000).toISOString().split("T")[0];
              const weatherEntry = data.list.find(entry => entry.dt_txt.includes(tomorrowDate));
  
              if (!weatherEntry) {
                  setWeatherData(null);
                  return;
              }
  
              newWeatherData = {
                  city: selectedCity.match(/[а-яА-ЯёЁіІїЇєЄ]/) ? localizedCity : userInputCity, // Відображаємо введену мову
                  temperature: Math.round(weatherEntry.main.temp),
                  description: weatherEntry.weather[0].description,
                  humidity: weatherEntry.main.humidity,
                  pressure: weatherEntry.main.pressure,
                  windSpeed: weatherEntry.wind.speed,
                  icon: weatherEntry.weather[0].icon
              };
          }
  
          setWeatherData(newWeatherData);
          setShowToggle(true);
      } catch (err) {
          console.error("API Error:", err);
          setWeatherData(null);
      }
  };
  

    return (
        <div className="container">
            <h1 className="title">
                GetWeather <span className="yellow">☀️</span>
            </h1>
            <SearchInput setCity={setCity} fetchWeather={fetchWeather} />
            {searchPerformed && !weatherData && <p>Місто не знайдено</p>} {/* Відображаємо повідомлення тільки після пошуку */}
            {weatherData && <WeatherCard weather={weatherData} />}
            {showToggle && (
                <ToggleSwitch
                    isTomorrow={isTomorrow}
                    setIsTomorrow={(value) => {
                        setIsTomorrow(value);
                        fetchWeather(city, value);
                    }}
                />
            )}
        </div>
    );
}

export default App;

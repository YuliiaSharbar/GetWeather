import React, { useState, useEffect } from "react";
import SearchInput from "./components/SearchInput";
import WeatherCard from "./components/WeatherCard";
import ToggleSwitch from "./components/ToggleSwitch";
import "./index.css";

function App() {
    const [weatherData, setWeatherData] = useState(null); // Зберігає інформацію про погоду
    const [isTomorrow, setIsTomorrow] = useState(false); // Визначає, чи показувати погоду на завтра
    const [showToggle, setShowToggle] = useState(false); // Відповідає за відображення тоглу
    const [city, setCity] = useState(""); // Зберігає введене місто
    const [localizedCity, setLocalizedCity] = useState(""); // Зберігає назву міста українською або англійською
    const [searchPerformed, setSearchPerformed] = useState(false); // Додаємо стан, який визначає, чи було здійснено пошук

    useEffect(() => {
        if (city && searchPerformed) {
            fetchWeather(city, isTomorrow); // Завантажуємо погоду при зміні тоглу
        }
    }, [isTomorrow]);

    const fetchWeather = async (selectedCity, day) => {
        if (!selectedCity) return; // Якщо місто не введено припиняємо виконання функції
    
        console.log("Fetching weather for:", selectedCity, "Day:", day ? "Tomorrow" : "Today");
    
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        let userInputCity = selectedCity;
        let localizedCity = selectedCity;
    
        try {
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${selectedCity}&limit=1&appid=${apiKey}&lang=uk`;
            const geoResponse = await fetch(geoUrl);
            const geoData = await geoResponse.json();
    
            if (geoData.length > 0 && geoData[0].local_names?.uk) {
                localizedCity = geoData[0].local_names.uk;
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
    
            setSearchPerformed(true);
    
            if (data.cod !== 200 && data.cod !== "200") {
                console.error("Помилка API:", data.message);
                setWeatherData(null);
                setShowToggle(false); // ❌ Ховаємо тумблер, якщо місто не знайдено
                return;
            }
    
            let newWeatherData = {};
            if (!day) {
                newWeatherData = {
                    city: selectedCity.match(/[а-яА-ЯёЁіІїЇєЄ]/) ? localizedCity : userInputCity,
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
                    setShowToggle(false); // ❌ Ховаємо тумблер, якщо на завтра немає даних
                    return;
                }
    
                newWeatherData = {
                    city: selectedCity.match(/[а-яА-ЯёЁіІїЇєЄ]/) ? localizedCity : userInputCity,
                    temperature: Math.round(weatherEntry.main.temp),
                    description: weatherEntry.weather[0].description,
                    humidity: weatherEntry.main.humidity,
                    pressure: weatherEntry.main.pressure,
                    windSpeed: weatherEntry.wind.speed,
                    icon: weatherEntry.weather[0].icon
                };
            }
    
            setWeatherData(newWeatherData);
            setShowToggle(true); // ✅ Показуємо тумблер тільки якщо погода знайдена
        } catch (err) {
            console.error("API Error:", err);
            setWeatherData(null);
            setShowToggle(false); // ❌ Ховаємо тумблер у разі помилки API
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

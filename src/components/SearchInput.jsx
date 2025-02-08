import React, { useState } from "react";
import axios from "axios";

function SearchInput({ setWeatherData, setShowToggle, isTomorrow }) {
    const [city, setCity] = useState("");

    const fetchWeather = async (selectedCity = city, day = isTomorrow) => {
        if (!selectedCity) return;

        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        let url = day
            ? `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${apiKey}&units=metric&lang=uk`
            : `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=metric&lang=uk`;

        try {
            const response = await axios.get(url);
            if (!response.data) return;

            let newWeatherData = {};
            if (!day) {
                newWeatherData = {
                    city: selectedCity, // Використовуємо введене місто
                    temperature: Math.round(response.data.main.temp),
                    description: response.data.weather[0].description,
                    humidity: response.data.main.humidity,
                    pressure: response.data.main.pressure,
                    windSpeed: response.data.wind.speed,
                    icon: response.data.weather[0].icon
                };
            } else {
                const tomorrowDate = new Date(Date.now() + 86400000).toISOString().split("T")[0];
                const currentHour = new Date().getHours();

                const weatherEntry = response.data.list.find(entry => {
                    const entryHour = new Date(entry.dt * 1000).getHours();
                    return entry.dt_txt.includes(tomorrowDate) && entryHour === currentHour;
                });

                if (!weatherEntry) return;

                newWeatherData = {
                    city: selectedCity,
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
            console.error("API Error:", err.response ? err.response.data : err);
        }
    };

    return (
        <div className="search-input">
            <input
                type="text"
                name="city"
                id="city"
                placeholder="Введіть місто"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={() => fetchWeather(city)}>Пошук</button>
        </div>
    );
}

export default SearchInput;

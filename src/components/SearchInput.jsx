import React, { useState } from "react";
import axios from "axios";

function SearchInput({ setWeatherData }) {
  const [city, setCity] = useState("");

  const handleSearch = async () => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY; // Отримуємо API-ключ з .env файлу
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=uk`; // URL запиту

    try {
      const response = await axios.get(url); // Виконуємо запит до API
      const data = response.data; // Отримуємо дані від API
      setWeatherData({
        city: data.name, // Місто
        temperature: Math.round(data.main.temp), // 
        description: data.weather[0].description, // Опис погоди
      });
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="search-input">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)} // Оновлення введеного міста
      />
      <button onClick={handleSearch}>Search</button> {/* Кнопка для пошуку */}
    </div>
  );
}

export default SearchInput;
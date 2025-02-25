import React, { useState } from "react";

function SearchInput({ setCity, fetchWeather }) {
    const [inputCity, setInputCity] = useState("");

     // Функція, яка викликається при натисканні кнопки "Пошук"
    const handleSearch = () => {
        if (!inputCity) return; // Якщо нічого не введено, зупиняємось
        setCity(inputCity); // Оновлюємо стан міста
        fetchWeather(inputCity, false); // Спочатку шукаємо погоду на сьогодні
    };

    return (
        <div className="search-input">
            <input
                type="text"
                name="city"
                placeholder="Введіть місто"
                value={inputCity}
                onChange={(e) => setInputCity(e.target.value)}
            />
            <button onClick={handleSearch}>Пошук</button>
        </div>
    );
}

export default SearchInput;

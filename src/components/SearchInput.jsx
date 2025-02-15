import React, { useState } from "react";

function SearchInput({ setCity, fetchWeather }) {
    const [inputCity, setInputCity] = useState("");

    const handleSearch = () => {
        if (!inputCity) return;
        setCity(inputCity);
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

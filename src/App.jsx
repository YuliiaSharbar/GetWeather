import React, { useState } from "react";
import Header from "./components/Header.jsx";
import ToggleSwitch from "./components/ToggleSwitch.jsx";
import SearchInput from "./components/SearchInput.jsx";
import WeatherCard from "./components/WeatherCard.jsx";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [selectedDay, setSelectedDay] = useState("today");

  return (
    <div className="app">
      <Header />
      <ToggleSwitch selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <SearchInput setWeatherData={setWeatherData} />
      {weatherData && <WeatherCard weatherData={weatherData} />}
    </div>
  );
}

export default App;


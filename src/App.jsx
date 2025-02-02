import { useState } from 'react'
import Header from "./components/Header"; 
import SearchInput from "./components/SearchInput"; 
import WeatherCard from "./components/WeatherCard"; 
import ToggleSwitch from "./components/ToggleSwitch";

import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [selectedDay, setSelectedDay] = useState("today");

  return (
    <div className="app">
      <Header />
      <SearchInput setWeatherData={setWeatherData} />
      {weatherData && <WeatherCard weatherData={weatherData} />}
      <ToggleSwitch selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
    </div>
  );
}



  return (
    <>
      <div>
  
      </div>
   
    </>
  )


export default App

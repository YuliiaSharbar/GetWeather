import React from "react";
import { WbSunny } from "@mui/icons-material";

function Header() {
  return (
    <header className="header">
      <WbSunny style={{ color: "#FFA500", fontSize: "32px" }} />
      <h1>GetWeather ☀️</h1>
    </header>
  );
}

export default Header;
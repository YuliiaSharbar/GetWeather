import React from "react";
import { WbSunny } from "@mui/icons-material"; // Підключаємо іконку "сонця" з бібліотеки MUI

function Header() {
    return (
        <header className="header">
            <h1 className="title">
                GetWeather <WbSunny style={{ color: "#FFA500", fontSize: "48px" }} />
            </h1>
        </header>
    );
}

export default Header;

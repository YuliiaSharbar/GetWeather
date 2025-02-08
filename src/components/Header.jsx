import React from "react";
import { WbSunny } from "@mui/icons-material";

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

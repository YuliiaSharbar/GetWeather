import React from "react";

function ToggleSwitch({ isTomorrow, setIsTomorrow }) {
    const handleToggle = () => {
        console.log("Тогл перемкнуто:", !isTomorrow ? "Завтра" : "Сьогодні");
        setIsTomorrow(!isTomorrow);
    };

    return (
        <div className="toggle-switch">
            <label>Today</label>
            <input
                type="checkbox"
                id="toggle-weather"
                checked={isTomorrow}
                onChange={handleToggle}
            />
            <label>Tomorrow</label>
        </div>
    );
}

export default ToggleSwitch;

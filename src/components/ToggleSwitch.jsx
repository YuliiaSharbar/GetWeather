import React from "react";

function ToggleSwitch({ isTomorrow, setIsTomorrow }) {
    const handleToggle = () => {
        console.log("Тогл перемкнуто:", !isTomorrow ? "Завтра" : "Сьогодні");
        setIsTomorrow(!isTomorrow);
    };

    return (
        <div className="toggle-switch">
            <span>Today</span>
            <input
                type="checkbox"
                checked={isTomorrow}
                onChange={handleToggle}
            />
            <span>Tomorrow</span>
        </div>
    );
}

export default ToggleSwitch;

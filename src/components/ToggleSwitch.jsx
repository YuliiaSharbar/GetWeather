import React from "react";

function ToggleSwitch({ selectedDay, setSelectedDay }) {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={selectedDay === "tomorrow"}
          onChange={() => setSelectedDay(selectedDay === "today" ? "tomorrow" : "today")}
        />
        
      </label>
    </div>
  );
}

export default ToggleSwitch;
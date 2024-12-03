import React from "react";
import { useState, useEffect } from "react";

const DaySelector = ({ changeHabits }) => {
  // Function to get current day index
  const getCurrentDayIndex = () => {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    return new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  };

  const [selectedDay, setSelectedDay] = useState(getCurrentDayIndex());

  // Use effect to trigger changeHabits with initial day
  useEffect(() => {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    changeHabits(days[selectedDay].toUpperCase());
  }, []);

  const handleClick = (index, day) => {
    setSelectedDay(index);
    changeHabits(day);
  };

  return (
    <div className="m-5 d-flex justify-content-center">
      {[
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ].map((day, index) => (
        <button
          key={day}
          className={`mx-2 btn rounded-circle fw-bold ${
            selectedDay === index
              ? "text-white border-white"
              : "btn-light text-black"
          }`}
          style={{ width: "60px", height: "60px", fontSize: "24px" }}
          onClick={() => handleClick(index, day.toUpperCase())}
        >
          {day.slice(0, 2)}
        </button>
      ))}
    </div>
  );
};

export default DaySelector;

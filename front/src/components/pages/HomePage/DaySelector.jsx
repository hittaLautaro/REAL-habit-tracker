import React from "react";
import { useState } from "react";

const DaySelector = ({ changeHabits }) => {
  const [selectedDay, setSelectedDay] = useState(null);

  const handleClick = (index, day) => {
    setSelectedDay(index);
    changeHabits(day);
  };

  return (
    <div className="m-5 d-flex justify-content-center">
      {[
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ].map((day, index) => (
        <button
          key={day}
          className={`mx-2 btn rounded-circle fw-bold ${
            selectedDay === index
              ? "btn-dark text-white"
              : "btn-light text-black"
          }`}
          style={{ width: "60px", height: "60px", fontSize: "24px" }}
          onClick={() => handleClick(index, day)}
        >
          {day}
        </button>
      ))}
    </div>
  );
};

export default DaySelector;

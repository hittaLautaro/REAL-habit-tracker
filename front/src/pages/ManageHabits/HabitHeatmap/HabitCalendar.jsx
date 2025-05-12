import React, { useEffect, useState } from "react";
import CompletionService from "../../../services/completionService";

const HabitCalendar = ({ year, habitId }) => {
  const [dataValues, setDataValues] = useState([]);

  const fetchData = async () => {
    if (habitId != -1) {
      const res = await CompletionService.getAllByHabit(year, habitId);
      console.log(res.data);
      setDataValues(res.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [year, habitId]);

  const startingDate = new Date(year, 0, 1);
  const endingDate = new Date(year, 11, 31);
  const daysInMonth = Math.ceil(
    (endingDate - startingDate) / (1000 * 60 * 60 * 24) + 1
  );

  const rows = 7; // 7 days of week
  const columns = Math.ceil(daysInMonth / rows);

  // Create grid cells with day info
  const gridCells = [];

  // Calculate how many empty cells we need based on the day of week of the first date
  const firstDayOfWeek = startingDate.getDay();

  // Add empty cells for proper alignment
  for (let i = 0; i < firstDayOfWeek; i++) {
    gridCells.push({
      isEmpty: true,
      day: null,
    });
  }

  // Add actual date cells
  const calenderGrid = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(startingDate);
    date.setDate(startingDate.getDate() + i);
    return {
      isEmpty: false,
      day: date.toISOString().slice(0, 10),
      dayOfWeek: date.getDay(),
    };
  });

  gridCells.push(...calenderGrid);

  const getColor = (completed) => {
    console.log(completed);
    if (!completed) return "#757575"; // grey
    if (completed === false) return "#ffe890"; // yellow
    return "#68d600"; // green / success
  };

  return (
    <div
      style={{
        display: "grid",
        gap: "4px",
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${columns + 1}, 1fr)`, // was: 1fr
        gridAutoFlow: "column",
        margin: "1rem 0",
        width: "700px",
      }}
    >
      {gridCells.map((cell, index) => {
        if (cell.isEmpty) {
          // Return an empty cell
          return (
            <div
              key={`empty-${index}`}
              style={{
                width: "10px",
                height: "10px",
              }}
            ></div>
          );
        }

        const completed =
          dataValues.find((i) => i.localDate === cell.day)?.completed || false;

        return (
          <div
            key={index}
            className="rounded-sm cursor-pointer"
            title={`${cell.day}`}
            style={{
              backgroundColor: getColor(completed),
              width: "10px",
              height: "10px",
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default HabitCalendar;

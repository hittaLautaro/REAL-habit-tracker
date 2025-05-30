import React, { useState, useContext } from "react";
import HabitCalendar from "./HabitCalendar.jsx";
import { useHabitsOperations } from "../../../../components/hooks/useHabits.js";

const HabitHeatmap = () => {
  const { habits } = useHabitsOperations();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedHabitId, setSelectedHabitId] = useState(-1);
  const [selectedHabitName, setSelectedHabitName] = useState("");

  const years = [2025, 2024, 2022];

  return (
    <section
      className="border-dark border-1 rounded m-3 p-4"
      style={{ backgroundColor: "#151515" }}
    >
      <div className="flex justify-content-between">
        <h3 className="text-neutral-300 mono-500">Daily Habit Completions</h3>

        {/*  Dropdown buttons  */}
        <div className="flex flex-row gap-2">
          <div className="dropdown text-end mb-1">
            <button
              className="btn btn-outline-light dropdown-toggle"
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontWeight: 500,
              }}
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {selectedHabitId != -1
                ? selectedHabitId + " " + selectedHabitName
                : "Select a habit"}
            </button>
            <ul className="dropdown-menu overflow-y-auto max-h-[250px]">
              {habits.map((habit) => (
                <li key={habit.id}>
                  <button
                    className="dropdown-item text-black mono-400"
                    onClick={() => {
                      setSelectedHabitId(habit.id),
                        setSelectedHabitName(habit.name);
                    }}
                  >
                    {habit.id} {habit.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="dropdown text-end mr-1 mb-1">
            <button
              className="btn btn-outline-light dropdown-toggle sans-600"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {selectedYear}
            </button>
            <ul className="dropdown-menu">
              {years.map((year) => (
                <li key={year}>
                  <button
                    className="dropdown-item text-black mono-600"
                    onClick={() => setSelectedYear(year)}
                  >
                    {year}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <HabitCalendar year={selectedYear} habitId={selectedHabitId} />
      <div className="d-flex">
        <div className="d-flex align-items-center me-3">
          <div
            style={{
              width: "14px",
              height: "14px",
              backgroundColor: "#68d600",
              borderRadius: "2px",
              marginRight: "4px",
            }}
          ></div>
          <small className="text-neutral-300 mono-400">Completed</small>
        </div>
        <div className="d-flex align-items-center me-3">
          <div
            style={{
              width: "14px",
              height: "14px",
              backgroundColor: "#ffe890",
              borderRadius: "2px",
              marginRight: "4px",
            }}
          ></div>
          <small className="text-neutral-300 mono-400">None completed</small>
        </div>
        <div className="d-flex align-items-center">
          <div
            style={{
              width: "14px",
              height: "14px",
              backgroundColor: "#757575",
              borderRadius: "2px",
              marginRight: "4px",
            }}
          ></div>
          <small className="text-neutral-300 mono-400">None to complete</small>
        </div>
      </div>
    </section>
  );
};

export default HabitHeatmap;

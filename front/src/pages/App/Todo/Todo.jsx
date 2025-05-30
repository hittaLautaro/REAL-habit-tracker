import { useState } from "react";
import AddHabitModal from "../../../components/Global/AddHabitModal";
import DroppableHabitList from "./DroppableHabitList";

const Todo = () => {
  const todaysDate = new Date();
  const todayDayString = todaysDate
    .toLocaleDateString("en-US", { weekday: "long" })
    .toUpperCase();

  const [selectedDay, setSelectedDay] = useState(todayDayString);

  const daysOfWeek = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  const daysOfWeek2 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  return (
    <div>
      <div className="flex align-items-center justify-content-between mx-3">
        <h1 className="mx-1 mb-4 mt-4 mono-600 text-neutral-300 text-3xl">
          Daily Habits
        </h1>
        <div className="flex justify-content-center mx-3 ">
          <div className="flex gap-1 p-1 bg-neutral-900 rounded-md !border !border-neutral-800">
            {daysOfWeek.map((day, index) => (
              <button
                key={day}
                onClick={() => handleDayClick(day)}
                className={`px-3 py-1.5 text-sm mono-300 rounded transition-all duration-200 ${
                  selectedDay === day
                    ? "bg-neutral-700 text-white"
                    : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800"
                }`}
              >
                {daysOfWeek2[index]}
              </button>
            ))}
          </div>
        </div>

        <AddHabitModal />
      </div>

      <div className="h-[calc(100vh-350px)] mx-3 mt-1 mb-4 overflow-y-auto !border !border-neutral-800 rounded-sm">
        <DroppableHabitList today={selectedDay} droppableId="todo" />
      </div>
    </div>
  );
};

export default Todo;

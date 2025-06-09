import { useEffect, useState } from "react";
import AddHabitModal from "../../../components/Global/AddHabitModal";
import { useHabitsOperations } from "../../../components/hooks/useHabits";
import Skeleton from "../../../components/Global/Skeleton";
import HabitList from "./HabitList";
import OrderHabitModal from "./OrderHabitsModal";

const Todo = () => {
  const todaysDate = new Date();
  const todayDayString = todaysDate
    .toLocaleDateString("en-US", { weekday: "long" })
    .toUpperCase();

  const { habits, isLoading } = useHabitsOperations();
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

  if (isLoading) {
    return (
      <div
        className="border border-dark rounded mt-4"
        style={{ backgroundColor: "#151515" }}
      >
        <div className="d-flex align-items-center justify-content-between my-4">
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-10 w-96" />
          <Skeleton className="h-10 w-10" />
        </div>

        <div className="h-[calc(100vh-350px)]  my-2 rounded-sm !border !border-neutral-800">
          {[...Array(1)].map((_, i) => (
            <div
              key={i}
              className="d-flex align-items-center justify-content-between mb-3 m-2 p-3 border border-dark rounded"
            >
              <div className="d-flex align-items-center gap-3">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        className="col-sm !border !border-neutral-800 mt-4 rounded"
        style={{ backgroundColor: "#151515" }}
      >
        <div className="flex align-items-center justify-content-between mx-3">
          <h1 className="mx-1 mb-4 mt-4 mono-600 text-neutral-300 text-xl">
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

          <div className="flex flex-row">
            <AddHabitModal />
            <OrderHabitModal day={selectedDay} habits={habits} />
          </div>
        </div>

        <div className="h-[calc(100vh-350px)] mx-3 mt-1 mb-4 overflow-y-auto !border !border-neutral-800 rounded-sm">
          <HabitList habits={habits} today={selectedDay} />
        </div>
      </div>
    </div>
  );
};

export default Todo;

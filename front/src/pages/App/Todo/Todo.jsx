import { useEffect, useContext } from "react";
import { HabitContext } from "../../../components/contexts/HabitContext";
import AddHabitModal from "../../../components/global/AddHabitModal";
import DroppableHabitList from "./DroppableHabitList";

const Todo = () => {
  const todaysDate = new Date();
  const todayDayString = todaysDate
    .toLocaleDateString("en-US", { weekday: "long" })
    .toUpperCase();

  return (
    <div>
      <div className="flex align-items-center justify-content-between mx-3">
        <div className="flex align-items-center">
          <h1 className="mx-1 mb-4 mt-4 mono-600 text-neutral-300 text-3xl">
            Daily Habits
          </h1>
          <h2 className="ml-6 mt-2.5 mono-400 text-neutral-500 text-2xl">
            {"( "}
            {todayDayString}
            {" )"}
          </h2>
        </div>

        <AddHabitModal />
      </div>

      <div className="h-[calc(100vh-300px)] mx-3 mt-1 mb-4 overflow-y-auto !border !border-neutral-800 rounded-sm">
        <DroppableHabitList today={todayDayString} droppableId="todo" />
      </div>
    </div>
  );
};

export default Todo;

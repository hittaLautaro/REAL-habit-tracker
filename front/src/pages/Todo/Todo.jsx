import { useEffect, useContext } from "react";
import { HabitContext } from "../../components/contexts/HabitContext";
import AddHabitModal from "../../components/global/AddHabitModal";
import DroppableHabitList from "./DroppableHabitList";

const Todo = () => {
  return (
    <div>
      <div className="flex align-items-center justify-content-between mx-3">
        <h1 className="mx-4 mb-4 mt-4 mono-600 text-neutral-300 text-3xl">
          Daily Habits
        </h1>
        <AddHabitModal />
      </div>

      <div className="h-[calc(100vh-300px)] mx-3 mt-2 mb-4 overflow-y-scroll">
        <DroppableHabitList droppableId="todo" />
      </div>
    </div>
  );
};

export default Todo;

import { useEffect, useContext } from "react";
import { HabitContext } from "../../components/contexts/HabitContext";
import AddHabitModal from "../../components/global/AddHabitModal";
import DroppableHabitList from "./DroppableHabitList";

const Todo = ({ habits, changeList }) => {
  // const { deleteAllHabits, updateHabitsOrdersAndCompletions } =
  //   useContext(HabitContext);

  return (
    <div>
      <div className="flex align-items-center justify-content-between mx-3">
        <h1 className="m-4 sans-600">Daily Habits</h1>
        <AddHabitModal />
      </div>

      <div className="h-[calc(100vh-300px)] mx-3 mb-5 overflow-y-scroll">
        <DroppableHabitList droppableId="todo" habits={habits} />
      </div>
    </div>
  );
};

export default Todo;

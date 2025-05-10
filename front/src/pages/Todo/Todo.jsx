import { useEffect, useContext } from "react";
import { HabitContext } from "../../components/contexts/HabitContext";
import AddHabitModal from "../../components/global/AddHabitModal";
import DroppableHabitList from "./DroppableHabitList";

const Todo = ({ habits, changeList }) => {
  // const { deleteAllHabits, updateHabitsOrdersAndCompletions } =
  //   useContext(HabitContext);

  return (
    <div>
      <div className="flex align-items-center">
        <h1 className="m-4 sans-600">Daily Habits</h1>
        <AddHabitModal />
      </div>

      <div className="habit-list mx-3">
        <DroppableHabitList droppableId="todo" habits={habits} />
      </div>
    </div>
  );
};

export default Todo;

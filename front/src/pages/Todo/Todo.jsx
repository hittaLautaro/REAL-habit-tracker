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
        <h3 className="m-4 custom-font">Your todo</h3>
        <AddHabitModal />
      </div>

      <div className="habit-list">
        <DroppableHabitList droppableId="todo" habits={habits} />
      </div>
    </div>
  );
};

export default Todo;

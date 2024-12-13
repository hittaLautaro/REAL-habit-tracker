import { useEffect, useContext } from "react";
import { HabitContext } from "../../contexts/HabitContext";
import Swal from "sweetalert2";
import AddHabitModal from "../../global/AddHabitModal";
import DroppableHabitList from "./DroppableHabitList";

const Todo = ({ habits, changeList }) => {
  const { deleteAllHabits, updateHabitsOrdersAndCompletions } =
    useContext(HabitContext);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <h3 className="m-4 custom-font">to-do</h3>
        <div>
          <AddHabitModal />
          <button className="me-3 btn btn-outline-light " onClick={changeList}>
            <i className="bi bi-arrow-right me-2"></i>
            <span className="custom-font">completed</span>
          </button>
        </div>
      </div>

      <div className="habit-list">
        <DroppableHabitList droppableId="todo" habits={habits} />
      </div>
    </div>
  );
};

export default Todo;

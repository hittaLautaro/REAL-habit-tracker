import { useEffect, useContext } from "react";
import { HabitContext } from "../../components/contexts/HabitContext";
import Swal from "sweetalert2";
import AddHabitModal from "../../components/global/AddHabitModal";
import DroppableHabitList from "./DroppableHabitList";
import HabitList from "./HabitList";

const Todo = ({ habits, changeList }) => {
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <h3 className="m-4 custom-font">completed</h3>
        <div>
          <AddHabitModal />
          <button className="me-3 btn btn-outline-light " onClick={changeList}>
            <i className="bi bi-arrow-right me-2"></i>
            <span className="custom-font">to-do</span>
          </button>
        </div>
      </div>

      <div className="habit-list">
        <HabitList habits={habits} />
      </div>
    </div>
  );
};

export default Todo;

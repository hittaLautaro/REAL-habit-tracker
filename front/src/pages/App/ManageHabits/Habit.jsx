import { useState } from "react";
import Swal from "sweetalert2";
import UpdateHabitModal from "../../../components/Global/UpdateHabitModal";
import "../../../components/Global/styles.css";
import { useHabitsOperations } from "../../../components/hooks/useHabits.js";

const Habit = ({ habit }) => {
  const { deleteHabit } = useHabitsOperations();

  const [showModal, setShowModal] = useState(false);
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      preConfirm: async () => {
        deleteHabit(habit.id);
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Habit has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleEdit = () => {
    setShowModal(true); // Open the modal by setting the state to true
  };

  return (
    <div className="!border !border-neutral-800 mt-2 rounded custom-min-height ml-2 mb-1 my-1 py-3 text-light d-flex justify-content-between align-items-center transition-all duration-200">
      <div className="ml-3">
        <h4 className="m-0 mono-600">{habit.name}</h4>
        <p className="m-0 mono-400">Frequency: {habit.frequency}</p>
        <p className="m-0 mono-400">
          Days:{" "}
          {habit.activeDayOrders.length > 0
            ? habit.activeDayOrders.map((day) => day.dayOfWeek).join(", ")
            : "None"}
        </p>
      </div>

      {/* Dropdown menu in the top-right */}
      <div className="dropdown text-end mr-2 mb-5">
        <button
          className="btn btn-outline-light dropdown-toggle sans-600"
          type="button"
          id={`dropdownMenuButton-${habit.id}`}
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="bi bi-gear"></i>
        </button>
        <ul
          className="dropdown-menu"
          aria-labelledby={`dropdownMenuButton-${habit.id}`}
        >
          <li>
            <button
              className="dropdown-item text-black mono-600"
              onClick={handleEdit}
            >
              Edit
            </button>
          </li>
          <li>
            <button
              className="dropdown-item text-black mono-600"
              onClick={handleDelete}
            >
              Delete
            </button>
          </li>
        </ul>
      </div>

      {/* Show the UpdateHabitModal when showModal is true */}
      {showModal && (
        <UpdateHabitModal
          habit={habit}
          handleClose={() => setShowModal(false)} // Close the modal when triggered
        />
      )}
    </div>
  );
};

export default Habit;

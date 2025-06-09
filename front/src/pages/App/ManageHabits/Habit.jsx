import { useState } from "react";
import Swal from "sweetalert2";
import UpdateHabitModal from "../../../components/Global/UpdateHabitModal";
import "../../../components/Global/styles.css";
import { useHabitsOperations } from "../../../components/hooks/useHabits.js";

const Habit = ({ habit }) => {
  const { deleteHabit } = useHabitsOperations();

  const dayOrder = {
    monday: 0,
    tuesday: 1,
    wednesday: 2,
    thursday: 3,
    friday: 4,
    saturday: 5,
    sunday: 6,
  };

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
    <div className="!border !border-neutral-800 mt-2 rounded custom-min-height ml-2 mb-1 my-1 py-2 text-light d-flex justify-content-between align-items-center transition-all duration-200">
      <div className="ml-3">
        <h5 className="m-0 mono-300 text-neutral-300 text-1xl mb-2">
          {habit.name}
        </h5>
        <p className="m-0 mono-300 flex flex-row gap-1">
          {habit.activeDayOrders.length > 0 &&
            [...habit.activeDayOrders]
              .sort(
                (a, b) =>
                  dayOrder[a.dayOfWeek.toLowerCase()] -
                  dayOrder[b.dayOfWeek.toLowerCase()]
              )
              .map((day) => (
                <div
                  key={day.dayOfWeek}
                  className="px-2 py-1 rounded-xl text-sm transition-all duration-200 transform bg-neutral-700 hover:bg-neutral-500 text-neutral-100"
                >
                  {day.dayOfWeek.substring(0, 1).toUpperCase() +
                    day.dayOfWeek.substring(1, 3).toLowerCase()}
                </div>
              ))}
        </p>
      </div>

      <div className="dropdown text-end mr-2 mb-5">
        <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i className="bi bi-gear text-neutral-400"></i>
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

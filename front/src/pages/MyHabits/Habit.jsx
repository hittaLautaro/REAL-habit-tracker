import React, { useState, useContext } from "react";
import HabitService from "../../services/habitService";
import Swal from "sweetalert2";
import UpdateHabitModal from "../../components/global/UpdateHabitModal";

import { HabitContext } from "../../components/contexts/HabitContext";

import "../../components/global/styles.css";

const Habit = ({ habit }) => {
  const { deleteHabit, fetchHabits } = useContext(HabitContext);

  const [showModal, setShowModal] = useState(false);

  console.log("Habit component rendered with habit:", habit);

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
    <div
      className="ml-3 rounded custom-min-height mb-1 my-1 py-3 px-2 text-light d-flex justify-content-between align-items-center transition-all duration-200"
      style={{
        backgroundColor: "#121212",
        borderColor: "#222",
        borderStyle: "solid",
        borderWidth: "1px",
      }}
    >
      <div className="ml-3">
        <h4 className="m-0 sans-600">{habit.name}</h4>
        <p className="m-0 sans-600">Frequency: {habit.frequency}</p>
        <p className="m-0 sans-600">
          Days:{" "}
          {habit.activeDayOrders.length > 0
            ? habit.activeDayOrders.map((day) => day.dayOfWeek).join(", ")
            : "None"}
        </p>
      </div>

      {/* Dropdown menu in the top-right */}
      <div className="dropdown text-end">
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
            <button className="dropdown-item sans-600" onClick={handleEdit}>
              Edit
            </button>
          </li>
          <li>
            <button className="dropdown-item sans-600" onClick={handleDelete}>
              Delete
            </button>
          </li>
        </ul>
      </div>

      {/* Show the UpdateHabitModal when showModal is true */}
      {showModal && (
        <UpdateHabitModal
          habit={habit}
          fetchHabits={fetchHabits}
          handleClose={() => setShowModal(false)} // Close the modal when triggered
        />
      )}
    </div>
  );
};

export default Habit;

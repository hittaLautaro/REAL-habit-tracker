import React, { useState } from "react";
import HabitService from "../../utils/habitService";
import Swal from "sweetalert2";
import UpdateHabitModal from "../../global/UpdateHabitModal";

import "../../global/styles.css";

const Habit = ({ habit, fetchHabits }) => {
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
        HabitService.deleteById(habit.id).then(() => {
          fetchHabits();
        });
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
    <div className="border border-dark rounded bg-black text-light m-3 p-3 d-flex justify-content-between align-items-center">
      <div>
        <h4 className="m-0 custom-font">
          {habit.isCompleted ? "✔️" : "❌"} {habit.name}
        </h4>
        <p className="m-0 custom-font">
          {habit.frequency} --- {habit.activeDays.toString()}
        </p>
      </div>

      {/* Dropdown menu in the top-right */}
      <div className="dropdown text-end">
        <button
          className="btn btn-outline-light dropdown-toggle custom-font"
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
            <button className="dropdown-item custom-font" onClick={handleEdit}>
              Edit
            </button>
          </li>
          <li>
            <button
              className="dropdown-item custom-font"
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
          fetchHabits={fetchHabits}
          handleClose={() => setShowModal(false)} // Close the modal when triggered
        />
      )}
    </div>
  );
};

export default Habit;

import React, { useState, useContext } from "react";
import HabitService from "../../utils/habitService.js";
import Swal from "sweetalert2";
import UpdateHabitModal from "../../global/UpdateHabitModal.jsx";
import { HabitContext } from "../../contexts/HabitContext.jsx";
import { Draggable } from "@hello-pangea/dnd";

import "../../global/styles.css";

const Habit = ({ habit }) => {
  const { deleteHabit, updateHabit, addHabit } = useContext(HabitContext);

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

  const handleComplete = async () => {
    updateHabit(habit.id, {
      isCompleted: habit.isCompleted == null ? true : !habit.isCompleted,
    });
  };

  const handleDuplicate = async () => {
    addHabit({
      name: habit.name,
      frequency: habit.frequency,
      activeDays: habit.activeDays,
    });
  };

  const handleEdit = () => {
    setShowModal(true);
  };

  return (
    <div className="border border-dark rounded custom-min-height bg-black text-light m-3 p-3 d-flex justify-content-between align-items-center">
      <div>
        <h4 className="m-0 custom-font">{habit.name}</h4>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <button className="btn btn-outline-light custom-font" type="button">
          Nashe
        </button>
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
              <button
                className="dropdown-item custom-font"
                onClick={handleEdit}
              >
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
            <li>
              <button
                className="dropdown-item custom-font"
                onClick={handleComplete}
              >
                {habit.isCompleted ? "Uncheck" : "Check"}
              </button>
            </li>
            <li>
              <button
                className="dropdown-item custom-font"
                onClick={handleDuplicate}
              >
                Duplicate
              </button>
            </li>
          </ul>
        </div>
      </div>

      {showModal && (
        <UpdateHabitModal
          habit={habit}
          handleClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Habit;

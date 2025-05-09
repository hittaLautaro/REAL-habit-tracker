import React, { useState, useContext } from "react";
import HabitService from "../../services/habitService.js";
import Swal from "sweetalert2";
import UpdateHabitModal from "../../components/global/UpdateHabitModal.jsx";
import { HabitContext } from "../../components/contexts/HabitContext.jsx";
import { Draggable } from "@hello-pangea/dnd";

import "../../components/global/styles.css";

const DraggableHabit = ({ habit, index }) => {
  const { deleteHabit, updateHabit, updateIsCompleted, addHabit } =
    useContext(HabitContext);

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
    updateIsCompleted(habit.id, {
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
    <Draggable draggableId={habit.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="habit-item"
        >
          <div className="border border-dark rounded custom-min-height mx-3 my-1 p-4 bg-black text-light d-flex justify-content-between align-items-center">
            <div>
              <h4 className="m-0 custom-font">{habit.name}</h4>
            </div>

            <div className="d-flex align-items-center justify-content-between">
              <button
                className="btn btn-outline-light custom-font mx-3"
                type="button"
                onClick={handleComplete}
              >
                <i className="bi bi-check-lg"></i>
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
        </div>
      )}
    </Draggable>
  );
};

export default DraggableHabit;

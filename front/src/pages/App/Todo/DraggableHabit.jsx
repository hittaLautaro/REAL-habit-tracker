"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import UpdateHabitModal from "../../../components/global/UpdateHabitModal.jsx";
import { Draggable } from "@hello-pangea/dnd";

import "../../../components/global/styles.css";

const DraggableHabit = ({
  habit,
  index,
  onComplete,
  onDelete,
  onUpdate,
  onDuplicate,
}) => {
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
        onDelete();
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
    onComplete();
  };

  const handleDuplicate = async () => {
    onDuplicate();
  };

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleUpdate = (updatedData) => {
    onUpdate(updatedData);
    setShowModal(false);
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
          <div
            className="rounded custom-min-height mb-1 my-1 py-3 px-2 text-light d-flex justify-content-between align-items-center transition-all duration-200"
            style={{
              backgroundColor: habit.isCompleted ? "#151515" : "#121212",
              borderColor: habit.isCompleted ? "#333" : "#222",
              borderStyle: "solid",
              borderWidth: "1px",
            }}
          >
            <div className="d-flex align-items-center">
              <h4
                className={`my-0 ml-3 mono-400 select-none ${
                  habit.isCompleted
                    ? "line-through text-white/20"
                    : "text-white"
                }`}
              >
                {habit.name}
              </h4>
            </div>

            <div className="d-flex align-items-center justify-content-between">
              <button
                className={`btn mx-2 w-8 h-8 d-flex align-items-center justify-content-center ${
                  habit.isCompleted
                    ? "bg-white text-black border-white"
                    : "btn-outline-light"
                }`}
                type="button"
                onClick={handleComplete}
              >
                <i className="bi bi-check-lg text-s"></i>
              </button>
              <div className="dropdown text-end">
                <button
                  className="btn btn-outline-light dropdown-toggle w-12 h-8 d-flex align-items-center justify-content-center"
                  type="button"
                  id={`dropdownMenuButton-${habit.id}`}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-gear text-s"></i>
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby={`dropdownMenuButton-${habit.id}`}
                >
                  <li>
                    <button
                      className="dropdown-item sans-600"
                      onClick={handleEdit}
                    >
                      Edit
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item sans-600"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item sans-600"
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
                handleUpdate={handleUpdate}
              />
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableHabit;

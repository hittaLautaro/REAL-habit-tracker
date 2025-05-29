import { useState } from "react";
import Swal from "sweetalert2";
import UpdateHabitModal from "../../../components/Global/UpdateHabitModal.jsx";
import { Draggable } from "@hello-pangea/dnd";

import "../../../components/Global/styles.css";

const DraggableHabit = ({
  habit,
  index,
  onComplete,
  onDelete,
  onUpdate,
  onDuplicate,
  today,
  isReadOnly = false,
}) => {
  const [showModal, setShowModal] = useState(false);

  const positionForToday = habit.activeDayOrders?.find(
    (entry) => entry.dayOfWeek === today
  )?.position;

  const handleDelete = () => {
    if (isReadOnly) return;

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
    if (isReadOnly) return;
    onComplete();
  };

  const handleDuplicate = async () => {
    if (isReadOnly) return;
    onDuplicate();
  };

  const handleEdit = () => {
    if (isReadOnly) return;
    setShowModal(true);
  };

  const handleUpdate = (updatedData) => {
    onUpdate(updatedData);
    setShowModal(false);
  };

  const getHabitStyles = () => {
    if (isReadOnly) {
      return {
        backgroundColor: "#151515",
        borderColor: "#1a1a1a",
        textColor: "text-white/40",
        strikethrough: false,
      };
    } else {
      return {
        backgroundColor: habit.isCompleted ? "#151515" : "#121212",
        borderColor: habit.isCompleted ? "#333" : "#222",
        textColor: habit.isCompleted ? "text-white/20" : "text-white",
        strikethrough: habit.isCompleted,
      };
    }
  };

  const styles = getHabitStyles();

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
              backgroundColor: styles.backgroundColor,
              borderColor: styles.borderColor,
              borderStyle: "solid",
              borderWidth: "1px",
            }}
          >
            <div className="d-flex align-items-center">
              <h4
                className={`my-0 ml-3 mono-400 select-none ${
                  styles.textColor
                } ${styles.strikethrough ? "line-through" : ""}`}
              >
                {habit.name}
              </h4>
            </div>

            <div className="d-flex align-items-center justify-content-between">
              <button
                className={`btn mx-2 w-8 h-8 d-flex align-items-center justify-content-center ${
                  isReadOnly
                    ? "btn-outline-secondary opacity-50"
                    : habit.isCompleted
                    ? "bg-white text-black border-white"
                    : "btn-outline-light"
                }`}
                type="button"
                onClick={handleComplete}
                disabled={isReadOnly}
                style={{ cursor: isReadOnly ? "not-allowed" : "pointer" }}
              >
                <i className="bi bi-check-lg text-s"></i>
              </button>

              <div className="dropdown text-end">
                <button
                  className={`btn dropdown-toggle w-12 h-8 d-flex align-items-center justify-content-center ${
                    isReadOnly
                      ? "btn-outline-secondary opacity-50"
                      : "btn-outline-light"
                  }`}
                  type="button"
                  id={`dropdownMenuButton-${habit.id}`}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  disabled={isReadOnly}
                  style={{ cursor: isReadOnly ? "not-allowed" : "pointer" }}
                >
                  <i className="bi bi-gear text-s"></i>
                </button>
                {!isReadOnly && (
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
                )}
              </div>
            </div>
            {showModal && !isReadOnly && (
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

import React from "react";
import HabitService from "../../utils/habitService";
import Swal from "sweetalert2";
import UpdateHabitModal from "./UpdateHabitModal.jsx";

const Habit = ({ habit, fetchHabits }) => {
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

  const handleComplete = async () => {
    await HabitService.update(habit.id, {
      isCompleted: habit.isCompleted == null ? true : !habit.isCompleted,
    }).then(() => {
      fetchHabits();
    });
  };

  return (
    <div className="border border-dark rounded bg-black text-light m-3 p-3 d-flex justify-content-between align-items-center">
      <div>
        <p className="m-0">ID: {habit.id}</p>
        <h4 className="m-0">{habit.name}</h4>
        <p className="m-0">{habit.isCompleted ? "✔️" : "❌"}</p>
        <p className="m-0">{habit.activeDays.toString()}</p>
      </div>

      <div className="text-end">
        <UpdateHabitModal habit={habit} fetchHabits={fetchHabits} />
        <button
          type="button"
          className="btn btn-outline-light mx-1"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          type="button"
          className="btn btn-outline-light mx-1"
          onClick={handleComplete}
        >
          Check
        </button>
      </div>
    </div>
  );
};

export default Habit;

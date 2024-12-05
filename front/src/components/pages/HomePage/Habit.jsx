import React from "react";
import HabitService from "../../utils/habitService";
import Swal from "sweetalert2";
import UpdateHabitModal from "./UpdateHabitModal.jsx";

const Habit = ({ isToday, habit, fetchHabits }) => {
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

  if (isToday) {
    console.log({ isToday });
    return (
      <div className="border border-dark mx-5 my-3 habit-item">
        <UpdateHabitModal habit={habit} fetchHabits={fetchHabits} />
        <button
          type="button"
          className="btn btn-dark m-2"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          type="button"
          className="btn btn-dark m-2"
          onClick={handleComplete}
        >
          Check
        </button>
        <div className="m-4">
          <p> {habit.id} </p>
          <h4> {habit.name} </h4>
          <p> {habit.isCompleted ? "Completed" : "Uncompleted"} </p>
          <p> {habit.activeDays.toString()} </p>
        </div>
      </div>
    );
  } else {
    console.log({ isToday });
    return (
      <div className="border border-dark mx-5 my-3 habit-item">
        <UpdateHabitModal habit={habit} fetchHabits={fetchHabits} />
        <div className="m-4">
          <p> {habit.id} </p>
          <h4> {habit.name} </h4>
          <p> {habit.isCompleted ? "Completed" : "Uncompleted"} </p>
          <p> {habit.activeDays.toString()} </p>
        </div>
      </div>
    );
  }
};

export default Habit;

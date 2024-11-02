import React from "react";
import HabitService from "./HabitService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HabitCards.css";

const HabitCard = ({ habit, refreshHabits }) => {
  const invertFinished = async () => {
    await HabitService.update(habit.id, {
      id: habit.id,
      name: habit.name,
      user_id: habit.user_id,
      category_id: habit.category_id,
      finished: !habit.finished,
    });
    refreshHabits(); // Refresh habits after update
  };

  const copyHabit = async () => {
    await HabitService.create({
      name: habit.name,
      user_id: habit.user_id,
      category_id: habit.category_id,
      finished: !habit.finished,
    });
    refreshHabits(); // Refresh habits after copying
  };

  const deleteHabit = async () => {
    await HabitService.delete(habit.id);
    refreshHabits(); // Refresh habits after deletion
  };

  return (
    <div className="card mb-3 habit-card">
      <div className="card-body d-flex justify-content-between">
        <div className="habit-info">
          <div className="habit-title">{habit.name}</div>
          <div className="habit-description">{habit.finished.toString()}</div>
        </div>
        <div className="">
          <button className="btn btn-success m-2" onClick={invertFinished}>
            Finish/Unfinish
          </button>
          <button className="btn btn-success m-2" onClick={deleteHabit}>
            Borrar
          </button>
          <button className="btn btn-success m-2" onClick={copyHabit}>
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default HabitCard;

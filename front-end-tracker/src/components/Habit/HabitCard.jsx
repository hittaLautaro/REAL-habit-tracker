import React from "react";
import HabitService from "./HabitService";

const HabitCard = ({ habit, refreshHabits }) => {
  const invertFinished = async () => {
    try {
      // Wait for the update request to complete
      await HabitService.update(habit.id, {
        id: habit.id,
        name: habit.name,
        user_id: habit.user_id,
        category_id: habit.category_id,
        finished: !habit.finished,
      });
      // Once the update is done, refresh the habits
      refreshHabits();
    } catch (error) {
      console.error("Failed to update habit:", error);
    }
  };

  const copyHabit = async () => {
    try {
      await HabitService.create({
        name: habit.name,
        user_id: habit.user_id,
        category_id: habit.category_id,
        finished: !habit.finished,
      });
      refreshHabits();
    } catch (error) {
      console.error("Failed to delete habit:", error);
    }
  };

  const deleteHabit = async () => {
    try {
      // Wait for the delete request to complete
      await HabitService.delete(habit.id);
      // Refresh the habits after deletion
      refreshHabits();
    } catch (error) {
      console.error("Failed to delete habit:", error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "lightblue",
        padding: "10px",
        borderRadius: "8px",
        border: "2px solid yellow",
      }}
    >
      <div>
        <li>
          {"id -> "} {habit.id}
        </li>
        <li>
          {"name -> "}
          {habit.name}
        </li>
        <li>
          {"user id -> "}
          {habit.user_id}
        </li>
        <li>
          {"category id -> "}
          {habit.category_id}
        </li>
        <li>
          {"finished -> "}
          {habit.finished.toString()}
        </li>
      </div>
      <button onClick={invertFinished}>Finish/Unfinish</button>
      <button onClick={deleteHabit}>Borrar</button>
      <button onClick={copyHabit}>Copy</button>
    </div>
  );
};

export default HabitCard;

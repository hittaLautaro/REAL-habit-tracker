import React, { useEffect, useState } from "react";
import HabitService from "./HabitService";
import CategoryService from "../Category/CategoryService";

const HabitCard = ({ habit }) => {
  const invertFinished = async () => {
    await HabitService.update(habit.id, {
      id: habit.id,
      name: habit.name,
      user_id: habit.user_id,
      category_id: habit.category_id,
      finished: !habit.finished,
    });
  };

  const copyHabit = async () => {
    await HabitService.create({
      name: habit.name,
      user_id: habit.user_id,
      category_id: habit.category_id,
      finished: !habit.finished,
    });
  };

  const deleteHabit = async () => {
    await HabitService.delete(habit.id);
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
          {"name -> "} {habit.name}
        </li>
        <li>
          {"user id -> "} {habit.user_id}
        </li>
        <li>
          {"category id -> "} {habit.category_id}
        </li>
        <li>
          {"finished -> "} {habit.finished.toString()}
        </li>
      </div>
      <button onClick={invertFinished}>Finish/Unfinish</button>
      <button onClick={deleteHabit}>Borrar</button>
      <button onClick={copyHabit}>Copy</button>
    </div>
  );
};

export default HabitCard;

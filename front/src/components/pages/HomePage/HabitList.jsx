import React from "react";
import Habit from "./Habit";

const HabitList = ({ habits, fetchHabits }) => {
  if (!habits || habits.length <= 0) {
    return <p className="m-5"> No habits here. </p>;
  }
  return (
    <div className="">
      {habits.map((habit) => (
        <div key={habit.id}>
          <Habit habit={habit} fetchHabits={fetchHabits} />
        </div>
      ))}
    </div>
  );
};

export default HabitList;

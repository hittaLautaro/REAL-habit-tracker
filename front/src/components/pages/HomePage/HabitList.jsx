import React from "react";
import Habit from "./Habit";

const HabitList = ({ todays, habits, fetchHabits }) => {
  return (
    <div className="">
      {habits.map((habit) => (
        <div key={habit.id}>
          <Habit todays={todays} habit={habit} fetchHabits={fetchHabits} />
        </div>
      ))}
    </div>
  );
};

export default HabitList;

import React from "react";
import Habit from "./Habit";

const HabitList = ({ todays, habits, fetchHabits }) => {
  console.log(todays);
  console.log(habits);

  if (!habits || habits.length <= 0) {
    return <p className="m-5"> No habits here. </p>;
  }
  return (
    <div className="">
      {habits.map((habit) => (
        <div key={habit.id}>
          {habit.activeDays.includes(todays) && (
            <Habit todays={todays} habit={habit} fetchHabits={fetchHabits} />
          )}
        </div>
      ))}
    </div>
  );
};

export default HabitList;

import React from "react";
import Habit from "./Habit";

const HabitList = ({ isToday, selectedDay, habits, fetchHabits }) => {
  if (!habits || habits.length <= 0) {
    return <p className="m-5"> No habits here. </p>;
  }
  return (
    <div className="">
      {habits.map((habit) => (
        <div key={habit.id}>
          {habit.activeDays.includes(selectedDay) && (
            <Habit isToday={isToday} habit={habit} fetchHabits={fetchHabits} />
          )}
        </div>
      ))}
    </div>
  );
};

export default HabitList;

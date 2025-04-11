import React from "react";
import Habit from "./Habit";
import "../../components/global/styles.css";

const HabitList = ({ habits }) => {
  return habits.length <= 0 ? (
    <div className="d-flex allign-align-content-center justify-content-around">
      <p className="m-4 custom-font-normal">You've no completed habits.</p>
    </div>
  ) : (
    <div>
      {habits.map((habit) => (
        <Habit key={habit.id} habit={habit} />
      ))}
    </div>
  );
};

export default HabitList;

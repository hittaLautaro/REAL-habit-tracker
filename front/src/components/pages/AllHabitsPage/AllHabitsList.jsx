import React from "react";
import Habit from "../../pages/AllHabitsPage/Habit";

import "../../global/styles.css";

const AllHabitsList = ({ habits }) => {
  if (!habits || habits.length <= 0) {
    return <p className="m-4 custom-font"> No habits here. </p>;
  }
  return (
    <div className="">
      {habits.map((habit) => (
        <div key={habit.id}>
          <Habit habit={habit} />
        </div>
      ))}
    </div>
  );
};

export default AllHabitsList;

import React from "react";
import Habit from "./Habit";

import "../../components/global/styles.css";

const AllHabitsList = ({ habits }) => {
  const allHabits = [...habits.todo, ...habits.finished]; // merge

  if (!allHabits || allHabits.length <= 0) {
    return <p className="m-4 custom-font">You've got no habits.</p>;
  }

  return (
    <div>
      {allHabits.map((habit) => (
        <div key={habit.id}>
          <Habit habit={habit} />
        </div>
      ))}
    </div>
  );
};

export default AllHabitsList;

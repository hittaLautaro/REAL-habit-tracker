import React from "react";
import Habit from "./Habit";

import "../../components/global/styles.css";

const AllHabitsList = ({ habits }) => {
  if (!habits || habits.length <= 0) {
    return <p className="m-4 custom-font">You've got no habits.</p>;
  }

  return (
    <div>
      {habits.map((habit) => (
        <div key={habit.id}>
          <Habit habit={habit} />
        </div>
      ))}
    </div>
  );
};

export default AllHabitsList;

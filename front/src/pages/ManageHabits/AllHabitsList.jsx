import React from "react";
import Habit from "./Habit";

import "../../components/global/styles.css";

const AllHabitsList = ({ habits }) => {
  if (!habits || habits.length <= 0) {
    return <p className="m-4 sans-600">You've got no habits.</p>;
  }

  return (
    <div className="h-[70vh] w-[700px] overflow-y-scroll overflow-x-hidden mx-2">
      {habits.map((habit) => (
        <div key={habit.id} className="min-h-[80px] mb-2 rounded mr-6">
          <Habit habit={habit} />
        </div>
      ))}
    </div>
  );
};

export default AllHabitsList;

import React from "react";
import Habit from "./Habit";

import "../../../components/Global/styles.css";

const AllHabitsList = ({ habits }) => {
  return (
    <div className="h-[72vh] max-h-[72-vh] w-[800px] overflow-y-scroll overflow-x-hidden mx-4 mb-4 rounded-sm !border !border-neutral-800 ">
      {habits &&
        habits.map((habit) => (
          <div key={habit.id} className="min-h-[80px] mb-2 rounded">
            <Habit habit={habit} />
          </div>
        ))}
    </div>
  );
};

export default AllHabitsList;

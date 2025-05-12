import React from "react";
import Habit from "./Habit";

import "../../components/global/styles.css";

const AllHabitsList = ({ habits }) => {
  if (!habits || habits.length <= 0) {
    return (
      <div className="h-[70vh] w-[700px] overflow-y-scroll overflow-x-hidden mx-2"></div>
    );
  }

  return (
    <div className="h-[72vh] w-[800px] overflow-y-scroll overflow-x-hidden ml-5 mr-4 mb-4">
      {habits.map((habit) => (
        <div key={habit.id} className="min-h-[80px] mb-2 rounded mr-2">
          <Habit habit={habit} />
        </div>
      ))}
    </div>
  );
};

export default AllHabitsList;

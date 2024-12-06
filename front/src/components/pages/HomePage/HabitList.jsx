import React from "react";
import Habit from "./Habit";

import { Droppable } from "@hello-pangea/dnd";

import "../../global/styles.css";

const HabitList = ({ droppableId, habits }) => {
  if (!habits || habits.length <= 0) {
    return <p className="m-4 custom-font"> No habits here. </p>;
  }
  return (
    <div className="">
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {habits.map((habit, index) => (
              <Habit key={habit.id} habit={habit} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default HabitList;

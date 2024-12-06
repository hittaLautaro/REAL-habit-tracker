import React from "react";
import Habit from "./Habit";
import { Droppable } from "@hello-pangea/dnd";
import "../../global/styles.css";

const HabitList = ({ droppableId, habits }) => {
  return (
    <div className="">
      <Droppable droppableId={droppableId} isDropDisabled={false}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`droppable-area ${habits.length === 0 ? "empty" : ""}`}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {habits.length > 0 ? (
              habits.map((habit, index) => (
                <Habit key={habit.id} habit={habit} index={index} />
              ))
            ) : (
              <p className="m-4 custom-font">
                No habits here. Drop to finish them.
              </p>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default HabitList;

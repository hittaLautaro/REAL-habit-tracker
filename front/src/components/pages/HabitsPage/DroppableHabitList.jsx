import React from "react";
import Habit from "./Habit";
import { Droppable } from "@hello-pangea/dnd";
import "../../global/styles.css";

const DroppableHabitList = ({ droppableId, habits }) => {
  console.log(droppableId);

  return (
    <div>
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
                <Habit
                  key={habit.id}
                  habit={habit}
                  index={index}
                  categoryEmoji={droppableId === "finished" ? "✔️" : "❌"}
                />
              ))
            ) : (
              <p className="m-4 custom-font">
                {droppableId === "finished"
                  ? "You've no habits finished."
                  : "You've finished all your habits!"}
              </p>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DroppableHabitList;

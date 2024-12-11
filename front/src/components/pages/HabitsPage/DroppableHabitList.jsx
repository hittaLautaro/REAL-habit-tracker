import React from "react";
import Habit from "./Habit";
import { Droppable } from "@hello-pangea/dnd";
import "../../global/styles.css";
import { DragDropContext } from "@hello-pangea/dnd";
import { useContext, useState, useRef } from "react";
import _ from "lodash";
import { HabitContext } from "../../contexts/HabitContext";
import DraggableHabit from "./DraggableHabit";

const DroppableHabitList = ({ droppableId, habits }) => {
  const { updateHabitsOrdersAndCompletions } = useContext(HabitContext);

  const debounceSave = useRef(
    _.debounce(async (updatedHabits) => {
      console.log(updatedHabits); // This should now print the correct array
      const allHabits = [...updatedHabits.todo, ...updatedHabits.finished];
      updateHabitsOrdersAndCompletions(allHabits);
    }, 1000)
  ).current;

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If no destination (e.g., item was dropped outside), do nothing
    if (!destination) return;

    // If the source and destination indexes are the same, do nothing
    if (source.index === destination.index) return;

    // Clone local habits for modification
    const newLocalHabits = [...localHabits];

    // Remove item from source and insert at destination
    const [reorderedItem] = newLocalHabits.splice(source.index, 1);
    newLocalHabits.splice(destination.index, 0, reorderedItem);

    // Update state immediately
    setLocalHabits(newLocalHabits);

    // Debugging logs
    console.log("Updated local habits:", newLocalHabits);

    // Debounced backend save
    debounceSave(newLocalHabits);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={droppableId}>
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
                <DraggableHabit
                  key={habit.id}
                  habit={habit}
                  index={index}
                  categoryEmoji={"✔️"}
                />
              ))
            ) : (
              <p className="m-4 custom-font">You've no habits.</p>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DroppableHabitList;

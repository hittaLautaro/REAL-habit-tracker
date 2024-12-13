import React, { useEffect } from "react";
import Habit from "./Habit";
import { Droppable } from "@hello-pangea/dnd";
import "../../global/styles.css";
import { DragDropContext } from "@hello-pangea/dnd";
import { useContext, useState, useRef } from "react";
import _ from "lodash";
import { HabitContext } from "../../contexts/HabitContext";
import DraggableHabit from "./DraggableHabit";

const DroppableHabitList = ({ droppableId, habits }) => {
  const [localHabits, setLocalHabits] = useState([]);
  const { updateHabitsOrdersAndCompletions } = useContext(HabitContext);
  console.log("Prop habits");
  console.log(habits);

  useEffect(() => {
    setLocalHabits(habits);
  }, [habits]);

  const debounceSave = useRef(
    _.debounce(async (updatedHabits) => {
      console.log("Updated Habits"); // This should now print the correct array
      console.log(updatedHabits); // This should now print the correct array
      updateHabitsOrdersAndCompletions(updatedHabits);
    }, 1000)
  ).current;

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.index === destination.index) return;

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

  return localHabits.length <= 0 ? (
    <div className="d-flex allign-align-content-center justify-content-around">
      <p className="m-4 custom-font-normal">You've no habits left.</p>
    </div>
  ) : (
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
            {localHabits.map((habit, index) => (
              <DraggableHabit
                key={habit.id}
                habit={habit}
                index={index}
                categoryEmoji={"✔️"}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DroppableHabitList;

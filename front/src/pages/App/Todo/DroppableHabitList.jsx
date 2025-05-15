import { Droppable } from "@hello-pangea/dnd";
import "../../../components/global/styles.css";
import { DragDropContext } from "@hello-pangea/dnd";
import React, { useEffect, useContext, useState, useRef } from "react";
import _ from "lodash";
import { HabitContext } from "../../../components/contexts/HabitContext";
import DraggableHabit from "./DraggableHabit";

const DroppableHabitList = ({ droppableId }) => {
  const { habits } = useContext(HabitContext);
  const [localHabits, setLocalHabits] = useState([]);
  const { updateHabitsOrdersAndCompletions } = useContext(HabitContext);

  useEffect(() => {
    setLocalHabits(habits);
  }, [habits]);

  const debounceSave = useRef(
    _.debounce(async (updatedHabits) => {
      updateHabitsOrdersAndCompletions(updatedHabits);
    }, 1000)
  ).current;

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination || source.index === destination.index) return;

    const newLocalHabits = [...localHabits];
    const [reorderedItem] = newLocalHabits.splice(source.index, 1);
    newLocalHabits.splice(destination.index, 0, reorderedItem);

    const updatedHabitsWithOrder = newLocalHabits.map((habit, index) => ({
      ...habit,
      position: index,
    }));

    setLocalHabits(updatedHabitsWithOrder);
    debounceSave(updatedHabitsWithOrder);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`droppable-area ${
              habits.length === 0 ? "empty" : ""
            }mx-2 mt-1`}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {localHabits.map((habit, index) => (
              <DraggableHabit key={habit.id} habit={habit} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DroppableHabitList;

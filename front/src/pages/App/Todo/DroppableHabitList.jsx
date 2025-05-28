import { Droppable } from "@hello-pangea/dnd";
import "../../../components/global/styles.css";
import { DragDropContext } from "@hello-pangea/dnd";
import React, { useEffect, useContext, useState, useRef } from "react";
import _ from "lodash";
import { HabitContext } from "../../../components/contexts/HabitContext";
import DraggableHabit from "./DraggableHabit";

const DroppableHabitList = ({ droppableId, today }) => {
  const { habits, updateIsCompleted, deleteHabit, updateHabit, addHabit } =
    useContext(HabitContext);
  const [localHabits, setLocalHabits] = useState([]);
  const { updateHabitsOrdersAndCompletions } = useContext(HabitContext);

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized && habits.length > 0) {
      setLocalHabits(
        habits.filter((habit) =>
          habit.activeDayOrders?.some((entry) => entry.dayOfWeek === today)
        )
      );
      setIsInitialized(true);
    }
  }, [habits, isInitialized]);

  const debounceSaveOrder = useRef(
    _.debounce(async (updatedHabits) => {
      try {
        await updateHabitsOrdersAndCompletions(updatedHabits);
      } catch (error) {
        console.error("Failed to save habit order:", error);
        setLocalHabits(habits);
      }
    }, 1000)
  ).current;

  const debounceSaveCompletion = useRef(
    _.debounce(async (habitId, isCompleted) => {
      try {
        await updateIsCompleted(habitId, { isCompleted });
      } catch (error) {
        console.error("Failed to update completion:", error);
      }
    }, 500)
  ).current;

  useEffect(() => {
    return () => {
      debounceSaveOrder.cancel();
      debounceSaveCompletion.cancel();
    };
  }, [debounceSaveOrder, debounceSaveCompletion]);

  const handleLocalComplete = async (habitId) => {
    const updatedHabits = localHabits.map((habit) =>
      habit.id === habitId
        ? {
            ...habit,
            isCompleted: habit.isCompleted === null ? true : !habit.isCompleted,
          }
        : habit
    );

    setLocalHabits(updatedHabits);

    const updatedHabit = updatedHabits.find((h) => h.id === habitId);
    if (updatedHabit) {
      debounceSaveCompletion(habitId, updatedHabit.isCompleted);
    }
  };

  const handleLocalDelete = async (habitId) => {
    await deleteHabit(habitId);
    setLocalHabits((prevHabits) => prevHabits.filter((h) => h.id !== habitId));
  };

  const handleLocalUpdate = async (habitId, updatedData) => {
    setLocalHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === habitId ? { ...habit, ...updatedData } : habit
      )
    );

    await updateHabit(habitId, updatedData);
  };

  const handleLocalDuplicate = async (habitData) => {
    const newHabit = await addHabit(habitData);
    if (newHabit) {
      setLocalHabits((prevHabits) => [...prevHabits, newHabit]);
    }
  };

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
    debounceSaveOrder(updatedHabitsWithOrder);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`droppable-area ${
              localHabits.length === 0 ? "empty" : ""
            } mx-2 mt-1`}
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
                onComplete={() => handleLocalComplete(habit.id)}
                onDelete={() => handleLocalDelete(habit.id)}
                onUpdate={(updatedData) =>
                  handleLocalUpdate(habit.id, updatedData)
                }
                onDuplicate={() =>
                  handleLocalDuplicate({
                    name: habit.name,
                    frequency: habit.frequency,
                    activeDays: habit.activeDays,
                  })
                }
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

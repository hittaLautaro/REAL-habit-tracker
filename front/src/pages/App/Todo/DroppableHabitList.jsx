import { Droppable } from "@hello-pangea/dnd";
import "../../../components/global/styles.css";
import { DragDropContext } from "@hello-pangea/dnd";
import React, { useEffect, useContext, useState, useRef } from "react";
import _ from "lodash";
import { HabitContext } from "../../../components/contexts/HabitContext";
import DraggableHabit from "./DraggableHabit";

const DroppableHabitList = ({ droppableId, today }) => {
  const {
    habits,
    updateIsCompleted,
    deleteHabit,
    updateHabit,
    addHabit,
    updateHabitsOrdersAndCompletions,
  } = useContext(HabitContext);
  const [localHabits, setLocalHabits] = useState([]);

  // Determine if the selected day is actually today
  const todaysDate = new Date();
  const todayDayString = todaysDate
    .toLocaleDateString("en-US", { weekday: "long" })
    .toUpperCase();

  const isToday = today === todayDayString;
  const isReadOnly = !isToday;

  useEffect(() => {
    if (habits.length > 0) {
      const filteredHabits = habits.filter((habit) =>
        habit.activeDayOrders?.some((entry) => entry.dayOfWeek === today)
      );

      // Sort habits by their position for today
      const sortedHabits = filteredHabits.sort((a, b) => {
        const aPosition = a.activeDayOrders?.find(
          (entry) => entry.dayOfWeek === today
        )?.position;
        const bPosition = b.activeDayOrders?.find(
          (entry) => entry.dayOfWeek === today
        )?.position;

        // Handle undefined positions by putting them at the end
        if (aPosition === undefined && bPosition === undefined) return 0;
        if (aPosition === undefined) return 1;
        if (bPosition === undefined) return -1;

        return aPosition - bPosition;
      });

      setLocalHabits(sortedHabits);
    }
  }, [habits, today]);

  const debounceSaveOrder = useRef(
    _.debounce(async (updatedHabits) => {
      try {
        await updateHabitsOrdersAndCompletions(updatedHabits);
      } catch (error) {
        console.error("Failed to save habit order:", error);
        setLocalHabits(habits);
      }
    }, 200)
  ).current;

  const debounceSaveCompletion = useRef(
    _.debounce(async (habitId, isCompleted) => {
      try {
        await updateIsCompleted(habitId, { isCompleted });
      } catch (error) {
        console.error("Failed to update completion:", error);
      }
    }, 200)
  ).current;

  useEffect(() => {
    return () => {
      debounceSaveOrder.cancel();
      debounceSaveCompletion.cancel();
    };
  }, [debounceSaveOrder, debounceSaveCompletion]);

  const handleLocalComplete = async (habitId) => {
    if (isReadOnly) return; // Prevent completion if not today

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
    if (isReadOnly) return; // Prevent deletion if not today
    await deleteHabit(habitId);
    setLocalHabits((prevHabits) => prevHabits.filter((h) => h.id !== habitId));
  };

  const handleLocalUpdate = async (habitId, updatedData) => {
    if (isReadOnly) return; // Prevent updates if not today

    setLocalHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === habitId ? { ...habit, ...updatedData } : habit
      )
    );

    await updateHabit(habitId, updatedData);
  };

  const getNextPositionForDay = (habits, dayOfWeek) => {
    const maxPosition = habits.reduce((max, habit) => {
      const dayOrder = habit.activeDayOrders?.find(
        (entry) => entry.dayOfWeek === dayOfWeek
      );
      return dayOrder?.position > max ? dayOrder.position : max;
    }, -1);

    return maxPosition + 1;
  };

  const handleLocalDuplicate = async (habitData) => {
    if (isReadOnly) return; // Prevent duplication if not today

    // Calculate the next position for each active day
    const activeDayOrders =
      habitData.activeDays?.map((dayOfWeek) => ({
        dayOfWeek,
        position: getNextPositionForDay(habits, dayOfWeek),
      })) || [];

    const habitDataWithPositions = {
      ...habitData,
      activeDayOrders,
    };

    const newHabit = await addHabit(habitDataWithPositions);
    if (newHabit) {
      // Only add to local state if it's active for the current day
      if (
        newHabit.activeDayOrders?.some((entry) => entry.dayOfWeek === today)
      ) {
        setLocalHabits((prevHabits) => [...prevHabits, newHabit]);
      }
    }
  };

  const onDragEnd = (result) => {
    // Allow dragging for all days, but only save if it's today
    const { source, destination } = result;
    if (!destination || source.index === destination.index) return;

    const newLocalHabits = [...localHabits];
    const [reorderedItem] = newLocalHabits.splice(source.index, 1);
    newLocalHabits.splice(destination.index, 0, reorderedItem);

    const updatedHabitsWithOrder = newLocalHabits.map((habit, index) => {
      const updatedActiveDayOrders = habit.activeDayOrders.map((dayOrder) =>
        dayOrder.dayOfWeek === today
          ? { ...dayOrder, position: index }
          : dayOrder
      );

      return {
        ...habit,
        activeDayOrders: updatedActiveDayOrders,
      };
    });

    setLocalHabits(updatedHabitsWithOrder);

    // Only save to backend if it's today
    if (isToday) {
      debounceSaveOrder(updatedHabitsWithOrder);
    }
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
                today={today}
                isToday={isToday}
                isReadOnly={isReadOnly}
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

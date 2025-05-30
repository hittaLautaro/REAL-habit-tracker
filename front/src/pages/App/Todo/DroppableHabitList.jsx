import { Droppable } from "@hello-pangea/dnd";
import "../../../components/Global/styles.css";
import { DragDropContext } from "@hello-pangea/dnd";
import { useEffect, useState, useRef } from "react";
import _ from "lodash";
import DraggableHabit from "./DraggableHabit";
import { useHabitsOperations } from "../../../components/hooks/useHabits.js";

const DroppableHabitList = ({ droppableId, today }) => {
  const {
    habits,
    isLoading,
    isError,
    createHabit,
    updateHabit,
    deleteHabit,
    updateCompletion,
    updateOrder,
  } = useHabitsOperations();

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

      const sortedHabits = filteredHabits.sort((a, b) => {
        const aPosition = a.activeDayOrders?.find(
          (entry) => entry.dayOfWeek === today
        )?.position;
        const bPosition = b.activeDayOrders?.find(
          (entry) => entry.dayOfWeek === today
        )?.position;

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
        updateHabitsOrdersAndCompletions(updatedHabits);
      } catch (error) {
        console.error("Failed to save habit order:", error);
        setLocalHabits(habits);
      }
    }, 200)
  ).current;

  const debounceSaveCompletion = useRef(
    _.debounce(async (habitId, isCompleted) => {
      try {
        updateCompletion({ id: habitId, updatedData: { isCompleted } });
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
    if (isReadOnly) return;

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
    if (isReadOnly) return;

    deleteHabit(habitId);
    setLocalHabits((prevHabits) => prevHabits.filter((h) => h.id !== habitId));
  };

  const handleLocalUpdate = async (habitId, updatedData) => {
    if (isReadOnly) return;

    setLocalHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === habitId ? { ...habit, ...updatedData } : habit
      )
    );

    updateHabit({ id: habitId, updatedData });
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
    if (isReadOnly) return;

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
      if (
        newHabit.activeDayOrders?.some((entry) => entry.dayOfWeek === today)
      ) {
        setLocalHabits((prevHabits) => [...prevHabits, newHabit]);
      }
    }
  };

  const onDragEnd = (result) => {
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

    if (isToday) {
      debounceSaveOrder(updatedHabitsWithOrder);
    }
  };

  if (isLoading) {
    return <div className="mx-2 mt-1 p-4">Loading habits...</div>;
  }

  if (isError) {
    return (
      <div className="mx-2 mt-1 p-4 text-red-500">Error loading habits</div>
    );
  }

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

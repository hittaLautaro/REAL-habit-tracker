import "../../../components/Global/styles.css";
import { useEffect, useState, useRef } from "react";
import _ from "lodash";
import Habit from "./Habit";
import { useHabitsOperations } from "../../../components/hooks/useHabits.js";

const HabitList = ({ habits, today }) => {
  const { isLoading, isError, updateHabit, deleteHabit, updateCompletion } =
    useHabitsOperations();

  const [localHabits, setLocalHabits] = useState([]);

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

  const debounceSaveCompletion = useRef(
    _.debounce(async (habitId, isCompleted) => {
      try {
        updateCompletion({ id: habitId, updatedData: { isCompleted } });
      } catch (error) {
        console.error("Failed to update completion:", error);
      }
    }, 200)
  ).current;

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

  if (isLoading) {
    return <div className="mx-2 mt-1 p-4">Loading habits...</div>;
  }

  if (isError) {
    return (
      <div className="mx-2 mt-1 p-4 text-red-500">Error loading habits</div>
    );
  }

  return (
    <div
      className={"mx-2 mt-1"}
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {localHabits.map((habit, index) => (
        <Habit
          key={habit.id}
          habit={habit}
          index={index}
          today={today}
          isToday={isToday}
          isReadOnly={isReadOnly}
          onComplete={() => handleLocalComplete(habit.id)}
          onDelete={() => handleLocalDelete(habit.id)}
          onUpdate={(updatedData) => handleLocalUpdate(habit.id, updatedData)}
        />
      ))}
    </div>
  );
};

export default HabitList;

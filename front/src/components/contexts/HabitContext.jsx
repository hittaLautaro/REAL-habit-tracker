import React, { createContext, useState, useEffect } from "react";
import HabitService from "../utils/habitService";

export const HabitContext = createContext();

const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState({
    todo: [],
    finished: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchHabits = async () => {
    setLoading(true);
    const response = await HabitService.getAll();
    const fetchedHabits = response.data;

    const categorizedHabits = {
      todo: fetchedHabits.filter((habit) => !habit.isCompleted),
      finished: fetchedHabits.filter((habit) => habit.isCompleted),
    };

    setHabits(categorizedHabits);
    setLoading(false);
  };

  const addHabit = async (newHabit) => {
    await HabitService.save(newHabit);
    fetchHabits();
  };

  const updateHabit = async (id, updatedData) => {
    await HabitService.update(id, updatedData);
    fetchHabits();
  };

  const updateHabitOrder = async (source, destination, habit) => {
    const sourceCategory = source.droppableId;
    const destCategory = destination.droppableId;

    // Update the habit completion status
    const updatedData = {
      isCompleted: destCategory === "finished",
    };

    // Update the habit in the backend
    await HabitService.update(habit.id, updatedData);

    // Update the habits state using the context's setHabits
    setHabits((prevHabits) => {
      const sourceCategoryHabits = prevHabits[sourceCategory].filter(
        (h) => h.id !== habit.id
      );
      const destinationCategoryHabits = [
        ...prevHabits[destCategory],
        { ...habit, isCompleted: updatedData.isCompleted },
      ];

      return {
        ...prevHabits,
        [sourceCategory]: sourceCategoryHabits,
        [destCategory]: destinationCategoryHabits,
      };
    });

    // Fetch updated habits from the server
    fetchHabits();
  };

  const deleteHabit = async (id) => {
    await HabitService.deleteById(id);
    await fetchHabits();
  };

  const deleteAllHabits = async () => {
    await HabitService.deleteAll();
    fetchHabits();
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <HabitContext.Provider
      value={{
        habits,
        loading,
        addHabit,
        updateHabit,
        deleteHabit,
        deleteAllHabits,
        fetchHabits,
        updateHabitOrder,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};

export { HabitProvider };

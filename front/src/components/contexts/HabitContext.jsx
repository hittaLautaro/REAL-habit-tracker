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

  const deleteHabit = async (id) => {
    await HabitService.deleteById(id);
    await fetchHabits();
  };

  const deleteAllHabits = async () => {
    await HabitService.deleteAll();
    fetchHabits();
  };

  const updateHabitsOrdersAndCompletions = async (localHabits) => {
    await HabitService.updateAll(localHabits);
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
        updateHabitsOrdersAndCompletions,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};

export { HabitProvider };

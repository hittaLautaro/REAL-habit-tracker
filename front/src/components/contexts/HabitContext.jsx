import React, { createContext, useState, useEffect } from "react";
import HabitService from "../../services/habitService";

export const HabitContext = createContext();

const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHabits = async () => {
    setLoading(true);
    const res = await HabitService.getAll();
    setHabits(res.data);
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

  const updateIsCompleted = async (id, updatedData) => {
    await HabitService.updateIsCompleted(id, updatedData);
    fetchHabits();
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const contextValue = {
    habits,
    loading,
    addHabit,
    updateHabit,
    deleteHabit,
    deleteAllHabits,
    fetchHabits,
    updateHabitsOrdersAndCompletions,
    updateIsCompleted,
  };

  return (
    <HabitContext.Provider value={contextValue}>
      {children}
    </HabitContext.Provider>
  );
};

export { HabitProvider };

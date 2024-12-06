import React, { createContext, useState, useEffect } from "react";
import HabitService from "../utils/habitService";

export const HabitContext = createContext();

const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHabits = async () => {
    setLoading(true);
    const response = await HabitService.getAll();
    setHabits(response.data);
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
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};

export { HabitProvider };

import React, { useEffect, useState } from "react";
import HabitForm from "./HabitForm";
import HabitList from "./HabitList";
import HabitService from "./HabitService";
import Header from "../Global/Header";

const HabitManager = () => {
  const [habits, setHabits] = useState([]);

  const fetchHabits = async () => {
    const fetchedHabits = await HabitService.getAll();
    setHabits(fetchedHabits);
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <div>
      <Header />
      <HabitForm refreshHabits={fetchHabits} />
      <HabitList habits={habits} refreshHabits={fetchHabits} />
    </div>
  );
};

export default HabitManager;

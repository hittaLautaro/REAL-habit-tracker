// src/components/CategoryList.js
import { useEffect, useState } from "react";
import HabitService from "./HabitService";
import Header from "../global/Header";

const HabitList = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const response = await HabitService.getAll();
      console.log("Fetched Habits:", response.data); // Check the data structure
      setHabits(response.data);
    } catch (error) {
      console.error("Error fetching Habits", error);
    }
  };

  return (
    <div>
      <Header />
      <h1>Habits</h1>
      <ul>
        {habits.map((habit) => (
          <div key={habit.id}>
            <li>
              {"id -> "} {habit.id}{" "}
            </li>
            <li>
              {"name -> "}
              {habit.name}{" "}
            </li>
            <li>
              {"user id -> "}
              {habit.user_id}{" "}
            </li>
            <li>
              {"category id -> "}
              {habit.category_id}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default HabitList;

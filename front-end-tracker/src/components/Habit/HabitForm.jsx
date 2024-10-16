import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import HabitService from "./HabitService";
import HabitList from "./HabitList";

const HabitForm = ({ habit, refreshHabits }) => {
  const [name, setName] = useState(habit ? habit.name : "");
  const [userId, setUserId] = useState(habit ? habit.user_id : ""); // User ID state
  const [categoryId, setCategoryId] = useState(habit ? habit.category_id : ""); // User ID state

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    const habitDto = { name, user_id: userId, category_id: categoryId };

    try {
      if (habit) {
        await HabitService.update(habit.id, habitDto);
      } else {
        await HabitService.create(habitDto);
      }
      refreshHabits(); // Call refreshHabits to update the habit list
    } catch (error) {
      console.error("Error saving habit:", error);
    }
  };

  return (
    <>
      <h1>Add a habit</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Habit Name"
        />
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
          placeholder="User ID"
        />
        <input
          type="number"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          placeholder="Category ID"
        />
        <button type="submit">{habit ? "Update" : "Add"} Habit</button>
      </form>
    </>
  );
};

export default HabitForm;

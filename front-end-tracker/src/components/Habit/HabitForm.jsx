import { useState } from "react";
import HabitService from "./HabitService";

const HabitForm = () => {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState(null); // User ID state
  const [categoryId, setCategoryId] = useState(null); // User ID state

  const handleSubmit = async (e) => {
    e.preventDefault();

    const habitDto = { name, user_id: userId, category_id: categoryId };

    try {
      await HabitService.create(habitDto);
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
        <button type="submit">Add Habit</button>
      </form>
    </>
  );
};

export default HabitForm;

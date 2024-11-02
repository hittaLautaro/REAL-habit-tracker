import { useState } from "react";
import HabitService from "./HabitService";

const HabitForm = ({ userId, categoryId, refreshHabits }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const habitDto = { name, user_id: userId, category_id: categoryId };
    await HabitService.create(habitDto);

    // Refresh habits after successfully creating a new habit
    refreshHabits();

    // Optionally clear the input field after submission
    setName("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Habit Name"
        />
        <button type="submit">Add Habit</button>
      </form>
    </>
  );
};

export default HabitForm;

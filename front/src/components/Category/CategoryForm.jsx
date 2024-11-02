import { useState } from "react";
import CategoryService from "./CategoryService";

const CategoryForm = ({ refreshHabits }) => {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState(null); // User ID state

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUserId(1); // HARCODED FOR TESTING
    const categoryDto = { name, user_id: userId };
    await CategoryService.create(categoryDto);

    refreshHabits();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Category Name"
        />
        {/* <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
          placeholder="User ID"
        /> */}
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default CategoryForm;

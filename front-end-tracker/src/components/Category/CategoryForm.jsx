import { useState } from "react";
import CategoryService from "./CategoryService";

const CategoryForm = ({ category }) => {
  const [name, setName] = useState(category ? category.name : "");
  const [userId, setUserId] = useState(category ? category.user_id : ""); // User ID state

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryDto = { name, user_id: userId };

    if (category) {
      await CategoryService.update(category.id, categoryDto);
    } else {
      await CategoryService.create(categoryDto);
    }
  };

  return (
    <>
      <h1>Add a category</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Category Name"
        />
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
          placeholder="User ID"
        />
        <button type="submit">{category ? "Update" : "Add"} Category</button>
      </form>
    </>
  );
};

export default CategoryForm;

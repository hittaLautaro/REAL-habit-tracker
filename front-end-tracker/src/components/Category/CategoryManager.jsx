import { useState, useEffect } from "react";
import Header from "../Global/Header";
import CategoryService from "./CategoryService";
import HabitList from "../Habit/HabitList";
import HabitService from "../Habit/HabitService";
import CategoryForm from "./CategoryForm";
import HabitForm from "../Habit/HabitForm";

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [habitsByCategory, setHabitsByCategory] = useState({}); // Store habits by category

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await CategoryService.getAll();
      console.log("Fetched Categories:", response.data);
      setCategories(response.data);

      // Fetch habits for each category after categories are loaded
      response.data.forEach((category) => {
        fetchHabitsFromCategory(category.id);
      });
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const fetchHabitsFromCategory = async (categoryId) => {
    try {
      const response = await HabitService.getByCategoryId(categoryId);
      console.log(`Fetched habits for category ${categoryId}:`, response);

      // Update state to store habits by category ID
      setHabitsByCategory((prev) => ({
        ...prev,
        [categoryId]: response, // Store habits under the categoryId
      }));
    } catch (error) {
      console.error(`Error fetching habits for category ${categoryId}`, error);
    }
  };

  return (
    <div>
      <Header />
      <h1>Categories</h1>
      <CategoryForm />
      <ul>
        {categories.map((category) => (
          <div key={category.id}>
            <HabitForm />

            <h1>
              <strong>{category.name}</strong> (id: {category.id})
            </h1>
            <ul>
              <HabitList habits={habitsByCategory[category.id] || []} />
            </ul>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManager;

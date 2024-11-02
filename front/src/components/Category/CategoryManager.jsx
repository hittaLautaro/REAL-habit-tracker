import { useState, useEffect } from "react";
import Header from "../Global/Header";
import CategoryService from "./CategoryService";
import HabitService from "../Habit/HabitService";
import CategoryForm from "./CategoryForm";
import HabitForm from "../Habit/HabitForm";
import HabitCard from "../Habit/HabitCard"; // Import the HabitCard component
import "bootstrap/dist/css/bootstrap.min.css";
import "./Category.css";

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [habitsByCategory, setHabitsByCategory] = useState({});

  useEffect(() => {
    fetchCategoriesAndHabits();
  }, []);

  const fetchCategoriesAndHabits = async () => {
    try {
      // Fetch all categories
      const categoryResponse = await CategoryService.getAll();
      console.log("Fetched Categories:", categoryResponse.data);
      setCategories(categoryResponse.data);

      // Fetch all habits at once
      const habitResponse = await HabitService.getAll();
      console.log("Fetched all Habits:", habitResponse);

      // Group habits by category
      const groupedHabits = habitResponse.reduce((acc, habit) => {
        const categoryId = habit.category_id;
        if (!acc[categoryId]) {
          acc[categoryId] = [];
        }
        acc[categoryId].push(habit);
        return acc;
      }, {});

      // Update state with habits grouped by category
      setHabitsByCategory(groupedHabits);
    } catch (error) {
      console.error("Error fetching categories or habits", error);
    }
  };

  const refreshHabits = async () => {
    await fetchCategoriesAndHabits();
  };

  const deleteCategory = async (id) => {
    await CategoryService.delete(id);
    refreshHabits(); // Refresh habits after deletion
  };

  return (
    <div>
      <div className="d-flex align-items-center">
        <h1 className="m-3">
          <strong> Habits </strong>
        </h1>
        <CategoryForm refreshHabits={refreshHabits} />
      </div>

      <ul>
        {categories.map((category) => (
          <div key={category.id} className="category-card mb-4 p-3">
            {/* Pass refresh function here */}
            <div className="d-flex align-items-center justify-content-between">
              <h1 className="category-title">
                <strong>{category.name}</strong> (id: {category.id})
              </h1>

              <HabitForm
                userId={1} // or however you want to manage this
                categoryId={category.id}
                refreshHabits={refreshHabits} // Pass refresh function
              />

              <button
                className="btn btn-danger"
                onClick={() => {
                  deleteCategory(category.id);
                }}
              >
                Delete
              </button>
            </div>
            <ul>
              {/* Render HabitCard for each habit */}
              {(habitsByCategory[category.id] || []).map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  refreshHabits={refreshHabits} // Pass refresh function to HabitCard
                />
              ))}
            </ul>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManager;

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
  const [loading, setLoading] = useState(true); // Manage loading state

  useEffect(() => {
    fetchCategoriesAndHabits();
  }, []);

  const fetchCategoriesAndHabits = async () => {
    const categoryResponse = await CategoryService.getAll();
    const fetchedCategories = categoryResponse.data;
    console.log("Fetched Categories:", fetchedCategories);
    setCategories(fetchedCategories);

    // Fetch all habits after categories are loaded
    const habitsData = {};
    await Promise.all(
      fetchedCategories.map(async (category) => {
        const habitResponse = await HabitService.getByCategoryId(category.id);
        habitsData[category.id] = habitResponse;
      })
    );

    console.log("Fetched all habits:", habitsData);
    setHabitsByCategory(habitsData);
    setLoading(false); // Loading completed
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading spinner or message while fetching
  }

  return (
    <div>
      <Header />
      <h1>Categories</h1>
      <CategoryForm />
      <ul>
        {categories.map((category) => (
          <div key={category.id}>
            <HabitForm userId={1} categoryId={category.id} />
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

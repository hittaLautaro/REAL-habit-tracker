// src/components/CategoryList.js
import { useEffect, useState } from "react";
import CategoryService from "./CategoryService";
import Header from "../global/Header";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await CategoryService.getAll();
      console.log("Fetched Categories:", response.data); // Check the data structure
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  return (
    <div>
      <Header />
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <div key={category.id}>
            <li>
              {"id: "} {category.id}{" "}
            </li>
            <li>
              {"name: "}
              {category.name}{" "}
            </li>
            <li>
              {"user id: "}
              {category.user_id}{" "}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;

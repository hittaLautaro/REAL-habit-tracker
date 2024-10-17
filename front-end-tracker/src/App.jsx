// src/App.js
import { Route, Routes } from "react-router-dom";
import CategoryList from "./components/Category/CategoryList";
import CategoryForm from "./components/Category/CategoryForm";
import UserList from "./components/User/UserList";
import UserForm from "./components/User/UserForm";
import HabitForm from "./components/Habit/HabitForm";
import HabitList from "./components/Habit/HabitList";
import Home from "./components/Home";
import CategoryManager from "./components/Category/CategoryManager";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CategoryManager />} />
      </Routes>
    </div>
  );
};

export default App;

/*

 <Routes>
        <Route path="/users" element={<UserList />} />
        <Route path="/users/add" element={<UserForm />} />
        <Route path="/users/edit/:id" element={<UserForm />} />
        <Route path="/habits" element={<HabitList />} />
        <Route path="/habits/add" element={<HabitForm />} />
        <Route path="/habits/edit/:id" element={<HabitForm />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/categories/add" element={<CategoryForm />} />
        <Route path="/categories/edit/:id" element={<CategoryForm />} />
</Routes>

*/

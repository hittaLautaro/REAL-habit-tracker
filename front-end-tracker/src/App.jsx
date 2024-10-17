// src/App.js
import { Route, Routes } from "react-router-dom";

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

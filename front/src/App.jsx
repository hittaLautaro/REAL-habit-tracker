// src/App.js
import { Route, Routes } from "react-router-dom";
import "./index.css";

import HomePage from "./pages/App/Home/page.jsx";
import LoginPage from "./pages/Auth/Login/page.jsx";
import RegisterPage from "./pages/Auth/Signup/page.jsx";
import ManageHabits from "./pages/App/ManageHabits/page.jsx";
import HabitPage from "./pages/App/Todo/page.jsx";
import { HabitProvider } from "./components/contexts/HabitContext.jsx";
import ChangePasswordPage from "./pages/Auth/ChangePassword/page.jsx";

const App = () => {
  return (
    <div className="main-app">
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/change-password" element={<ChangePasswordPage />} />

        <Route
          path="/"
          element={
            <HabitProvider>
              <HomePage />
            </HabitProvider>
          }
        />

        <Route
          path="/todo"
          element={
            <HabitProvider>
              <HabitPage />
            </HabitProvider>
          }
        />

        <Route
          path="/my-habits"
          element={
            <HabitProvider>
              <ManageHabits />
            </HabitProvider>
          }
        />
      </Routes>
    </div>
  );
};

export default App;

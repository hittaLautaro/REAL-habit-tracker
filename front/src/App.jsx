// src/App.js
import { Route, Routes } from "react-router-dom";
import "./index.css";

import HomePage from "./pages/Home/page.jsx";
import LoginPage from "./pages/Login/page.jsx";
import RegisterPage from "./pages/Signup/page.jsx";
import AllHabitsPage from "./pages/MyHabits/page.jsx";
import HabitPage from "./pages/Todo/page.jsx";
import { HabitProvider } from "./components/contexts/HabitContext.jsx";
import ChangePasswordPage from "./pages/ChangePassword/page.jsx";

const App = () => {
  return (
    <div className="main-app">
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/change-password" element={<ChangePasswordPage />} />
        <Route path="/" element={<HomePage />} />

        <Route
          path="/habits"
          element={
            <HabitProvider>
              <HabitPage />
            </HabitProvider>
          }
        />

        <Route
          path="/all-habits"
          element={
            <HabitProvider>
              <AllHabitsPage />
            </HabitProvider>
          }
        />
      </Routes>
    </div>
  );
};

export default App;

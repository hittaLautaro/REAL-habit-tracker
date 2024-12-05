// src/App.js
import { Route, Routes } from "react-router-dom";
import "./index.css";

import HomePage from "./components/pages/HomePage/HomePage.jsx";
import LoginPage from "./components/pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./components/pages/RegisterPage/RegisterPage.jsx";
import AllHabitsPage from "./components/pages/AllHabitsPage/AllHabitsPage.jsx";

const App = () => {
  return (
    <div className="main-app">
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/habits" element={<AllHabitsPage />} />
      </Routes>
    </div>
  );
};

export default App;

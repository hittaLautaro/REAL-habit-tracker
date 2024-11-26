// src/App.js
import { Route, Routes } from "react-router-dom";
import "./index.css";

import Header from "./components/Global/Header";
import HomePage from "./components/pages/HomePage.jsx";
import LoginPage from "./components/pages/LoginPage.jsx";
import RegisterPage from "./components/pages/RegisterPage.jsx";

const App = () => {
  return (
    <div className="main-app">
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
};

export default App;

// src/App.js
import { Route, Routes } from "react-router-dom";
import "./index.css";

import Header from "./components/Global/Header";
import HomePage from "./components/HomePage/HomePage.jsx";
import LoginPage from "./components/LoginPage/LoginPage.jsx";
import RegisterPage from "./components/RegisterPage/RegisterPAge.jsx";

const App = () => {
  return (
    <div className="main-app">
      <Header />
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
};

export default App;

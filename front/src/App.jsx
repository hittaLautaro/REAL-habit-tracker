// src/App.js
import { Route, Routes } from "react-router-dom";
import "./index.css";
import LoginPage from "./components/LoginPage/LoginPage";
import Header from "./components/Global/Header";
import HomePage from "./components/HomePage/HomePage.jsx";

const App = () => {
  return (
    <div className="main-app">
      <Header />
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default App;

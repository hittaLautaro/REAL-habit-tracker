// src/App.js
import { Route, Routes } from "react-router-dom";
import CategoryManager from "./components/Category/CategoryManager";
import "./index.css";
import LoginPage from "./components/LoginPage/LoginPage";
import Header from "./components/Global/Header";

const App = () => {
  return (
    <div className="main-app">
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/habits" element={<CategoryManager />} />
      </Routes>
    </div>
  );
};

export default App;

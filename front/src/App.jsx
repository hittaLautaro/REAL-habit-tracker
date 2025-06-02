import "./index.css";
import HomePage from "./pages/App/Home/page.jsx";
import LoginPage from "./pages/Auth/Login/page.jsx";
import RegisterPage from "./pages/Auth/Signup/page.jsx";
import ManageHabits from "./pages/App/ManageHabits/page.jsx";
import HabitPage from "./pages/App/Todo/page.jsx";
import VerifyPage from "./pages/Auth/Verification/VerifyPage.jsx";
import DeletePage from "./pages/Auth/DeleteAccount/page.jsx";
import LandingPage from "./pages/App/Landing/page.jsx";
import { Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./components/context/AuthContext.jsx";

const AppRoutes = () => {
  const { isAuthenticated, isLoading, token } = useAuth();

  // Show loading while checking authentication
  if (token && isLoading) {
    return (
      <div className="loading-container">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="main-app">
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/account/verify" element={<VerifyPage />} />
        <Route path="/account/delete" element={<DeletePage />} />
        <Route
          path="/"
          element={isAuthenticated ? <HomePage /> : <LandingPage />}
        />
        <Route path="/todo" element={<HabitPage />} />
        <Route path="/my-habits" element={<ManageHabits />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;

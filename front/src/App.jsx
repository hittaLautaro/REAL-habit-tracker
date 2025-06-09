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
import AuthCallback from "./pages/Auth/Callback/AuthCallback.jsx";
import logo from "./assets/logo.svg";

const AppRoutes = () => {
  const { isAuthenticated, isLoading, token } = useAuth();

  if (token && isLoading) {
    return (
      <div
        className="flex flex-col items-center justify-center h-screen w-screen bg-black"
        role="status"
        aria-live="polite"
      >
        <div className="mb-2 flex flex-row items-center justify-center">
          <img src={logo} alt="Real Logo" className="h-8 w-auto" />
          <h2 className="ml-2 text-white font-bold text-4xl mono-600 ">
            real.
          </h2>
        </div>
        <div className="w-8 h-8 border-4 border-neutral-700 border-t-white rounded-full animate-spin" />
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
        <Route path="/auth/callback" element={<AuthCallback />} />
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

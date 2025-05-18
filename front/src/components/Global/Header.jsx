"use client";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import "../global/styles.css";
import AuthService from "../../services/authService.js";
import Swal from "sweetalert2";
import "bootstrap-icons/font/bootstrap-icons.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will log you off your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, logout!",
      preConfirm: async () => {
        try {
          await AuthService.logout();
          localStorage.clear();
          navigate("/api/auth/login");
        } catch (error) {
          Swal.showValidationMessage(`Logout failed: ${error.message}`);
        }
      },
    });
  };

  return (
    <header>
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="navbar-content">
          {/* Logo */}
          <div className="title-container">
            <NavLink className="title" to="/" aria-label="Home">
              <h2>real.</h2>
            </NavLink>
          </div>

          {/* Centered Links */}
          <div id="navbar-links" className="navbar-links ml-32">
            <NavLink
              to="/todo"
              className={({ isActive }) =>
                isActive ? "nav-link mx-3 active " : "nav-link mx-3"
              }
              aria-current={location.pathname === "/todo" ? "page" : undefined}
            >
              <span className="mx-3  text-lg text-center">Daily Habits</span>
            </NavLink>
            <NavLink
              to="/my-habits"
              className={({ isActive }) =>
                isActive ? "nav-link mx-3 active" : "nav-link mx-3"
              }
              aria-current={
                location.pathname === "/my-habits" ? "page" : undefined
              }
            >
              <span className="mx-3  text-lg text-center">Manage Habits</span>
            </NavLink>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              className="logout-btn"
              aria-label="Notifications"
              title="Notifications"
            >
              <i className="bi bi-lightbulb"></i>
            </button>
            <button
              className="logout-btn"
              aria-label="Settings"
              title="Settings"
            >
              <i className="bi bi-gear"></i>
            </button>
            <button
              className="logout-btn"
              aria-label="Logout"
              title="Logout"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right"></i>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

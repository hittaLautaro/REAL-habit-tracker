import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import "../global/styles.css";
import AuthService from "../../services/authService.js";
import Swal from "sweetalert2";

import "bootstrap-icons/font/bootstrap-icons.css";

import "../global/styles.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will log you off your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
      preConfirm: async () => {
        AuthService.logout().then(() => {
          localStorage.clear();
          navigate("/auth/login");
        });
      },
    });
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <NavLink className="title" to="/">
          <h2>real.</h2>
        </NavLink>

        {/* Centered Links */}
        <div className="navbar-links justify-space-between">
          <NavLink to="/todo" className="nav-link mx-3">
            <span className="mt-1 custom-font-normal">Daily Habits</span>
          </NavLink>
          <NavLink to="/my-habits" className="nav-link mx-3">
            <span className="mt-1 custom-font-normal">Manage Habits</span>
          </NavLink>
        </div>
        <div className="mr-0">
          <button
            className="logout-btn"
            aria-label="Logout"
            onClick={handleLogout}
          >
            <i className="bi bi-lightbulb"></i>
          </button>
          <button
            className="logout-btn"
            aria-label="Logout"
            onClick={handleLogout}
          >
            <i className="bi bi-gear"></i>
          </button>
          {/* Logout Button */}
          <button
            className="logout-btn"
            aria-label="Logout"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;

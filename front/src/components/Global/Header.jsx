import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import UserService from "../utils/authService";
import Swal from "sweetalert2";

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
        UserService.logout().then(() => {
          localStorage.clear();
          navigate("/auth/login");
        });
      },
    });
  };

  return (
    <nav className="navbar">
      <NavLink className="title" to="/">
        <h2>Real</h2>
      </NavLink>
      <button type="button" className="btn btn-dark m-2" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Header;

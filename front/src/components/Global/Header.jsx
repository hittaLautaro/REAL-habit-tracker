import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <nav className="navbar">
    <NavLink className="title" to="/">
      real.
    </NavLink>
  </nav>
  );
};

export default Header;
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <nav>
      <Link to="/" className="title">
        REAL
      </Link>
      <ul>
        <li>
          <NavLink to="/habits"> Habits </NavLink>
        </li>
        <li>
          <NavLink to="/users"> Users </NavLink>
        </li>
        <li>
          <NavLink to="/categories"> Categories </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;

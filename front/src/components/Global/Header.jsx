import { Link, NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <nav className=" fixed-top">
      <div className="container-fluid">
        <NavLink className="title" to="/">
          real.
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;

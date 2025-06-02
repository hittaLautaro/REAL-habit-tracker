import React from "react";
import "../../../components/Global/styles.css";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/logo.svg";

export default function Navbar() {
  return (
    <div className="bg-black p-3 border-b border-neutral-900">
      <div className="flex items-center justify-between mx-auto">
        <NavLink
          href="/"
          className="text-decoration-none flex items-center group hover:scale-110 duration-300 ml-3"
        >
          <img src={logo} alt="Real Logo" className="h-8 w-auto " />

          <h2 className="ml-2 text-white font-bold text-4xl mono-600 ">
            real.
          </h2>
        </NavLink>

        <div className="flex gap-3 mr-2">
          <NavLink
            to="/auth/login"
            className="group !border !border-dashed hover:!border-solid border-white bg-black hover:!bg-white text-white hover:!text-black font-semibold py-2 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
          >
            Login
          </NavLink>
          <NavLink
            to="/auth/register"
            className="group !border bg-white text-black hover:!text-white hover:!bg-black hover:!border-white hover:!border-dashed font-semibold py-2 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
          >
            Sign Up
          </NavLink>
        </div>
      </div>
    </div>
  );
}

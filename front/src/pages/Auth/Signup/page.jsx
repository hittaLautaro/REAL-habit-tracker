import React, { useState } from "react";
import AuthService from "../../../services/authService.js";
import { useNavigate, useNavigation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import logo from "../../../assets/logo.svg";
import { NavLink } from "react-router-dom";
import { Loader, Loader2 } from "lucide-react";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../components/Global/styles.css";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);
    AuthService.register({
      email: email,
      password: password,
      dateOfBirth: dateOfBirth,
      name: name,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    })
      .then((response) => {
        setIsLoading(false);

        if (response.status === 200) {
          navigate("/auth/login");
        }

        setEmail("");
        setPassword("");
        setDateOfBirth("");
        setName("");
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response) {
          setError("Signup failed. Please try again.");
        } else {
          setError("Connection error. Please try again.");
        }
      });
  };

  return (
    <div className="flex flex-col items-center min-h-screen justify-center gap-5">
      <NavLink
        to="/"
        className="text-decoration-none flex items-center group hover:scale-110 duration-300 ml-3"
      >
        <img
          src={logo}
          alt="Real Logo"
          className="h-8 w-auto scale-150 mt-1 mr-2"
        />
        <h2 className="ml-2 text-white font-bold text-6xl mono-600 ">real.</h2>
      </NavLink>
      <div
        className="container d-flex justify-content-center align-items-center mb-14"
        style={{ minHeight: "calc(100vh - 450px)" }}
      >
        <div
          className="col-12 col-sm-8 col-md-6 col-lg-4 p-4 rounded shadow"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <h2 className="text-center mb-4" style={{ color: "#121212" }}>
            Sign up
          </h2>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3" style={{ color: "#121212" }}>
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
            </div>
            <div className="mb-3" style={{ color: "#121212" }}>
              <label htmlFor="name">Name</label>
              <input
                className="form-control"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3" style={{ color: "#121212" }}>
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 flex flex-col" style={{ color: "#121212" }}>
              <label htmlFor="date">Date of Birth</label>
              <DatePicker
                selected={dateOfBirth ? new Date(dateOfBirth) : null}
                onChange={(date) =>
                  setDateOfBirth(date.toISOString().split("T")[0])
                }
                maxDate={new Date()}
                minDate={new Date("1900-01-01")}
                placeholderText="Select your birth date"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                n
                dateFormat="yyyy-MM-dd"
                className="form-control"
                required
              />
            </div>

            <div className="d-grid gap-2">
              <button
                type="submit"
                className="btn btn-dark btn-md justify-items-center py-2"
                style={{
                  backgroundColor: "#007bff",
                  border: "none",
                  transition: "all 0.3s",
                  marginBottom: "10px",
                }}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin my-1" size={16} />
                ) : (
                  "Sign Up"
                )}
              </button>
              <button
                type="button"
                className="btn btn-link text-dark btn-sm"
                onClick={() => navigate("/auth/login")}
                style={{
                  padding: 0,
                  border: "none",
                  background: "none",
                }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

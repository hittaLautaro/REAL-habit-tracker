import React, { useState } from "react";
import AuthService from "../../../services/authService.js";
import { useNavigate, useNavigation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../components/Global/styles.css";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
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

    AuthService.register({
      email: email,
      password: password,
      dateOfBirth: dateOfBirth,
      name: name,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    })
      .then((response) => {
        if (response.status === 200) {
          navigate("/");
        }

        setEmail("");
        setPassword("");
        setDateOfBirth("");
        setName("");
      })
      .catch((err) => {
        if (err.response) {
          setError("Signup failed. Please try again.");
        } else {
          setError("Connection error. Please try again.");
        }
      });
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <div className="text-center mb-4 my-5">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-yellow-400 fs-big mono-600">
          real.
        </h1>
        <h3 className="mono-300 text-white">
          Simple & customizable habit tracker!
        </h3>
      </div>
      <div
        className="container d-flex justify-content-center align-items-center"
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
                className="btn btn-dark btn-md "
                style={{
                  backgroundColor: "#007bff",
                  border: "none",
                  transition: "all 0.3s",
                  marginBottom: "10px",
                }}
              >
                Sign up
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

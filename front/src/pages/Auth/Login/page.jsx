import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../components/context/AuthContext";
import AuthService from "../../../services/authService.js";
import axiosInstance from "../../../services/axiosInstance.js";

import "../../../components/Global/styles.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleOAuth() {
    try {
      const response = await axiosInstance.get(
        "/oauth2/google/authorization-url"
      );
      const url = response.data.authorizationUrl;

      // Redirect user to Google OAuth2 authorization URL
      window.location.href = url;
    } catch (error) {
      console.error("Failed to get authorization URL:", error);
      // You can also show an error message to the user here
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      console.log("=== Starting login process ===");

      // First, login with AuthService
      console.log("Calling AuthService.login...");
      const response = await AuthService.login({
        email: email,
        password: password,
        time_zone: currentTimeZone,
      });

      console.log("AuthService.login response:", response);

      const token =
        response.data?.token || response.data?.accessToken || response.token;
      console.log(
        "Extracted token:",
        token ? `${token.substring(0, 20)}...` : "No token found"
      );

      if (!token) {
        throw new Error("No token received from login response");
      }

      // Wait for context login to complete
      console.log("Calling context login...");
      await login(token);

      console.log("Login successful, navigating...");
      navigate("/");
    } catch (err) {
      console.error("=== Login process failed ===");
      console.error("Error:", err);

      if (err.response) {
        const status = err.response.status;
        console.error("HTTP Error:", status, err.response.data);

        if (status === 401) {
          setError("Invalid credentials.");
          return;
        }
      }

      // Set a more specific error message
      if (
        err.message === "No user data returned" ||
        err.message === "Failed to fetch user data"
      ) {
        setError(
          "Login successful but failed to load user profile. Please refresh the page."
        );
      } else {
        setError("Login failed. Please try again.");
      }
    }
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
            Login
          </h2>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <button
            onClick={() => {
              handleOAuth();
            }}
            className="flex justify-center bg-white !border !border-gray-300 rounded-md w-full  px-4 py-2 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <svg
              className="w-6 h-6 mr-3"
              viewBox="0 0 533.5 544.3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#4285F4"
                d="M533.5 278.4c0-17.5-1.6-34.4-4.8-50.8H272v95.9h146.9c-6.3 34.3-25.4 63.4-54.4 82.8v68h87.8c51.2-47.2 80.2-116.7 80.2-195.9z"
              />
              <path
                fill="#34A853"
                d="M272 544.3c73.6 0 135.5-24.3 180.7-65.9l-87.8-68c-24.4 16.4-55.8 26.2-92.9 26.2-71.5 0-132-48.3-153.7-113.2h-90.8v70.9c45.4 90.5 138.8 150 244.5 150z"
              />
              <path
                fill="#FBBC05"
                d="M118.3 321.4c-10.3-30.4-10.3-63 0-93.4v-70.9h-90.8c-38.6 75.8-38.6 166.6 0 242.4l90.8-70.9z"
              />
              <path
                fill="#EA4335"
                d="M272 107.7c39.9 0 75.7 13.7 103.8 40.6l77.8-77.8C399.9 24.9 341 0 272 0 166.3 0 72.9 59.5 27.5 150l90.8 70.9c21.7-64.9 82.2-113.2 153.7-113.2z"
              />
            </svg>
            <span className="text-gray-700 font-medium">
              Sign in with Google
            </span>
          </button>

          <div className="flex justify-center items-center my-3">
            <span className="text-black">or</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3" style={{ color: "#121212" }}>
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                id="email"
                placeholder="Enter email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3" style={{ color: "#121212" }}>
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                id="password"
                placeholder="Enter password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* <button
                type="button"
                className="btn btn-link text-dark btn-sm"
                onClick={() => navigate("/auth/change-password")}
                style={{
                  padding: 0,
                  border: "none",
                  background: "none",
                }}
              >
                Forgot password?
              </button> */}
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
                Login
              </button>
              <button
                type="button"
                className="btn btn-link text-dark btn-sm"
                onClick={() => navigate("/auth/register")}
                style={{
                  padding: 0,
                  border: "none",
                  background: "none",
                }}
              >
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UserService from "../User/UserService.jsx";
import { useNavigate, useNavigation } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Add error state
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    
    UserService.login({ email: email, password: password })
      .then((response) => {
        localStorage.setItem('jwtToken', response.data.accessToken);
        console.log("email "+email)
        console.log("pass "+password)
        console.log(response.data.accessToken);
        navigate("/")
      })
      .catch((err) => {
        // Handle different error cases
        if (err.response) {
          switch (err.response.status) {
            case 401:
              setError("Invalid email or password");
              break;
            case 404:
              setError("Account not found");
              break;
            default:
              setError("Login failed. Please try again.");
          }
        } else {
          setError("Connection error. Please try again.");
        }
      });
  };

  return (
    <div className="my-5">
      <div>
        <h2>Login</h2>
        {/* Add error message display */}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div>
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
          <div>
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
          </div>
          <button type="submit" className="btn btn-dark">
            Login
          </button>
          <button type="button" className="btn btn-dark" onClick={() => navigate("/auth/register")}>
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
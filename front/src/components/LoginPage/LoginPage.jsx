import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LoginPage.css";
import UserService from "../User/UserService.jsx";
import { useNavigate, useNavigation } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    UserService.login({ email: email, password: password })
        .then((response) => {
          const token = response.data
          localStorage.setItem('jwtToken', token);
          // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          // Testing
          console.log(email)
          console.log(password)
          console.log(token);

          navigate("/home")
        })
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card login-card p-4">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input  
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RegisterPage.css";
import UserService from "../User/UserService.jsx";
import { useNavigate, useNavigation } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    UserService.register({ email: email, password: password, dateOfBirth: dateOfBirth})
        .then((response) => {
          localStorage.setItem('jwtToken', response.data.accessToken);
          // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          // Testing
          console.log("email "+email)
          console.log("pass "+password)
          console.log("dateOfBirth "+dateOfBirth)
          console.log(response.data.accessToken);

          navigate("/")
        })
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card login-card p-4">
        <h2 className="text-center mb-4">Signup</h2>
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
          <div className="form-group mb-3">
            <label htmlFor="date">Date of Birth</label>
            <input  
              className="form-control"
              id="date"
              placeholder="Enter date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

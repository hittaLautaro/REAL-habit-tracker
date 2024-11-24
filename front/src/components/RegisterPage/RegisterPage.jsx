import React, { useState } from "react";
import UserService from "../User/UserService.jsx";
import { useNavigate, useNavigation } from "react-router-dom";

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    UserService.register({ email: email, password: password, dateOfBirth: dateOfBirth})
        .then((response) => {

          if(response.status === 200){
            localStorage.setItem('jwtToken', response.data.accessToken);
            navigate("/auth/login")
          }

          setEmail("")
          setPassword("")
          setDateOfBirth("")
        })
  };

  return (
    <div className="mx-5 my-5 mx-auto">
      <div>
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div>
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
          <div>
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
          <div>
            <label htmlFor="date">Date of Birth</label>
            <input  
              className="form-control"
              id="date"
              placeholder="Enter date"
              value={dateOfBirth}
              type="date"
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </div>
         
          
          <button type="submit" className="btn btn-dark">
            Signup
          </button>
          <button type="button" className="btn btn-dark" onClick={() => navigate("/auth/login")}>
            Login
          </button>
        </form>
      </div>
    </div>

    
  );
};

export default RegisterPage;

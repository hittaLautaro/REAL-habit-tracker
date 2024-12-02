import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UserService from "../utils/authService";
import { useNavigate, useNavigation } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    
    UserService.login({ email: email, password: password, time_zone: currentTimeZone})
      .then((response) => {
        console.log(response.data)
        console.log(currentTimeZone)
        navigate("/")
      })
      .catch((err) => {
        if (err.response) {
          setError("Login failed. Please try again.");
        }
      });
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center my-5">
      <div className="text-center mb-4 my-5">
        <h1 className="display-3">Real.</h1>
        <h1 className="h3">Habits & tasks tracker</h1>
      </div>
      <div className="container d-flex justify-content-center align-items-center"   style={{ minHeight: "calc(100vh - 450px)" }}>
        <div className="col-12 col-sm-8 col-md-6 col-lg-4 p-4 rounded shadow" style={{ backgroundColor: '#f8f9fa' }}>
          <h2 className="text-center mb-4" style={{ color: '#121212' }}>Login</h2>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3" style={{ color: '#121212' }}>
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
            <div className="mb-3" style={{ color: '#121212' }}> 
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
            <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-dark btn-md " 
                    style={{
                      backgroundColor: '#007bff',
                      border: 'none',
                      transition: 'all 0.3s',
                      marginBottom: '10px'
                    }}>
                    Login
                  </button>
                  <button 
                      type="button" 
                      className="btn btn-link text-dark btn-sm"
                      onClick={() => navigate("/auth/register")}
                      style={{
                        padding: 0,
                        border: 'none',
                        background: 'none',
                      }}>
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
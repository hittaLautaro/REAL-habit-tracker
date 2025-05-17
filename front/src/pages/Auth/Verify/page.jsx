import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "../../../services/authService";
import { useNavigate, useLocation } from "react-router-dom";

import "../../../components/global/styles.css";

const VerifyPage = () => {
  const location = useLocation();
  const email = location.state?.email;
  const from = location.state?.from;
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    AuthService.verify({
      email: email,
      verificationCode: verificationCode,
    })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        if (err.response) {
          setError("Verification failed! Please try again");
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
            Verification
          </h2>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4 text-[#121212]">
              <label htmlFor="code" className="block text-sm font-medium mb-1">
                Verification Code
              </label>
              <input
                id="code"
                type="text"
                inputMode="numeric"
                maxLength={6}
                pattern="\d*"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-lg tracking-widest text-center"
                placeholder="000000"
                value={verificationCode}
                onChange={(e) => {
                  const code = e.target.value.replace(/\D/g, "");
                  setVerificationCode(code);
                }}
                required
              />
            </div>
            <div className="mb-3 text-sm text-gray-700">
              A verification code was sent to{" "}
              <span className="font-medium">{email}</span>
            </div>

            <div className="mb-3 text-sm text-gray-700">
              Click here to{" "}
              <button className="font-medium underline" onClick>
                resend
              </button>{" "}
              the verification code.
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
                Verify
              </button>
              <div className="flex flex-row align-items-center justify-center gap-2">
                <button
                  type="button"
                  className="btn btn-link text-dark"
                  onClick={() => navigate("/auth/login")}
                  style={{
                    padding: 0,
                    border: "none",
                    background: "none",
                  }}
                >
                  Login
                </button>
                <span> or </span>
                <button
                  type="button"
                  className="btn btn-link text-dark"
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;

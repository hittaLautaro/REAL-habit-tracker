import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthService from "../../../services/authService";
import "../../../components/global/styles.css";
import ErrorPage from "./ErrorPage";
import SuccessPage from "./successPage";

const VerifyPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const [status, setStatus] = useState("loading"); // 'loading' | 'success' | 'error'

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    AuthService.verify(token)
      .then(() => setStatus("success"))
      .catch((err) => {
        setStatus("error");
      });
  }, [token]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      {status === "loading" && <p className="text-white">Loading...</p>}
      {status === "success" && <SuccessPage />}
      {status === "error" && <ErrorPage token={token} />}
    </div>
  );
};

export default VerifyPage;

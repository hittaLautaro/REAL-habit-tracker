import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthService from "../../../services/authService";
import "../../../components/global/styles.css";
import CountdownRedirect from "./CountdownRedirect";
import ResendButton from "./ResendButton";

const VerifyPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const [status, setStatus] = useState("loading"); // "loading, "success", "error", "invalid_token", "already_verified", "token_expired"

  useEffect(() => {
    if (!token) {
      setStatus("invalid_token");
      return;
    }

    AuthService.verify(token)
      .then(() => setStatus("success"))
      .catch((err) => {
        const code = err?.response?.data;

        switch (code) {
          case "already_verified":
            setStatus("already_verified");
            break;
          case "invalid_token":
            setStatus("invalid_token");
            break;
          case "token_expired":
            setStatus("token_expired");
            break;
          default:
            setStatus("error");
        }
      });
  }, [token]);

  const statusMap = {
    loading: <p className="text-white">Verifying…</p>,
    success: (
      <div className="flex text-white flex-col align-items-center">
        <h1 className="mono-600 text-green-400">Verication Success</h1>
        <p className="mono-400">
          You have successfully verified your email address.
        </p>
        <CountdownRedirect />
      </div>
    ),
    already_verified: (
      <div className="flex flex-col align-items-center">
        <h1 className="mono-600 text-yellow-400">Already Verified</h1>
        <p className="mono-400 text-sm text-white">
          The user it's already verified.
        </p>
        <CountdownRedirect />
      </div>
    ),
    invalid_token: (
      <div className="flex flex-col align-items-center">
        <h1 className="mono-600 text-red-400">Verication Failed</h1>
        <p className="mono-400 text-sm text-white">
          This verification link is invalid.
        </p>
        <CountdownRedirect />
      </div>
    ),
    token_expired: (
      <div className="flex flex-col align-items-center">
        <h1 className="mono-600 text-red-400">Verication Failed</h1>
        <p className="mono-400 text-sm text-white">
          This verification link has expired. Please request a new one.
        </p>
        <ResendButton />
      </div>
    ),
    error: (
      <div className="flex flex-col align-items-center">
        <h1 className="mono-600 text-red-400">Verication Failed</h1>
        <p className="mono-400 text-sm text-white">
          There was an error verifying your email. Please try again later.
        </p>
      </div>
    ),
  };

  return (
    <div className="flex flex-col  justify-center h-[calc(100vh-150px)]">
      <div className="flex text-white flex-col align-items-center">
        {statusMap[status]}
      </div>
    </div>
  );
};

export default VerifyPage;

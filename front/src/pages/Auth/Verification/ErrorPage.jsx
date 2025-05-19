import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthService from "../../../services/authService";
import "../../../components/global/styles.css";

const ErrorPage = ({ token }) => {
  const [resendStatus, setResendStatus] = useState("idle"); // 'idle' | 'sending' | 'sent' | 'failed'

  const handleResend = async () => {
    setResendStatus("sending");
    try {
      await AuthService.resendVerificationEmail(token);
      setResendStatus("sent");
    } catch (e) {
      console.error(e);
      setResendStatus("sent");
    }
  };

  return (
    <div className="flex flex-col  justify-center h-[calc(100vh-150px)]">
      <div className="flex text-white flex-col align-items-center">
        <h1 className="mono-600 text-red-400">Verification Failed</h1>
        <p className="mono-400">
          The verification link may be invalid or expired. Please click below to
          resend the verification email.
        </p>
      </div>
      <div className="flex flex-col text-black mono-500 align-items-center">
        <button
          onClick={handleResend}
          disabled={resendStatus === "sending" || resendStatus === "sent"}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5em",
            padding: "0.6em 1.2em",
            fontSize: "1rem",
            backgroundColor: "white",
            disabled: resendStatus !== "true",
            color: "black",
            border: "none",
            borderRadius: "5px",
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
            alt="email icon"
            style={{ width: "20px", height: "20px", marginRight: "0.5em" }}
          />
          {resendStatus === "sending"
            ? "Sending..."
            : resendStatus === "sent"
            ? "Sent!"
            : "Resend"}
        </button>
        {resendStatus === "failed" && (
          <p className="text-red-300 mt-2">Resend failed. Try again later.</p>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;

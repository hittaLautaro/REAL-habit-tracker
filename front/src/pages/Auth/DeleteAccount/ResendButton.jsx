import { useState } from "react";
import AuthService from "../../../services/authService";

const ResendButton = () => {
  const [resendStatus, setResendStatus] = useState("idle"); // idle | sending | sent | failed
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = "";

  const handleResend = async () => {
    setLoading(true);
    setResendStatus("sending");
    setMessage("");
    try {
      AuthService.resendVerificationEmail(token).then((res) => {
        if (res.status === 200) {
          setResendStatus("sent");
          setMessage("Verification email sent.");
        } else {
          setResendStatus("failed");
          setMessage("Failed to resend verification.");
        }
      });
      setLoading(false);
    } catch (error) {
      setResendStatus("failed");
      setMessage("Failed to resend verification.");
    }
  };

  return (
    <div className="flex flex-col text-black mono-600 align-items-center">
      <button
        onClick={handleResend}
        disabled={
          resendStatus === "sending" || resendStatus === "sent" || loading
        }
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5em",
          padding: "0.4em 1em",
          fontSize: "1rem",
          backgroundColor: "white",
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
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};

export default ResendButton;

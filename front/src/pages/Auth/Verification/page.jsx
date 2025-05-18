import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AuthService from "../../../services/authService";

const VerifyPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const [status, setStatus] = useState("loading"); // 'loading' | 'success' | 'error'

  console.log(token);

  useEffect(() => {
    AuthService.verify(token)
      .then((res) => {
        setStatus("success");
      })
      .catch((err) => {
        console.error(err);
        setStatus("error");
      });
  }, [token]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      {status === "loading" && <p>🔄 Verifying your email...</p>}

      {status === "success" && (
        <>
          <h2>✅ Email Verified Successfully!</h2>
          <p>You can now use your account normally.</p>
        </>
      )}

      {status === "error" && (
        <>
          <h2>❌ Verification Failed</h2>
          <p>The verification link may be invalid or expired.</p>
        </>
      )}
    </div>
  );
};

export default VerifyPage;

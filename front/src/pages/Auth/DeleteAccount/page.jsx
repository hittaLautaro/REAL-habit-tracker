import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthService from "../../../services/authService";
import "../../../components/Global/styles.css";
import ResendButton from "./ResendButton";

const DeleteAccountPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("initial"); // Start with "initial" instead of "token_expired"
  const [isDeleting, setIsDeleting] = useState(false); // Add loading state

  const handleDelete = async () => {
    if (!token) {
      setStatus("invalid_token");
      return;
    }

    // Prevent multiple clicks
    if (isDeleting) {
      return;
    }

    setIsDeleting(true);
    setStatus("loading");

    try {
      await AuthService.delete(token);
      setStatus("success");
    } catch (err) {
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
    } finally {
      setIsDeleting(false);
    }
  };

  const statusMap = {
    initial: (
      <div className="flex flex-col mono-600 align-items-center">
        <h2 className="text-red-200 font-bold">Delete Account</h2>
        <p className="text-sm text-red-100 ">
          Are you sure you want to delete your account? This action cannot be
          undone.
        </p>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className={`mt-4 px-4 py-2 rounded text-white ${
            isDeleting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {isDeleting ? "Deleting..." : "Delete Account"}
        </button>
      </div>
    ),
    loading: (
      <div className="flex flex-col align-items-center">
        <p className="text-white">Deleting your account...</p>
      </div>
    ),
    invalid_token: (
      <div className="flex flex-col align-items-center">
        <h1 className="mono-600 text-red-400">Deletion Failed</h1>
        <p className="mono-400 text-sm text-white">
          The account deletion link is invalid.
        </p>
      </div>
    ),
    token_expired: (
      <div className="flex flex-col align-items-center">
        <h1 className="mono-600 text-red-400">Deletion Failed</h1>
        <p className="mono-400 text-sm text-white">
          This account deletion link has expired. Please request a new one.
        </p>
        <ResendButton />
      </div>
    ),
    error: (
      <div className="flex flex-col align-items-center">
        <h1 className="mono-600 text-red-400">Deletion Failed</h1>
        <p className="mono-400 text-sm text-white">
          There was an error deleting your account. Please try again later.
        </p>
      </div>
    ),
    success: (
      <div className="flex flex-col align-items-center">
        <h1 className="mono-600 text-green-400">Account Deleted</h1>
        <p className="mono-400 text-sm text-white">
          Your account has been successfully deleted. We are sorry to see you
          go.
        </p>
      </div>
    ),
  };

  return (
    <div className="flex flex-col align-items-center justify-center h-[calc(100vh-100px)]">
      {statusMap[status] || statusMap.initial}
    </div>
  );
};

export default DeleteAccountPage;

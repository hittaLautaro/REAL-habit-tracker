import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../../components/context/AuthContext";

export default function AuthCallback() {
  const { login } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const token = searchParams.get("token");

    if (token) {
      await login(token);
      navigate("/", { replace: true });
    } else {
      navigate("/auth/login", { replace: true });
    }
  };

  useEffect(() => {
    handleLogin();
  }, [searchParams, navigate]);

  return <div>Logging you in...</div>;
}

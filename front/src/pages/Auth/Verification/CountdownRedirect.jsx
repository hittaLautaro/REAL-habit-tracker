import { useState, useEffect } from "react";

export default function CountdownRedirect() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown <= 0) {
      window.location.href = "/";
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <p className="font-mono text-white">
      Redirecting you to the home page in {countdown}{" "}
      {countdown === 1 ? "second" : "seconds"}...
    </p>
  );
}

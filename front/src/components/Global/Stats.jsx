import React, { useEffect } from "react";
import "../../components/global/styles.css";
import { useState } from "react";
import UserService from "../../services/userService.js";

const Stats = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    setLoading(true);
    const response = await UserService.getUserSimpleData();
    console.log(response);
    setUser(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <div className="m-4 sans-600">Loading...</div>;
  }

  return (
    <div
      className="border-dark border-1 rounded m-3 p-4"
      style={{ backgroundColor: "#151515" }}
    >
      <h3 className="sans-600"> Your Stats </h3>
      <p className="mb-0 sans-400 text-lg">Biggest streak</p>
      <p className="mb-0 text-transparent bg-clip-text bg-gradient-to-r bg-green-500 sans-600">
        {user ? user.streak : 5}
      </p>
      <p className="mb-0 sans-600 text-lg">Current streak</p>
      <p className="mb-0 text-transparent bg-clip-text bg-gradient-to-r bg-green-500 sans-600">
        {user ? user.streak : 5}
      </p>
      <p className="mb-0 sans-600 text-lg">Most consistent</p>
      <p className="mb-0 text-transparent bg-clip-text bg-gradient-to-r bg-green-500 sans-600">
        Boxing
      </p>
    </div>
  );
};

export default Stats;

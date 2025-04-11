import React, { useEffect, useState } from "react";

import "../../components/global/styles.css";

import Header from "../../components/global/Header.jsx";

import UserService from "../../services/userService.js";

const HomePage = () => {
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

  return (
    <div>
      <Header />
      {loading ? (
        <h5 className="m-5 custom-font">Loading...</h5>
      ) : (
        <div>
          <h1 className="m-5 custom-font">Hello, {user.email}</h1>
          <h4 className="m-5 custom-font">Current streak: {user.streak}</h4>
        </div>
      )}
    </div>
  );
};

export default HomePage;

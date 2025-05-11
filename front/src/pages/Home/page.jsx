import { useEffect, useState } from "react";
import Header from "../../components/global/Header.jsx";
import UserService from "../../services/userService.js";
import ActivityHeatmap from "../../components/global/ActivityHeatmap.jsx";
import Stats from "../../components/global/Stats.jsx";
import UserWelcome from "./UserWelcome.jsx";

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
      <UserWelcome user={user} />
    </div>
  );
};

export default HomePage;

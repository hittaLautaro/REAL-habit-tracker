import { useEffect, useState } from "react";
import Header from "../../components/global/Header.jsx";
import UserService from "../../services/userService.js";
import ActivityHeatmap from "./ActivityHeatmap.jsx";
import Stats from "./Stats.jsx";
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
      <div className="flex flex-row justify-content-center">
        <ActivityHeatmap />
        <Stats user={user} />
      </div>
    </div>
  );
};

export default HomePage;

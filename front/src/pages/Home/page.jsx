import { useEffect, useState } from "react";
import Header from "../../components/global/Header.jsx";
import UserService from "../../services/userService.js";
import HabitCalendar from "./HabitCalendar.jsx";

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
      <div className="flex flex-col  h-24 w-74 justify-center align-items-center m-5">
        {loading ? (
          <h5 className="m-5 custom-font">Loading...</h5>
        ) : (
          <div>
            <h1 className="custom-font">
              Hello{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-yellow-400">
                  {user.email.split("@")[0]}
                </span>
                <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-gradient-to-r from-green-500 to-yellow-400"></span>
              </span>
              ! Welcome back.
            </h1>
          </div>
        )}
      </div>
      <div className="flex flex-row justify-content-center">
        <section
          className="flex flex-col justify-center border-dark border-1 rounded mx-5 my-4 "
          style={{ backgroundColor: "#151515" }}
        >
          <h3 className="custom-font-light ml-12">Your Habit Activity</h3>
          <HabitCalendar />
          <div className="d-flex ml-12">
            <div className="d-flex align-items-center me-3">
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  backgroundColor: "#68d600",
                  borderRadius: "2px",
                  marginRight: "4px",
                }}
              ></div>
              <small className="custom-font-normal">Completed</small>
            </div>
            <div className="d-flex align-items-center me-3">
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  backgroundColor: "#ffc900",
                  borderRadius: "2px",
                  marginRight: "4px",
                }}
              ></div>
              <small className="custom-font-normal">Some completed</small>
            </div>
            <div className="d-flex align-items-center me-3">
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  backgroundColor: "#ffe890",
                  borderRadius: "2px",
                  marginRight: "4px",
                }}
              ></div>
              <small className="custom-font-normal">None completed</small>
            </div>
            <div className="d-flex align-items-center">
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  backgroundColor: "#757575",
                  borderRadius: "2px",
                  marginRight: "4px",
                }}
              ></div>
              <small className="custom-font-normal">None to complete</small>
            </div>
          </div>
        </section>

        <section
          className="flex flex-col justify-center border-dark border-1 rounded w-25 p-5 mx-5 my-4"
          style={{ backgroundColor: "#151515" }}
        >
          <h3 className="mb-5 custom-font"> Your Stats </h3>
          <h4 className="mt-3 mb-0 custom-font">Biggest streak</h4>
          <h4 className="text-transparent bg-clip-text bg-gradient-to-r bg-green-500 custom-font">
            {user ? user.streak : 5}
          </h4>
          <h4 className="mt-3 mb-0 custom-font">Current streak</h4>
          <h4 className="text-transparent bg-clip-text bg-gradient-to-r bg-green-500 custom-font">
            {user ? user.streak : 5}
          </h4>
          <h4 className="mt-3 mb-0 custom-font">Most consistent</h4>
          <h4 className="text-transparent bg-clip-text bg-gradient-to-r bg-green-500 custom-font">
            Boxing
          </h4>
        </section>
      </div>
    </div>
  );
};

export default HomePage;

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
      {loading ? (
        <h5 className="m-5 custom-font">Loading...</h5>
      ) : (
        <div>
          <h1 className="m-5 custom-font">Hello, {user.email}</h1>
          <h4 className="m-5 custom-font">Current streak: {user.streak}</h4>
        </div>
      )}
      <section className="h-screen w-full flex flex-col justify-center items-center">
        <h3 className="mb-3 custom-font">Your Habit Activity</h3>
        <HabitCalendar
          startDate={"2025-01-01"}
          endDate={"2025-12-31"}
          dataValues={[
            { date: "2025-01-01", count: 3, objective: 0 },
            { date: "2025-01-02", count: 0, objective: 5 },
            { date: "2025-01-03", count: 1, objective: 1 },
            { date: "2025-01-04", count: 1, objective: 5 },
            { date: "2025-01-05", count: 0, objective: 3 },
            { date: "2025-01-06", count: 4, objective: 5 },
            { date: "2025-01-07", count: 1, objective: 4 },
            { date: "2025-01-31", count: 4, objective: 4 },
          ]}
        />
        <div className="mt-3 d-flex">
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
            <small>Completed</small>
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
            <small>Partial</small>
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
            <small>None</small>
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
            <small>No Plan</small>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

import React from "react";
import "../../components/global/styles.css";
import HabitCalendar from "./HabitCalendar.jsx";

const ActivityHeatmap = () => {
  return (
    <section
      className="flex flex-col justify-center border-dark border-1 rounded mx-5 my-4 "
      style={{ backgroundColor: "#151515" }}
    >
      <h3 className="sans-200 ml-12">Your Habit Activity</h3>
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
          <small className="sans-400">Completed</small>
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
          <small className="sans-400">Some completed</small>
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
          <small className="sans-400">None completed</small>
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
          <small className="sans-400">None to complete</small>
        </div>
      </div>
    </section>
  );
};

export default ActivityHeatmap;

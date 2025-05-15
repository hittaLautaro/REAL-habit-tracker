import React, { useState } from "react";
import CompletionCalendar from "./CompletionCalendar.jsx";

const CompletionHeatmap = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const years = [2025, 2024, 2022];

  return (
    <section
      className="border-dark border-1 rounded m-3 p-4"
      style={{ backgroundColor: "#151515" }}
    >
      <div className="flex justify-content-between">
        <h3 className="text-neutral-300 mono-500">Daily Completions</h3>
        <div className="dropdown text-end mr-1 mb-1">
          <button
            className="btn btn-outline-light dropdown-toggle sans-600"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {selectedYear}
          </button>
          <ul className="dropdown-menu">
            {years.map((year) => (
              <li key={year}>
                <button
                  className="dropdown-item text-black mono-600"
                  onClick={() => setSelectedYear(year)}
                >
                  {year}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <CompletionCalendar year={selectedYear} />
      <div className="d-flex">
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
          <small className="text-neutral-300 mono-400">Completed</small>
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
          <small className="text-neutral-300 mono-400">Some completed</small>
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
          <small className="text-neutral-300 mono-400">None completed</small>
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
          <small className="text-neutral-300 mono-400">None to complete</small>
        </div>
      </div>
    </section>
  );
};

export default CompletionHeatmap;

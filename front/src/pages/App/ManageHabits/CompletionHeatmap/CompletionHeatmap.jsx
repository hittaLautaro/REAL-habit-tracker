import React, { useState } from "react";
import CompletionCalendar from "./CompletionCalendar.jsx";
import Skeleton from "../../../../components/Global/Skeleton.jsx";
import CompletionCalendarSkeleton from "./CompletionCalendarSkeleton.jsx";
import { useCompletions } from "../../../../components/hooks/useCompletions.js";
import { useEffect } from "react";

const CompletionHeatmap = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const years = [2025, 2024, 2022];

  const { data: completions, isLoading } = useCompletions(selectedYear);

  if (isLoading) {
    return (
      <section
        className="border-dark border-1 rounded m-3 p-3"
        style={{ backgroundColor: "#151515" }}
      >
        {/* Header section skeleton */}
        <div className="flex justify-content-between mb-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-10 w-20" />
        </div>

        <CompletionCalendarSkeleton year={selectedYear} />

        {/* Legend skeleton */}
        <div className="d-flex gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="d-flex align-items-center">
              <Skeleton
                className="w-4 h-4 me-2"
                style={{ borderRadius: "1px" }}
              />
              <Skeleton className="h-3 w-20" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      className="border-dark border-1 rounded m-3 p-4"
      style={{ backgroundColor: "#151515" }}
    >
      <div className="flex justify-content-between">
        <span className="text-neutral-300 text-xl mono-500">Activity</span>
        <div className="dropdown text-end mr-1 mb-1">
          <button
            className="mono-300 !border !border-neutral-200 p-1 px-2 rounded dropdown-toggle"
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

      <CompletionCalendar year={selectedYear} completions={completions} />
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

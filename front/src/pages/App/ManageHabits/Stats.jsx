import React, { useEffect } from "react";
import "../../../components/Global/styles.css";
import { useState } from "react";

import { useCurrentUser } from "../../../components/hooks/useUser.js";
import Skeleton from "../../../components/Global/Skeleton.jsx";

const Stats = () => {
  const { data: user, isLoading, error } = useCurrentUser();

  if (isLoading) {
    return (
      <section
        className="border-dark border-1 rounded m-3 p-3"
        style={{ backgroundColor: "#151515" }}
      >
        {/* Header section skeleton */}
        <div className="flex justify-content-between mb-3">
          <Skeleton className="h-8 w-32" />
        </div>
        {/* Stats skeletons */}
        <div>
          <div className="mb-3">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-12 mt-2" />
          </div>
          <div className="mb-3">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-12 mt-2" />
          </div>
          <div className="">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-12 mt-2" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <div
      className="border-dark border-1 rounded m-3 p-4"
      style={{ backgroundColor: "#151515" }}
    >
      <span className="text-xl text-neutral-300 mono-500 mb-3">Your Stats</span>
      <p className="mb-0 text-neutral-400 mono-300 text-sm">Biggest streak</p>
      <p className="mb-0 text-transparent text-sm bg-clip-text bg-gradient-to-r bg-green-500 mono-300">
        {"-"}
      </p>
      <p className="mb-0 text-neutral-400 mono-300 text-sm">Current streak</p>
      <p className="mb-0 text-transparent text-sm bg-clip-text bg-gradient-to-r bg-green-500 mono-300">
        {user ? user.streak : "-"}
      </p>
      <p className="mb-0 text-neutral-400 mono-300 text-sm">
        Most Consistent Habit
      </p>
      <p className="mb-0 text-transparent text-sm bg-clip-text bg-gradient-to-r bg-green-500 mono-300">
        {"-"}
      </p>
      <p className="mb-0 text-neutral-400 mono-300 text-sm">
        Most Productive Day
      </p>
      <p className="mb-0 text-transparent text-sm bg-clip-text bg-gradient-to-r bg-green-500 mono-300">
        {"-"}
      </p>
    </div>
  );
};

export default Stats;

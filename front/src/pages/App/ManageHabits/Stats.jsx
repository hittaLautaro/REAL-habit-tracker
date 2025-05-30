import React, { useEffect } from "react";
import "../../../components/Global/styles.css";
import { useState } from "react";

import { useCurrentUser } from "../../../components/hooks/useUser.js";

const Stats = () => {
  const { data: user, isLoading, error } = useCurrentUser();

  return (
    <div
      className="border-dark border-1 rounded m-3 p-4"
      style={{ backgroundColor: "#151515" }}
    >
      <h3 className="text-neutral-300 mono-500"> Your Stats </h3>
      <p className="mb-0 text-neutral-400 mono-400 text-lg">Biggest streak</p>
      <p className="mb-0 text-transparent bg-clip-text bg-gradient-to-r bg-green-500 mono-500">
        {"-"}
      </p>
      <p className="mb-0 text-neutral-400 mono-400 text-lg">Current streak</p>
      <p className="mb-0 text-transparent bg-clip-text bg-gradient-to-r bg-green-500 mono-500">
        {user ? user.streak : "-"}
      </p>
      <p className="mb-0 text-neutral-400 mono-400 text-lg">
        Most Consistent Habit
      </p>
      <p className="mb-0 text-transparent bg-clip-text bg-gradient-to-r bg-green-500 mono-500">
        {"-"}
      </p>
    </div>
  );
};

export default Stats;

import { useEffect, useState } from "react";
import Header from "../../../components/Global/Header.jsx";
import UserService from "../../../services/userService.js";
import { NavLink } from "react-router-dom";

import UserWelcome from "./UserWelcome.jsx";
import habitService from "../../../services/habitService.js";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    setLoading(true);

    const userData = await UserService.getUserSimpleData();
    console.log(userData);
    setUser(userData.data);

    console.log("Fetching completed habits for user..." + userData.data.id);
    const summary = await habitService.getCompletedByUser();
    console.log(summary);
    setSummary(summary.data);

    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-grow flex flex-col items-center justify-center px-4">
        <UserWelcome user={user} />

        <div className="text-neutral-200 text-xl text-center">
          <div className="mono-400">“Small actions lead to big change.”</div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
          <div className="bg-[#151515] text-neutral-200 !border !border-neutral-600 rounded-xl p-6 text-center shadow-md">
            <div className="text-3xl font-bold">{user ? user.streak : "-"}</div>
            <div className="text-lg mono-400 mt-2">Current daily streak</div>
          </div>

          <div className="bg-[#151515] text-neutral-200 !border !border-neutral-600 p-6 rounded-xl text-center shadow-md">
            <div className="text-3xl font-bold">
              {summary
                ? summary.habitsCompleted + " / " + summary.habitsObjective
                : "- / -"}
            </div>
            <div className="text-lg mono-400 mt-2">Habits completed today</div>
          </div>
        </div>

        <NavLink
          to="/todo"
          className="mt-6 text-neutral-400 hover:text-neutral-200 transition-colors text-sm flex items-center gap-1.5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          View daily tasks
        </NavLink>
      </div>
    </div>
  );
};

export default HomePage;

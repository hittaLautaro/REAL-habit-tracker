import { useEffect, useState } from "react";
import Header from "../../../components/Global/Header.jsx";
import UserService from "../../../services/userService.js";
import { NavLink } from "react-router-dom";
import Skeleton from "../../../components/Global/Skeleton.jsx";

import UserWelcome from "./UserWelcome.jsx";
import { useCurrentUser } from "../../../components/hooks/useUser.js";

const HomePage = () => {
  const { data: user, isLoading, error } = useCurrentUser();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-grow flex flex-col items-center justify-center px-4 mb-20">
        <UserWelcome user={user} isLoading={isLoading} />

        <div className="text-neutral-200 text-xl text-center">
          {isLoading ? (
            <Skeleton className="h-6 w-64 mx-auto" />
          ) : (
            <div className="mono-400">"Small actions lead to big change."</div>
          )}
        </div>
        {isLoading ? (
          <Skeleton className="h-6 w-40 mt-6" />
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default HomePage;

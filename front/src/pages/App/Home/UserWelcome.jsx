import React from "react";
import "../../../components/Global/styles.css";
import Skeleton from "../../../components/Global/Skeleton.jsx";

const UserWelcome = ({ user, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center my-12">
        <div className="flex items-center gap-2">
          <Skeleton className="h-32 w-[calc(100vh-70px)]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center my-12">
      <div>
        <h1 className="mono-600 text-center text-6xl">
          <span className="text-white"> Hello </span>
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-yellow-400">
              {user ? user.name : "Unknown"}
            </span>
            <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-gradient-to-r from-green-500 to-yellow-400"></span>
          </span>
          <span className="text-white">! Welcome.</span>
        </h1>
      </div>
    </div>
  );
};

export default UserWelcome;

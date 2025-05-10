import React from "react";
import "../../components/global/styles.css";

const UserWelcome = ({ user }) => {
  if (!user) {
    return <h1 className="sans-600">Loading...</h1>;
  }

  return (
    <div className="flex flex-col justify-center items-center my-12">
      <div>
        <h1 className="sans-700 text-center text-6xl">
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
    </div>
  );
};

export default UserWelcome;

import React from "react";

const UserWelcome = ({ user }) => {
  if (!user) {
    return (
      <div className="flex flex-col h-24 w-74 justify-center align-items-center m-5">
        <h1 className="sans-600">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col  h-24 w-74 justify-center align-items-center m-5">
      <div>
        <h1 className="sans-600">
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

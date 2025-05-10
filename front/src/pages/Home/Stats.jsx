import React from "react";
import "../../components/global/styles.css";

const Stats = ({ user }) => {
  return (
    <section
      className="flex flex-col justify-center border-dark border-1 rounded w-25 p-5 mx-5 my-4"
      style={{ backgroundColor: "#151515" }}
    >
      <h3 className="mb-5 sans-600"> Your Stats </h3>
      <h4 className="mt-3 mb-0 sans-600">Biggest streak</h4>
      <h4 className="text-transparent bg-clip-text bg-gradient-to-r bg-green-500 sans-600">
        {user ? user.streak : 5}
      </h4>
      <h4 className="mt-3 mb-0 sans-600">Current streak</h4>
      <h4 className="text-transparent bg-clip-text bg-gradient-to-r bg-green-500 sans-600">
        {user ? user.streak : 5}
      </h4>
      <h4 className="mt-3 mb-0 sans-600">Most consistent</h4>
      <h4 className="text-transparent bg-clip-text bg-gradient-to-r bg-green-500 sans-600">
        Boxing
      </h4>
    </section>
  );
};

export default Stats;

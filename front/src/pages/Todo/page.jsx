import React, { useContext, useEffect, useState, useRef } from "react";
import { HabitContext } from "../../components/contexts/HabitContext.jsx";
import Header from "../../components/global/Header.jsx";
import _ from "lodash";
import "../../components/global/styles.css";
import Todo from "./Todo.jsx";

const HabitPage = () => {
  return (
    <div>
      <Header />
      <div className="d-flex justify-content-center align-items-center">
        <div className="row w-75 ">
          <div
            className="col-sm border border-dark mt-4 rounded"
            style={{ backgroundColor: "#020202" }}
          >
            <Todo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitPage;

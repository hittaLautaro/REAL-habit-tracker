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
        <div className="row w-75 justify-content-around">
          <div className="col-sm border border-dark mx-5 mt-5">
            <Todo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitPage;

import React, { useContext, useEffect, useState, useRef } from "react";
import { HabitContext } from "../../contexts/HabitContext.jsx";
import Header from "../../global/Header.jsx";
import Swal from "sweetalert2";
import HabitList from "./HabitList.jsx";
import AddHabitModal from "../../global/AddHabitModal.jsx";
import { DragDropContext } from "@hello-pangea/dnd";
import _ from "lodash";

import "../../global/styles.css";
import DroppableHabitList from "./DroppableHabitList.jsx";
import Todo from "./Todo.jsx";
import Completed from "./Completed.jsx";

const HabitPage = () => {
  const [localHabits, setLocalHabits] = useState({
    todo: [],
    finished: [],
  });
  const { habits, loading, deleteAllHabits, updateHabitsOrdersAndCompletions } =
    useContext(HabitContext);

  const [selectedList, setSelectedList] = useState("todo");

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const getToday = () =>
    days[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1].toUpperCase();

  const handleChangeSelectedList = () => {
    setSelectedList((prev) => (prev === "todo" ? "completed" : "todo"));
  };

  // Filter habits for today when habits changes
  useEffect(() => {
    const filteredTodo = habits.todo.filter((habit) =>
      habit.activeDays.includes(getToday())
    );
    const filteredFinished = habits.finished.filter((habit) =>
      habit.activeDays.includes(getToday())
    );

    setLocalHabits({
      todo: filteredTodo,
      finished: filteredFinished,
    });
  }, [habits]);

  useEffect(() => {
    setSelectedList("todo");
  }, []);

  return (
    <div>
      <Header />
      <div className="d-flex justify-content-center align-items-center">
        <div className="row w-75 justify-content-around">
          <div className="col-sm border border-dark mx-5 mt-4 mb-2">
            {selectedList === "todo" ? (
              <Todo
                habits={localHabits.todo}
                changeList={handleChangeSelectedList}
              />
            ) : (
              <Completed
                habits={localHabits.finished}
                changeList={handleChangeSelectedList}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitPage;

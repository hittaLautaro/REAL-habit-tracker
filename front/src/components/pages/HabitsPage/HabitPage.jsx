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

  // Filter habits for today when habits change
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

  const handleRemoveAllHabits = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      preConfirm: async () => {
        await deleteAllHabits();
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your habits have been deleted.", "success");
      }
    });
  };

  const handleSelectList = () => {};

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="mx-5 row">
          <div className="col-sm m-3">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <h3 className="m-4 custom-font">to-do</h3>
                <AddHabitModal />
                <button
                  type="button"
                  className="m-2 btn btn-outline-light"
                  onClick={handleRemoveAllHabits}
                >
                  <i className="bi bi-trash"></i>
                </button>
                <button
                  className="btn btn-outline-light custom-font"
                  onClick={handleSelectList}
                >
                  <i className="bi bi-arrow-clockwise"></i>
                </button>
              </div>
            </div>
            <div className="border border-dark habit-list">
              {loading ? (
                <p className="m-5 custom-font">loading...</p>
              ) : (
                <DroppableHabitList
                  droppableId="todo"
                  habits={localHabits.todo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitPage;

{
  /* <div className="col-sm m-3">
  <div className="d-flex align-items-center">
    <h3 className="m-4 custom-font">finished</h3>
  </div>
  <div className="border border-dark habit-list">
    {loading ? (
      <p className="m-5 custom-font">loading...</p>
    ) : (
      <HabitList
        habits={localHabits.finished}
        title="Finished"
        droppableId="finished"
      />
    )}
  </div>
</div>; */
}

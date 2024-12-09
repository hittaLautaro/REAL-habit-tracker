import React, { useContext, useEffect, useState, useRef } from "react";
import { HabitContext } from "../../contexts/HabitContext";
import Header from "../../global/Header.jsx";
import Swal from "sweetalert2";
import HabitList from "./HabitList.jsx";
import AddHabitModal from "../../global/AddHabitModal.jsx";
import { DragDropContext } from "@hello-pangea/dnd";
import _ from "lodash";

import "../../global/styles.css";

const HomePage = () => {
  const [localHabits, setLocalHabits] = useState({
    todo: [],
    finished: [],
  });
  const { habits, loading, deleteAllHabits, updateHabitsOrdersAndCompletions } =
    useContext(HabitContext);

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

  const debounceSave = useRef(
    _.debounce(async (updatedHabits) => {
      console.log(updatedHabits); // This should now print the correct array
      const allHabits = [...updatedHabits.todo, ...updatedHabits.finished];
      updateHabitsOrdersAndCompletions(allHabits);
    }, 1000)
  ).current;

  const onDragEnd = (result) => {
    const { source, destination } = result;

    console.log(source);
    console.log(destination);

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return;

    // Clone local habits for modification (deep copy for safety)
    const newLocalHabits = JSON.parse(JSON.stringify(localHabits));

    // Remove item from source and add to destination
    const [reorderedItem] = newLocalHabits[source.droppableId].splice(
      source.index,
      1
    );

    // Update isCompleted based on destination
    if (destination.droppableId === "finished") {
      reorderedItem.isCompleted = true;
    } else if (source.droppableId === "finished") {
      reorderedItem.isCompleted = false;
    } else {
      console.warn("Unhandled droppableId:", destination.droppableId);
    }

    // Add item to the destination
    newLocalHabits[destination.droppableId].splice(
      destination.index,
      0,
      reorderedItem
    );

    // Update state immediately
    setLocalHabits(newLocalHabits);

    // Debugging logs
    console.log("Updated local habits:", newLocalHabits);

    // Debounced backend save
    debounceSave(newLocalHabits);
  };

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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
                </div>
              </div>
              <div className="border border-dark habit-list">
                {loading ? (
                  <p className="m-5 custom-font">loading...</p>
                ) : (
                  <HabitList
                    habits={localHabits.todo}
                    title="To-Do"
                    droppableId="todo"
                  />
                )}
              </div>
            </div>
            <div className="col-sm m-3">
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
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default HomePage;

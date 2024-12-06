import React, { useContext, useEffect, useState } from "react";
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
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const { habits, loading, deleteAllHabits, updateHabitOrder } =
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

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If no destination, do nothing
    if (!destination) return;

    // Create a copy of local habits to modify
    const newLocalHabits = { ...localHabits };

    // Remove from source list
    const [reorderedItem] = newLocalHabits[source.droppableId].splice(
      source.index,
      1
    );

    // Add to destination list
    newLocalHabits[destination.droppableId].splice(
      destination.index,
      0,
      reorderedItem
    );

    // Update local state immediately
    setLocalHabits(newLocalHabits);
    setHasUnsavedChanges(true);
  };

  const handleSaveChanges = async () => {
    try {
      // Call context method to save the updated habits
      await updateHabitOrder(localHabits);

      // Reset the unsaved changes flag
      setHasUnsavedChanges(false);

      // Optional: Show a success toast
      Swal.fire({
        icon: "success",
        title: "Habits Updated",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
    } catch (error) {
      // Handle any errors during save
      Swal.fire({
        icon: "error",
        title: "Save Failed",
        text: "There was an issue saving your habits. Please try again.",
      });
    }
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

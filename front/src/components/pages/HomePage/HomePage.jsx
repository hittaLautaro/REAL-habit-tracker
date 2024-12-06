import React, { useContext, useEffect, useState } from "react";
import { HabitContext } from "../../contexts/HabitContext";
import Header from "../../global/Header.jsx";
import Swal from "sweetalert2";
import HabitList from "./HabitList.jsx";
import AddHabitModal from "../../global/AddHabitModal.jsx";
import { DragDropContext } from "@hello-pangea/dnd";

const HomePage = () => {
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
  const [completed, setCompleted] = useState([]);
  const [uncompleted, setUncompleted] = useState([]);

  useEffect(() => {
    const filteredTodo = habits.finished.filter((habit) =>
      habit.activeDays.includes(getToday())
    );
    setCompleted(filteredTodo);

    const filteredFinished = habits.todo.filter((habit) =>
      habit.activeDays.includes(getToday())
    );
    setUncompleted(filteredFinished);
  }, [habits]);

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) return;

    // Find the dragged habit
    const sourceCategory = habits[source.droppableId];
    const [movedHabit] = sourceCategory.splice(source.index, 1);

    // Update the habit order in the backend
    await updateHabitOrder(source, destination, movedHabit);
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
            <div className="col-sm border border-dark m-3">
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
              {loading ? (
                <p className="m-5 custom-font">loading...</p>
              ) : (
                <HabitList
                  habits={uncompleted}
                  title="To-Do"
                  droppableId="todo"
                />
              )}
            </div>
            <div className="col-sm border border-dark m-3">
              <div className="d-flex align-items-center">
                <h3 className="m-4 custom-font">finished</h3>
              </div>
              {loading ? (
                <p className="m-5 custom-font">loading...</p>
              ) : (
                <HabitList
                  habits={completed}
                  title="Finished"
                  droppableId="finished"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default HomePage;

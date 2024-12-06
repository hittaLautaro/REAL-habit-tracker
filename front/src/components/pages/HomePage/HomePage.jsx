import React, { useContext, useEffect, useState } from "react";
import { HabitContext } from "../../contexts/HabitContext";
import Header from "../../global/Header.jsx";
import Swal from "sweetalert2";
import HabitList from "./HabitList.jsx";
import AddHabitModal from "../../global/AddHabitModal.jsx";

const HomePage = () => {
  const { habits, loading, deleteAllHabits } = useContext(HabitContext);

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
    const filteredHabits = habits.filter((habit) =>
      habit.activeDays.includes(getToday())
    );
    setCompleted(filteredHabits.filter((habit) => habit.isCompleted));
    setUncompleted(filteredHabits.filter((habit) => !habit.isCompleted));
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

  return (
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
              <HabitList habits={uncompleted} />
            )}
          </div>
          <div className="col-sm border border-dark m-3">
            <div className="d-flex align-items-center">
              <h3 className="m-4 custom-font">finished</h3>
            </div>
            {loading ? (
              <p className="m-5 custom-font">loading...</p>
            ) : (
              <HabitList habits={completed} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

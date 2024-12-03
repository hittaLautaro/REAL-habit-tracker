import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HabitService from "../../utils/habitService.js";
import Header from "../../Global/Header.jsx";
import Swal from "sweetalert2";
import Habit from "./Habit.jsx";
import AddHabitModal from "./AddHabitModal.jsx";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DaySelector from "./DaySelector.jsx";

const HomePage = () => {
  const getCurrentDay = () => {
    const days = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];
    return days[new Date().getDay()];
  };

  const [habits, setHabits] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [uncompleted, setUncompleted] = useState([]);
  const [selectedDay, setSelectedDay] = useState(getCurrentDay());
  const navigate = useNavigate();

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
        await HabitService.deleteAll();
        fetchHabits();
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your habits have been deleted.",
          icon: "success",
        });
      }
    });
  };

  const fetchHabits = async () => {
    try {
      const response = await HabitService.getAll();
      setHabits(response.data);
    } catch (error) {
      console.error("Error fetching habits:", error);
    }
  };

  const changeHabits = (day) => {
    setSelectedDay(day);
  };

  useEffect(() => {
    fetchHabits();
  }, [navigate]);

  useEffect(() => {
    const filteredHabits = habits.filter((habit) =>
      habit.activeDays.includes(selectedDay)
    );
    setCompleted(filteredHabits.filter((habit) => habit.isCompleted));
    setUncompleted(filteredHabits.filter((habit) => !habit.isCompleted));
  }, [habits, selectedDay]);

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <DaySelector changeHabits={changeHabits} />
        <div className="mx-5 row">
          <div className="col-sm">
            <div className="d-flex align-items-center">
              <h1 className="m-4">Todo habits</h1>
              <AddHabitModal fetchHabits={fetchHabits} />
              <button
                type="button"
                className="btn btn-dark m-2"
                onClick={handleRemoveAllHabits}
              >
                Delete all
              </button>
            </div>
            {uncompleted.length <= 0 ? (
              <p className="m-5">You've finished for today!</p>
            ) : (
              <div className="habit-list">
                {uncompleted.map((habit) => (
                  <div key={habit.id}>
                    <Habit habit={habit} fetchHabits={fetchHabits} />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="col-sm">
            <div className="d-flex align-items-center">
              <h1 className="m-4">Finished</h1>
            </div>
            {completed.length <= 0 ? (
              <p className="m-5">You have no completed habits.</p>
            ) : (
              <div className="habit-list">
                {completed.map((habit) => (
                  <div key={habit.id}>
                    <Habit habit={habit} fetchHabits={fetchHabits} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

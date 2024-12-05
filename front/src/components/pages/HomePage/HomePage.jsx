import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HabitService from "../../utils/habitService.js";
import Header from "../../Global/Header.jsx";
import Swal from "sweetalert2";
import HabitList from "./HabitList.jsx";
import AddHabitModal from "./AddHabitModal.jsx";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const getToday = () => {
    return days[
      new Date().getDay() === 0 ? 6 : new Date().getDay() - 1
    ].toUpperCase();
  };

  const [habits, setHabits] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [uncompleted, setUncompleted] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(true);
      const response = await HabitService.getAll();
      setHabits(response.data);
    } catch (error) {
      console.error("Error fetching habits:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, [navigate]);

  useEffect(() => {
    const filteredHabits = habits.filter((habit) =>
      habit.activeDays.includes(getToday())
    );
    setCompleted(filteredHabits.filter((habit) => habit.isCompleted));
    setUncompleted(filteredHabits.filter((habit) => !habit.isCompleted));
  }, [habits]);

  return (
    <div className="bg-black">
      <Header />
      <div className="container-fluid">
        <div className="mx-5 row ">
          <div className="col-sm border border-dark m-3">
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
            {loading ? (
              <p className="m-5"> Loading...</p>
            ) : (
              <HabitList habits={uncompleted} fetchHabits={fetchHabits} />
            )}
          </div>
          <div className="col-sm border border-dark m-3">
            <div className="d-flex align-items-center">
              <h1 className="m-4">Finished</h1>
            </div>
            {loading ? (
              <p className="m-5"> Loading...</p>
            ) : (
              <HabitList habits={completed} fetchHabits={fetchHabits} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HabitService from "../../utils/habitService.js";
import Header from "../../Global/Header.jsx";
import Swal from "sweetalert2";
import AddHabitModal from "../../global/AddHabitModal.jsx";
import AllHabitsList from "./AllHabitsList.jsx";

import "../../global/styles.css";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AllHabitsPage = () => {
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
      text: "This will delete all your habits!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
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
      setHabits(response.data.reverse());
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
    <div>
      <Header />
      <div className="container-fluid">
        <div className="mx-5 row ">
          <div className="col-sm border border-dark m-3">
            <div className="d-flex align-items-center">
              <h3 className="m-4 custom-font">my habits</h3>
              <AddHabitModal fetchHabits={fetchHabits} />
              <button
                type="button"
                className="m-2 btn btn-outline-light"
                onClick={handleRemoveAllHabits}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
            {loading ? (
              <p className="m-5 custom-font"> loading...</p>
            ) : (
              <AllHabitsList habits={habits} fetchHabits={fetchHabits} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllHabitsPage;

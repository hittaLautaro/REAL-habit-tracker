import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import HabitService from "../../utils/habitService.js";
import Header from "../../global/Header.jsx";
import Swal from "sweetalert2";
import AddHabitModal from "../../global/AddHabitModal.jsx";
import AllHabitsList from "./AllHabitsList.jsx";

import { HabitContext } from "../../contexts/HabitContext";

import "../../global/styles.css";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AllHabitsPage = () => {
  const { habits, loading, deleteAllHabits, fetchHabits } =
    useContext(HabitContext);

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
        await deleteAllHabits();
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

  useEffect(() => {
    fetchHabits;
  }, [navigate]);

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="mx-5 row ">
          <div className="col-sm border border-dark m-3">
            <div className="d-flex align-items-center">
              <h3 className="m-4 custom-font">my habits</h3>
              <AddHabitModal />

              <button
                className=" btn btn-outline-light "
                onClick={handleRemoveAllHabits}
              >
                <i className="me-2 bi bi-trash"></i>
                <span className="custom-font">Delete</span>
              </button>
            </div>
            <div className="habit-list">
              {loading ? (
                <p className="m-5 custom-font"> loading...</p>
              ) : (
                <AllHabitsList habits={habits} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllHabitsPage;

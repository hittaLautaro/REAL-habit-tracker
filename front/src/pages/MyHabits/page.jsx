import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/global/Header.jsx";
import Swal from "sweetalert2";
import AddHabitModal from "../../components/global/AddHabitModal.jsx";
import AllHabitsList from "./AllHabitsList.jsx";

import { HabitContext } from "../../components/contexts/HabitContext.jsx";

import "../../components/global/styles.css";
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
      <div className="d-flex justify-content-center align-items-center">
        <div className="row w-75 justify-content-around">
          <div
            className="col-sm border border-dark mt-4 rounded"
            style={{ backgroundColor: "#151515" }}
          >
            <div className="d-flex align-items-center">
              <h1 className="m-4 custom-font">Manage habits</h1>
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

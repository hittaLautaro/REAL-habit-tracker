import React from "react";
import AddHabitModal from "../../components/global/AddHabitModal.jsx";
import AllHabitsList from "./AllHabitsList.jsx";
import { useContext } from "react";
import { HabitContext } from "../../components/contexts/HabitContext.jsx";
import Swal from "sweetalert2";
import "../../components/global/styles.css";

const ManageHabits = () => {
  const { habits, loading, deleteAllHabits, fetchHabits } =
    useContext(HabitContext);

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

  return (
    <div
      className="border border-dark rounded"
      style={{ backgroundColor: "#151515" }}
    >
      <div className="d-flex align-items-center">
        <h1 className="m-4 sans-600 fs-2">Manage habits</h1>
        <AddHabitModal />

        <button
          className=" btn btn-outline-light "
          onClick={handleRemoveAllHabits}
        >
          <i className="me-2 bi bi-trash"></i>
          <span className="sans-600">Delete</span>
        </button>
      </div>
      <div className="h-[667px] overflow-y-scroll overflow-x-hidden m-2">
        {loading ? (
          <p className="m-5 sans-600"> loading...</p>
        ) : (
          <AllHabitsList habits={habits} />
        )}
      </div>
    </div>
  );
};

export default ManageHabits;

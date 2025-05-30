import AddHabitModal from "../../../components/Global/AddHabitModal.jsx";
import AllHabitsList from "./AllHabitsList.jsx";
import { useHabitsOperations } from "../../../components/hooks/useHabits.js";
import Swal from "sweetalert2";
import "../../../components/Global/styles.css";

const ManageHabits = () => {
  const { habits, isLoading, isError, error, deleteAll, isDeletingAll } =
    useHabitsOperations();

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
        try {
          await new Promise((resolve, reject) => {
            deleteAll(undefined, {
              onSuccess: () => resolve(),
              onError: (error) => reject(error),
            });
          });
        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error.message}`);
        }
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

  if (isLoading) {
    return (
      <div
        className="border border-dark rounded"
        style={{ backgroundColor: "#151515" }}
      >
        <div className="d-flex align-items-center justify-content-center m-4">
          <div className="text-neutral-300">Loading habits...</div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="border border-dark rounded"
        style={{ backgroundColor: "#151515" }}
      >
        <div className="d-flex align-items-center justify-content-center m-4">
          <div className="text-red-500">
            Error loading habits: {error?.message || "Unknown error"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="border border-dark rounded"
      style={{ backgroundColor: "#151515" }}
    >
      <div className="d-flex align-items-center justify-content-between m-4">
        <h1 className="ml-2 fs-2 text-neutral-300 mono-500">Manage habits</h1>
        <div>
          <AddHabitModal />
          <button
            className="btn btn-outline-light"
            onClick={handleRemoveAllHabits}
            disabled={isDeletingAll || habits.length === 0}
          >
            {isDeletingAll ? (
              <i className="my-1 spinner-border spinner-border-sm"></i>
            ) : (
              <i className="my-1 bi bi-trash text-center"></i>
            )}
          </button>
        </div>
      </div>
      <AllHabitsList habits={habits} />
    </div>
  );
};

export default ManageHabits;

import AddHabitModal from "../../../components/Global/AddHabitModal.jsx";
import AllHabitsList from "./AllHabitsList.jsx";
import { useHabitsOperations } from "../../../components/hooks/useHabits.js";
import Swal from "sweetalert2";
import "../../../components/Global/styles.css";
import Skeleton from "../../../components/Global/Skeleton.jsx";

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
        {/* Header section skeleton */}
        <div className="d-flex align-items-center justify-content-between m-4">
          {/* Title skeleton */}
          <Skeleton className="h-8 w-48 ml-2" />

          {/* Buttons section skeleton */}
          <div className="d-flex gap-2">
            <Skeleton className="h-10 w-24" /> {/* Add habit button */}
            <Skeleton className="h-10 w-10" /> {/* Trash button */}
          </div>
        </div>

        {/* Habits list skeleton */}
        <div className="h-[71.5vh] w-[800px] mx-4 mb-4 rounded-sm !border !border-neutral-800">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="d-flex align-items-center justify-content-between mb-3 m-2 p-3 border border-dark rounded"
            >
              <div className="d-flex align-items-center gap-3">
                <Skeleton className="h-5 w-5 rounded" /> {/* Checkbox */}
                <Skeleton className="h-4 w-32" /> {/* Habit name */}
              </div>
              <Skeleton className="h-8 w-16" /> {/* Action buttons */}
            </div>
          ))}
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

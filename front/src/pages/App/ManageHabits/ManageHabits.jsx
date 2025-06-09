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
      <div className="flex align-items-center justify-content-between m-4">
        <h1 className="ml-2 text-xl text-neutral-300 mono-500">Your Habits</h1>
        <div className="flex align-items-center">
          <AddHabitModal />
          <button
            className="group relative flex justify-center items-center h-9 w-9 !border !border-neutral-300 text-neutral-300 rounded-xl hover:shadow-xl transform hover:scale-105 hover:animate-wiggle transition-all duration-200 overflow-hidden"
            onClick={handleRemoveAllHabits}
            disabled={isDeletingAll || habits.length === 0}
          >
            <div className="absolute inset-0  opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 transform origin-center group-hover:rotate-90 transition-transform duration-200"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>

            <div className="absolute inset-0 rounded-xl ring-1 ring-white ring-opacity-0 group-hover:ring-opacity-30 transition-all duration-200"></div>
          </button>
        </div>
      </div>
      <AllHabitsList habits={habits} />
    </div>
  );
};

export default ManageHabits;

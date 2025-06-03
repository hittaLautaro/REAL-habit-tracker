import { useState, useEffect, useRef } from "react";
import { useHabitsOperations } from "../hooks/useHabits.js";

function UpdateHabitModal({ habit, handleClose }) {
  const { updateHabit } = useHabitsOperations();
  const [habitName, setHabitName] = useState(habit.name);
  const [selectedDays, setSelectedDays] = useState(
    habit.activeDayOrders?.map((d) => d.dayOfWeek) || []
  );
  const [error, setError] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef(null);

  const days = [
    { key: "MONDAY", label: "Mon" },
    { key: "TUESDAY", label: "Tue" },
    { key: "WEDNESDAY", label: "Wed" },
    { key: "THURSDAY", label: "Thu" },
    { key: "FRIDAY", label: "Fri" },
    { key: "SATURDAY", label: "Sat" },
    { key: "SUNDAY", label: "Sun" },
  ];

  const toggleDay = (dayKey) => {
    if (selectedDays.includes(dayKey)) {
      setSelectedDays(selectedDays.filter((d) => d !== dayKey));
    } else {
      setSelectedDays([...selectedDays, dayKey]);
    }
  };

  const closeWithAnimation = () => {
    setIsClosing(true);
    setTimeout(() => {
      handleClose();
      setIsClosing(false);
      setError("");
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!habitName.trim()) {
      setError("Habit name is required");
      return;
    }
    if (selectedDays.length === 0) {
      setError("Please select at least one day");
      return;
    }

    const updatedData = {
      name: habitName,
      activeDayOrders: selectedDays.map((day) => ({
        dayOfWeek: day,
        position: 0,
      })),
    };

    updateHabit({
      id: habit.id,
      updatedData: updatedData,
    });
    closeWithAnimation();
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") closeWithAnimation();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    let mouseDownInside = false;

    const handleMouseDown = (e) => {
      mouseDownInside = modalRef.current?.contains(e.target);
    };

    const handleMouseUp = (e) => {
      if (!mouseDownInside) closeWithAnimation();
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 mono-500 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      <div
        ref={modalRef}
        className={`relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden border border-white/20 transform transition-all duration-300 ${
          isClosing
            ? "scale-95 opacity-0 translate-y-8"
            : "scale-100 opacity-100 translate-y-0"
        }`}
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between p-4 pb-6">
            <div className="flex flex-col">
              <h2 className="text-3xl font-bold text-black">Update Habit</h2>
              <p className="text-gray-500 text-sm mt-1">
                Keep your goals aligned
              </p>
            </div>

            <button
              onClick={closeWithAnimation}
              className="group flex items-center justify-center w-10 h-10 rounded-full mb-5 bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all duration-200 hover:scale-110"
            >
              <svg
                className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {error && (
            <div className="mx-8 mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-red-700 font-medium">{error}</span>
              </div>
            </div>
          )}

          <div className="px-8 pb-8 space-y-8">
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                What's the habit name?
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={habitName}
                  onChange={(e) => setHabitName(e.target.value)}
                  placeholder="e.g., Meditating..."
                  className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-yellow-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 text-gray-800 placeholder-gray-400"
                  autoFocus
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700">
                Which days apply?
              </label>
              <div className="grid grid-cols-7 gap-2">
                {days.map((day, index) => {
                  const isSelected = selectedDays.includes(day.key);
                  return (
                    <button
                      key={day.key}
                      type="button"
                      onClick={() => toggleDay(day.key)}
                      className={`relative py-4 px-2 rounded-2xl font-semibold text-sm transition-all duration-200 transform hover:scale-105 ${
                        isSelected
                          ? "bg-slate-500 text-white shadow-lg hover:shadow-xl"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {isSelected && (
                        <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse"></div>
                      )}
                      <span className="relative z-10">{day.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={closeWithAnimation}
                className="flex-1 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl font-semibold transition-all duration-200 hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-6 py-4 bg-neutral-800 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                <span className="relative z-10">Update Habit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateHabitModal;

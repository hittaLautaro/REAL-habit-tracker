import { useState } from "react";
import { useHabitsOperations } from "../hooks/useHabits.js";

function UpdateHabitModal({ habit, handleClose }) {
  const { updateHabit } = useHabitsOperations();
  const [habitName, setHabitName] = useState(habit.name);
  const [selectedDays, setSelectedDays] = useState(habit.activeDayOrders || []);
  const [error, setError] = useState("");

  const days = [
    { key: "MONDAY", label: "Mon" },
    { key: "TUESDAY", label: "Tue" },
    { key: "WEDNESDAY", label: "Wed" },
    { key: "THURSDAY", label: "Thu" },
    { key: "FRIDAY", label: "Fri" },
    { key: "SATURDAY", label: "Sat" },
    { key: "SUNDAY", label: "Sun" },
  ];

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

    const payload = {
      name: habitName,
      activeDayOrders: selectedDays.map((day, index) => ({
        dayOfWeek: day.dayOfWeek,
        position: index,
      })),
    };

    updateHabit(habit.id, payload);
    handleClose();
  };

  const toggleDay = (dayKey) => {
    const isSelected = selectedDays.some((d) => d.dayOfWeek === dayKey);

    if (isSelected) {
      setSelectedDays(selectedDays.filter((d) => d.dayOfWeek !== dayKey));
    } else {
      setSelectedDays([...selectedDays, { dayOfWeek: dayKey, position: 0 }]);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">Update Habit</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors"
          >
            <svg
              className="w-6 h-6"
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

        {/* Error Message */}
        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Habit Name */}
          <div>
            <label
              htmlFor="habitName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Habit Name
            </label>
            <input
              id="habitName"
              type="text"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              placeholder="Enter habit name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-black"
              autoFocus
            />
          </div>

          {/* Days Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Days of the Week
            </label>
            <div className="grid grid-cols-7 gap-2">
              {days.map((day) => {
                const isSelected = selectedDays.some(
                  (d) => d.dayOfWeek === day.key
                );
                return (
                  <button
                    key={day.key}
                    type="button"
                    onClick={() => toggleDay(day.key)}
                    className={`
                      py-3 px-2 rounded-lg font-medium text-sm transition-all
                      ${
                        isSelected
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }
                    `}
                  >
                    {day.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
            >
              Update Habit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateHabitModal;

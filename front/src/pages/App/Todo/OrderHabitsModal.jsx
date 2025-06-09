import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useHabitsOperations } from "../../../components/hooks/useHabits";

const OrderHabitModal = ({ day, habits }) => {
  const { updateOrder } = useHabitsOperations();
  const [isOpen, setIsOpen] = useState(false);
  const [orderedHabits, setOrderedHabits] = useState([]);

  // const logHabitOrder = (habits, day) => {
  //   const list = habits.map((habit, index) => {
  //     const orderEntry = habit.activeDayOrders?.find(
  //       (entry) => entry.dayOfWeek === day
  //     );

  //     return {
  //       id: habit.id,
  //       name: habit.name,
  //       currentPosition: orderEntry?.position,
  //       visualIndex: index,
  //     };
  //   });

  //   console.table(list);
  // };

  useEffect(() => {
    if (habits.length > 0) {
      const filteredHabits = habits.filter((habit) =>
        habit.activeDayOrders?.some((entry) => entry.dayOfWeek === day)
      );

      const sortedHabits = filteredHabits.sort((a, b) => {
        const aPosition = a.activeDayOrders?.find(
          (entry) => entry.dayOfWeek === day
        )?.position;
        const bPosition = b.activeDayOrders?.find(
          (entry) => entry.dayOfWeek === day
        )?.position;

        if (aPosition === undefined && bPosition === undefined) return 0;
        if (aPosition === undefined) return 1;
        if (bPosition === undefined) return -1;

        return aPosition - bPosition;
      });

      setOrderedHabits(sortedHabits);
    } else {
      setOrderedHabits([]);
    }
  }, [habits, day]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(orderedHabits);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedItems = items.map((habit, index) => {
      const updatedActiveDayOrders = habit.activeDayOrders?.map((entry) =>
        entry.dayOfWeek === day ? { ...entry, position: index } : entry
      );

      return {
        ...habit,
        activeDayOrders: updatedActiveDayOrders,
      };
    });

    setOrderedHabits(updatedItems);
  };

  const handleSaveOrder = async () => {
    console.log(orderedHabits);
    try {
      updateOrder(orderedHabits);
      setIsOpen(false);
    } catch (error) {
      console.error("Error saving habit order:", error);
    }
  };

  if (orderedHabits.length === 0) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group relative flex justify-center items-center h-9 w-9 !border !border-neutral-300 text-neutral-300 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 mr-3 overflow-hidden"
        title="Reorder habits"
      >
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
        <svg
          className="w-6 h-6 transition-transform duration-200"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="5" r="1.25" />
          <circle cx="12" cy="12" r="1.25" />
          <circle cx="12" cy="19" r="1.25" />
        </svg>
        <div className="absolute inset-0 rounded-xl ring-2 ring-white ring-opacity-0 group-hover:ring-opacity-30 transition-all duration-200"></div>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 mono-500"
          onClick={() => setIsOpen(false)}
        >
          <div
            className=" bg-white/95 rounded-3xl shadow-2xl max-w-md w-full h-62  border border-white/20  duration-300 "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 ">
              <div className="flex flex-col">
                <h2 className="text-3xl font-bold text-black">
                  Reorder habits
                </h2>
                <p className="text-gray-500 text-sm mt-1">Create a new path!</p>
              </div>
            </div>

            <div className="py-4 h-64 justify-items-center rounded-xl mx-auto bg-gray-300 overflow-y-auto w-96 scrollbar-hide !border !border-gray-300">
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="reorder-habits">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className=""
                    >
                      {orderedHabits.map((habit, index) => (
                        <Draggable
                          key={habit.id}
                          draggableId={habit.id.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`flex items-center gap-2 p-2 mb-1 bg-neutral-800 w-80 rounded text-neutral-200 mono-200 cursor-grab active:cursor-grabbing ${
                                snapshot.isDragging ? "opacity-90 rotate-1" : ""
                              }`}
                              style={{
                                ...provided.draggableProps.style,
                                transform:
                                  provided.draggableProps.style?.transform,
                              }}
                            >
                              <span className="text-neutral-400 text-sm">
                                ⋮⋮
                              </span>
                              <span>{habit.name}</span>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>

            <div className="flex gap-2 p-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 px-6 py-4 bg-gray-100 hover:bg-gray-200 !border !border-gray-300 text-gray-700 rounded-2xl font-semibold transition-all duration-200 hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveOrder}
                className="flex-1 px-6 py-4 bg-neutral-800 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                <span className="relative z-10">Save</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderHabitModal;

import React from "react";
import Habit from "./Habit";
import { Droppable } from "@hello-pangea/dnd";
import "../../global/styles.css";

const HabitList = ({ habits }) => {
  return (
    <div>
      {habits.length > 0 ? (
        habits.map((habit, index) => (
          <Habit
            key={habit.id}
            habit={habit}
            index={index}
            categoryEmoji={"✔️"}
          />
        ))
      ) : (
        <p className="m-4 custom-font">"You've no habits here."</p>
      )}
    </div>
  );
};

export default HabitList;

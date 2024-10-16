import HabitCard from "./HabitCard";

// src/components/CategoryList.js
const HabitList = ({ habits = [], refreshHabits }) => {
  console.log("Habits received in HabitList:", habits);

  return (
    <div>
      <h1>Habits</h1>
      <ul>
        {habits.map((habit) => (
          <div key={habit.id}>
            {habit ? (
              <HabitCard refreshHabits={refreshHabits} habit={habit} />
            ) : (
              <></>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default HabitList;

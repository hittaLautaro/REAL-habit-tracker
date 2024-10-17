import HabitCard from "./HabitCard";

// src/components/CategoryList.js
const HabitList = ({ habits = [] }) => {
  console.log("Habits received in HabitList:", habits);

  return (
    <div>
      <ul>
        {habits.map((habit) => (
          <div key={habit.id}>
            {habit ? <HabitCard habit={habit} /> : <></>}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default HabitList;

// src/components/CategoryList.js
const HabitList = ({ habits = [] }) => {
  console.log("Habits received in HabitList:", habits);

  return (
    <div>
      <h1>Habits</h1>
      <ul>
        {habits.map((habit) => (
          <div key={habit.id}>
            <li>
              {"id -> "} {habit.id}{" "}
            </li>
            <li>
              {"name -> "}
              {habit.name}{" "}
            </li>
            <li>
              {"user id -> "}
              {habit.user_id}{" "}
            </li>
            <li>
              {"category id -> "}
              {habit.category_id}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default HabitList;

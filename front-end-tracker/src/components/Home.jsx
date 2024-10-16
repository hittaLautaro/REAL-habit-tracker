import CategoryList from "./Category/CategoryList";
import UserList from "./User/UserList";
import HabitList from "./Habit/HabitList";
import CategoryForm from "./Category/CategoryForm";
import UserForm from "./User/UserForm";
import HabitForm from "./Habit/HabitForm";
import Header from "./global/Header";

const Home = () => {
  return (
    <div>
      <Header />
      <HabitForm />
      <UserForm />
      <CategoryForm />
    </div>
  );
};

export default Home;

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import UserService from "./UserService";

const UserForm = ({ user }) => {
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userDto = { name, email };

    try {
      if (user) {
        await UserService.update(user.id, userDto);
      } else {
        await UserService.create(userDto);
      }

      navigate("/users");
    } catch (error) {
      console.error("Error saving User:", error);
    }
  };

  return (
    <>
      <h1>Add a user</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="User Name"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="User Email"
        />
        <button type="submit">{user ? "Update" : "Add"} User</button>
      </form>
    </>
  );
};

export default UserForm;

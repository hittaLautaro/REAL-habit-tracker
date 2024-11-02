import { useState } from "react";
import UserService from "./UserService";

const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userDto = { name, email };
    await UserService.create(userDto);
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
        <button type="submit">User</button>
      </form>
    </>
  );
};

export default UserForm;

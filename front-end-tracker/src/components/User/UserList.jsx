// src/components/CategoryList.js
import { useEffect, useState } from "react";
import UserService from "./UserService";
import Header from "../global/Header";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await UserService.getAll();
      console.log("Fetched Users:", response.data); // Check the data structure
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching Users", error);
    }
  };

  return (
    <div>
      <Header />
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <div key={user.id}>
            <li>
              {"id -> "} {user.id}{" "}
            </li>
            <li>
              {"name -> "}
              {user.name}{" "}
            </li>
            <li>
              {"email -> "}
              {user.email}{" "}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

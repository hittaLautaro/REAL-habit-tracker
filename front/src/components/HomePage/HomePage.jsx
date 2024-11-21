import React, { useEffect, useState } from 'react'
import UserService from '../User/UserService'



export default function HomePage() {
    const [users, setUsers] = useState([]);

    UserService.getAll().then((response) => {
        setUsers(response.data);
    })

  return (
    <ul>
      {users.map((user) => (
        <p key={user.id}>
            {user.id}-
            {user.username}-
            {user.password}
        </p>
      ))}
    </ul>
  )
}

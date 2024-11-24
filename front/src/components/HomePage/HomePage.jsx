import React, { useEffect, useState } from 'react'
import UserService from '../User/UserService'
import { useNavigate } from 'react-router-dom';



export default function HomePage() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    

    useEffect(() => {
      UserService.getAll().then((response) => {
        setUsers(response.data)
      })
    }, [])

    const handleClick = () => {
      UserService.logout().then(() => {
        navigate("/auth/login");
      })
    };

    const handleFetch = () => {
      UserService.getAll().then((response) => {
        console.log(response)
        setUsers(response.data)
      })
    };
    

  return (
    <>
      <button type="button" onClick={handleClick}>
        Logout
      </button>

      <button type="button" onClick={handleFetch}>
        fetch
      </button>

      <ul>
        {users.map((user) => (
          <li key={user.id} style={{margin: 50}}>
              <p>{user.username}</p>
              <p>{user.password}</p>
              <p>{user.dateOfBirth}</p>
          </li>
        ))}
      </ul>

      
    </>
  )
}

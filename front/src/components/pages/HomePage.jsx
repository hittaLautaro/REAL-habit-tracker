import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // If you're using react-router
import UserService from '../utils/userService.js'
import HabitService from '../utils/habitService.js';

const HomePage = () => {
  const [habits, setHabits] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleClick = () => {
    UserService.logout().then(() => {
      navigate("/auth/login");
    })
  };

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const data = await HabitService.getAll();
        setHabits(data);
      } catch (err) {
        if (err.response?.status === 403) {
          navigate('/auth/login');
        }
      }
    };

    fetchHabits();
  }, [navigate]);

  return (
    
    <div>
      <button type="button" onClick={handleClick}>
        Logout
      </button>
      <h1>Habits</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {habits.length === 0 && !error ? (
        <p>No habits found</p>
      ) : (
        habits.map((habit) => (
          <div key={habit.id} className="border border-dark p-3">
            <p>{habit.id}</p>
            <h2>{habit.name}</h2>
          </div>
        ))
      )}
    </div>

    
  );
};

export default HomePage;

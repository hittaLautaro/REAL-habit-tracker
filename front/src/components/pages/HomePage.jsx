import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // If you're using react-router
import UserService from '../utils/authService.js'
import HabitService from '../utils/habitService.js';

const HomePage = () => {
  const [habits, setHabits] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    UserService.logout().then(() => {
      localStorage.clear();
      navigate("/auth/login");
    })
  };

  const handleAddHabit = ()  => {
    HabitService.save( {userId: 8, name: "Nashe"} ).then(() => {
      fetchHabits();
    })
  };

  const fetchHabits = async () => {
    await HabitService.getAll().then((response) => {
      setHabits(response.data)
    });
  };

  useEffect(() => {
    fetchHabits();
  }, [navigate]);

  return (
    
    <div>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
      <button type="button" onClick={handleAddHabit}>
        Add Habit
      </button>
      <h1>Habits</h1>
        <div className="habit-list">
          {habits.map((x) => (
            <div key={x.id} className="border border-dark p-3 habit-item">
              <p>{x.id}</p>
              <h2>{x.name}</h2>
            </div>
          ))}
        </div>
    </div>

    
  );
};

export default HomePage;
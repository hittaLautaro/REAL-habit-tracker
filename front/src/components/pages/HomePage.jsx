import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // If you're using react-router
import UserService from '../utils/authService.js'
import HabitService from '../utils/habitService.js';
import Header from '../Global/Header.jsx';
import Swal from 'sweetalert2';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  const [habits, setHabits] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    UserService.logout().then(() => {
      localStorage.clear();
      navigate("/auth/login");
    })
  };

  const handleAddHabit = () => {
    Swal.fire({
      title: "Enter the name of the habit",
      input: "text",
      inputAttributes: {
        autocapitalize: "on"
      },
      showCancelButton: true,
      confirmButtonText: "Add habit",
      showLoaderOnConfirm: true,
      preConfirm: async ( habitName ) => {
        HabitService.save( { name: habitName })
        .then(() =>{
          fetchHabits();
        }
      );
        
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Added!",
          text: "New habit has ben added",
          icon: "success"
        });
      }
    });
  };

  const handleRemoveAllHabits = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      preConfirm: async () => {
        HabitService.deleteAll()
        .then(() =>{
          fetchHabits();
        })
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your habits have been deleted.",
          icon: "success"
        });
      }
    });
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
      <Header />
      <button type="button" className="btn btn-dark m-2" onClick={handleLogout}>Logout</button>
      <button type="button" className="btn btn-dark m-2" onClick={handleAddHabit}>Add</button>
      <button type="button" className="btn btn-dark m-2" onClick={handleRemoveAllHabits}> Delete all </button>
      <h1>Habits</h1>
        { habits.length <= 0 ? <h2> No habits were found </h2> : <div className="habit-list">
          {habits.map((x) => (
            <div key={x.id} className="border border-dark p-3 habit-item">
              <p>{x.id}</p>
              <h2>{x.name}</h2>
            </div>
          ))} 
        </div>
        }
    </div>

    
  );
};

export default HomePage;
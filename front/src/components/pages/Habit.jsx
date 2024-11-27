import React from 'react'
import HabitService from '../utils/habitService';
import Swal from 'sweetalert2';

const Habit = ( {habit, fetchHabits } ) => {
    const handleNameChange = () => {
        Swal.fire({
            title: "Enter new name of the habit",
            input: "text",
            inputAttributes: {
              autocapitalize: "on"
            },
            showCancelButton: true,
            confirmButtonText: "Update habit",
            showLoaderOnConfirm: true,
            preConfirm: async ( updatedName ) => {
            HabitService.update( habit.id, { name: updatedName } )
            .then(() =>{
              fetchHabits();
            })
          },
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                  title: "Updated!",
                  text: "Habit has been updated",
                  icon: "success"
                });
              }
        });
      };

    const handleDelete = () => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
          preConfirm: async () => {
            HabitService.deleteById( habit.id )
            .then(() =>{
              fetchHabits();
            })
          },
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Deleted!",
              text: "Habit has been deleted.",
              icon: "success"
            });
          }
        });
      };

      const handleComplete = async () => {
        await HabitService.update( habit.id, {completed:!habit.completed} )
            .then(() =>{
              fetchHabits();
        })
      };

  return (
    <div className="border border-dark mx-5 my-3 habit-item">
        <button type="button" className="btn btn-dark m-2" onClick={handleNameChange}>Update</button>
        <button type="button" className="btn btn-dark m-2" onClick={handleDelete}>Delete</button>
        <button type="button" className="btn btn-dark m-2" onClick={handleComplete}>Check</button>
        <div className='m-4'>
            <p> {habit.id} </p>
            <h4> {habit.name} </h4>
            <p> {habit.completed ? "Completed" : "Uncompleted"} </p>
        </div>
    </div>
  )
}

export default Habit
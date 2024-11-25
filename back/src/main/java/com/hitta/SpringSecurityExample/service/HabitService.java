package com.hitta.SpringSecurityExample.service;

import com.hitta.SpringSecurityExample.dtos.CategoryRequest;
import com.hitta.SpringSecurityExample.dtos.CategoryResponse;
import com.hitta.SpringSecurityExample.dtos.HabitRequest;
import com.hitta.SpringSecurityExample.dtos.HabitResponse;
import com.hitta.SpringSecurityExample.mappers.HabitMapper;
import com.hitta.SpringSecurityExample.model.Category;
import com.hitta.SpringSecurityExample.model.Habit;
import com.hitta.SpringSecurityExample.model.Users;
import com.hitta.SpringSecurityExample.repo.HabitRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HabitService {

    @Autowired
    private HabitRepo habitRepo;

    @Autowired
    private HabitMapper habitMapper;

    @Autowired
    private UserService userService;

    public List<HabitResponse> getAllHabitsByUserId(Integer userId){
        List<Habit> habits = habitRepo.findAllByUserId(userId);

        return habitMapper.habitsToResponses(habits);
    }

    public HabitResponse save( HabitRequest request){
        Users user = userService.getUserById(request.getUserId());

        if(user == null) throw new IllegalArgumentException("User not found");

        Habit habit = habitMapper.requestToHabit(request);

        habit = habitRepo.save(habit);

        return habitMapper.habitToResponse(habit);
    }

    public HabitResponse update(Integer id, HabitRequest request){
        Habit habit = habitRepo.findById(id).orElse(null);

        if(habit == null) throw new IllegalArgumentException("Category not found");

        Users user = userService.getUserById(request.getUserId());

        if(user == null) throw new IllegalArgumentException("User not found");

        habit.setUser(user);
        habit.setName(request.getName());

        habit = habitRepo.save(habit);

        return habitMapper.habitToResponse(habit);
    }

    public HabitResponse findById(Integer id) {
        Habit habit = habitRepo.findById(id).orElse(null);

        if(habit == null) throw new IllegalArgumentException("Habit not found");

        return habitMapper.habitToResponse(habit);
    }

    public void deleteById(Integer id) {
        habitRepo.deleteById(id);
    }
}

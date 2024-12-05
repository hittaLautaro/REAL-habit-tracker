package com.hitta.SpringSecurityExample.service;

import com.hitta.SpringSecurityExample.dtos.HabitCreateRequest;
import com.hitta.SpringSecurityExample.dtos.HabitUpdateRequest;
import com.hitta.SpringSecurityExample.dtos.HabitResponse;
import com.hitta.SpringSecurityExample.mappers.HabitMapper;
import com.hitta.SpringSecurityExample.model.Habit;
import com.hitta.SpringSecurityExample.model.Users;
import com.hitta.SpringSecurityExample.repo.HabitRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HabitService {

    @Autowired
    private HabitRepo habitRepo;

    @Autowired
    private HabitMapper habitMapper;

    public List<HabitResponse> getAllHabitsByUserId(Integer userId){
        List<Habit> habits = habitRepo.findAllByUserIdOrderByLastModifiedDate(userId);

        return habitMapper.habitsToResponses(habits);
    }

    public HabitResponse save(Users user, HabitCreateRequest request){
        Habit habit = habitMapper.createReqToHabit(user, request);
        habit = habitRepo.save(habit);
        return habitMapper.habitToResponse(habit);
    }

    public HabitResponse update(Integer id, HabitUpdateRequest request){
        Habit habit = habitRepo.findById(id).orElse(null);

        if(habit == null) throw new IllegalArgumentException("Habit not found");

        if(request.getName() != null)           habit.setName(request.getName());
        if(request.getFrequency() != null)      habit.setFrequency(request.getFrequency());
        if(request.getActiveDays() != null)     habit.setActiveDays(request.getActiveDays());
        if(request.getPosition() != null)       habit.setPosition(request.getPosition());
        if(request.getIsCompleted() != null)    habit.setCompleted(request.getIsCompleted());

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

    public void deleteAll(Integer userId) {
        habitRepo.deleteAllByUserId(userId);
    }

    public boolean checkHabitCompletion(Habit habit){
        return habit.isCompleted();
    }

}

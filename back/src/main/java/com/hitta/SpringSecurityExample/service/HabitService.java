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
import java.util.Set;

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
        if(request.getPosition() != null)       habit.setPosition(request.getPosition());
        if(request.getIsCompleted() != null)    habit.setCompleted(request.getIsCompleted());
        if(request.getActiveDays() != null && !areSetsEqual(request.getActiveDays(), habit.getActiveDays()))     habit.setActiveDays(request.getActiveDays());

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

    public void updateHabits(List<HabitUpdateRequest> habitRequests) {
        for(HabitUpdateRequest request : habitRequests){
            System.out.println(request.toString());
            update(request.getId(), request);
        }
    }

    private <T> boolean areSetsEqual(Set<T> set1, Set<T> set2) {
        if (set1 == null || set2 == null) {
            return set1 == set2; // Both null means equal
        }
        if (set1.size() != set2.size()) {
            return false; // Different sizes, not equal
        }
        return set1.containsAll(set2) && set2.containsAll(set1); // Ensure both sets contain each other's elements
    }
}

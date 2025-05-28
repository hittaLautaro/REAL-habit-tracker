package com.hitta.SpringSecurityExample.service;

import com.hitta.SpringSecurityExample.dtos.CompletionSummaryResponse;
import com.hitta.SpringSecurityExample.dtos.HabitCreateRequest;
import com.hitta.SpringSecurityExample.dtos.HabitUpdateRequest;
import com.hitta.SpringSecurityExample.dtos.HabitResponse;
import com.hitta.SpringSecurityExample.mappers.HabitMapper;
import com.hitta.SpringSecurityExample.model.*;
import com.hitta.SpringSecurityExample.repo.CompletionRepo;
import com.hitta.SpringSecurityExample.repo.HabitRepo;
import com.hitta.SpringSecurityExample.repo.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class HabitService {

    private final HabitRepo habitRepo;
    private final UserRepo userRepo;
    private final HabitMapper habitMapper;
    private final CompletionRepo completionRepo;

    public HabitService(
            HabitRepo habitRepo,
            UserRepo userRepo,
            HabitMapper habitMapper,
            CompletionRepo completionRepo
    ) {
        this.habitRepo = habitRepo;
        this.userRepo = userRepo;
        this.habitMapper = habitMapper;
        this.completionRepo = completionRepo;
    }


    public List<HabitResponse> findAll(Integer userId){
        List<Habit> habits = habitRepo.findAllByUserIdWithActiveDaysOrderByLastModifiedDate(userId);
        return habitMapper.habitsToResponses(habits);
    }

    public HabitResponse save(Users user, HabitCreateRequest request){
        Habit habit = habitMapper.createReqToHabit(user, request);
        habit = habitRepo.save(habit);
        return habitMapper.habitToResponse(habit);
    }

    public HabitResponse update(Integer id, Integer userId, HabitUpdateRequest request){
        Habit habit = habitRepo.findByHabitIdAndUserId(id, userId).orElseThrow(() -> new RuntimeException("Habit not found."));

        if(request.getName() != null)           habit.setName(request.getName());
        if(request.getFrequency() != null)      habit.setFrequency(request.getFrequency());
        if (request.getActiveDayOrders() != null) habit.setActiveDayOrders(request.getActiveDayOrders());


        habit = habitRepo.save(habit);

        return habitMapper.habitToResponse(habit);
    }

    public HabitResponse findById(Integer userId, Integer habitId) {
        Habit habit = habitRepo.findByHabitIdAndUserId(habitId, userId).orElse(null);

        if(habit == null) throw new IllegalArgumentException("Habit not found");

        return habitMapper.habitToResponse(habit);
    }

    @Transactional
    public void deleteById(Integer habitId, Integer userId) {
        completionRepo.deleteAllCompletionsByHabitIdAndUserId(habitId, userId);
        habitRepo.deleteByHabitIdAndUserId(habitId, userId);
    }

    @Transactional
    public void deleteAll(Integer userId) {
        completionRepo.deleteAllByUserId(userId);
        habitRepo.deleteAllByUserId(userId);
    }


    public List<HabitResponse> updateHabits(List<HabitUpdateRequest> habitRequests, Integer userId) {
        var mappedHabits = new ArrayList<HabitResponse>();

        for(HabitUpdateRequest request : habitRequests){
            var mappedHabit = update(request.getId(), userId, request);
            mappedHabits.add(mappedHabit);
        }

        return mappedHabits;
    }



    public void updateIsCompleted(Integer userId, Integer habitId, boolean isCompleted) {
        int updatedRows = habitRepo.updateIsCompleted(habitId, userId, isCompleted);
        if (updatedRows == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Habit not found or does not belong to user");
        }
    }

    public List<HabitResponse> findAllByDayOfWeek(Integer userId, String d) {
        var dayOfWeek = DayOfWeek.valueOf(d.toUpperCase());

        List<Habit> habits = habitRepo.findByUserIdAndDayOfWeek(userId,dayOfWeek).orElseThrow(() -> new RuntimeException("No habits for that day!"));

        return habitMapper.habitsToResponses(habits);
    }

    public CompletionSummaryResponse findSummaryOfToday(Integer userId) {
        LocalDate today = LocalDate.now();

        List<Habit> habits = habitRepo.findByUserIdAndDayOfWeek(userId,today.getDayOfWeek()).orElseThrow(() -> new RuntimeException("No habits for that day!"));

        int completedCount = 0;
        for (Habit habit : habits) {
            if (habit.isCompleted()) {
                completedCount++;
            }
        }

        CompletionSummaryResponse summary = new CompletionSummaryResponse();
        summary.setHabitsObjective(habits.size());
        summary.setHabitsCompleted(completedCount);
        summary.setDate(today);

        System.out.println(summary);

        return summary;
    }


}

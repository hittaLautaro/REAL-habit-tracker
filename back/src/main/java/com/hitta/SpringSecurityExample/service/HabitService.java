package com.hitta.SpringSecurityExample.service;

import com.hitta.SpringSecurityExample.dtos.HabitCreateRequest;
import com.hitta.SpringSecurityExample.dtos.HabitUpdateRequest;
import com.hitta.SpringSecurityExample.dtos.HabitResponse;
import com.hitta.SpringSecurityExample.mappers.HabitMapper;
import com.hitta.SpringSecurityExample.model.*;
import com.hitta.SpringSecurityExample.repo.CompletionRepo;
import com.hitta.SpringSecurityExample.repo.CompletionSummaryRepo;
import com.hitta.SpringSecurityExample.repo.HabitRepo;
import com.hitta.SpringSecurityExample.repo.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

@Service
public class HabitService {

    @Autowired
    private HabitRepo habitRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private HabitMapper habitMapper;

    @Autowired
    private CompletionRepo completionRepo;

    @Autowired
    private CompletionSummaryRepo completionSummaryRepo;

    public void checkIfResetIsNeeded(Integer userId){
        Users user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        ZoneId userZone = ZoneId.of(user.getTimeZone());
        LocalDate todayInUserTimezone = LocalDate.now(userZone);

        LocalDate lastResetDate = getLastResetDateForUser(userId);

        // If we're on a new day in user's timezone, reset their habits
        if (lastResetDate == null || todayInUserTimezone.isAfter(lastResetDate)) {
            resetUserHabits(user.getId());
            updateLastResetDate(userId, todayInUserTimezone);
        }
    }

    private void updateLastResetDate(Integer userId, LocalDate date) {
        Users user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setLastHabitResetDate(date);
        userRepo.save(user);
    }

    private LocalDate getLastResetDateForUser(Integer userId){
        Users user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return user.getLastHabitResetDate();
    }

    public List<HabitResponse> findAll(Integer userId){
        System.out.println("This method is being called!");
        checkIfResetIsNeeded(userId);
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

    public boolean checkHabitCompletion(Habit habit){
        return habit.isCompleted();
    }

    public List<HabitResponse> updateHabits(List<HabitUpdateRequest> habitRequests, Integer userId) {
        var mappedHabits = new ArrayList<HabitResponse>();

        for(HabitUpdateRequest request : habitRequests){
            var mappedHabit = update(request.getId(), userId, request);
            mappedHabits.add(mappedHabit);
        }

        return mappedHabits;
    }

    private void resetUserHabits(Integer userId) {
        var user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        List<Habit> userHabits = habitRepo.findAllByUserIdWithActiveDaysOrderByLastModifiedDate(user.getId());

        boolean allCompleted = true;
        int habitsCompleted = 0;
        int habitsObjective = userHabits.size();

        for (Habit habit : userHabits) {

            boolean wasCompletedToday = checkHabitCompletion(habit);

            if(wasCompletedToday){
                habit.setStreak(habit.getStreak() + 1);
                habit.setTimesDone(habit.getTimesDone() + 1);
                habit.setTotalTimesDone(habit.getTotalTimesDone() + 1);
                habitsCompleted++;
            }else{
                habit.setStreak(0);
                allCompleted = false;
            }

            habit.setCompleted(false);
            habitRepo.save(habit);

            var completion = Completion.builder()
                    .habit(habit)
                    .isCompleted(wasCompletedToday)
                    .date(LocalDateTime.now())
                    .user(user)
                    .build();
            completionRepo.save(completion);
        }

        var completionSummary = CompletionSummary.builder()
                .habitsCompleted(habitsCompleted)
                .habitsObjective(habitsObjective)
                .date(LocalDate.now())
                .user(user)
                .build();

        completionSummaryRepo.save(completionSummary);

        if(!allCompleted) user.setStreak(0);
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
}

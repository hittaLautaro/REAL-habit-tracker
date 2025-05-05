package com.hitta.SpringSecurityExample.service;

import com.hitta.SpringSecurityExample.dtos.HabitCreateRequest;
import com.hitta.SpringSecurityExample.dtos.HabitUpdateRequest;
import com.hitta.SpringSecurityExample.dtos.HabitResponse;
import com.hitta.SpringSecurityExample.mappers.HabitMapper;
import com.hitta.SpringSecurityExample.model.Completion;
import com.hitta.SpringSecurityExample.model.Habit;
import com.hitta.SpringSecurityExample.model.Users;
import com.hitta.SpringSecurityExample.repo.CompletionRepo;
import com.hitta.SpringSecurityExample.repo.HabitRepo;
import com.hitta.SpringSecurityExample.repo.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Set;
import java.util.TimeZone;

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

    public List<HabitResponse> getAllHabitsByUserId(Integer userId){
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

    public HabitResponse update(Integer id, HabitUpdateRequest request){
        Habit habit = habitRepo.findById(id).orElseThrow(() -> new RuntimeException("Habit not found."));

        if(habit == null) throw new IllegalArgumentException("Habit not found");

        if(request.getName() != null)           habit.setName(request.getName());
        if(request.getFrequency() != null)      habit.setFrequency(request.getFrequency());
        if(request.getPosition() != null)       habit.setPosition(request.getPosition());
        if(request.getIsCompleted() != null)    habit.setCompleted(request.getIsCompleted());
        Set<DayOfWeek> currentDays = habit.getActiveDays();
        Set<DayOfWeek> updatedDays = request.getActiveDays();

        currentDays.removeIf(day -> !updatedDays.contains(day));
        updatedDays.stream()
                .filter(day -> !currentDays.contains(day))
                .forEach(currentDays::add);


        habit = habitRepo.save(habit);

        return habitMapper.habitToResponse(habit);
    }

    public HabitResponse findById(Integer id) {
        Habit habit = habitRepo.findById(id).orElse(null);

        if(habit == null) throw new IllegalArgumentException("Habit not found");

        return habitMapper.habitToResponse(habit);
    }

    @Transactional
    public void deleteById(Integer habitId, Integer userId) {
        habitRepo.deleteAllCompletionsByHabitIdAndUserId(habitId, userId);
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

    private void resetUserHabits(Integer userId) {
        var user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        List<Habit> userHabits = habitRepo.findAllByUserIdWithActiveDaysOrderByLastModifiedDate(user.getId());

        boolean allCompleted = true;

        for (Habit habit : userHabits) {

            boolean wasCompletedToday = checkHabitCompletion(habit);

            if(wasCompletedToday){
                habit.setStreak(habit.getStreak() + 1);
                habit.setTimesDone(habit.getTimesDone() + 1);
                habit.setTotalTimesDone(habit.getTotalTimesDone() + 1);
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

        if(!allCompleted) user.setStreak(0);
    }

    public void updateIsCompleted(String username, int habitId, boolean isCompleted) {
        int userId = userRepo.findIdByEmail(username).orElseThrow(() -> new RuntimeException("User not found"));
        int updatedRows = habitRepo.updateIsCompleted(habitId, userId, isCompleted);
        if (updatedRows == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Habit not found or does not belong to user");
        }
    }

}

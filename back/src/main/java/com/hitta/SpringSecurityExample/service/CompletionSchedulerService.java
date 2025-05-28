package com.hitta.SpringSecurityExample.service;

import com.hitta.SpringSecurityExample.model.Completion;
import com.hitta.SpringSecurityExample.model.CompletionSummary;
import com.hitta.SpringSecurityExample.model.Habit;
import com.hitta.SpringSecurityExample.model.Users;
import com.hitta.SpringSecurityExample.repo.CompletionRepo;
import com.hitta.SpringSecurityExample.repo.CompletionSummaryRepo;
import com.hitta.SpringSecurityExample.repo.HabitRepo;
import com.hitta.SpringSecurityExample.repo.UserRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CompletionSchedulerService {

    private static final Logger logger = LoggerFactory.getLogger(CompletionSchedulerService.class);

    private final UserRepo userRepo;
    private final HabitRepo habitRepo;
    private final CompletionRepo completionRepo;
    private final CompletionSummaryRepo completionSummaryRepo;

    public CompletionSchedulerService(
            UserRepo userRepo,
            HabitRepo habitRepo,
            CompletionRepo completionRepo,
            CompletionSummaryRepo completionSummaryRepo
    ) {
        this.userRepo = userRepo;
        this.habitRepo = habitRepo;
        this.completionRepo = completionRepo;
        this.completionSummaryRepo = completionSummaryRepo;
    }


    @Scheduled(cron = "0 0 * * * *") 
    @Transactional
    public void scheduleHabitResets() {
        logger.info("Running scheduled habit reset check");
        runHabitResetCheckForAllUsers();
    }

    @Transactional
    public void runHabitResetCheckForAllUsers() {
        List<Users> allUsers = userRepo.findAll();

        Map<String, List<Users>> usersByTimezone = allUsers.stream()
                .collect(Collectors.groupingBy(Users::getTimeZone));

        for (Map.Entry<String, List<Users>> entry : usersByTimezone.entrySet()) {
            String timezone = entry.getKey();
            List<Users> users = entry.getValue();

            ZoneId zoneId = ZoneId.of(timezone);
            ZonedDateTime nowInZone = ZonedDateTime.now(zoneId);

            if (nowInZone.getHour() == 0) {
                processHabitResetForUsers(users, nowInZone.toLocalDate());
            }
        }
    }

    @Transactional
    public void processHabitResetForUsers(List<Users> users, LocalDate date) {

        for (Users user : users) {
            try {
                if (date.equals(user.getLastHabitResetDate())) {
                    continue;
                }

                resetHabitsForUser(user);
            } catch (RuntimeException rex) {
                logger.warn("{} - Failed resetting user habits on {}", rex.getMessage(), user.getEmail());
            }
        }
    }

    @Transactional
    protected void resetHabitsForUser(Users user) {
        LocalDate userDate = LocalDate.now(ZoneId.of(user.getTimeZone()));
        Integer userId = user.getId();

        logger.info("Resetting habits for user: {}", userId);
        List<Habit> habits = habitRepo.findAllByDayOfWeek(userId, userDate.getDayOfWeek());
        dailyReset(userId, habits, userDate);
        updateLastResetDate(userId, userDate);
    }

    private void dailyReset(Integer userId, List<Habit> habits, LocalDate userTime) {
        var user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        boolean allCompleted = true;
        int habitsCompleted = 0;
        int habitsObjective = habits.size();

        for (Habit habit : habits) {

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
                    .date(userTime)
                    .user(user)
                    .build();
            completionRepo.save(completion);
        }

        var completionSummary = CompletionSummary.builder()
                .habitsCompleted(habitsCompleted)
                .habitsObjective(habitsObjective)
                .date(userTime)
                .user(user)
                .build();

        completionSummaryRepo.save(completionSummary);

        if(!allCompleted) user.setStreak(0);
    }

    public boolean checkHabitCompletion(Habit habit){
        return habit.isCompleted();
    }

    private void updateLastResetDate(Integer userId, LocalDate date) {
        Users user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setLastHabitResetDate(date);
        userRepo.save(user);
    }

}
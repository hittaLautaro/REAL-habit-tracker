package com.hitta.SpringSecurityExample.service;

import com.hitta.SpringSecurityExample.model.Habit;
import com.hitta.SpringSecurityExample.model.Users;
import com.hitta.SpringSecurityExample.repo.HabitRepo;
import com.hitta.SpringSecurityExample.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private HabitRepo habitRepo;

    @Autowired
    private HabitService habitService;

    public List<Users> getUsers(){
        return userRepo.findAll();
    }

    public Users findByUsername(String username) {
        return userRepo.findByEmail(username);
    }

    // RUNS EVERY MINUTE
    @Scheduled(cron = "0 * * * * *")
    public void processDueResets() {
        List<Users> users = userRepo.findAll();

        for (Users user : users) {
            ZoneId userZone = ZoneId.of(user.getTime_zone());
            LocalDateTime nowInUserZone = ZonedDateTime.now(userZone).toLocalDateTime();
            
            // Check if it's exactly 12:00 AM in the user time zone
            if (nowInUserZone.getHour() == 0 && nowInUserZone.getMinute() == 0) {
                resetUserHabits(user);
            }
        }
    }


    // DAILY RESET
    private void resetUserHabits(Users user) {
        List<Habit> userHabits = habitRepo.findAllByUserIdOrderByLastModifiedDate(user.getId());

        boolean allCompleted = true;

        for (Habit habit : userHabits) {
            boolean wasCompletedToday = habitService.checkHabitCompletion(habit);

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
        }

        if(!allCompleted) user.setStreak(0);
    }


}

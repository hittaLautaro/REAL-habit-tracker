package com.hitta.SpringSecurityExample.mappers;

import com.hitta.SpringSecurityExample.dtos.HabitCreateRequest;
import com.hitta.SpringSecurityExample.dtos.HabitResponse;
import com.hitta.SpringSecurityExample.model.Habit;
import com.hitta.SpringSecurityExample.model.Users;
import com.hitta.SpringSecurityExample.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class HabitMapper {

    public HabitResponse habitToResponse(Habit habit){
        return HabitResponse.builder()
                .name(habit.getName())
                .id(habit.getId())
                .isCompleted(habit.isCompleted())
                .createdDate(habit.getCreatedDate())
                .lastModifiedDate(habit.getLastModifiedDate())
                .frequency(habit.getFrequency())
                .streak(habit.getStreak())
                .totalTimesDone(habit.getTotalTimesDone())
                .userId(habit.getUser().getId())
                .activeDayOrders(habit.getActiveDayOrders())
                .build();
    }

    public Habit createReqToHabit(Users user, HabitCreateRequest request){
        System.out.println(request.toString());
        return Habit.builder()
                .name(request.getName())
                .isCompleted(false)
                .frequency(request.getFrequency())
                .timesDone(0)
                .user(user)
                .totalTimesDone(0)
                .activeDayOrders(request.getActiveDayOrders())
                .streak(0)
                .build();

    }

    public List<HabitResponse> habitsToResponses(List<Habit> habits){
        return habits.stream()
                .map(this::habitToResponse)
                .toList();
    }
}

package com.hitta.SpringSecurityExample.mappers;

import com.hitta.SpringSecurityExample.dtos.HabitCreateRequest;
import com.hitta.SpringSecurityExample.dtos.HabitUpdateRequest;
import com.hitta.SpringSecurityExample.dtos.HabitResponse;
import com.hitta.SpringSecurityExample.model.Habit;
import com.hitta.SpringSecurityExample.model.Users;
import com.hitta.SpringSecurityExample.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class HabitMapper {

    @Autowired
    private UserRepo userRepo;

    public HabitResponse habitToResponse(Habit habit){
        return HabitResponse.builder()
                .name(habit.getName())
                .id(habit.getId())
                .build();
    }

    public Habit createReqToHabit(Users user, HabitCreateRequest request){
        return Habit.builder()
                .name(request.getName())
                .isCompleted(false)
                .position(0)
                .user(user)
                .build();

    }

    public Habit updateReqToHabit(HabitUpdateRequest request){
        return Habit.builder()
                .name(request.getName())
                .position(request.getPosition())
                .isCompleted(request.isCompleted())
                .build();

    }

    public List<HabitResponse> habitsToResponses(List<Habit> habits){
        return habits.stream()
                .map(x -> habitToResponse(x))
                .toList();
    }
}

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
                .isCompleted(habit.isCompleted())
                .createdDate(habit.getCreatedDate())
                .lastModifiedDate(habit.getLastModifiedDate())
                .position(habit.getPosition())
                .build();
    }

    public Habit createReqToHabit(Users user, HabitCreateRequest request){
        return Habit.builder()
                .name(request.getName())
                .isCompleted(false)
                .frequency(request.getFrequency())
                .timesDone(0)
                .position(0)
                .user(user)
                .build();

    }

    public Habit updateReqToHabit(HabitUpdateRequest request){
        return Habit.builder()
                .name(request.getName())
                .position(request.getPosition())
                .isCompleted(request.getIsCompleted())
                .build();

    }

    public List<HabitResponse> habitsToResponses(List<Habit> habits){
        return habits.stream()
                .map(x -> habitToResponse(x))
                .toList();
    }
}

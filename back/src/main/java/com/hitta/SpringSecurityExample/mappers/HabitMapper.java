package com.hitta.SpringSecurityExample.mappers;

import com.hitta.SpringSecurityExample.dtos.CategoryRequest;
import com.hitta.SpringSecurityExample.dtos.CategoryResponse;
import com.hitta.SpringSecurityExample.dtos.HabitRequest;
import com.hitta.SpringSecurityExample.dtos.HabitResponse;
import com.hitta.SpringSecurityExample.model.Category;
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

    public Habit requestToHabit(HabitRequest request){
        Users user = userRepo.findById(request.getUserId()).orElse(null);

        if(user == null) throw new IllegalArgumentException("User not found");

        return Habit.builder()
                .name(request.getName())
                .user(user)
                .build();

    }

    public List<HabitResponse> habitsToResponses(List<Habit> habits){
        return habits.stream()
                .map(x -> habitToResponse(x))
                .toList();
    }
}

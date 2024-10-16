package com.hittadev.real_tracker.mappers;

import com.hittadev.real_tracker.dtos.HabitCreateDto;
import com.hittadev.real_tracker.dtos.HabitResponseDto;
import com.hittadev.real_tracker.models.Category;
import com.hittadev.real_tracker.models.Habit;
import com.hittadev.real_tracker.models.User;
import org.springframework.stereotype.Component;

@Component
public class HabitMapper {

    public HabitCreateDto toHabitDto(Habit habit) {
        if (habit == null) throw new NullPointerException("Habit is null.");

        return new HabitCreateDto(habit.getName(), habit.getUser().getId(), habit.getCategory().getId(), habit.isFinished());
    }

    public HabitResponseDto toHabitResponseDto(Habit habit) {
        if (habit == null) throw new NullPointerException("Habit is null.");

        return new HabitResponseDto(habit.getId(), habit.getName(), habit.getUser().getId(), habit.getCategory().getId(), habit.isFinished());
    }

    public Habit toHabit(HabitCreateDto habitDto) {
        if (habitDto == null) throw new NullPointerException("HabitDto is null.");

        var habit = new Habit();

        habit.setName(habitDto.name());
        habit.setFinished(habitDto.finished());

        var category = new Category();
        category.setId(habitDto.category_id());
        habit.setCategory(category);

        var user = new User();
        user.setId(habitDto.user_id());
        habit.setUser(user);

        return habit;
    }
}

package com.hittadev.real_tracker.services;

import com.hittadev.real_tracker.dtos.HabitCreateDto;
import com.hittadev.real_tracker.dtos.HabitResponseDto;
import com.hittadev.real_tracker.mappers.HabitMapper;
import com.hittadev.real_tracker.models.Category;
import com.hittadev.real_tracker.models.User;
import com.hittadev.real_tracker.repositories.HabitRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HabitService {
    private final HabitMapper mapper;
    private final HabitRepository repository;

    // Dependency Injection
    public HabitService(HabitMapper mapper, HabitRepository repository) {
        this.mapper = mapper;
        this.repository = repository;
    }

    // Get all
    public List<HabitResponseDto> findAll() {
        var habits = repository.findAllByOrderByIdAsc();

        var habitsResponse = habits.stream().map(mapper::toHabitResponseDto).toList();

        return habitsResponse;
    }

    // Get by id
    public HabitResponseDto findById(Integer id) {
        var habit = repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Habit not found with id: " + id));
        var habitResponseDto = mapper.toHabitResponseDto(habit);

        return habitResponseDto;
    }

    // Post
    public HabitResponseDto save(HabitCreateDto habitDto) {
        var habit = mapper.toHabit(habitDto);
        repository.save(habit);
        var habitResponseDto = mapper.toHabitResponseDto(habit);

        return habitResponseDto;
    }

    // Update by id
    public HabitResponseDto updateById(Integer id, HabitCreateDto habitDto) {
        var habit = repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Habit not found with id: " + id));

        habit.setName(habitDto.name());
        habit.setFinished(habitDto.finished());

        if(habitDto.category_id() != null){
            var category = new Category();
            category.setId(habitDto.category_id());
            habit.setCategory(category);
        }

        var user = new User();
        user.setId(habitDto.user_id());
        habit.setUser(user);

        var savedHabit = repository.save(habit);
        var habitResponseDto = mapper.toHabitResponseDto(savedHabit);

        return habitResponseDto;
    }

    // Delete
    public void delete(Integer id) {
        var habit = repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Habit not found with id: " + id));
        repository.delete(habit);
    }
}

package com.hittadev.real_tracker.dtos;

public record HabitResponseDto(
        Integer id,
        String name,
        Integer user_id,
        Integer category_id,
        boolean finished
){}

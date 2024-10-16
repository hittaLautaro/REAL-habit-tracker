package com.hittadev.real_tracker.repositories;

import com.hittadev.real_tracker.models.Habit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HabitRepository extends JpaRepository<Habit, Integer> {
}

package com.hitta.SpringSecurityExample.repo;

import com.hitta.SpringSecurityExample.model.Habit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HabitRepo extends JpaRepository<Habit, Integer> {
    List<Habit> findAllByUserId(int userId);

    void deleteAllByUserId(int userId);
}

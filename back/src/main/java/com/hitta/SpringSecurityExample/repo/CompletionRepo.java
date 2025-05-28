package com.hitta.SpringSecurityExample.repo;

import com.hitta.SpringSecurityExample.model.Completion;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CompletionRepo extends JpaRepository<Completion, Integer> {
    List<Completion> findByDateBetweenAndUserIdAndHabitId(LocalDate startOfYear, LocalDate endOfYear, Integer userId, Integer habitId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Completion c WHERE c.habit.id = :habitId AND c.user.id = :userId")
    void deleteAllCompletionsByHabitIdAndUserId(@Param("habitId") Integer habitId, @Param("userId") Integer userId);

    @Modifying
    void deleteAllByUserId(Integer userId);
}

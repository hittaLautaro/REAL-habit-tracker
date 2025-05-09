package com.hitta.SpringSecurityExample.repo;

import com.hitta.SpringSecurityExample.model.Habit;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HabitRepo extends JpaRepository<Habit, Integer> {
    @Query("SELECT DISTINCT h FROM Habit h LEFT JOIN FETCH h.activeDayOrders WHERE h.user.id = :userId ORDER BY h.position")
    List<Habit> findAllByUserIdWithActiveDaysOrderByLastModifiedDate(@Param("userId") Integer userId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Completion c WHERE c.habit.id = :habitId AND c.user.id = :userId")
    void deleteAllCompletionsByHabitIdAndUserId(@Param("habitId") Integer habitId, @Param("userId") Integer userId);

    void deleteAllByUserId(Integer userId);

    @Modifying
    @Query("DELETE FROM Habit h WHERE h.id = :habitId AND h.user.id = :userId")
    void deleteByHabitIdAndUserId(@Param("habitId") Integer habitId, @Param("userId") Integer userId);

    @Modifying
    @Query("UPDATE Habit h SET h.isCompleted = :isCompleted WHERE h.id = :habitId AND h.user.id = :userId")
    int updateIsCompleted(@Param("habitId") int habitId,
                          @Param("userId") int userId,
                          @Param("isCompleted") boolean isCompleted);

}

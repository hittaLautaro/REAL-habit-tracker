package com.hitta.SpringSecurityExample.repo;

import com.hitta.SpringSecurityExample.model.Completion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CompletionRepo extends JpaRepository<Completion, Integer> {
    List<Completion> findByDateBetweenAndUserId(LocalDateTime startOfYear, LocalDateTime endOfYear, Integer userId);

    @Modifying
    void deleteAllByUserId(Integer userId);
}

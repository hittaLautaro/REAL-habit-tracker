package com.hitta.SpringSecurityExample.repo;

import com.hitta.SpringSecurityExample.model.CompletionSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface CompletionSummaryRepo extends JpaRepository<CompletionSummary, Integer> {
    Optional<List<CompletionSummary>> findByDateBetweenAndUserId(LocalDate startOfYear, LocalDate endOfYear, Integer userId);
}

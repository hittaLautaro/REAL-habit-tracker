package com.hitta.SpringSecurityExample.service;

import com.hitta.SpringSecurityExample.dtos.CompletionSummaryResponse;
import com.hitta.SpringSecurityExample.mappers.CompletionSummaryMapper;
import com.hitta.SpringSecurityExample.repo.CompletionSummaryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CompletionSummaryService {
    private final CompletionSummaryRepo completionRepo;
    private final CompletionSummaryMapper completionSummaryMapper;

    public CompletionSummaryService(
            CompletionSummaryRepo completionRepo,
            CompletionSummaryMapper completionSummaryMapper
    ) {
        this.completionRepo = completionRepo;
        this.completionSummaryMapper = completionSummaryMapper;
    }

    public List<CompletionSummaryResponse> getCompletionsByYear(Integer year, Integer userId) {
        LocalDate startOfYear = LocalDate.of(year, 1, 1);
        LocalDate endOfYear = LocalDate.of(year, 12, 31);

        var completionsSummaries = completionRepo
                .findByDateBetweenAndUserId(startOfYear, endOfYear, userId)
                .orElseThrow(() -> new RuntimeException("Completion summaries not found"));

        return completionSummaryMapper.toResponseList(completionsSummaries);
    }
}

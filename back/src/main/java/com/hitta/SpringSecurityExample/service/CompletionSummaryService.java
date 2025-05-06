package com.hitta.SpringSecurityExample.service;

import com.hitta.SpringSecurityExample.dtos.CompletionSummaryResponse;
import com.hitta.SpringSecurityExample.mappers.CompletionMapper;
import com.hitta.SpringSecurityExample.mappers.CompletionSummaryMapper;
import com.hitta.SpringSecurityExample.model.Completion;
import com.hitta.SpringSecurityExample.model.CompletionSummary;
import com.hitta.SpringSecurityExample.repo.CompletionRepo;
import com.hitta.SpringSecurityExample.repo.CompletionSummaryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class CompletionSummaryService {
    @Autowired
    private CompletionSummaryRepo completionRepo;

    @Autowired
    private CompletionSummaryMapper completionSummaryMapper;

    /*
    Finds all the completions from the user inside {year} and maps all the completions from one day to a summary,
    repeating that for each day containing completions.
     */
    public List<CompletionSummaryResponse> getCompletionsByYear(Integer year, Integer userId) {
        LocalDate startOfYear = LocalDate.of(year, 1, 1);
        LocalDate endOfYear = LocalDate.of(year, 12, 31);

        var completionsSummaries = completionRepo
                .findByDateBetweenAndUserId(startOfYear, endOfYear, userId)
                .orElseThrow(() -> new RuntimeException("Completion summaries not found"));

        return completionSummaryMapper.toResponseList(completionsSummaries);
    }
}

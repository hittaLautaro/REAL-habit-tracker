package com.hitta.SpringSecurityExample.service;

import com.hitta.SpringSecurityExample.dtos.CompletionSummaryOfTheDay;
import com.hitta.SpringSecurityExample.mappers.CompletionMapper;
import com.hitta.SpringSecurityExample.repo.CompletionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CompletionService {


    @Autowired
    private CompletionRepo completionRepo;

    @Autowired
    private CompletionMapper completionMapper;

    /*
    Finds all the completions from the user inside {year} and maps all the completions from one day to a summary,
    repeating that for each day containing completions.
     */
    public List<CompletionSummaryOfTheDay> getCompletionsByYear(Integer year, Integer userId) {
        LocalDateTime startOfYear = LocalDateTime.of(year, 1, 1, 0, 0, 0);
        LocalDateTime endOfYear = LocalDateTime.of(year, 12, 31, 23, 59, 59);

        var completions = completionRepo.findByDateBetweenAndUserId(startOfYear, endOfYear, userId);

        return completionMapper.completionsToSummaries(completions);
    }
}

package com.hitta.SpringSecurityExample.service;

import com.hitta.SpringSecurityExample.dtos.CompletionResponse;
import com.hitta.SpringSecurityExample.mappers.CompletionMapper;
import com.hitta.SpringSecurityExample.repo.CompletionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CompletionService {


    @Autowired
    private CompletionRepo completionRepo;

    @Autowired
    private CompletionMapper completionMapper;

    public List<CompletionResponse> getCompletionsByYearAndHabit(Integer year, Integer userId, Integer habitId) {
        LocalDateTime startOfYear = LocalDateTime.of(year, 1, 1, 0, 0, 0);
        LocalDateTime endOfYear = LocalDateTime.of(year, 12, 31, 23, 59, 59);
        var completions =  completionRepo.findByDateBetweenAndUserIdAndHabitId(startOfYear, endOfYear, userId, habitId);
        return completionMapper.completionsToResponses(completions);
    }
}

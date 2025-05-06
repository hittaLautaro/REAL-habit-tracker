package com.hitta.SpringSecurityExample.mappers;

import com.hitta.SpringSecurityExample.dtos.CompletionSummaryResponse;
import com.hitta.SpringSecurityExample.model.CompletionSummary;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CompletionSummaryMapper {

    public CompletionSummaryResponse toResponse(CompletionSummary completionSummary){
        return CompletionSummaryResponse.builder()
                .date(completionSummary.getDate())
                .habitsObjective(completionSummary.getHabitsObjective())
                .habitsCompleted(completionSummary.getHabitsCompleted())
                .build();
    }

    public List<CompletionSummaryResponse> toResponseList(List<CompletionSummary> completionSummaries){
        return completionSummaries.stream()
                .map(this::toResponse)
                .toList();


    }
}

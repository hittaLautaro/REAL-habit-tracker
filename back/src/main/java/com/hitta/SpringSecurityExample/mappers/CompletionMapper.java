package com.hitta.SpringSecurityExample.mappers;

import com.hitta.SpringSecurityExample.dtos.CompletionResponse;
import com.hitta.SpringSecurityExample.dtos.CompletionSummaryOfTheDay;
import com.hitta.SpringSecurityExample.model.Completion;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class CompletionMapper {

    public CompletionResponse completionToResponse(Completion completion){
        return CompletionResponse.builder()
                .isCompleted(completion.isCompleted())
                .localDate(completion.getDate().toLocalDate())
                .build();
    }

    public List<CompletionResponse> completionsToResponses(List<Completion> completions){
        return completions.stream()
                .map(this::completionToResponse)
                .toList();
    }

    public CompletionSummaryOfTheDay completionsToSummaryOfTheDay(List<Completion> completions, LocalDate date){
        int objective = completions.size();

        int completed = (int) completions.stream()
                .filter(Completion::isCompleted)
                .count();
        
        return CompletionSummaryOfTheDay.builder()
                .completed(completed)
                .objective(objective)
                .date(date)
                .build();
    }


    public List<CompletionSummaryOfTheDay> completionsToSummaries(List<Completion> completions) {
        // Group completions by day
        Map<LocalDate, List<Completion>> completionsByDay = completions.stream()
                .collect(Collectors.groupingBy(completion -> completion.getDate().toLocalDate()));

        // Create a summary for each day
        List<CompletionSummaryOfTheDay> summaries = new ArrayList<>();

        for (Map.Entry<LocalDate, List<Completion>> entry : completionsByDay.entrySet()) {
            LocalDate day = entry.getKey();
            List<Completion> dayCompletions = entry.getValue();

            CompletionSummaryOfTheDay summary = completionsToSummaryOfTheDay(dayCompletions, day);
            summaries.add(summary);
        }

        return summaries;
    }
}
package com.hitta.SpringSecurityExample.mappers;

import com.hitta.SpringSecurityExample.dtos.CompletionResponse;
import com.hitta.SpringSecurityExample.dtos.CompletionSummaryResponse;
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
}
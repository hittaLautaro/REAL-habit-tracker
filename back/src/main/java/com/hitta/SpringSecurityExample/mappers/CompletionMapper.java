package com.hitta.SpringSecurityExample.mappers;

import com.hitta.SpringSecurityExample.dtos.CompletionResponse;
import com.hitta.SpringSecurityExample.model.Completion;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CompletionMapper {
    public CompletionResponse completionToResponse(Completion completion){
        return CompletionResponse.builder()
                .isCompleted(completion.isCompleted())
                .localDate(completion.getDate())
                .build();
    }

    public List<CompletionResponse> completionsToResponses(List<Completion> completions){
        return completions.stream()
                .map(this::completionToResponse)
                .toList();
    }
}
package com.hitta.SpringSecurityExample.controller;

import com.hitta.SpringSecurityExample.dtos.CompletionResponse;
import com.hitta.SpringSecurityExample.dtos.CompletionSummaryResponse;
import com.hitta.SpringSecurityExample.model.CustomUserDetails;
import com.hitta.SpringSecurityExample.service.CompletionService;
import com.hitta.SpringSecurityExample.service.CompletionSummaryService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/completions")
public class CompletionController {

    private final CompletionService completionService;
    private final CompletionSummaryService completionSummaryService;

    public CompletionController(
            CompletionService completionService,
            CompletionSummaryService completionSummaryService
    ){
        this.completionService = completionService;
        this.completionSummaryService = completionSummaryService;
    }

    @GetMapping("/summary")
    public ResponseEntity<List<CompletionSummaryResponse>> getCompletionsSummaryByYear(
            @RequestParam Integer year,
            @AuthenticationPrincipal CustomUserDetails userDetails){
        return ResponseEntity.ok(completionSummaryService.getCompletionsByYear(year,userDetails.getId()));
    }

    @GetMapping("/habit-summary")
    public ResponseEntity<List<CompletionResponse>> getSingularHabitCompletionsByYear(
            @RequestParam Integer year,
            @RequestParam Integer habitId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ){
        return ResponseEntity.ok(completionService.getCompletionsByYearAndHabit(year, userDetails.getId(), habitId));
    }

}

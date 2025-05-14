package com.hitta.SpringSecurityExample.controller;

import com.hitta.SpringSecurityExample.dtos.CompletionResponse;
import com.hitta.SpringSecurityExample.dtos.CompletionSummaryResponse;
import com.hitta.SpringSecurityExample.model.CustomUserDetails;
import com.hitta.SpringSecurityExample.service.CompletionService;
import com.hitta.SpringSecurityExample.service.CompletionSummaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/completions")
public class CompletionController {

    @Autowired
    private CompletionSummaryService completionSummaryService;

    @Autowired
    private CompletionService completionService;

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

package com.hitta.SpringSecurityExample.controller;

import com.hitta.SpringSecurityExample.dtos.CompletionResponse;
import com.hitta.SpringSecurityExample.dtos.CompletionSummaryResponse;
import com.hitta.SpringSecurityExample.model.Completion;
import com.hitta.SpringSecurityExample.service.CompletionService;
import com.hitta.SpringSecurityExample.service.CompletionSummaryService;
import com.hitta.SpringSecurityExample.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/completions")
public class CompletionController {

    @Autowired
    private CompletionSummaryService completionSummaryService;

    @Autowired
    private CompletionService completionService;

    @Autowired
    private UserService userService;

    @GetMapping("/summary")
    public ResponseEntity<List<CompletionSummaryResponse>> getCompletionsSummaryByYear(
            @RequestParam Integer year,
            @AuthenticationPrincipal UserDetails userDetails){
        Integer userId = userService.findUserIdByEmail(userDetails.getUsername());
        return new ResponseEntity<>(completionSummaryService.getCompletionsByYear(year,userId), HttpStatus.ACCEPTED);
    }

    @GetMapping("/habit-summary")
    public ResponseEntity<List<CompletionResponse>> getSingularHabitCompletionsByYear(
            @RequestParam Integer year,
            @RequestParam Integer habitId,
            @AuthenticationPrincipal UserDetails userDetails
    ){
        Integer userId = userService.findUserIdByEmail(userDetails.getUsername());
        return new ResponseEntity<>(completionService.getCompletionsByYearAndHabit(year, userId, habitId), HttpStatus.ACCEPTED);
    }

}

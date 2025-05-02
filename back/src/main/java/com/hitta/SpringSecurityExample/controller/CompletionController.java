package com.hitta.SpringSecurityExample.controller;

import com.hitta.SpringSecurityExample.dtos.CompletionSummaryOfTheDay;
import com.hitta.SpringSecurityExample.model.Completion;
import com.hitta.SpringSecurityExample.model.Users;
import com.hitta.SpringSecurityExample.service.CompletionService;
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
    private CompletionService completionService;

    @Autowired
    private UserService userService;

    @GetMapping("/{year}")
    public ResponseEntity<List<CompletionSummaryOfTheDay>> getCompletionsByYear(@PathVariable Integer year, @AuthenticationPrincipal UserDetails userDetails){
        Integer userId = userService.findUserIdByEmail(userDetails.getUsername());
        return new ResponseEntity<>(completionService.getCompletionsByYear(year,userId), HttpStatus.ACCEPTED);
    }

//    @GetMapping("/")
//    public ResponseEntity<List<Completion>> getCompletionsByMonth(){
//        return null;
//    }
//
//    @GetMapping("/")
//    public ResponseEntity<List<Completion>> getCompletionsByHabitByYear(){
//        return null;
//    }
//
//    @GetMapping("/")
//    public ResponseEntity<List<Completion>> getYearsContainingCompletions(){
//        return null;
//    }

}

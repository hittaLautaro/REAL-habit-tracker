package com.hitta.SpringSecurityExample.controller;

import com.hitta.SpringSecurityExample.dtos.UserResponse;
import com.hitta.SpringSecurityExample.model.Users;
import com.hitta.SpringSecurityExample.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public UserResponse getUserResponse(@AuthenticationPrincipal UserDetails userDetails) {
        Users user = userService.findByUsername(userDetails.getUsername());
        return UserResponse.builder()
                .id(user.getId())
                .streak(user.getStreak())
                .dateOfBirth(user.getDateOfBirth())
                .time_zone(user.getTime_zone())
                .email(user.getEmail())
                .build();
    }

}

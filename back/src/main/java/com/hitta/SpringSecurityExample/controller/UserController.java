package com.hitta.SpringSecurityExample.controller;

import com.hitta.SpringSecurityExample.dtos.UserResponse;
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
        return userService.findUserResponseByEmail(userDetails.getUsername());
    }

}

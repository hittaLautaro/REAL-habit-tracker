package com.hitta.SpringSecurityExample.controller;

import com.hitta.SpringSecurityExample.dtos.UserResponse;
import com.hitta.SpringSecurityExample.model.CustomUserDetails;
import com.hitta.SpringSecurityExample.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(
            UserService userService
    ){
        this.userService = userService;
    }

    @GetMapping("/")
    public ResponseEntity<UserResponse> getUserResponse(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(userService.findUserResponseById(userDetails.getId()));
    }

}

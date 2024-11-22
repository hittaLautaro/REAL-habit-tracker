package com.hitta.SpringSecurityExample.controller;

import com.hitta.SpringSecurityExample.model.AuthResponse;
import com.hitta.SpringSecurityExample.model.LoginRequest;
import com.hitta.SpringSecurityExample.model.RegisterRequest;
import com.hitta.SpringSecurityExample.model.Users;
import com.hitta.SpringSecurityExample.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<AuthResponse> register(
            @RequestBody @Valid RegisterRequest request
    )
    {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<AuthResponse> authenticate(
            @RequestBody @Valid LoginRequest request
            ){
        return ResponseEntity.ok(service.authenticate(request));
    }



    @GetMapping("/users")
    public List<Users> getUsers(){
        return service.getUsers();
    }

    @GetMapping("/users/{id}")
    public Users getUserById(@RequestParam int id){
        return service.getUserById(id);
    }
}

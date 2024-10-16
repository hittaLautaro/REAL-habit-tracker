package com.hittadev.real_tracker.controllers;
import com.hittadev.real_tracker.dtos.UserCreateDto;
import com.hittadev.real_tracker.dtos.UserResponseDto;
import com.hittadev.real_tracker.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    private final UserService service;

    public UserController(UserService service){
        this.service = service;
    }

    @GetMapping("/users")
    public List<UserResponseDto> findAll(){
        return service.findAll();
    }

    @GetMapping("/users/{user-id}")
    public UserResponseDto findById(
            @PathVariable("user-id") Integer id
    ){
        return service.findById(id);
    }

    @PostMapping("/users")
    public UserResponseDto save(
            @RequestBody UserCreateDto userDto
    ){
        return service.save(userDto);
    }

    @PutMapping("/users/{user-id}")
    public UserResponseDto update(
            @PathVariable("user-id") Integer id,
            @RequestBody UserCreateDto userDto
    ){
        return service.updateById(id, userDto);
    }

    @DeleteMapping("/users/{user-id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void delete(
            @PathVariable("user-id") Integer id
    ){
        service.delete(id);
    }
}

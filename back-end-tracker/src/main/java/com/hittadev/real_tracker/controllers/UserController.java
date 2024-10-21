package com.hittadev.real_tracker.controllers;
import com.hittadev.real_tracker.dtos.UserCreateDto;
import com.hittadev.real_tracker.dtos.UserResponseDto;
import com.hittadev.real_tracker.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService service;

    public UserController(UserService service){
        this.service = service;
    }

    @GetMapping()
    public List<UserResponseDto> findAll(){
        return service.findAll();
    }

    @GetMapping("/{user-id}")
    public UserResponseDto findById(
            @PathVariable("user-id") Integer id
    ){
        return service.findById(id);
    }


    @PostMapping()
    public UserResponseDto save(
            @RequestBody UserCreateDto userDto
    ){
        return service.save(userDto);
    }

    @PutMapping("/{user-id}")
    public UserResponseDto update(
            @PathVariable("user-id") Integer id,
            @RequestBody UserCreateDto userDto
    ){
        return service.updateById(id, userDto);
    }

    @DeleteMapping("/{user-id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void delete(
            @PathVariable("user-id") Integer id
    ){
        service.delete(id);
    }
}

package com.hitta.SpringSecurityExample.controller;

import com.hitta.SpringSecurityExample.dtos.HabitRequest;
import com.hitta.SpringSecurityExample.dtos.HabitResponse;
import com.hitta.SpringSecurityExample.model.Habit;
import com.hitta.SpringSecurityExample.model.Users;
import com.hitta.SpringSecurityExample.service.HabitService;
import com.hitta.SpringSecurityExample.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/habits")
public class HabitController {

    @Autowired
    private HabitService habitService;

    @Autowired
    private UserService userService;

    // all with the user id ->

    // get all habits
    @GetMapping("/")
    public List<HabitResponse> getAll(@RequestParam Integer user_id){
        return habitService.getAllHabitsByUserId(user_id);
    }

    @GetMapping("/{id}")
    public HabitResponse findById(@PathVariable Integer id){
        return habitService.findById(id);
    }

    // post a habit
    @PostMapping("/")
    public HabitResponse save(@RequestBody HabitRequest request){
        return habitService.save(request);
    }


    @PutMapping("/{id}")
    public HabitResponse update(@PathVariable Integer id, @RequestBody HabitRequest request) {
        return habitService.update(id, request);
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        habitService.deleteById(id);
    }

}

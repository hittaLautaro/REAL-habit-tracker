package com.hitta.SpringSecurityExample.controller;

import com.hitta.SpringSecurityExample.dtos.HabitCreateRequest;
import com.hitta.SpringSecurityExample.dtos.HabitUpdateRequest;
import com.hitta.SpringSecurityExample.dtos.HabitResponse;
import com.hitta.SpringSecurityExample.model.Habit;
import com.hitta.SpringSecurityExample.model.Users;
import com.hitta.SpringSecurityExample.service.HabitService;
import com.hitta.SpringSecurityExample.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

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
    public List<HabitResponse> getAll(@AuthenticationPrincipal UserDetails userDetails) {
        Users user = userService.findByUsername(userDetails.getUsername());
        return habitService.getAllHabitsByUserId(user.getId());
    }

    @GetMapping("/{id}")
    public HabitResponse findById(@PathVariable Integer id){
        return habitService.findById(id);
    }

    // post a habit
    @PostMapping("/")
    public HabitResponse save(@AuthenticationPrincipal UserDetails userDetails, @RequestBody HabitCreateRequest request){
        Users user = userService.findByUsername(userDetails.getUsername());
        return habitService.save(user, request);
    }

    @Transactional
    @PutMapping("/updateAll")
    public ResponseEntity<Void> updateHabitsOrder(@RequestBody List<HabitUpdateRequest> habitRequests) {
        habitService.updateHabitsOrder(habitRequests);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public HabitResponse update(@PathVariable Integer id, @RequestBody HabitUpdateRequest request) {
        return habitService.update(id, request);
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        habitService.deleteById(id);
    }

    @Transactional
    @DeleteMapping("/")
    public void delete(@AuthenticationPrincipal UserDetails userDetails) {
        Users user = userService.findByUsername(userDetails.getUsername());
        habitService.deleteAll(user.getId());
    }

}

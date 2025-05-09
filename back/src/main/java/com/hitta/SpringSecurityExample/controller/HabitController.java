package com.hitta.SpringSecurityExample.controller;

import com.hitta.SpringSecurityExample.dtos.HabitCompletedRequest;
import com.hitta.SpringSecurityExample.dtos.HabitCreateRequest;
import com.hitta.SpringSecurityExample.dtos.HabitUpdateRequest;
import com.hitta.SpringSecurityExample.dtos.HabitResponse;
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

    @GetMapping("/")
    public List<HabitResponse> getAll(@AuthenticationPrincipal UserDetails userDetails) {
        Users user = userService.findByUsername(userDetails.getUsername());
        return habitService.getAllHabitsByUserId(user.getId());
    }

    @GetMapping("/by-day")
    public List<HabitResponse> getHabitsByDay(
            @RequestParam("day") String dayOfWeek,
            @AuthenticationPrincipal UserDetails userDetails) {
        var userId = userService.findUserIdByEmail(userDetails.getUsername());
        return habitService.getHabitsByUserIdAndDay(userId, dayOfWeek);
    }

    // TODO - Need to check for authorization
    @GetMapping("/{id}")
    public HabitResponse findById(@PathVariable Integer id){
        return habitService.findById(id);
    }

    @PostMapping("/")
    public HabitResponse save(@AuthenticationPrincipal UserDetails userDetails, @RequestBody HabitCreateRequest request){
        System.out.println(request.toString());
        Integer userId = userService.findUserIdByEmail(userDetails.getUsername());
        Users user = Users.builder().
                id(userId).
                build();
        return habitService.save(user, request);
    }

    // TODO - Need to check for authorization
    @Transactional
    @PatchMapping("/")
    public ResponseEntity<Void> updateHabits(@RequestBody List<HabitUpdateRequest> habitRequests) {
        habitService.updateHabits(habitRequests);
        return ResponseEntity.ok().build();
    }

    @Transactional
    @PatchMapping("/{id}/complete")
    public ResponseEntity<Void> updateIsCompleted(@PathVariable Integer id,
                                                  @RequestBody HabitCompletedRequest request,
                                                  @AuthenticationPrincipal UserDetails userDetails) {
        System.out.println(request);
        habitService.updateIsCompleted(userDetails.getUsername(), id, request.isCompleted());
        return ResponseEntity.ok().build();
    }

    // TODO - Need to check for authorization
    @PatchMapping("/{id}")
    public HabitResponse update(@PathVariable Integer id, @RequestBody HabitUpdateRequest request) {
        System.out.println(request.toString());
        return habitService.update(id, request);
    }


    // TODO - Need to check for authorization
    @DeleteMapping("/{habitId}")
    public void delete(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Integer habitId) {
        Integer userId = userService.findUserIdByEmail(userDetails.getUsername());
        habitService.deleteById(habitId, userId);
    }

    @Transactional
    @DeleteMapping("/")
    public void deleteAll(@AuthenticationPrincipal UserDetails userDetails) {
        Integer id = userService.findUserIdByEmail(userDetails.getUsername());
        habitService.deleteAll(id);
    }

}

package com.hitta.SpringSecurityExample.controller;
import com.hitta.SpringSecurityExample.dtos.HabitCompletedRequest;
import com.hitta.SpringSecurityExample.dtos.HabitCreateRequest;
import com.hitta.SpringSecurityExample.dtos.HabitUpdateRequest;
import com.hitta.SpringSecurityExample.dtos.HabitResponse;
import com.hitta.SpringSecurityExample.model.CustomUserDetails;
import com.hitta.SpringSecurityExample.service.HabitService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/habits")
public class HabitController {

    private final HabitService habitService;

    public HabitController(
            HabitService habitService
    ){
        this.habitService = habitService;
    }

    @GetMapping("/")
    public ResponseEntity<List<HabitResponse>> findAll(@AuthenticationPrincipal CustomUserDetails userDetails) {
        List<HabitResponse> habitsRes = habitService.findAll(userDetails.getId());
        return ResponseEntity.ok(habitsRes);
    }

    @GetMapping("/by-day")
    public ResponseEntity<List<HabitResponse>> findAllByDayOfWeek(
            @RequestParam("day") String dayOfWeek,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        List<HabitResponse> habitsRes = habitService.findAllByDayOfWeek(userDetails.getId(), dayOfWeek);
        return ResponseEntity.ok(habitsRes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<HabitResponse> findById(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Integer habitId){
        HabitResponse habitRes = habitService.findById(userDetails.getId(), habitId);
        return ResponseEntity.ok(habitRes);
    }

    @PostMapping("/")
    public ResponseEntity<HabitResponse> save(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody HabitCreateRequest request){
        HabitResponse habitRes = habitService.save(userDetails.getUser(), request);
        return ResponseEntity.ok(habitRes);
    }

    @Transactional
    @PatchMapping("/{id}/complete")
    public ResponseEntity<Void> updateIsCompleted(@PathVariable("id") Integer habitId,
                                                  @RequestBody HabitCompletedRequest request,
                                                  @AuthenticationPrincipal CustomUserDetails userDetails) {
        habitService.updateIsCompleted(userDetails.getId(), habitId, request.isCompleted());
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<HabitResponse> update(@PathVariable("id") Integer habitId,
                                                @RequestBody HabitUpdateRequest request,
                                                @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        HabitResponse habitRes = habitService.update(habitId, userDetails.getId(), request);
        return ResponseEntity.ok(habitRes);
    }

    @Transactional
    @PatchMapping("/")
    public ResponseEntity<List<HabitResponse>> updateHabits(@AuthenticationPrincipal CustomUserDetails userDetails,
                                             @RequestBody List<HabitUpdateRequest> habitRequests) {
        List<HabitResponse> habitsRes = habitService.updateHabits(habitRequests, userDetails.getId());
        return ResponseEntity.ok(habitsRes);
    }

    @DeleteMapping("/{habitId}")
    public ResponseEntity<Void> delete(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Integer habitId) {
        habitService.deleteById(habitId, userDetails.getId());
        return ResponseEntity.ok().build();
    }

    @Transactional
    @DeleteMapping("/")
    public ResponseEntity<Void> deleteAll(@AuthenticationPrincipal CustomUserDetails userDetails) {
        habitService.deleteAll(userDetails.getId());
        return ResponseEntity.ok().build();
    }

}

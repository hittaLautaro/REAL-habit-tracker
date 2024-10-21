package com.hittadev.real_tracker.controllers;

import com.hittadev.real_tracker.dtos.HabitCreateDto;
import com.hittadev.real_tracker.dtos.HabitResponseDto;
import com.hittadev.real_tracker.services.HabitService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/habits")
public class HabitController {
    private final HabitService service;

    public HabitController(HabitService service){
        this.service = service;
    }

    @GetMapping()
    public List<HabitResponseDto> findAll(){
        return service.findAll();
    }

    @GetMapping("/category/{category-id}")
    public List<HabitResponseDto> findByCategoryId(
            @PathVariable("category-id") Integer id
    ){
        return service.findByCategoryId(id);
    }

    @GetMapping("/{habit-id}")
    public HabitResponseDto findById(
            @PathVariable("habit-id") Integer id
    ){
        return service.findById(id);
    }

    @PostMapping("/habits")
    public HabitResponseDto save(
            @RequestBody HabitCreateDto habitDto
    ){
        return service.save(habitDto);
    }

    @PutMapping("/{habit-id}")
    public HabitResponseDto update(
            @PathVariable("habit-id") Integer id,
            @RequestBody HabitCreateDto habitDto
    ){
        return service.updateById(id, habitDto);
    }

    @DeleteMapping("/{habit-id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void delete(
            @PathVariable("habit-id") Integer id
    ){
        service.delete(id);
    }
}

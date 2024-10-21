package com.hittadev.real_tracker.controllers;

import com.hittadev.real_tracker.dtos.CategoryCreateDto;
import com.hittadev.real_tracker.dtos.CategoryResponseDto;
import com.hittadev.real_tracker.services.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/categories")

public class CategoryController {

    private final CategoryService service;

    public CategoryController(CategoryService service){
        this.service = service;
    }

    @GetMapping()
    public List<CategoryResponseDto> findAll(){
        return service.findAll();
    }

    @GetMapping("/{category-id}")
    public CategoryResponseDto findById(
            @PathVariable("category-id") Integer id
    ){
        return service.findById(id);
    }

    @PostMapping()
    public CategoryResponseDto save(
            @RequestBody CategoryCreateDto categoryDto
    ){
        return service.save(categoryDto);
    }

    @PutMapping("/{category-id}")
    public CategoryResponseDto update(
            @PathVariable("category-id") Integer id,
            @RequestBody CategoryCreateDto categoryDto
    ){
        return service.updateById(id, categoryDto);
    }

    @DeleteMapping("/{category-id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void delete(
            @PathVariable("category-id") Integer id
    ){
        service.delete(id);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleMethodArgumentNotValidException(
            MethodArgumentNotValidException exception
    ){
        var errors = new HashMap<String, String>();
        exception.getBindingResult().getAllErrors()
                .forEach(error -> {
                    var fieldError = ((FieldError) error);
                    var fieldName = fieldError.getField();
                    var errorMessage = error.getDefaultMessage();
                    errors.put(fieldName, errorMessage);
                });

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
}

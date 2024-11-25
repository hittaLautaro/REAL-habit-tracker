package com.hitta.SpringSecurityExample.controller;

import com.hitta.SpringSecurityExample.dtos.CategoryRequest;
import com.hitta.SpringSecurityExample.dtos.CategoryResponse;
import com.hitta.SpringSecurityExample.service.CategoryService;
import com.hitta.SpringSecurityExample.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

        @Autowired
        private CategoryService categoryService;

        @Autowired
        private UserService userService;

        @GetMapping("/")
        public List<CategoryResponse> getAll(@RequestParam Integer user_id){
            return categoryService.findAllByUserId(user_id);
        }

        @PostMapping("/")
        public CategoryResponse save(@RequestBody CategoryRequest request){
            return categoryService.save(request);
        }

        @PutMapping("/{id}")
        public CategoryResponse update(@PathVariable Integer id, @RequestBody CategoryRequest request) {
            return categoryService.update(id, request);
        }

        @DeleteMapping("/{id}")
        public void delete(@PathVariable Integer id) {
            categoryService.delete(id);
        }

}

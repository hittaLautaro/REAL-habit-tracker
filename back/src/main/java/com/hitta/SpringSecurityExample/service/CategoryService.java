package com.hitta.SpringSecurityExample.service;

import com.hitta.SpringSecurityExample.dtos.CategoryRequest;
import com.hitta.SpringSecurityExample.dtos.CategoryResponse;
import com.hitta.SpringSecurityExample.dtos.HabitResponse;
import com.hitta.SpringSecurityExample.mappers.CategoryMapper;
import com.hitta.SpringSecurityExample.model.Category;
import com.hitta.SpringSecurityExample.model.Habit;
import com.hitta.SpringSecurityExample.model.Users;
import com.hitta.SpringSecurityExample.repo.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private UserService userService;

    @Autowired
    private CategoryMapper categoryMapper;

    public List<CategoryResponse> findAllByUserId(Integer userId){
        List<Category> categories = categoryRepo.findAllByUserId(userId);
        return categoryMapper.categoriesToResponses(categories);
    }

    public CategoryResponse save(CategoryRequest request){
        Users user = userService.getUserById(request.getUserId());

        if(user == null) throw new IllegalArgumentException("User not found");

        Category category = categoryMapper.requestToCategory(request);

        category = categoryRepo.save(category);

        return categoryMapper.categoryToResponse(category);
    }

    public CategoryResponse update(Integer id, CategoryRequest request){
        Category category = categoryRepo.findById(id).orElse(null);

        if(category == null) throw new IllegalArgumentException("Category not found");

        Users user = userService.getUserById(request.getUserId());

        if(user == null) throw new IllegalArgumentException("User not found");

        category.setUser(user);
        category.setName(request.getName());

        category = categoryRepo.save(category);

        return categoryMapper.categoryToResponse(category);
    }

    public CategoryResponse findById(Integer id) {
        Category category = categoryRepo.findById(id).orElse(null);

        if(category == null) throw new IllegalArgumentException("Category not found");

        return categoryMapper.categoryToResponse(category);
    }

    public void delete(Integer id){
        categoryRepo.deleteById(id);
    }
}

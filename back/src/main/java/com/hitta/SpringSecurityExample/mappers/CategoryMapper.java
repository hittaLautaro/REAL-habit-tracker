package com.hitta.SpringSecurityExample.mappers;

import com.hitta.SpringSecurityExample.dtos.CategoryRequest;
import com.hitta.SpringSecurityExample.dtos.CategoryResponse;
import com.hitta.SpringSecurityExample.model.Category;
import com.hitta.SpringSecurityExample.model.Users;
import com.hitta.SpringSecurityExample.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Stream;

@Component
public class CategoryMapper {

    @Autowired
    private UserRepo userRepo;

    public CategoryResponse categoryToResponse(Category category){
        return CategoryResponse.builder()
                .name(category.getName())
                .id(category.getId())
                .build();
    }

    public Category requestToCategory(CategoryRequest request){
        Users user = userRepo.findById(request.getUserId()).orElse(null);

        if(user == null) throw new IllegalArgumentException("User not found");

        return Category.builder()
                .name(request.getName())
                .user(user)
                .build();

    }

    public List<CategoryResponse> categoriesToResponses(List<Category> categories){
        return categories.stream()
                .map(this::categoryToResponse)
                .toList();
    }
}

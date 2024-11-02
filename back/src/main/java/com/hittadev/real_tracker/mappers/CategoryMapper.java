package com.hittadev.real_tracker.mappers;

import com.hittadev.real_tracker.dtos.CategoryCreateDto;
import com.hittadev.real_tracker.dtos.CategoryResponseDto;
import com.hittadev.real_tracker.models.Category;

import com.hittadev.real_tracker.models.User;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {

    public Category toCategory(CategoryCreateDto categoryDto){
        if(categoryDto == null) throw new NullPointerException("CategoryDTO is null");

        var category = new Category();
        category.setName(categoryDto.name());

        var user = new User();
        user.setId(categoryDto.user_id());
        category.setUser(user);

        return category;
    }

    public CategoryCreateDto toCategoryDto(Category category){
        if(category == null) throw new NullPointerException("Category is null");

        return new CategoryCreateDto(category.getName(), category.getUser().getId());
    }

    public CategoryResponseDto toCategoryResponseDto(Category category){
        if(category == null) throw new NullPointerException("Category is null");

        return new CategoryResponseDto(category.getId(), category.getName(), category.getUser().getId());
    }
}

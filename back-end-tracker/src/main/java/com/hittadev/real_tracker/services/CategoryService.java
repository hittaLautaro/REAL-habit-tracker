package com.hittadev.real_tracker.services;

import com.hittadev.real_tracker.dtos.CategoryCreateDto;
import com.hittadev.real_tracker.dtos.CategoryResponseDto;
import com.hittadev.real_tracker.mappers.CategoryMapper;
import com.hittadev.real_tracker.models.User;
import com.hittadev.real_tracker.repositories.CategoryRepository;
import com.hittadev.real_tracker.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryMapper mapper;
    private final CategoryRepository repository;
    private final UserRepository userRepository;

    // Dependency Injection
    public CategoryService(CategoryMapper mapper, CategoryRepository repository, UserRepository userRepository){
        this.userRepository = userRepository;
        this.mapper = mapper;
        this.repository = repository;
    }

    // Get all
    public List<CategoryResponseDto> findAll(){
        return repository.findAll().stream().map(mapper::toCategoryResponseDto).toList();
    }

    // Get by id
    public CategoryResponseDto findById(Integer id){
        var category = repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + id));
        var categoryResponseDto = mapper.toCategoryResponseDto(category);
        return categoryResponseDto;
    }

    // Post
    public CategoryResponseDto save(CategoryCreateDto categoryDto){
        var user = userRepository.findById(categoryDto.user_id())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        var category = mapper.toCategory(categoryDto);
        category.setUser(user);

        var savedCategory = repository.save(category);
        var categoryResponseDto = mapper.toCategoryResponseDto(savedCategory);

        return categoryResponseDto;
    }

    // Update by id
    public CategoryResponseDto updateById(Integer id, CategoryCreateDto categoryDto){
        var category = repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + id));

        category.setName(categoryDto.name());

        var user = new User();
        user.setId(categoryDto.user_id());
        category.setUser(user);

        var savedCategory = repository.save(category);
        var categoryResponseDto = mapper.toCategoryResponseDto(savedCategory);

        return categoryResponseDto;
    }

    // Delete
    public void delete(Integer id){
        var category = repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Category to delete not found with id: " + id));
        repository.delete(category);
    }





}

package com.hittadev.real_tracker.services;

import com.hittadev.real_tracker.dtos.UserCreateDto;
import com.hittadev.real_tracker.dtos.UserResponseDto;
import com.hittadev.real_tracker.mappers.UserMapper;
import com.hittadev.real_tracker.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserMapper mapper;
    private final UserRepository repository;

    // Dependency Injection
    public UserService(UserMapper mapper, UserRepository repository) {
        this.mapper = mapper;
        this.repository = repository;
    }

    // Get all
    public List<UserResponseDto> findAll() {
        return repository.findAll().stream().map(mapper::toUserResponseDto).toList();
    }

    // Get by id
    public UserResponseDto findById(Integer id) {
        return mapper.toUserResponseDto(repository.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id)));
    }

    // Post
    public UserResponseDto save(UserCreateDto userDto) {
        var user = repository.save(mapper.toUser(userDto));

        return mapper.toUserResponseDto(user);
    }

    // Update by id
    public UserResponseDto updateById(Integer id, UserCreateDto userDto) {
        var user = repository.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));

        user.setName(userDto.name());
        user.setEmail(userDto.email());

        return mapper.toUserResponseDto(repository.save(user));
    }

    // Delete
    public void delete(Integer id) {
        repository.delete(repository.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id)));
    }

}

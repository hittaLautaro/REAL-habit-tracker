package com.hittadev.real_tracker.mappers;

import com.hittadev.real_tracker.dtos.UserCreateDto;
import com.hittadev.real_tracker.dtos.UserResponseDto;
import com.hittadev.real_tracker.models.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserResponseDto toUserResponseDto(User user) {
        if (user == null) throw new NullPointerException("User is null.");

        return new UserResponseDto(user.getId(), user.getName(), user.getEmail());
    }

    public UserCreateDto toUserDto(User user) {
        if (user == null) throw new NullPointerException("User is null.");

        return new UserCreateDto(user.getName(), user.getEmail());
    }

    public User toUser(UserCreateDto userCreateDto) {
        if (userCreateDto == null) throw new NullPointerException("UserDTO is null.");

        var user = new User();

        user.setName(userCreateDto.name());
        user.setEmail(userCreateDto.email());

        return user;
    }
}

package com.hitta.SpringSecurityExample.dtos;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class UserResponse {
    private int id;
    private LocalDate dateOfBirth;
    private Integer streak;
    private String time_zone;
    private String email;
}

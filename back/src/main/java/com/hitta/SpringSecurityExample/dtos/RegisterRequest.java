package com.hitta.SpringSecurityExample.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Builder
public class RegisterRequest {
    @NotNull(message = "date is mandatory")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;
    @NotNull(message = "email is mandatory")
    @NotBlank(message = "email is mandatory")
    @Email(message = "email is not formatted")
    private String email;
    @NotNull(message = "password is mandatory")
    @NotBlank(message = "password is mandatory")
    @Size(min = 8, message = "password should be 8 characters long minimum")
    private String password;
    @NotNull
    private String time_zone;
}

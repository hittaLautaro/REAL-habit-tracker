package com.hittadev.real_tracker.auth;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RegistrationRequest {

    private final static int MIN_PASSWORD_LENGTH = 8;

    @NotNull(message = "Username is mandatory")
    @NotEmpty(message = "Username is mandatory")
    private String name;

    @NotNull(message = "Username is mandatory")
    @NotEmpty(message = "Username is mandatory")
    @Size(min = MIN_PASSWORD_LENGTH, message = "Password is too short (Min: "+MIN_PASSWORD_LENGTH+")")
    private String password;

    @NotNull(message = "Username is mandatory")
    @NotEmpty(message = "Username is mandatory")
    @Email(message = "Email is not formatted correctly")
    private String email;

}

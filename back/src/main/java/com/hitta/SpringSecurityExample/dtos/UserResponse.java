package com.hitta.SpringSecurityExample.dtos;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserResponse {
    private int id;
    private String name;
    private Integer streak;
    private String email;
}

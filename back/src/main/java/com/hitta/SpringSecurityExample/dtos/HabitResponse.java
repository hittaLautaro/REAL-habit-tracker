package com.hitta.SpringSecurityExample.dtos;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HabitResponse{
    private Integer id;
    private String name;
}

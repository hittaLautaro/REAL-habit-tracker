package com.hitta.SpringSecurityExample.dtos;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HabitCreateRequest {
    private String name;
    private Integer frequency;
    private String daily;
}

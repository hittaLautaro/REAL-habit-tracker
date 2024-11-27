package com.hitta.SpringSecurityExample.dtos;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class HabitUpdateRequest {
    private String name;
    private Boolean isCompleted;
    private Integer position;
}

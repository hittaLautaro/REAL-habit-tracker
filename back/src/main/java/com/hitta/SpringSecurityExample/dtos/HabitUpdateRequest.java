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
    private boolean isCompleted;
    private Integer position;
}

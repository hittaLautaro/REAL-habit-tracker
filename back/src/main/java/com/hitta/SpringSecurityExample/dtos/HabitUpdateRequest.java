package com.hitta.SpringSecurityExample.dtos;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HabitUpdateRequest {
    private Integer id;
    private String name;
    private boolean isCompleted;
    private Integer position;
}

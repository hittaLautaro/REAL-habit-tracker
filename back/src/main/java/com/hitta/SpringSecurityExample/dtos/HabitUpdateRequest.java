package com.hitta.SpringSecurityExample.dtos;

import lombok.*;

import java.time.DayOfWeek;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class HabitUpdateRequest {
    private String name;
    private Boolean isCompleted;
    private Integer frequency;
    private Set<DayOfWeek> activeDays;
    private Integer position;
}


package com.hitta.SpringSecurityExample.dtos;

import lombok.*;

import java.time.DayOfWeek;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HabitCreateRequest {
    private String name;
    private Integer frequency;
    private Set<DayOfWeek> activeDays;
}

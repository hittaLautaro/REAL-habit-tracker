package com.hitta.SpringSecurityExample.dtos;

import com.hitta.SpringSecurityExample.model.HabitDayOrder;
import lombok.*;

import java.util.Set;

@ToString
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HabitCreateRequest {
    private String name;
    private Integer frequency;
    private Set<HabitDayOrder> activeDayOrders;
}

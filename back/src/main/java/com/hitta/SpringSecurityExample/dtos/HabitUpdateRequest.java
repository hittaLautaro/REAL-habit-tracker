package com.hitta.SpringSecurityExample.dtos;

import com.hitta.SpringSecurityExample.model.HabitDayOrder;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class HabitUpdateRequest {
    private Integer id;
    private String name;
    private Integer frequency;
    private Set<HabitDayOrder> activeDayOrders;
}


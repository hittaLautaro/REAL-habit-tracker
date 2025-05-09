package com.hitta.SpringSecurityExample.dtos;

import com.hitta.SpringSecurityExample.model.HabitDayOrder;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HabitResponse{
    private Integer id;
    private String name;
    private Boolean isCompleted;
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
    private Integer position;
    private Integer userId;
    private Integer frequency;
    private Integer streak;
    private Integer totalTimesDone;
    private Set<HabitDayOrder> activeDayOrders;
}

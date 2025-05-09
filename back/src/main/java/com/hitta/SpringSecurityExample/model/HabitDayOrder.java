package com.hitta.SpringSecurityExample.model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

import java.time.DayOfWeek;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Embeddable
public class HabitDayOrder {
    @Enumerated(EnumType.STRING)
    private DayOfWeek dayOfWeek;
    private int position;
}

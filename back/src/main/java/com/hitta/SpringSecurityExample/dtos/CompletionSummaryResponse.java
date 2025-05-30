package com.hitta.SpringSecurityExample.dtos;

import lombok.*;

import java.time.LocalDate;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CompletionSummaryResponse {
    private LocalDate date;
    private Integer habitsCompleted;
    private Integer habitsObjective;
}

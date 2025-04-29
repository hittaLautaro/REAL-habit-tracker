package com.hitta.SpringSecurityExample.dtos;

import lombok.*;

import java.time.LocalDate;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompletionSummaryOfTheDay {
    private LocalDate date;
    private int completed;
    private int objective;
}
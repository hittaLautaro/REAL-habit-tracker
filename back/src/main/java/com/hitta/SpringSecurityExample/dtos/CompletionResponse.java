package com.hitta.SpringSecurityExample.dtos;

import lombok.*;

import java.time.LocalDate;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompletionResponse {
    private LocalDate localDate;
    private boolean isCompleted;
}

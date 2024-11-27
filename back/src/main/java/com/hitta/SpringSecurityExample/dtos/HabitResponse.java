package com.hitta.SpringSecurityExample.dtos;

import lombok.*;

import java.time.LocalDateTime;

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
}

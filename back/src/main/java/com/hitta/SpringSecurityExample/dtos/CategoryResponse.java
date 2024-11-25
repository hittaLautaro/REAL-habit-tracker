package com.hitta.SpringSecurityExample.dtos;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryResponse{
    private Integer id;
    private String name;
}

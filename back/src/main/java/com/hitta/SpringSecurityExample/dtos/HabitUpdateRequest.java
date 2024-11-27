package com.hitta.SpringSecurityExample.dtos;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HabitUpdateRequest {
    private String name;
    private boolean isCompleted;
    private Integer position;

    private boolean completedSet = false;

    public void setCompleted(Boolean completed) {
        this.isCompleted = completed;
        this.completedSet = true;
    }

    public Boolean isCompleted() {
        return isCompleted;
    }

    public boolean hasCompletedSet() {
        return completedSet;
    }
}

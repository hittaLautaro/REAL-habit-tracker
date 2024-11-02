package com.hittadev.real_tracker.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "habits")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Habit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "habit_sequence")
    @SequenceGenerator(name = "habit_sequence", sequenceName = "habit_sequence", allocationSize = 1)
    private Integer id;

    private String name;

    private boolean finished;

    private int habit_order;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}

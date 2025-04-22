package com.hitta.SpringSecurityExample.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Table(name = "completions")
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EntityListeners(AuditingEntityListener.class)
public class Completion {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "completion_seq")
    @SequenceGenerator(name = "completion_seq", sequenceName = "completion_seq", allocationSize = 1)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "habit_id", nullable = false)
    private Habit habit;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime date;

    @NotNull
    private boolean isCompleted;
}

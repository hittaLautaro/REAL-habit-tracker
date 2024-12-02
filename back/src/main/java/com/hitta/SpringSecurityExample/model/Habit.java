package com.hitta.SpringSecurityExample.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Table(name = "habits")
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EntityListeners(AuditingEntityListener.class)

public class Habit {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "habits_seq")
    @SequenceGenerator(name = "habits_seq", sequenceName = "habits_seq", allocationSize = 1)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @NotBlank
    @NotNull
    private String name;

    @NotNull
    private Integer frequency;

    @NotNull
    private Integer timesDone = 0;

    @NotNull
    private Integer totalTimesDone = 0;

    @NotNull
    private Integer streak = 0;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime lastModifiedDate;

    @NotNull
    private boolean isCompleted = false;

    @NotNull
    private Integer position;

    public boolean isFullyCompleted() {
        return this.timesDone >= this.frequency;
    }
}

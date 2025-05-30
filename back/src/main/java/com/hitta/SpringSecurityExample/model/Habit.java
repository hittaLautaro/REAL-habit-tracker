package com.hitta.SpringSecurityExample.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @OneToMany(mappedBy = "habit")
    private List<Completion> completions;

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

    @ElementCollection
    @CollectionTable(name = "habit_days", joinColumns = @JoinColumn(name = "habit_id"))
    private Set<HabitDayOrder> activeDayOrders;
}

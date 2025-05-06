package com.hitta.SpringSecurityExample.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Table(name = "completion_summary")
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EntityListeners(AuditingEntityListener.class)
public class CompletionSummary {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "completion_summary_seq")
    @SequenceGenerator(name = "completion_summary_seq", sequenceName = "completion_summary_seq", allocationSize = 1)
    private Integer id;

    @Column(nullable = false, updatable = false)
    private LocalDate date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @NotNull
    private Integer habitsCompleted;

    @NotNull
    private Integer habitsObjective;
}

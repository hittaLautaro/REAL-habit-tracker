package com.hitta.SpringSecurityExample.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "tokens")
@NoArgsConstructor
@Builder
@AllArgsConstructor

public class Token {
    @Id
    @GeneratedValue
    private Integer id;
    private String token;

    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;
    private LocalDateTime validatedAt;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private Users user;
}

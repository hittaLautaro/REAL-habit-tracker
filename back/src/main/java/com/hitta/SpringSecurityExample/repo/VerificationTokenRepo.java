package com.hitta.SpringSecurityExample.repo;

import com.hitta.SpringSecurityExample.model.VerificationToken;
import com.hitta.SpringSecurityExample.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface VerificationTokenRepo extends JpaRepository<VerificationToken, String> {

    Optional<VerificationToken> findByToken(String token);

    Optional<VerificationToken> findByUser(Users user);

    @Query("SELECT t FROM VerificationToken t WHERE t.user.email = :email AND t.expiresAt > :now")
    Optional<VerificationToken> findValidTokenByEmail(String email, LocalDateTime now);

    void deleteByExpiresAtLessThan(LocalDateTime now);
}
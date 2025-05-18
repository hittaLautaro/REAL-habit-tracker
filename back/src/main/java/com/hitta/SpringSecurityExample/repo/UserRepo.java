package com.hitta.SpringSecurityExample.repo;

import com.hitta.SpringSecurityExample.dtos.UserAuthResponse;
import com.hitta.SpringSecurityExample.dtos.UserResponse;
import com.hitta.SpringSecurityExample.model.Users;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<Users, Integer> {
    @Query("SELECT u.id FROM Users u WHERE u.email = :email")
    Optional<Integer> findIdByEmail(@Param("email") String email);

    @Query("SELECT new com.hitta.SpringSecurityExample.dtos.UserResponse(u.id, u.name, u.streak, u.email) FROM Users u WHERE u.id = :id")
    Optional<UserResponse> findUserInfoById(@Param("id") Integer id);

    @Query("SELECT new com.hitta.SpringSecurityExample.dtos.UserAuthResponse(u.email, u.password, u.enabled, u.accountLocked) FROM Users u WHERE u.email = :email")
    Optional<UserAuthResponse> findUserAuthByEmail(@Param("email")String email);

    Optional<Users> findByEmail(String email);

    @Modifying
    @Transactional
    @Query("UPDATE Users u SET u.verificationCode = :code, u.verificationCodeExpiresAt = :expiresAt, u.lastVerificationCodeSentAt = :sentAt WHERE u.id = :userId")
    Optional<Void> updateVerificationFieldsByUserId(
            @Param("userId") Integer userId,
            @Param("code") String verificationCode,
            @Param("expiresAt") LocalDateTime verificationCodeExpiresAt,
            @Param("sentAt") LocalDateTime lastVerificationCodeSentAt
    );
}

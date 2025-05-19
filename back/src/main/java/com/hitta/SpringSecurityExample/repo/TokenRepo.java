package com.hitta.SpringSecurityExample.repo;

import com.hitta.SpringSecurityExample.model.Token;
import com.hitta.SpringSecurityExample.model.Users;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TokenRepo extends JpaRepository<Token, Integer> {
    Optional<Token> findByToken(String token);

    Optional<Token> findByUserId(int id);

    @Modifying
    @Transactional
    @Query("DELETE FROM Token t WHERE t.user = :user")
    void deleteByUser(@Param("user") Users user);

    Optional<Token> findByUser(Users user);
}

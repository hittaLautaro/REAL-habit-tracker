package com.hitta.SpringSecurityExample.repo;

import com.hitta.SpringSecurityExample.model.Token;
import com.hitta.SpringSecurityExample.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TokenRepo extends JpaRepository<Token, Integer> {
    Optional<Token> findByToken(String token);

    Optional<Token> findByUser(Users user);
}

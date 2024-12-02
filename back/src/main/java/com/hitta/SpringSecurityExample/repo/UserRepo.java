package com.hitta.SpringSecurityExample.repo;

import com.hitta.SpringSecurityExample.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<Users, Integer> {
    Users findByEmail(String email);

    List<Users> findAllByNextResetBefore(LocalDateTime now);
}

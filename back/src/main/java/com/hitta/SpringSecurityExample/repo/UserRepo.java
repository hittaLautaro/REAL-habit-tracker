package com.hitta.SpringSecurityExample.repo;

import com.hitta.SpringSecurityExample.dtos.UserResponse;
import com.hitta.SpringSecurityExample.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<Users, Integer> {
    @Query("SELECT u.id FROM Users u WHERE u.email = :email")
    Optional<Integer> findIdByEmail(@Param("email") String email);

    @Query("SELECT new com.hitta.SpringSecurityExample.dtos.UserResponse(u.id, u.name, u.streak, u.email) FROM Users u WHERE u.id = :id")
    Optional<UserResponse> findUserInfoById(@Param("id") Integer id);

    Optional<Users> findByEmail(String email);

}

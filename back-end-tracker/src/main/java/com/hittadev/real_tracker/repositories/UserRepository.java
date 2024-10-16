package com.hittadev.real_tracker.repositories;

import com.hittadev.real_tracker.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}

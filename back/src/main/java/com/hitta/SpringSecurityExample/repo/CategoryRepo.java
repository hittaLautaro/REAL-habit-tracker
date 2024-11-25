package com.hitta.SpringSecurityExample.repo;

import com.hitta.SpringSecurityExample.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Integer> {
    List<Category> findAllByUserId(Integer userId);
}

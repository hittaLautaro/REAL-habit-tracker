package com.hitta.SpringSecurityExample.repo;

import com.hitta.SpringSecurityExample.model.Completion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompletionRepo extends JpaRepository<Completion, Integer> {

}

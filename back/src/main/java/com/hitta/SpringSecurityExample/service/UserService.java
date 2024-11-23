package com.hitta.SpringSecurityExample.service;

import com.hitta.SpringSecurityExample.model.Users;
import com.hitta.SpringSecurityExample.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public List<Users> getUsers(){
        return userRepo.findAll();
    }

    public Users getUserById(Integer id) {
        return userRepo.findById(id).orElse(null);
    }
}

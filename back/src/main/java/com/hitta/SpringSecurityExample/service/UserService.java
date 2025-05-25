package com.hitta.SpringSecurityExample.service;

import com.hitta.SpringSecurityExample.dtos.UserResponse;
import com.hitta.SpringSecurityExample.model.Users;
import com.hitta.SpringSecurityExample.repo.UserRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepo userRepo;

    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public List<Users> getUsers(){
        return userRepo.findAll();
    }

    public Users findByUsername(String username) {
        return userRepo.findByEmail(username).orElse(null);
    }

    public UserResponse findUserResponseById(Integer id){
        return userRepo.findUserInfoById(id).orElse(null);
    }

    public Integer findUserIdByEmail(String username) {
        return userRepo.findIdByEmail(username).orElse(null);
    }




}

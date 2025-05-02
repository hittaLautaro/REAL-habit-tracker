package com.hitta.SpringSecurityExample.service;

import com.hitta.SpringSecurityExample.dtos.UserResponse;
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

    public Users findByUsername(String username) {
        return userRepo.findByEmail(username).orElse(null);
    }

    public UserResponse findUserResponseByEmail(String username){
        return userRepo.findUserInfoByEmail(username).orElse(null);
    }

    public Integer findUserIdByEmail(String username) {
        return userRepo.findIdByEmail(username).orElse(null);
    }




}

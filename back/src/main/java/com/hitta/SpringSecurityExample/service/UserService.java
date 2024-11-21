package com.hitta.SpringSecurityExample.service;

import com.hitta.SpringSecurityExample.model.Users;
import com.hitta.SpringSecurityExample.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepo repo;

    @Autowired
    private AuthenticationManager authManager;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);


    public Users register(Users user){
        String password = user.getPassword();

        password = encoder.encode(password);

        user.setPassword(password);

        return repo.save(user);
    }

    public String verify(Users user){
        Authentication authentication = authManager
                .authenticate(
                        new UsernamePasswordAuthenticationToken
                                (user.getUsername(), user.getPassword()));

        if(!authentication.isAuthenticated()) return "Login failed";

        return jwtService.generateToken(user.getUsername());
    }

    public List<Users> getUsers(){
        return repo.findAll();
    }

    public Users getUserById(Integer id) {
        return repo.findById(id).orElse(null);
    }
}

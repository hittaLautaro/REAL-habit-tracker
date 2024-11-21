package com.hitta.SpringSecurityExample.service;

import com.hitta.SpringSecurityExample.model.*;
import com.hitta.SpringSecurityExample.repo.TokenRepo;
import com.hitta.SpringSecurityExample.repo.UserRepo;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@Service
public class AuthService {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private TokenRepo tokenRepo;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);


    public void register(RegisterRequest request){
        var user = Users.builder()
                .email(request.getEmail())
                .password(encoder.encode(request.getPassword()))
                .dateOfBirth(request.getDateOfBirth())
                .accountLocked(false)
                .enabled(true) // For now until I have email verification
                .createdDate(LocalDateTime.now())
                .build();

        userRepo.save(user);
        generateAndSaveToken(user);
    }

    public AuthResponse authenticate(LoginRequest request){
        Authentication authentication = authManager
                .authenticate(
                        new UsernamePasswordAuthenticationToken
                                (request.getEmail(), request.getPassword()));

        System.out.println("Login successful with " + request.getEmail());

        var user = userRepo.findByEmail(request.getEmail());

        String token = jwtService.generateToken(user.getEmail());

        return AuthResponse.builder().token(token).build();
    }

    private String generateAndSaveToken(Users user){
        var tokenValue = jwtService.generateToken(user.getEmail());
        var token = Token.builder()
                .token(tokenValue)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .user(user)
                .build();

        tokenRepo.save(token);
        return tokenValue;
    }

    public List<Users> getUsers(){
        return userRepo.findAll();
    }

    public Users getUserById(Integer id) {
        return userRepo.findById(id).orElse(null);
    }
}

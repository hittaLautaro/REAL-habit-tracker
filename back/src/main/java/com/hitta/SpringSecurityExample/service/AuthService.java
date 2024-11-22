package com.hitta.SpringSecurityExample.service;

import com.hitta.SpringSecurityExample.model.*;
import com.hitta.SpringSecurityExample.repo.TokenRepo;
import com.hitta.SpringSecurityExample.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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


    public AuthResponse register(RegisterRequest request){

        var user = Users.builder()
                .email(request.getEmail())
                .password(encoder.encode(request.getPassword()))
                .dateOfBirth(request.getDateOfBirth())
                .accountLocked(false)
                .enabled(true) // For now until I have email verification
                .createdDate(LocalDateTime.now())
                .build();

        userRepo.save(user);

        return AuthResponse.builder()
                .token(generateAndSaveToken(user))
                .build();
    }

    public AuthResponse authenticate(LoginRequest request){
        Authentication authentication = authManager
                .authenticate(
                        new UsernamePasswordAuthenticationToken
                                (request.getEmail(), request.getPassword()));
        System.out.println("Login successful with " + request.getEmail());

        var user = userRepo.findByEmail(request.getEmail());

        return AuthResponse.builder().token(createOrUpdateToken(user)).build();
    }

    private String generateAndSaveToken(Users user){
        var tokenValue = jwtService.generateToken(user.getEmail());

        var token = Token.builder()
                .token(tokenValue)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusDays(14))
                .user(user)
                .build();

        tokenRepo.save(token);
        return tokenValue;
    }

    public String createOrUpdateToken(Users user) {
        Optional<Token> existingToken = tokenRepo.findByUserId(user.getId());

        if (existingToken.isPresent()) {
            var tokenValue = jwtService.generateToken(user.getEmail());

            Token token = existingToken.get();
            token.setToken(tokenValue);
            token.setCreatedAt(LocalDateTime.now());
            token.setExpiresAt(LocalDateTime.now().plusDays(14));

            System.out.println("Updated(? a new one");
            tokenRepo.save(token);
            return tokenValue;
        }else{
            System.out.println("Generated a new one");
            return generateAndSaveToken(user);
        }
    }

    public List<Users> getUsers(){
        return userRepo.findAll();
    }

    public Users getUserById(Integer id) {
        return userRepo.findById(id).orElse(null);
    }
}

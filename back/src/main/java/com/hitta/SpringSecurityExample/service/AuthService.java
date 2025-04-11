package com.hitta.SpringSecurityExample.service;

import com.hitta.SpringSecurityExample.dtos.AuthResponse;
import com.hitta.SpringSecurityExample.dtos.LoginRequest;
import com.hitta.SpringSecurityExample.dtos.RegisterRequest;
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

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);


    public AuthResponse register(RegisterRequest request) {
        if(userRepo.findByEmail(request.getEmail()) != null) throw new RuntimeException("User with that email already exists");

        var user = Users.builder()
                .email(request.getEmail())
                .password(encoder.encode(request.getPassword()))
                .dateOfBirth(request.getDateOfBirth())
                .time_zone(request.getTime_zone())
                .accountLocked(false)
                .enabled(true)
                .createdDate(LocalDateTime.now())
                .time_zone(request.getTime_zone())
                .nextReset(LocalDateTime.now())
                .streak(0)
                .build();

        userRepo.save(user);

        String accessToken = jwtService.generateAccessToken(user.getEmail());
        String refreshToken = generateAndSaveRefreshToken(user);

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    public AuthResponse authenticate(LoginRequest request){
        Authentication authentication = authManager
                .authenticate(
                        new UsernamePasswordAuthenticationToken
                                (request.getEmail(), request.getPassword()));

        var user = (Users) authentication.getPrincipal();

        String accessToken = jwtService.generateAccessToken(request.getEmail());
        String refreshToken = createOrUpdateRefreshToken(user);

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    private String generateAndSaveRefreshToken(Users user){
        var tokenValue = jwtService.generateRefreshToken();

        var token = Token.builder()
                .token(tokenValue)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusDays(7))
                .user(user)
                .revoked(false)
                .build();

        tokenRepo.save(token);
        return tokenValue;
    }

    public String createOrUpdateRefreshToken(Users user) {
        Optional<Token> existingToken = tokenRepo.findByUserId(user.getId());

        if (existingToken.isPresent()) {
            Token token = existingToken.get();

            if (token.isRevoked() || token.getExpiresAt().isBefore(LocalDateTime.now())) {
                token.setToken(jwtService.generateRefreshToken());
                token.setCreatedAt(LocalDateTime.now());
                token.setExpiresAt(LocalDateTime.now().plusDays(7));
                token.setRevoked(false);
            }

            tokenRepo.save(token);
            return token.getToken();
        }

        return generateAndSaveRefreshToken(user);
    }

    public AuthResponse generateAccessToken(String refreshToken) {
        Token token = tokenRepo.findByToken(refreshToken)
                .orElseThrow(() -> new RuntimeException("Refresh token not found"));
        if (token.isRevoked() || token.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Refresh token is expired or revoked");
        }

        String accessToken = jwtService.generateAccessToken(token.getUser().getEmail());

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    public void revokeRefreshToken(String refreshToken) {
        Token token = tokenRepo.findByToken(refreshToken)
                .orElseThrow(() -> new RuntimeException("Refresh token not found"));

        token.setRevoked(true);
        tokenRepo.save(token);
    }

}

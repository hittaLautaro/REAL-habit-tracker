package com.hitta.SpringSecurityExample.service;

import com.hitta.SpringSecurityExample.dtos.AuthResponse;
import com.hitta.SpringSecurityExample.model.Token;
import com.hitta.SpringSecurityExample.model.Users;
import com.hitta.SpringSecurityExample.repo.TokenRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class TokenService {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private TokenRepo tokenRepo;

    public AuthResponse createAccessAndRefreshTokens(Users user){
        String accessToken = jwtService.generateAccessToken(user.getEmail());
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
}


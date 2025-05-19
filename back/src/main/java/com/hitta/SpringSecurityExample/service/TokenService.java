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

    public String createOrUpdateRefreshToken(Users user) {
        Optional<Token> optionalToken = tokenRepo.findByUser(user);

        var tokenValue = jwtService.generateRefreshToken();
        Token token;

        if (optionalToken.isPresent()) {
            token = optionalToken.get();
            token.setToken(tokenValue);
            token.setCreatedAt(LocalDateTime.now());
            token.setExpiresAt(LocalDateTime.now().plusDays(7));
            token.setRevoked(false);
        } else {
            token = Token.builder()
                    .token(tokenValue)
                    .createdAt(LocalDateTime.now())
                    .expiresAt(LocalDateTime.now().plusDays(7))
                    .user(user)
                    .revoked(false)
                    .build();
        }

        tokenRepo.save(token);
        return tokenValue;
    }


}


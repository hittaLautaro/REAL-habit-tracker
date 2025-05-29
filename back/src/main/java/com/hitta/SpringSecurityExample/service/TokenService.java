package com.hitta.SpringSecurityExample.service;

import com.hitta.SpringSecurityExample.dtos.AuthResponse;
import com.hitta.SpringSecurityExample.model.Token;
import com.hitta.SpringSecurityExample.model.Users;
import com.hitta.SpringSecurityExample.repo.TokenRepo;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class TokenService {

    private final JwtService jwtService;
    private final TokenRepo tokenRepo;

    public TokenService(
            JwtService jwtService,
            TokenRepo tokenRepo
    ){
        this.jwtService = jwtService;
        this.tokenRepo = tokenRepo;
    }

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

    public void addRefreshTokenCookie(HttpServletResponse response, String refreshToken) {
        Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/auth");
        cookie.setMaxAge(14 * 24 * 60 * 60);
        response.addCookie(cookie);
    }

    public void deleteRefreshTokenCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie("refreshToken", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/auth");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }


}


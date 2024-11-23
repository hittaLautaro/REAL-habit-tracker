package com.hitta.SpringSecurityExample.controller;

import com.hitta.SpringSecurityExample.model.AuthResponse;
import com.hitta.SpringSecurityExample.model.LoginRequest;
import com.hitta.SpringSecurityExample.model.RegisterRequest;
import com.hitta.SpringSecurityExample.model.Users;
import com.hitta.SpringSecurityExample.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @RequestBody @Valid RegisterRequest request,
            HttpServletResponse response
    ) {
        AuthResponse authResponse = service.register(request);
        addRefreshTokenCookie(response, authResponse.getRefreshToken());
        return ResponseEntity.ok()
                .body(authResponse);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> authenticate(
            @RequestBody @Valid LoginRequest request,
            HttpServletResponse response
    ) {
        AuthResponse authResponse = service.authenticate(request);
        addRefreshTokenCookie(response, authResponse.getRefreshToken());
        return ResponseEntity.ok()
                .body(authResponse);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshAccessToken(
            @CookieValue("refreshToken") String refreshToken,
            HttpServletResponse response
    ) {
        AuthResponse authResponse = service.generateAccessToken(refreshToken);
        addRefreshTokenCookie(response, authResponse.getRefreshToken());
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
            @CookieValue(name = "refreshToken", required = false) String refreshToken,
            HttpServletResponse response
    ) {
        service.revokeRefreshToken(refreshToken);
        deleteRefreshTokenCookie(response);
        return ResponseEntity.ok().build();
    }

    private void addRefreshTokenCookie(HttpServletResponse response, String refreshToken) {
        Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/auth");
        cookie.setMaxAge(14 * 24 * 60 * 60);
        response.addCookie(cookie);
    }

    private void deleteRefreshTokenCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie("refreshToken", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/auth");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }


}

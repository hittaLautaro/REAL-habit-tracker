package com.hitta.SpringSecurityExample.controller;

import com.hitta.SpringSecurityExample.dtos.AuthResponse;
import com.hitta.SpringSecurityExample.dtos.LoginRequest;
import com.hitta.SpringSecurityExample.dtos.RegisterRequest;
import com.hitta.SpringSecurityExample.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody @Valid RegisterRequest request,
            HttpServletResponse response
    ) {
        try{
            AuthResponse authResponse = service.register(request);
            addRefreshTokenCookie(response, authResponse.getRefreshToken());
            System.out.println("God");
            return ResponseEntity.ok()
                    .body(authResponse);
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(
            @RequestBody @Valid LoginRequest request,
            HttpServletResponse response
    ) {
        try {
            AuthResponse authResponse = service.authenticate(request);
            addRefreshTokenCookie(response, authResponse.getRefreshToken());
            return ResponseEntity.ok()
                    .body(authResponse);
        }catch(RuntimeException e){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PatchMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestBody @Valid LoginRequest request,
            HttpServletResponse response
    ) {
        try {
            service.changePassword(request);
            return ResponseEntity.ok("Password changed successfuly!");
        }catch(RuntimeException e){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshAccessToken(
            @CookieValue("refreshToken") String refreshToken,
            HttpServletResponse response
    ) {
        try {
            AuthResponse authResponse = service.generateAccessToken(refreshToken);
            addRefreshTokenCookie(response, authResponse.getRefreshToken());
            return ResponseEntity.ok(authResponse);
        }catch(RuntimeException e){
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
            @CookieValue(name = "refreshToken", required = false) String refreshToken,
            HttpServletResponse response
    ) {
        try{
            service.revokeRefreshToken(refreshToken);
            deleteRefreshTokenCookie(response);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
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

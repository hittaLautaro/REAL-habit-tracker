package com.hitta.SpringSecurityExample.controller;

import com.hitta.SpringSecurityExample.dtos.AuthResponse;
import com.hitta.SpringSecurityExample.dtos.LoginRequest;
import com.hitta.SpringSecurityExample.dtos.RegisterRequest;
import com.hitta.SpringSecurityExample.exceptions.InvalidCredentialsException;
import com.hitta.SpringSecurityExample.exceptions.UserNotVerifiedException;
import com.hitta.SpringSecurityExample.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody @Valid RegisterRequest request,
            HttpServletResponse response
    ) {
        try{
            return ResponseEntity.ok(authService.register(request));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }



    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(
            @RequestBody @Valid LoginRequest request,
            HttpServletResponse response
    ) {
        try {
            AuthResponse authResponse = authService.authenticate(request);
            addRefreshTokenCookie(response, authResponse.getRefreshToken());
            return ResponseEntity.ok()
                    .body(authResponse);
        } catch (InvalidCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PatchMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestBody @Valid LoginRequest request,
            HttpServletResponse response
    ) {
        try {
            authService.changePassword(request);
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
            AuthResponse authResponse = authService.generateAccessToken(refreshToken);
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
            authService.revokeRefreshToken(refreshToken);
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
        cookie.setPath("/api/auth");
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

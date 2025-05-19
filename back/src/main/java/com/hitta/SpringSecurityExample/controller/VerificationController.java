
package com.hitta.SpringSecurityExample.controller;

import com.hitta.SpringSecurityExample.dtos.AuthResponse;
import com.hitta.SpringSecurityExample.service.VerificationService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/account")
public class VerificationController {

    @Autowired
    private VerificationService verificationService;

    @GetMapping("/verify")
    public ResponseEntity<?> verify(@RequestParam String token, HttpServletResponse response) {
        try {
            var authResponse = verificationService.verifyAccountWithToken(token);
            addRefreshTokenCookie(response, authResponse.getRefreshToken());
            return ResponseEntity.ok("Your account has been verified.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<?> delete(@RequestParam String token, HttpServletResponse response) {
        try {
            verificationService.deleteAccountWithToken(token);
            deleteRefreshTokenCookie(response);
            return ResponseEntity.ok("Your account has been deleted.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @PostMapping("/resend")
    public ResponseEntity<?> resend(@RequestParam String token) {
        try {
            verificationService.resendVerificationEmail(token);
            return ResponseEntity.ok("A new verification email has been sent.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
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
        cookie.setPath("/api/auth");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }
}
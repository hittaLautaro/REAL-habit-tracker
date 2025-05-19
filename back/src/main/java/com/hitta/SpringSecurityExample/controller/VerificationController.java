
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

    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestParam String token, HttpServletResponse response) {
        try {
            verificationService.verifyAccountWithToken(response, token);
            return ResponseEntity.ok("Your account has been verified.");
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<?> delete(@RequestParam String token, HttpServletResponse response) {
        try {
            verificationService.deleteAccountWithToken(response, token);
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
}
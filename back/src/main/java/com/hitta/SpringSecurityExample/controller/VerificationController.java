
package com.hitta.SpringSecurityExample.controller;

import com.hitta.SpringSecurityExample.exceptions.AlreadyVerifiedException;
import com.hitta.SpringSecurityExample.exceptions.ExpiredTokenException;
import com.hitta.SpringSecurityExample.exceptions.InvalidTokenException;
import com.hitta.SpringSecurityExample.service.VerificationService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/account")
public class VerificationController {

    private final VerificationService verificationService;

    public VerificationController(
            VerificationService verificationService
    ){
        this.verificationService = verificationService;
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestParam String token, HttpServletResponse response) {
        try {
            verificationService.verifyAccountWithToken(response, token);
            return ResponseEntity.ok("verified");
        } catch (AlreadyVerifiedException ave) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("already_verified");
        } catch (InvalidTokenException ite) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("invalid_token");
        } catch (ExpiredTokenException ete) {
            return ResponseEntity.status(HttpStatus.GONE).body("token_expired");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("unexpected_error");
        }
    }


    @PostMapping("/delete")
    public ResponseEntity<?> delete(@RequestParam String token, HttpServletResponse response) {
        try {
            verificationService.deleteAccountWithToken(response, token);
            return ResponseEntity.ok("Your account has been deleted.");
        } catch (InvalidTokenException ite) {
            System.out.println("InvalidTokenException: " + ite.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("invalid_token");
        } catch (ExpiredTokenException ete) {
            System.out.println("ExpiredTokenException: " + ete.getMessage());
            return ResponseEntity.status(HttpStatus.GONE).body("token_expired");
        } catch (Exception e) {
            System.out.println("Exception: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("unexpected_error");
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
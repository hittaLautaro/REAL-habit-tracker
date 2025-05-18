package com.hitta.SpringSecurityExample.controller;

import com.hitta.SpringSecurityExample.dtos.VerifyUserDto;
import com.hitta.SpringSecurityExample.service.VerificationService;
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
    public ResponseEntity<?> verify(@RequestParam String token) {
        verificationService.verifyAccountWithToken(token);
        return ResponseEntity.ok("Your account has been verified.");
    }

    @PostMapping("/delete")
    public ResponseEntity<?> delete(@RequestParam String token) {
        verificationService.deleteAccountWithToken(token);
        return ResponseEntity.ok("Your account has been deleted.");
    }
}


package com.hitta.SpringSecurityExample.service;

import com.hitta.SpringSecurityExample.dtos.*;
import com.hitta.SpringSecurityExample.exceptions.InvalidCredentialsException;
import com.hitta.SpringSecurityExample.exceptions.UserNotVerifiedException;
import com.hitta.SpringSecurityExample.model.*;
import com.hitta.SpringSecurityExample.repo.TokenRepo;
import com.hitta.SpringSecurityExample.repo.UserRepo;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Optional;
import java.util.Random;

@Service
public class AuthService {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private VerificationService verificationService;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private TokenRepo tokenRepo;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);


    @Transactional
    public Users register(RegisterRequest request, HttpServletResponse response) {
        if(userRepo.findIdByEmail(request.getEmail()).isPresent()) throw new RuntimeException("User with that email already exists");
        if(request.getPassword().length() > 28) throw new RuntimeException("User password length must be shorter or equal to 28 characters");
        System.out.println(request);

        ZoneId userZone = ZoneId.of(request.getTimeZone());
        LocalDate todayInUserTimezone = LocalDate.now(userZone);

        var user = Users.builder()
                .email(request.getEmail())
                .name(request.getName())
                .password(encoder.encode(request.getPassword()))
                .verificationCode(null)
                .verificationCodeExpiresAt(null)
                .lastVerificationCodeSentAt(null)
                .dateOfBirth(request.getDateOfBirth())
                .timeZone(request.getTimeZone())
                .emailVerified(false)
                .accountLocked(false)
                .enabled(true)
                .createdDate(LocalDateTime.now())
                .lastHabitResetDate(todayInUserTimezone)
                .streak(0)
                .build();

        var savedUser =  userRepo.save(user);

        AuthResponse authResponse = tokenService.createAccessAndRefreshTokens(savedUser);
        tokenService.addRefreshTokenCookie(response, authResponse.getRefreshToken());
        verificationService.sendVerificationEmail(savedUser);

        return savedUser;
    }

    public AuthResponse authenticate(LoginRequest request, HttpServletResponse response){
        try {
            Authentication authentication = authManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken
                                    (request.getEmail(), request.getPassword()));

            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            Users user = userDetails.getUser();

            AuthResponse authResponse = tokenService.createAccessAndRefreshTokens(user);
            tokenService.addRefreshTokenCookie(response, authResponse.getRefreshToken());
            return authResponse;

        } catch (BadCredentialsException e) {
            throw new InvalidCredentialsException("Invalid email or password.");
        }
    }


    public AuthResponse generateAccessToken(String refreshToken) {
        Token token = tokenRepo.findByToken(refreshToken)
                .orElseThrow(() -> new RuntimeException("Refresh token not found"));
        if (token.isRevoked() || token.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Refresh token is expired or revoked");
        }

        String accessToken = jwtService.generateAccessToken(token.getUser().getEmail());

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    public void revokeRefreshToken(HttpServletResponse response, String refreshToken) {
        Token token = tokenRepo.findByToken(refreshToken)
                .orElseThrow(() -> new RuntimeException("Refresh token not found"));
        token.setRevoked(true);
        tokenRepo.save(token);
        tokenService.deleteRefreshTokenCookie(response);
    }

    public void changePassword(@Valid LoginRequest request) {
        Users user = userRepo.findByEmail(request.getEmail()).orElseThrow(() -> new UsernameNotFoundException("Username not found."));

        user.setPassword(encoder.encode(request.getPassword()));

        userRepo.save(user);
    }
}

package com.hitta.SpringSecurityExample.service;

import com.hitta.SpringSecurityExample.dtos.*;
import com.hitta.SpringSecurityExample.model.*;
import com.hitta.SpringSecurityExample.repo.TokenRepo;
import com.hitta.SpringSecurityExample.repo.UserRepo;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
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
    private EmailService emailService;

    @Autowired
    private TokenRepo tokenRepo;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);


    @Transactional
    public Users register(RegisterRequest request) {
        if(userRepo.findIdByEmail(request.getEmail()).isPresent()) throw new RuntimeException("User with that email already exists");
        if(request.getPassword().length() > 28) throw new RuntimeException("User password length must be shorter or equal to 28 characters");

        ZoneId userZone = ZoneId.of(request.getTimeZone());
        LocalDate todayInUserTimezone = LocalDate.now(userZone);

        var user = Users.builder()
                .email(request.getEmail())
                .name(request.getName())
                .password(encoder.encode(request.getPassword()))
                .verificationCode(generateVerificationCode())
                .verificationCodeExpiresAt(LocalDateTime.now().plusMinutes(5))
                .dateOfBirth(request.getDateOfBirth())
                .timeZone(request.getTimeZone())
                .accountLocked(false)
                .enabled(false)
                .createdDate(LocalDateTime.now())
                .lastHabitResetDate(todayInUserTimezone)
                .streak(0)
                .build();

        sendVerificationEmail(user);

        return userRepo.save(user);

    }

    public AuthResponse authenticate(LoginRequest request){
        Authentication authentication = authManager
                .authenticate(
                        new UsernamePasswordAuthenticationToken
                                (request.getEmail(), request.getPassword()));

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Users user = userDetails.getUser();

        String accessToken = jwtService.generateAccessToken(request.getEmail());
        String refreshToken = createOrUpdateRefreshToken(user);

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    public void verifyUser(VerifyUserDto input) {
        Optional<Users> optionalUser = userRepo.findByEmail(input.getEmail());
        if (optionalUser.isPresent()) {
            Users user = optionalUser.get();
            if (user.getVerificationCodeExpiresAt().isBefore(LocalDateTime.now())) {
                throw new RuntimeException("Verification code has expired");
            }
            if (user.getVerificationCode().equals(input.getVerificationCode())) {
                user.setEnabled(true);
                user.setVerificationCode(null);
                user.setVerificationCodeExpiresAt(null);
                userRepo.save(user);
            } else {
                throw new RuntimeException("Invalid verification code");
            }
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public void resendVerificationCode(String email) {
        Optional<Users> optionalUser = userRepo.findByEmail(email);
        if (optionalUser.isPresent()) {
            Users user = optionalUser.get();
            if (user.isEnabled()) {
                throw new RuntimeException("Account is already verified");
            }
            user.setVerificationCode(generateVerificationCode());
            user.setVerificationCodeExpiresAt(LocalDateTime.now().plusHours(1));
            sendVerificationEmail(user);
            userRepo.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    private void sendVerificationEmail(Users user) { //TODO: Update with company logo
        String subject = "Account Verification";
        String verificationCode = "VERIFICATION CODE " + user.getVerificationCode();
        String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">Welcome to our app!</h2>"
                + "<p style=\"font-size: 16px;\">Please enter the verification code below to continue:</p>"
                + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                + "<h3 style=\"color: #333;\">Verification Code:</h3>"
                + "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">" + verificationCode + "</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";

        try {
            emailService.sendVerificationEmail(user.getEmail(), subject, htmlMessage);
        } catch (MessagingException e) {
            System.out.println(e.getMessage());
            System.out.println(user);
        }
    }
    private String generateVerificationCode() {
        Random random = new Random();
        int code = random.nextInt(900000) + 100000;
        return String.valueOf(code);
    }

    private String generateAndSaveRefreshToken(Users user){
        var tokenValue = jwtService.generateRefreshToken();

        var token = Token.builder()
                .token(tokenValue)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusDays(7))
                .user(user)
                .revoked(false)
                .build();

        tokenRepo.save(token);
        return tokenValue;
    }

    public String createOrUpdateRefreshToken(Users user) {
        Optional<Token> existingToken = tokenRepo.findByUserId(user.getId());

        if (existingToken.isPresent()) {
            Token token = existingToken.get();

            if (token.isRevoked() || token.getExpiresAt().isBefore(LocalDateTime.now())) {
                token.setToken(jwtService.generateRefreshToken());
                token.setCreatedAt(LocalDateTime.now());
                token.setExpiresAt(LocalDateTime.now().plusDays(7));
                token.setRevoked(false);
            }

            tokenRepo.save(token);
            return token.getToken();
        }

        return generateAndSaveRefreshToken(user);
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

    public void revokeRefreshToken(String refreshToken) {
        Token token = tokenRepo.findByToken(refreshToken)
                .orElseThrow(() -> new RuntimeException("Refresh token not found"));

        token.setRevoked(true);
        tokenRepo.save(token);
    }

    public void changePassword(@Valid LoginRequest request) {
        Users user = userRepo.findByEmail(request.getEmail()).orElseThrow(() -> new UsernameNotFoundException("Username not found."));

        user.setPassword(encoder.encode(request.getPassword()));

        userRepo.save(user);
    }
}

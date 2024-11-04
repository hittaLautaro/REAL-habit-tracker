package com.hittadev.real_tracker.auth;

import com.hittadev.real_tracker.email.EmailService;
import com.hittadev.real_tracker.models.Token;
import com.hittadev.real_tracker.models.User;
import com.hittadev.real_tracker.repositories.RoleRepository;
import com.hittadev.real_tracker.repositories.TokenRepository;
import com.hittadev.real_tracker.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final int MAX_TOKEN_LENGTH = 6;

    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final EmailService emailService;

    public void register(RegistrationRequest request){
        var userRole = roleRepository.findByName("USER")
                // todo - better exception handling
                .orElseThrow(() -> new IllegalStateException("ROLE USER WAS NOT INTIALIZED"));

        var user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .accountLocked(false)
                .enabled(true)
                .roles(List.of(userRole))
                .build();

        userRepository.save(user);
        sendValidationEmail(user);
    }

    private void sendValidationEmail(User user) {
        var newToken = generateAndSaveActivationToken(user);
        // todo - send email
    }

    private String generateAndSaveActivationToken(User user) {
        // generate token
        String generatedToken = generateActivationCode(MAX_TOKEN_LENGTH);

        var token = Token.builder()
                .token(generatedToken)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .user(user)
                .build();

        tokenRepository.save(token);
        return generatedToken;
    }

    private String generateActivationCode(int length) {
        String characters = "0123456789";
        StringBuilder codeBuilder = new StringBuilder();
        SecureRandom secureRandom = new SecureRandom();
        for(int i = 0; i < length; i ++){
            int randomIndex = secureRandom.nextInt(characters.length());
            codeBuilder.append(characters.charAt(0));
        }

        return codeBuilder.toString();
    }


}

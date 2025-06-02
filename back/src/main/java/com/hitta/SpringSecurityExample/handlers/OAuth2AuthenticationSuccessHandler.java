package com.hitta.SpringSecurityExample.handlers;

import com.hitta.SpringSecurityExample.dtos.AuthResponse;
import com.hitta.SpringSecurityExample.model.CustomUserDetails;
import com.hitta.SpringSecurityExample.model.Users;
import com.hitta.SpringSecurityExample.repo.UserRepo;
import com.hitta.SpringSecurityExample.service.TokenService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.UUID;

@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Value("${FRONTEND_URL}")
    private String frontendUrl;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private TokenService tokenService;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        try {
            String email = oAuth2User.getAttribute("email");
            String name = oAuth2User.getAttribute("name");
            String providerId = oAuth2User.getAttribute("sub");

            if (email == null) {
                response.sendRedirect(frontendUrl + "/login?error=no_email");
                return;
            }

            Users user = userRepo.findByEmail(email)
                    .orElseGet(() -> createOAuth2User(email, name));

            CustomUserDetails customUserDetails = new CustomUserDetails(user);
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                    customUserDetails, null, customUserDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(auth);

            AuthResponse authResponse = tokenService.createAccessAndRefreshTokens(user);
            tokenService.addRefreshTokenCookie(response, authResponse.getRefreshToken());

            String redirectUrl = frontendUrl + "/auth/callback?token=" +
                    URLEncoder.encode(authResponse.getAccessToken(), StandardCharsets.UTF_8);

            response.sendRedirect(redirectUrl);

        } catch (Exception e) {
            logger.error("OAuth2 authentication failed", e);
            response.sendRedirect(frontendUrl + "/login?error=oauth2_failed");
        }
    }

    private Users createOAuth2User(String email, String name) {
        String randomPassword = encoder.encode(UUID.randomUUID().toString());

        ZoneId defaultZone = ZoneId.of("UTC");
        LocalDate today = LocalDate.now(defaultZone);

        Users user = Users.builder()
                .email(email)
                .name(name != null ? name : email.split("@")[0])
                .password(randomPassword)
                .verificationCode(null)
                .verificationCodeExpiresAt(null)
                .lastVerificationCodeSentAt(null)
                .dateOfBirth(null)
                .timeZone("UTC")
                .emailVerified(true)
                .accountLocked(false)
                .enabled(true)
                .createdDate(LocalDateTime.now())
                .lastHabitResetDate(today)
                .streak(0)
                .build();

        return userRepo.save(user);
    }
}
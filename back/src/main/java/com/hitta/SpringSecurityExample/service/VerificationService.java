package com.hitta.SpringSecurityExample.service;

import com.hitta.SpringSecurityExample.dtos.VerifyUserDto;
import com.hitta.SpringSecurityExample.model.Users;
import com.hitta.SpringSecurityExample.model.VerificationToken;
import com.hitta.SpringSecurityExample.repo.UserRepo;
import com.hitta.SpringSecurityExample.repo.VerificationTokenRepo;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VerificationService {

    @Autowired
    private VerificationTokenRepo tokenRepo;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserRepo userRepo;

    public void sendVerificationEmail(Users user) {
        VerificationToken token = new VerificationToken(user, 15);
        tokenRepo.save(token);

        String baseUrl = "https://yourapp.com/api/account";
        String verifyLink = baseUrl + "/verify?token=" + token.getToken();
        String deleteLink = baseUrl + "/delete?token=" + token.getToken();

        String subject = "Verify Your Account";
        String html = "<p>Click below to verify or delete your account:</p>" +
                "<p><a href='" + verifyLink + "'>Verify Account</a></p>" +
                "<p><a href='" + deleteLink + "'>Delete Account</a></p>";

        emailService.sendEmail(user.getEmail(), subject, html);
    }


    public void verifyAccountWithToken(String token) {
        VerificationToken vt = tokenRepo.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        if (vt.isExpired()) {
            tokenRepo.delete(vt);
            throw new RuntimeException("Token expired");
        }

        Users user = vt.getUser();
        user.setEnabled(true);
        userRepo.save(user);
        tokenRepo.delete(vt);
    }

    public void deleteAccountWithToken(String token) {
        VerificationToken vt = tokenRepo.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        if (vt.isExpired()) {
            tokenRepo.delete(vt);
            throw new RuntimeException("Token expired");
        }

        Users user = vt.getUser();
        tokenRepo.delete(vt);
        userRepo.delete(user);
    }
}

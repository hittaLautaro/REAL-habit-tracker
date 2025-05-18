package com.hitta.SpringSecurityExample.service;

import com.hitta.SpringSecurityExample.dtos.VerifyUserDto;
import com.hitta.SpringSecurityExample.model.Users;
import com.hitta.SpringSecurityExample.model.VerificationToken;
import com.hitta.SpringSecurityExample.repo.UserRepo;
import com.hitta.SpringSecurityExample.repo.VerificationTokenRepo;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
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

    @Transactional
    public void sendVerificationEmail(Users user) {
        try{
            if(tokenRepo.findByUser(user).isPresent()) {
                throw new RuntimeException("User has already received this email");
            }
            VerificationToken token = new VerificationToken(user, 15);
            tokenRepo.save(token);
            System.out.println("Token saved?");

            String baseUrl = "http://localhost:5173/api/account";
            String verifyLink = baseUrl + "/verify?token=" + token.getToken();
            String deleteLink = baseUrl + "/delete?token=" + token.getToken();

            String subject = "Verify Your Account";
            String html =
                    "<!DOCTYPE html>"
                            + "<html lang='en'>"
                            + "<head>"
                            + "  <meta charset='UTF-8' />"
                            + "  <title>Verify Your Account</title>"
                            + "</head>"
                            + "<body style='font-family: Arial, sans-serif; font-size: 16px; color: #333; background-color: #f9f9f9; padding: 24px;'>"
                            + "  <div style='max-width: 600px; margin: auto; background-color: #ffffff; padding: 32px; border-radius: 8px; border: 1px solid #e0e0e0;'>"
                            + "    <h2 style='color: #2c3e50; margin-top: 0'>Welcome to Real</h2>"
                            + "    <p>Thank you for signing up. To start using your account, please verify your email address by clicking the button below:</p>"
                            + "    <div style='margin: 30px 0'>"
                            + "      <a href='" + verifyLink + "' "
                            + "         style='display: inline-block; background-color: #1a73e8; color: white; padding: 14px 28px; text-decoration: none; border-radius: 4px; font-weight: 600; font-size: 16px;'>"
                            + "        Verify Account"
                            + "      </a>"
                            + "    </div>"
                            + "    <hr style='border: none; border-top: 1px solid #ddd; margin: 40px 0' />"
                            + "    <p style='color: #555'>"
                            + "      If you did not create this account or prefer not to proceed, you can choose to delete your account using the following link:"
                            + "    </p>"
                            + "    <p style='margin-top: 8px'>"
                            + "      <a href='" + deleteLink + "' style='color: #414141; text-decoration: underline'>"
                            + "        " + deleteLink
                            + "      </a>"
                            + "    </p>"
                            + "    <p style='font-size: 14px; color: #888; margin-top: 40px'>"
                            + "      This link will expire in 15 minutes for your security."
                            + "    </p>"
                            + "  </div>"
                            + "</body>"
                            + "</html>";



            emailService.sendEmail(user.getEmail(), subject, html);
        }catch(RuntimeException e){
            System.out.println(e.getMessage());
        }
    }


    public void verifyAccountWithToken(String token) {
        VerificationToken vt = tokenRepo.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        if (vt.isExpired()) {
            tokenRepo.delete(vt);
            throw new RuntimeException("Token expired");
        }

        Users user = vt.getUser();
        user.setEmailVerified(true);
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

package com.artistry.artistry.controller;

import com.artistry.artistry.service.VerificationService;
import com.artistry.artistry.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/verification")
public class VerificationController {

    @Autowired
    private VerificationService verificationService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public String sendVerificationCode(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");
        if (email == null) {
            throw new IllegalArgumentException("Email is required");
        }
        String code = verificationService.generateVerificationCode(email);
        emailService.sendVerificationEmail(email, "Your Verification Code", "Your verification code is: " + code);
        return "Verification code sent to " + email;
    }


    @PostMapping("/verify")
    public String verifyCode(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");
        String code = requestBody.get("code");

        if (email == null || code == null) {
            throw new IllegalArgumentException("Email and code are required");
        }

        boolean isVerified = verificationService.verifyCode(email, code);
        return isVerified ? "Verification successful" : "Invalid or expired verification code";
    }

}

package com.artistry.artistry.controller;

import com.artistry.artistry.entity.Users;
import com.artistry.artistry.service.UserService;
import com.artistry.artistry.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/register")
    public String registerUser(@RequestBody Users user) {
        // 사용자 저장
        Users savedUser = userService.registerUser(user);

        // 이메일 인증 링크 생성
        String verificationToken = UUID.randomUUID().toString();
        String verificationUrl = "http://localhost:8080/users/verify-email?token=" + verificationToken;

        // 이메일 발송
        emailService.sendVerificationEmail(user.getEmail(), verificationUrl);

        return "User registered successfully. Please check your email to verify your account.";
    }

    @GetMapping("/verify-email")
    public String verifyEmail(@RequestParam String token) {
        // TODO: Implement email verification logic here
        return "Email verification successful.";
    }

    @GetMapping("/{username}")
    public Users getUser(@PathVariable String username) {
        return userService.findByUsername(username);
    }

    @GetMapping("/email/{email}")
    public Users getUserByEmail(@PathVariable String email) {
        return userService.findByEmail(email);
    }
}

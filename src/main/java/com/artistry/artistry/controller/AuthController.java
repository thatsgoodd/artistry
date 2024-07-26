package com.artistry.artistry.controller;

import com.artistry.artistry.dto.UserRegistrationRequest;
import com.artistry.artistry.entity.Users;
import com.artistry.artistry.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    // 회원가입
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserRegistrationRequest registrationRequest) {
        boolean isRegistered = userService.registerUser(registrationRequest);
        if (isRegistered) {
            return ResponseEntity.ok("User registered successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User registration failed");
        }
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String email, @RequestParam String password) {
        boolean isAuthenticated = userService.authenticateUser(email, password);
        if (isAuthenticated) {
            return ResponseEntity.ok("Login successful");
        }
        return ResponseEntity.badRequest().body("Invalid credentials");
    }

    // ID 찾기
    @PostMapping("/find-id")
    public ResponseEntity<String> findId(@RequestParam String name, @RequestParam String email) {
        Optional<Users> user = userService.findUserByNameAndEmail(name, email);
        return user.map(value -> ResponseEntity.ok("Your ID is " + value.getId() + "."))
                .orElseGet(() -> ResponseEntity.badRequest().body("No matching user information found"));
    }

    // 비밀번호 찾기
    @PostMapping("/find-password")
    public ResponseEntity<String> findPassword(@RequestParam String id, @RequestParam String name, @RequestParam String email) {
        boolean isValid = userService.validateUserForPasswordReset(id, name, email);
        if (isValid) {
            return ResponseEntity.ok("Redirecting to password reset page.");
        }
        return ResponseEntity.badRequest().body("No matching user information found");
    }

    // 비밀번호 재설정
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String id, @RequestParam String newPassword) {
        boolean isReset = userService.resetPassword(id, newPassword);
        if (isReset) {
            return ResponseEntity.ok("Password has been reset");
        }
        return ResponseEntity.badRequest().body("No matching user information found");
    }

    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return ResponseEntity.ok("Logged out successfully");
    }

    @PostMapping("/resend-email")
    public String resendVerificationEmail(@RequestParam String email) {
        boolean emailSent = userService.resendVerificationEmail(email);
        if (emailSent) {
            return "redirect:/email-sent";
        } else {
            return "redirect:/resend-email?error";
        }
    }
}

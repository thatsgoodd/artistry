package com.artistry.artistry.controller;

import com.artistry.artistry.entity.Users;
import com.artistry.artistry.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class AccountController {

    private final UserRepository userRepository;

    // Display the signup form
    @GetMapping("/signup")
    public ResponseEntity<String> showSignupForm() {
        return ResponseEntity.ok("Displaying signup form");
    }

    // Handle signup (POST method)
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody Users user) {
        Optional<Users> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("User already registered");
        }
        userRepository.save(user);
        return ResponseEntity.ok("Signup successful");
    }

    // Display the login form
    @GetMapping("/login")
    public ResponseEntity<String> showLoginForm() {
        return ResponseEntity.ok("Displaying login form");
    }

    // Handle login (POST method)
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String email, @RequestParam String password) {
        Optional<Users> user = userRepository.findByEmail(email);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return ResponseEntity.ok("Login successful");
        }
        return ResponseEntity.badRequest().body("Please check your login credentials");
    }

    // Display the find ID form
    @GetMapping("/find-id")
    public ResponseEntity<String> showFindIdForm() {
        return ResponseEntity.ok("Displaying find ID form");
    }

    // Handle find ID (POST method)
    @PostMapping("/find-id")
    public ResponseEntity<String> findId(@RequestParam String name, @RequestParam String email) {
        Optional<Users> user = userRepository.findByNameAndEmail(name, email);
        return user.map(value -> ResponseEntity.ok("Your ID is " + value.getId() + "."))
                .orElseGet(() -> ResponseEntity.badRequest().body("No matching user information found"));
    }

    // Display the find password form
    @GetMapping("/find-password")
    public ResponseEntity<String> showFindPasswordForm() {
        return ResponseEntity.ok("Displaying find password form");
    }

    // Handle find password (POST method)
    @PostMapping("/find-password")
    public ResponseEntity<String> findPassword(@RequestParam String id, @RequestParam String name, @RequestParam String email) {
        Optional<Users> user = userRepository.findByIdAndNameAndEmail(id, name, email);
        return user.map(value -> ResponseEntity.ok("Redirecting to password reset page."))
                .orElseGet(() -> ResponseEntity.badRequest().body("No matching user information found"));
    }

    // Handle password reset (POST method)
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String id, @RequestParam String newPassword) {
        Optional<Users> user = userRepository.findById(id);
        if (user.isPresent()) {
            Users existingUser = user.get();
            existingUser.setPassword(newPassword);
            userRepository.save(existingUser);
            return ResponseEntity.ok("Password has been reset");
        }
        return ResponseEntity.badRequest().body("No matching user information found");
    }

    // Handle logout
    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return ResponseEntity.ok("Logged out successfully");
    }
}

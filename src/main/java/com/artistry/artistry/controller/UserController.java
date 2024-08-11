package com.artistry.artistry.controller;

import com.artistry.artistry.dto.RegistrationRequest;
import com.artistry.artistry.model.AppUser;
import com.artistry.artistry.service.AppUserService;
import com.artistry.artistry.service.VerificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
public class UserController {

    private final AppUserService userService;
    private final VerificationService verificationService;

    public UserController(AppUserService userService, VerificationService verificationService) {
        this.userService = userService;
        this.verificationService = verificationService;
    }

    @GetMapping("/register")
    public String showRegistrationForm(Model model) {
        model.addAttribute("user", new AppUser());
        return "register";
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegistrationRequest request) {
        // 이메일 인증 확인
        if (!verificationService.verifyCode(request.getEmail(), request.getEmailVerificationCode())) {
            return ResponseEntity.badRequest().body("이메일 인증이 완료되지 않았습니다.");
        }

        // 비밀번호 일치 확인
        if (!userService.validatePassword(request.getPassword(), request.getConfirmPassword())) {
            return ResponseEntity.badRequest().body("비밀번호가 일치하지 않습니다.");
        }

        // 유저 객체 생성
        AppUser user = new AppUser();
        user.setUsername(request.getUsername());
        user.setPassword(userService.encodePassword(request.getPassword())); // 비밀번호 암호화
        user.setEmail(request.getEmail());
        user.setName(request.getName());

        // 유저 등록
        if (!userService.registerUser(user)) {
            return ResponseEntity.badRequest().body("이미 등록된 회원정보입니다.");
        }

        return ResponseEntity.ok("회원가입이 완료되었습니다.");
    }

    @GetMapping("/check-username")
    public ResponseEntity<String> checkUsername(@RequestParam("username") String username) {
        if (userService.existsByUsername(username)) {
            return ResponseEntity.ok("사용 불가능한 ID입니다.");
        } else {
            return ResponseEntity.ok("사용 가능한 ID입니다.");
        }
    }

    @GetMapping("/login")
    public String showLoginForm() {
        return "login";
    }

    @GetMapping("/forgot-username")
    public String showForgotUsernameForm() {
        return "forgot-username";
    }

    @PostMapping("/forgot-username")
    public String findUsername(@RequestParam String name, @RequestParam String email, Model model) {
        Optional<AppUser> user = userService.findByNameAndEmail(name, email);
        if (user.isPresent()) {
            model.addAttribute("message", "회원님의 아이디는 " + user.get().getUsername() + "입니다.");
        } else {
            model.addAttribute("error", "일치하는 회원 정보가 없습니다.");
        }
        return "forgot-username";
    }

    @GetMapping("/forgot-password")
    public String showForgotPasswordForm() {
        return "forgot-password";
    }

    @PostMapping("/forgot-password")
    public String resetPassword(@RequestParam String username,
                                @RequestParam String name,
                                @RequestParam String email,
                                Model model) {
        Optional<AppUser> user = userService.findByUsername(username);
        if (user.isPresent() && user.get().getName().equals(name) && user.get().getEmail().equals(email)) {
            model.addAttribute("user", user.get());
            return "reset-password";
        } else {
            model.addAttribute("error", "일치하는 회원 정보가 없습니다.");
            return "forgot-password";
        }
    }

    @PostMapping("/reset-password")
    public String updatePassword(@RequestParam Long id,
                                 @RequestParam String newPassword,
                                 @RequestParam String confirmPassword,
                                 Model model) {
        if (!userService.validatePassword(newPassword, confirmPassword)) {
            model.addAttribute("error", "비밀번호가 일치하지 않습니다.");
            return "reset-password";
        }
        Optional<AppUser> user = userService.findById(id);
        if (user.isPresent()) {
            userService.updatePassword(user.get(), newPassword);
            model.addAttribute("message", "비밀번호가 성공적으로 변경되었습니다.");
            return "login";
        } else {
            model.addAttribute("error", "비밀번호 변경 중 오류가 발생했습니다.");
            return "reset-password";
        }
    }

    @GetMapping("/logout")
    public String logout() {
        return "redirect:/login";
    }
}

package com.artistry.artistry.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    // 홈 페이지를 반환
    @GetMapping("/")
    public String home() {
        return "home";
    }

    // 로그인 페이지를 반환
    @GetMapping("/login")
    public String loginPage() {
        return "login"; // src/main/resources/templates/login.html
    }

    // 회원가입 페이지를 반환
    @GetMapping("/register")
    public String signUpPage() {
        return "register"; // src/main/resources/templates/sign-up.html
    }

    // 아이디 찾기 페이지 반환
    @GetMapping("find-id")
    public String findId() {
        return "find-id"; // 템플릿 이름 또는 HTML 파일 이름을 반환
    }


    // 비밀번호 찾기 페이지 반환
    @GetMapping("find-password")
    public String findPassword() {
        return "find-password"; // 템플릿 이름 또는 HTML 파일 이름을 반환
    }


    // 비밀번호 재설정 페이지를 반환
    @GetMapping("/reset-password")
    public String resetPasswordPage() {
        return "reset-password"; // src/main/resources/templates/reset-password.html
    }

    // 프로젝트 리스트 페이지를 반환
    @GetMapping("/project/list")
    public String projectListPage() {
        return "project-list"; // src/main/resources/templates/project-list.html
    }

    @GetMapping("/verify-email")
    public String verifyEmail() {
        return "verify-email";
    }

    @GetMapping("/email-sent")
    public String emailSent() {
        return "email-sent";
    }

    @GetMapping("/resend-email")
    public String resendEmailPage() {
        return "resend-email";
    }

}

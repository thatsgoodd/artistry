package com.artistry.artistry.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    @GetMapping("/")
    public String home() {
        return "home"; // 템플릿 이름 또는 HTML 파일 이름을 반환
    }
}


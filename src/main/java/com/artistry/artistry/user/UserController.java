package com.artistry.artistry.user;

import ch.qos.logback.core.model.Model;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserController {

    @GetMapping("/sign-up")
    public String signUp(Model model) {
        return "user/sign-up";

    }
}

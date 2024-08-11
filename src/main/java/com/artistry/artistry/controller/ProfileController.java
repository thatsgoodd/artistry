package com.artistry.artistry.controller;

import com.artistry.artistry.model.Post;
import com.artistry.artistry.model.AppUser;
import com.artistry.artistry.service.PostService;
import com.artistry.artistry.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;
import java.util.List;

@Controller
public class ProfileController {

    @Autowired
    private AppUserService userService;

    @Autowired
    private PostService postService;

    @GetMapping("/profile")
    public String viewProfile(Model model, Principal principal) {
        AppUser user = userService.findByUsername(principal.getName()).orElse(null);
        if (user != null) {
            model.addAttribute("user", user);
            List<Post> myPosts = postService.findPostsByUser(user);
            List<Post> scrappedPosts = postService.findScrappedPosts(user);
            model.addAttribute("myPosts", myPosts);
            model.addAttribute("scrappedPosts", scrappedPosts);
        }
        return "profile";
    }
}

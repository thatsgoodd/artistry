package com.artistry.artistry.controller;

import com.artistry.artistry.model.Post;
import com.artistry.artistry.model.AppUser;
import com.artistry.artistry.service.PostService;
import com.artistry.artistry.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@Controller
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private AppUserService userService;

    @GetMapping("/post/new")
    public String showNewPostForm(Model model) {
        model.addAttribute("post", new Post());
        return "new-post";
    }

    @PostMapping("/post/new")
    public String createPost(@ModelAttribute Post post, Principal principal) {
        AppUser user = userService.findByUsername(principal.getName()).orElse(null);
        if (user != null) {
            post.setUser(user);
            postService.savePost(post);
        }
        return "redirect:/profile";
    }

    @PostMapping("/post/{postId}/scrap")
    public String scrapPost(@PathVariable Long postId, Principal principal) {
        AppUser user = userService.findByUsername(principal.getName()).orElse(null);
        Post post = postService.findById(postId).orElse(null);
        if (user != null && post != null) {
            postService.scrapPost(user, post);
        }
        return "redirect:/profile";
    }
}

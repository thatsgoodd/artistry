package com.artistry.artistry.controller;

import com.artistry.artistry.model.AppUser;
import com.artistry.artistry.model.Post;
import com.artistry.artistry.model.InterestCategory;
import com.artistry.artistry.service.AppUserService;
import com.artistry.artistry.service.PostService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/main")
public class MainController {

    private final AppUserService userService;
    private final PostService postService;

    public MainController(AppUserService userService, PostService postService) {
        this.userService = userService;
        this.postService = postService;
    }

    @GetMapping("/popular-posts")
    public List<Post> getPopularPosts() {
        return postService.findPopularPosts();
    }

    @GetMapping("/interest-posts")
    public List<Post> getInterestPosts(Principal principal) {
        AppUser user = userService.findByUsername(principal.getName()).orElseThrow();
        return postService.findPostsByInterests(user.getInterests());
    }

    @GetMapping("/following-posts")
    public List<Post> getFollowingPosts(Principal principal) {
        AppUser user = userService.findByUsername(principal.getName()).orElseThrow();
        return postService.findPostsByFollowing(user);
    }

    @GetMapping("/refresh")
    public void refreshMainPage() {
        // 새로고침 시 데이터를 갱신하는 로직
        postService.refreshAllPosts();
    }

    // 기타 메인 화면 관련 메서드들
}

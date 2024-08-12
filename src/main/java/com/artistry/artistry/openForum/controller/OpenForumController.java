package com.artistry.artistry.openForum.controller;

import com.artistry.artistry.openForum.entity.FreePost;
import com.artistry.artistry.openForum.service.OpenForumService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/free-posts")
@RequiredArgsConstructor
public class OpenForumController {

    private final OpenForumService openForumService;

    @PostMapping
    public ResponseEntity<FreePost> createPost(@RequestBody FreePost freePost) {
        FreePost createdPost = openForumService.createPost(freePost);
        return ResponseEntity.ok(createdPost);
    }

    @GetMapping
    public ResponseEntity<List<FreePost>> getAllPosts() {
        List<FreePost> posts = openForumService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FreePost> getPostById(@PathVariable Long id) {
        return openForumService.getPostById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<FreePost> updatePost(@PathVariable Long id, @RequestBody FreePost freePost) {
        FreePost updatedPost = openForumService.updatePost(id, freePost);
        return ResponseEntity.ok(updatedPost);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        openForumService.deletePost(id);
        return ResponseEntity.noContent().build();
    }
}

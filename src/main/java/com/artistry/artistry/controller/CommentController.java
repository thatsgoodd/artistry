// Comment Controller
package com.artistry.artistry.controller;

import com.artistry.artistry.model.Comment;
import com.artistry.artistry.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/post/{postId}")
    public List<Comment> getCommentsByPost(@PathVariable Long postId) {
        return commentService.getCommentsByPost(postId);
    }

    @GetMapping("/replies/{commentId}")
    public List<Comment> getRepliesByComment(@PathVariable Long commentId) {
        return commentService.getRepliesByComment(commentId);
    }

    @PostMapping
    public Comment createComment(@RequestBody Comment comment) {
        return commentService.createComment(comment);
    }

    @DeleteMapping("/{commentId}")
    public void deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
    }

    @PostMapping("/{commentId}/like")
    public void likeComment(@RequestParam Long userId, @PathVariable Long commentId) {
        commentService.likeComment(userId, commentId);
    }

    @DeleteMapping("/{commentId}/like")
    public void unlikeComment(@RequestParam Long userId, @PathVariable Long commentId) {
        commentService.unlikeComment(userId, commentId);
    }
}

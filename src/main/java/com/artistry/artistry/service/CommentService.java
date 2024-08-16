package com.artistry.artistry.service;

import com.artistry.artistry.model.AppUser;
import com.artistry.artistry.model.Comment;
import com.artistry.artistry.model.CommentLike;
import com.artistry.artistry.repository.CommentLikeRepository;
import com.artistry.artistry.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final CommentLikeRepository commentLikeRepository;

    public CommentService(CommentRepository commentRepository, CommentLikeRepository commentLikeRepository) {
        this.commentRepository = commentRepository;
        this.commentLikeRepository = commentLikeRepository;
    }

    public List<Comment> getCommentsByPost(Long postId) {
        return commentRepository.findByPostId(postId);
    }

    public List<Comment> getRepliesByComment(Long commentId) {
        return commentRepository.findByParentCommentId(commentId);
    }

    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }

    public void likeComment(Long userId, Long commentId) {
        Optional<CommentLike> existingLike = commentLikeRepository.findByUserIdAndCommentId(userId, commentId);
        if (existingLike.isEmpty()) {
            CommentLike like = new CommentLike();
            AppUser user = new AppUser();
            user.setId(userId);
            like.setUser(user);
            Comment comment = new Comment();
            comment.setId(commentId);
            like.setComment(comment);
            commentLikeRepository.save(like);
        }
    }

    public void unlikeComment(Long userId, Long commentId) {
        commentLikeRepository.findByUserIdAndCommentId(userId, commentId)
                .ifPresent(commentLikeRepository::delete);
    }
}

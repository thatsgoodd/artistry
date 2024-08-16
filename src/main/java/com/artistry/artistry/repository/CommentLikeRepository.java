// CommentLike Repository (댓글 좋아요)
package com.artistry.artistry.repository;

import com.artistry.artistry.model.CommentLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {
    Optional<CommentLike> findByUserIdAndCommentId(Long userId, Long commentId);
}

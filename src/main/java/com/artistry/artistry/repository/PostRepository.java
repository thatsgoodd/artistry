package com.artistry.artistry.repository;

import com.artistry.artistry.model.AppUser;
import com.artistry.artistry.model.InterestCategory;
import com.artistry.artistry.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface PostRepository extends JpaRepository<Post, Long> {

    // 사용자 ID로 게시물을 찾는 메서드
    List<Post> findByUserId(Long userId);

    // 사용자 ID로 댓글에 대한 좋아요 합계를 계산하는 쿼리
    @Query("SELECT SUM(c.likes) FROM Comment c WHERE c.post.user.id = :userId")
    Long sumLikesForCommentsByUserId(@Param("userId") Long userId);

    // 사용자 ID로 게시물의 좋아요 합계를 계산하는 쿼리
    @Query("SELECT SUM(p.likes) FROM Post p WHERE p.user.id = :userId")
    Long sumLikesByUserId(@Param("userId") Long userId);

    // 게시물 ID로 게시물을 찾는 메서드
    Optional<Post> findById(Long postId);

    // 관심 카테고리에 속한 게시물을 찾는 메서드
    List<Post> findByCategoriesIn(Set<InterestCategory> categories);

    // 좋아요 수가 많은 상위 3개의 게시물을 찾는 메서드
    List<Post> findTop3ByOrderByLikesDesc();

    // 특정 사용자 집합에 속한 게시물을 찾는 메서드
    List<Post> findByUserIn(Set<AppUser> users);
}

package com.artistry.artistry.service;

import com.artistry.artistry.model.AppUser;
import com.artistry.artistry.model.Post;
import com.artistry.artistry.model.InterestCategory;
import com.artistry.artistry.model.Follow;
import com.artistry.artistry.repository.PostRepository;
import com.artistry.artistry.repository.AppUserRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final AppUserRepository userRepository;

    public PostService(PostRepository postRepository, AppUserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public List<Post> findPostsByUserId(Long userId) {
        return postRepository.findByUserId(userId);
    }

    public int getTotalLikesForUser(Long userId) {
        Number postLikes = postRepository.sumLikesByUserId(userId);
        Number commentLikes = postRepository.sumLikesForCommentsByUserId(userId);

        int totalPostLikes = postLikes != null ? postLikes.intValue() : 0;
        int totalCommentLikes = commentLikes != null ? commentLikes.intValue() : 0;

        return totalPostLikes + totalCommentLikes;
    }

    public List<Post> findPostsByInterests(Set<InterestCategory> categories) {
        return postRepository.findByCategoriesIn(categories);
    }

    public List<Post> findPopularPosts() {
        return postRepository.findTop3ByOrderByLikesDesc();
    }

    public List<Post> findPostsByFollowing(AppUser user) {
        Set<AppUser> followedUsers = user.getFollowing()
                .stream()
                .map(Follow::getFollowee)
                .collect(Collectors.toSet());

        return postRepository.findByUserIn(followedUsers);
    }

    public void addPost(Post post) {
        postRepository.save(post);
    }

    public void savePost(Post post) {
        postRepository.save(post);
    }

    public Optional<Post> findById(Long postId) {
        return postRepository.findById(postId);
    }

    public void scrapPost(AppUser user, Post post) {
        if (user.getScraps().contains(post)) {
            return;
        }

        user.getScraps().add(post);
        post.getScrappers().add(user);

        postRepository.save(post);
        userRepository.save(user);
    }

    public List<Post> refreshAllPosts() {
        return postRepository.findAll(Sort.by(Sort.Direction.DESC, "createdDate"));
    }
}

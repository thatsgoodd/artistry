package com.artistry.artistry.service;

import com.artistry.artistry.model.Post;
import com.artistry.artistry.model.AppUser;
import com.artistry.artistry.repository.PostRepository;
import com.artistry.artistry.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private AppUserRepository userRepository;

    public List<Post> findPostsByUser(AppUser user) {
        return postRepository.findByUser(user);
    }

    public void scrapPost(AppUser user, Post post) {
        user.getScrappedPosts().add(post);
        userRepository.save(user);
    }

    public List<Post> findScrappedPosts(AppUser user) {
        return new ArrayList<>(user.getScrappedPosts());
    }

    public void savePost(Post post) {
        postRepository.save(post);
    }

    public Optional<Post> findPostById(Long postId) {
        return postRepository.findById(postId);
    }
}

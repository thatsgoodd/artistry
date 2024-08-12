package com.artistry.artistry.openForum.service;

import com.artistry.artistry.openForum.entity.FreePost;
import com.artistry.artistry.openForum.repository.FreePostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OpenForumService {

    private final FreePostRepository freePostRepository;

    public FreePost createPost(FreePost freePost) {
        return freePostRepository.save(freePost);
    }

    public List<FreePost> getAllPosts() {
        return freePostRepository.findAll();
    }

    public Optional<FreePost> getPostById(Long id) {
        return freePostRepository.findById(id);
    }

    public FreePost updatePost(Long id, FreePost updatedPost) {
        Optional<FreePost> existingPost = freePostRepository.findById(id);
        if (existingPost.isPresent()) {
            FreePost post = existingPost.get();
            post.setTitle(updatedPost.getTitle());
            post.setContent(updatedPost.getContent());
            return freePostRepository.save(post);
        } else {
            throw new RuntimeException("Post not found with id " + id);
        }
    }

    public void deletePost(Long id) {
        freePostRepository.deleteById(id);
    }
}

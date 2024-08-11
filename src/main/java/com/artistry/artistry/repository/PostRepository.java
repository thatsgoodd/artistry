package com.artistry.artistry.repository;

import com.artistry.artistry.model.Post;
import com.artistry.artistry.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUser(AppUser user);
}

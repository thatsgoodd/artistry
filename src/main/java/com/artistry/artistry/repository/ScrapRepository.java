package com.artistry.artistry.repository;

import com.artistry.artistry.model.AppUser;
import com.artistry.artistry.model.Post;
import com.artistry.artistry.model.Scrap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ScrapRepository extends JpaRepository<Scrap, Long> {
    Optional<Scrap> findByUserAndPost(AppUser user, Post post);
}

package com.artistry.artistry.openForum.repository;

import com.artistry.artistry.openForum.entity.FreePost;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FreePostRepository extends JpaRepository<FreePost, Long> {
    List<FreePost> findByTitleContaining(String keyword);
}

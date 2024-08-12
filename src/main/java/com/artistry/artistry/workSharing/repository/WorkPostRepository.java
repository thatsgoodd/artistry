package com.artistry.artistry.workSharing.repository;

import com.artistry.artistry.workSharing.entity.WorkPost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkPostRepository extends JpaRepository<WorkPost, Long> {
}

// Collaboration Repository
package com.artistry.artistry.repository;

import com.artistry.artistry.model.Collaboration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CollaborationRepository extends JpaRepository<Collaboration, Long> {
    List<Collaboration> findByUserId(Long userId);
}

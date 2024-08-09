package com.artistry.artistry.repository;

import com.artistry.artistry.entity.CollaborationChat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CollaborationChatRepository extends JpaRepository<CollaborationChat, Long> {
}

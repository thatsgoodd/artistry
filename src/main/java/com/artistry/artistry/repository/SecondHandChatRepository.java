package com.artistry.artistry.repository;

import com.artistry.artistry.entity.SecondHandChat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SecondHandChatRepository extends JpaRepository<SecondHandChat, Long> {
}

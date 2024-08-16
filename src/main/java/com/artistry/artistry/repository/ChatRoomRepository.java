// ChatRoom Repository
package com.artistry.artistry.repository;

import com.artistry.artistry.model.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    List<ChatRoom> findByUserId(Long userId);
}

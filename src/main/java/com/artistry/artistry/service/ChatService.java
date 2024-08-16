// Chat Service
package com.artistry.artistry.service;

import com.artistry.artistry.model.ChatMessage;
import com.artistry.artistry.model.ChatRoom;
import com.artistry.artistry.repository.ChatMessageRepository;
import com.artistry.artistry.repository.ChatRoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {

    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomRepository chatRoomRepository;

    public ChatService(ChatMessageRepository chatMessageRepository, ChatRoomRepository chatRoomRepository) {
        this.chatMessageRepository = chatMessageRepository;
        this.chatRoomRepository = chatRoomRepository;
    }

    public List<ChatMessage> getMessagesByChatRoom(Long chatRoomId) {
        return chatMessageRepository.findByChatRoomId(chatRoomId);
    }

    public List<ChatRoom> getChatRoomsByUser(Long userId) {
        return chatRoomRepository.findByUserId(userId);
    }

    public ChatMessage sendMessage(ChatMessage message) {
        return chatMessageRepository.save(message);
    }

    public ChatRoom createChatRoom(ChatRoom chatRoom) {
        return chatRoomRepository.save(chatRoom);
    }
}

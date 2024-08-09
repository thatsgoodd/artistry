package com.artistry.artistry.service;

import com.artistry.artistry.entity.CollaborationChat;
import com.artistry.artistry.repository.CollaborationChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CollaborationChatService {

    @Autowired
    private CollaborationChatRepository chatRepository;

    public CollaborationChat sendMessage(CollaborationChat chat) {
        chat.setSentDate(LocalDateTime.now());
        return chatRepository.save(chat);
    }

    public List<CollaborationChat> getChats() {
        return chatRepository.findAll();
    }
}

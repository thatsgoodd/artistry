package com.artistry.artistry.service;

import com.artistry.artistry.entity.SecondHandChat;
import com.artistry.artistry.repository.SecondHandChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

import java.util.List;

@Service
public class SecondHandChatService {

    @Autowired
    private SecondHandChatRepository chatRepository;

    public SecondHandChat sendMessage(SecondHandChat chat) {
        chat.setSentDate(LocalDateTime.now());
        return chatRepository.save(chat);
    }

    public List<SecondHandChat> getChats() {
        return chatRepository.findAll();
    }
}
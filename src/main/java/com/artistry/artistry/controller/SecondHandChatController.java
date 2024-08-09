package com.artistry.artistry.controller;

import com.artistry.artistry.entity.SecondHandChat;
import com.artistry.artistry.service.SecondHandChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/secondhand-chats")
public class SecondHandChatController {

    @Autowired
    private SecondHandChatService chatService;

    @PostMapping("/send")
    public SecondHandChat sendMessage(@RequestBody SecondHandChat chat) {
        return chatService.sendMessage(chat);
    }

    @GetMapping("/")
    public List<SecondHandChat> getChats() {
        return chatService.getChats();
    }
}

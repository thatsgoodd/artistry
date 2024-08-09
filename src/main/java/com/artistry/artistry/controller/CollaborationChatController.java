package com.artistry.artistry.controller;

import com.artistry.artistry.entity.CollaborationChat;
import com.artistry.artistry.service.CollaborationChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/collaboration-chats")
public class CollaborationChatController {

    @Autowired
    private CollaborationChatService chatService;

    @PostMapping("/send")
    public CollaborationChat sendMessage(@RequestBody CollaborationChat chat) {
        return chatService.sendMessage(chat);
    }

    @GetMapping("/")
    public List<CollaborationChat> getChats() {
        return chatService.getChats();
    }
}

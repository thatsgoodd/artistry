// Chat Controller
package com.artistry.artistry.controller;

import com.artistry.artistry.model.ChatMessage;
import com.artistry.artistry.model.ChatRoom;
import com.artistry.artistry.service.ChatService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chats")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping("/rooms/user/{userId}")
    public List<ChatRoom> getChatRoomsByUser(@PathVariable Long userId) {
        return chatService.getChatRoomsByUser(userId);
    }

    @GetMapping("/messages/{chatRoomId}")
    public List<ChatMessage> getMessagesByChatRoom(@PathVariable Long chatRoomId) {
        return chatService.getMessagesByChatRoom(chatRoomId);
    }

    @PostMapping("/messages")
    public ChatMessage sendMessage(@RequestBody ChatMessage message) {
        return chatService.sendMessage(message);
    }

    @PostMapping("/rooms")
    public ChatRoom createChatRoom(@RequestBody ChatRoom chatRoom) {
        return chatService.createChatRoom(chatRoom);
    }
}

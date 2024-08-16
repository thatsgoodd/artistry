// ChatMessage Entity
package com.artistry.artistry.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;
    private boolean read;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private AppUser sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private AppUser receiver;

    @ManyToOne
    @JoinColumn(name = "chat_room_id")
    private ChatRoom chatRoom;

    // 추가 필드가 있다면 이곳에 정의합니다.
}

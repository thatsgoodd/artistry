package com.artistry.artistry.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@EqualsAndHashCode(of = "id")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CollaborationChat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post; // 협업 게시물 참조

    @ManyToOne
    @JoinColumn(name = "from_user_id")
    private Users fromUser; // 채팅을 보낸 사용자

    @ManyToOne
    @JoinColumn(name = "to_user_id")
    private Users toUser; // 채팅을 받은 사용자

    private String imageUrl;

    private String message;

    private LocalDateTime sentDate; // 메시지 전송 시간
}

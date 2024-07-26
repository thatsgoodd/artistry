package com.artistry.artistry.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @EqualsAndHashCode(of = "id")
@Builder @AllArgsConstructor @NoArgsConstructor
public class Post {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String content;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @Enumerated(EnumType.STRING)
    private PostType type; // 게시물 유형을 구분하는 필드

    public enum PostType {
        FREE, COLLABO, WORK
    }
}

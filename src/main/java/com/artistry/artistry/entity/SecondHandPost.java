package com.artistry.artistry.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @EqualsAndHashCode(of = "id")
@Builder @AllArgsConstructor @NoArgsConstructor
public class SecondHandPost {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String content;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private Double price; // 가격 정보 추가

    private Boolean isSold; // 판매 여부 추가
}

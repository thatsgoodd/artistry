package com.artistry.artistry.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

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
    private Users user;

    private Double price; // 가격 정보 추가

    private Boolean isSold; // 판매 여부 추가

    @OneToMany(mappedBy = "secondHandPost", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SecondHandPostImage> images; // 사진 리스트
}

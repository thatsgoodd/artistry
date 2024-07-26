package com.artistry.artistry.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@EqualsAndHashCode(of = "id")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SecondHandPostImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imageUrl; // 사진 URL

    @ManyToOne
    @JoinColumn(name = "second_hand_post_id")
    private SecondHandPost secondHandPost;
}

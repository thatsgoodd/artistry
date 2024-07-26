package com.artistry.artistry.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter @Setter @EqualsAndHashCode(of = "id")
@Builder @AllArgsConstructor @NoArgsConstructor
public class PurchaseHistory {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "buyer_id")
    private Users buyer;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private Users seller;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private SecondHandPost post; // 중고거래 게시물만을 참조

    private LocalDateTime purchaseDate;
}

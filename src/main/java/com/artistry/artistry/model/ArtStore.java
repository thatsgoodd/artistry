package com.artistry.artistry.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class ArtStore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String address;
    private String city;
    private String district;
    private String latitude;
    private String longitude;

    // 추가적인 정보들 (전화번호, 영업시간 등)
    private String phone;
    private String openingHours;
    private String imageUrl;


}

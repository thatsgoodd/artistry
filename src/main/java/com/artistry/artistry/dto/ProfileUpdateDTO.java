package com.artistry.artistry.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileUpdateDTO {
    private String name;
    private String bio;
    private String interests;
    // 기타 필드
}

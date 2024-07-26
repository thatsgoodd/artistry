package com.artistry.artistry.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRegistrationRequest {
    private String id;
    private String email;
    private String nickname;
    private String name;
    private String password;
    private String bio;
    private String url;
    private String livingPlace;
    private String interests;
}

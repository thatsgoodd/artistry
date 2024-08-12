package com.artistry.artistry.login.dto;

import lombok.Data;

@Data
public class UserDto {
    private String email;
    private String nickname;
    private String name;
    private String password;
}
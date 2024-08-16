package com.artistry.artistry.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AuthenticationRequest {

    // Getter와 Setter
    private String username;
    private String password;

    // 기본 생성자
    public AuthenticationRequest() {
    }

    // 매개변수가 있는 생성자
    public AuthenticationRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

}

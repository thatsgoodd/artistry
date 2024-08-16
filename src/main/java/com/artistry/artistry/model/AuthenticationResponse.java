package com.artistry.artistry.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter
public class AuthenticationResponse {

    private final String jwt;

    public AuthenticationResponse(String jwt) {
        this.jwt = jwt;
    }

}

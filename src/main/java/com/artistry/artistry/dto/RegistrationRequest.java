package com.artistry.artistry.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class RegistrationRequest {
    private String username;
    private String password;
    private String confirmPassword;
    private String email;
    private String emailVerificationCode;
    private String name;

    // Getters and Setters
}

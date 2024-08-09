package com.artistry.artistry.dto;

import com.artistry.artistry.entity.Users;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileDTO {
    private String id;
    private String name;
    private String bio;
    private String interests;
    private String profileImage;
    private String backgroundImage;

    public ProfileDTO(Users user) {
        this.id = user.getId();
        this.name = user.getName();
        this.bio = user.getBio();
        this.interests = user.getInterests();
        this.profileImage = user.getProfileImage();
        this.backgroundImage = user.getBackgroundImage();
    }
}

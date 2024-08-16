package com.artistry.artistry.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class Scrap {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser user;

    public Scrap() {
    }


    public Scrap(AppUser user, Post post) {
        this.user = user;
        this.post = post;
    }

    // Getters and setters...

}

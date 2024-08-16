package com.artistry.artistry.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@Entity
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String name;
    private String nickname;

    @Column(unique = true)
    private String email;

    private boolean enabled = false;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_interests", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "interest")
    @Enumerated(EnumType.STRING)
    private Set<InterestCategory> interests = new HashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<Post> posts;

    @OneToMany(mappedBy = "user")
    private Set<Comment> comments;

    @ManyToMany
    @JoinTable(
            name = "scrap",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "post_id")
    )
    private Set<Post> scraps;

    @OneToMany(mappedBy = "follower")
    private Set<Follow> following;

    @OneToMany(mappedBy = "followee")
    private Set<Follow> followers;

    public void addInterest(InterestCategory interest) {
        this.interests.add(interest);
    }

    public void removeInterest(InterestCategory interest) {
        this.interests.remove(interest);
    }
}

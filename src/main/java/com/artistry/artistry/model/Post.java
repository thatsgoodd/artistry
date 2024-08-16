package com.artistry.artistry.model;

import jakarta.persistence.*;
import java.util.Set;

@Entity
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;
    private int likes;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser user;

    @OneToMany(mappedBy = "post")
    private Set<Comment> comments;

    @ManyToMany(mappedBy = "scraps")
    private Set<AppUser> scrappers;

    @ManyToMany
    @JoinTable(
            name = "post_interest_category",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<InterestCategory> categories;

    // Getters and setters...

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public AppUser getUser() {
        return user;
    }

    public void setUser(AppUser user) {
        this.user = user;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }

    public Set<AppUser> getScrappers() {
        return scrappers;
    }

    public void setScrappers(Set<AppUser> scrappers) {
        this.scrappers = scrappers;
    }

    public Set<InterestCategory> getCategories() {
        return categories;
    }

    public void setCategories(Set<InterestCategory> categories) {
        this.categories = categories;
    }
}

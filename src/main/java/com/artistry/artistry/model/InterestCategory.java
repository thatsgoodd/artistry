package com.artistry.artistry.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Setter
@Getter
@Entity
public class InterestCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private CategoryType category;

    @ManyToMany(mappedBy = "categories")
    private Set<Post> posts;

    // Getters and setters...

    public enum CategoryType {
        PAINTING,
        DRAWING,
        SCULPTURE,
        PHOTOGRAPHY,
        VIDEO_ART,
        GRAPHIC_DESIGN,
        DIGITAL_ART,
        ARCHITECTURE
    }
}

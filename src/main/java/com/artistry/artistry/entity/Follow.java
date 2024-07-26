package com.artistry.artistry.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "from_user")
    private Users fromUser;

    @ManyToOne
    @JoinColumn(name = "to_user")
    private Users toUser;

}
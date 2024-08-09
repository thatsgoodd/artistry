package com.artistry.artistry.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter @Setter @EqualsAndHashCode(of = "id")
@Builder @AllArgsConstructor @NoArgsConstructor
public class Users {
    @Id
    @Column(unique = true, nullable = false)
    private String id;

    @Column(unique=true)
    private String email;

    @Column(unique=true)
    private String nickname;

    private String name;
    private String password;
    private boolean verified;
    private String verificationToken;
    private String bio;
    private String url;
    private String livingPlace;
    private String interests;

    @Lob @Basic(fetch = FetchType.EAGER)
    private String profileImage;

    @Lob @Basic(fetch = FetchType.EAGER)
    private String backgroundImage;

    private boolean newAlarmInCollaboration;
    private boolean newAlarmInFreeBoard;
    private boolean newAlarmInArtStudio;
    private boolean newAlarmInWorkSpace;
    private boolean newAlarmInSecondHand;

    private int followingCount;
    private int followerCount;
    private String reputationGraph;
    private int totalLikesCount;

    @OneToMany(mappedBy = "user")
    private List<Post> posts;

    @OneToMany(mappedBy = "user")
    private List<SecondHandPost> secondHandPosts;

    @OneToMany(mappedBy = "fromUser", fetch = FetchType.LAZY)
    private List<Follow> followings;

    @OneToMany(mappedBy = "toUser", fetch = FetchType.LAZY)
    private List<Follow> followers;

    @OneToMany(mappedBy = "user")
    private List<ScrappedPost> scrappedPosts;

    @OneToMany(mappedBy = "user")
    private List<WorkScrappedPost> workScrappedPosts;

    @OneToMany(mappedBy = "user")
    private List<LikedPost> likedPosts;

    @OneToMany(mappedBy = "user")
    private List<Comment> comments;

    @OneToMany(mappedBy = "user")
    private List<LikedComment> likedComments;

    @OneToMany(mappedBy = "fromUser")
    private List<CollaborationChat> sentCollaborationMessages;

    @OneToMany(mappedBy = "toUser")
    private List<CollaborationChat> receivedCollaborationMessages;

    @OneToMany(mappedBy = "fromUser")
    private List<SecondHandChat> sentSecondHandMessages;

    @OneToMany(mappedBy = "toUser")
    private List<SecondHandChat> receivedSecondHandMessages;

    @OneToMany(mappedBy = "seller")
    private List<SaleHistory> sales;

    @OneToMany(mappedBy = "buyer")
    private List<PurchaseHistory> purchases;
}

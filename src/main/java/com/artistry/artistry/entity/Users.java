package com.artistry.artistry.entity;


import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Getter @Setter @EqualsAndHashCode(of = "id")
@Builder @AllArgsConstructor
@NoArgsConstructor
public class Users {

    @Id
    @Column(unique = true, nullable = false)
    private String id;
    //userid

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
    private String BackgroundImage;

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
    // 포스트 (양식 동일해서 하나로 합침)

    @OneToMany(mappedBy = "user")
    private List<SecondHandPost> secondHandPosts;
    // 중고거래만 양식 달라서 밖으로 뺌

    @OneToMany(mappedBy = "fromUser", fetch = FetchType.LAZY)
    private List<Follow> followings;
    // 팔로잉 리스트

    @OneToMany(mappedBy = "toUser", fetch = FetchType.LAZY)
    private List<Follow> followers;
    // 팔로워 리스트

    @OneToMany(mappedBy = "user")
    private List<ScrappedPost> scrappedPosts;
    //협업게시판 스크랩

    @OneToMany(mappedBy = "user")
    private List<WorkScrappedPost> WorkScrappedPosts;
    // 작업공유 스크랩

    @OneToMany(mappedBy = "user")
    private List<LikedPost> likedPosts;
    // 중고거래 찜

    @OneToMany(mappedBy = "user")
    private List<Comment> comments;
    // 댓글 저장

    @OneToMany(mappedBy = "user")
    private List<LikedComment> likedComments;
    // 댓글 좋아요 저장

    @OneToMany(mappedBy = "fromUser")
    private List<CollaborationChat> sentCollaborationMessages;

    @OneToMany(mappedBy = "toUser")
    private List<CollaborationChat> receivedCollaborationMessages;
    // 협업모집 채팅

    @OneToMany(mappedBy = "fromUser")
    private List<SecondHandChat> sentSecondHandMessages;

    @OneToMany(mappedBy = "toUser")
    private List<SecondHandChat> receivedSecondHandMessages;
    //중고거래 채팅

    @OneToMany(mappedBy = "seller")
    private List<SaleHistory> sales;
    // 중고거래 판매내역

    @OneToMany(mappedBy = "buyer")
    private List<PurchaseHistory> purchases;
    // 중고거래 구매내역


}
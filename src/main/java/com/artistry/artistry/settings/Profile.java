package com.artistry.artistry.settings;

import com.artistry.artistry.entity.Post;
import com.artistry.artistry.entity.ScrappedPost;
import com.artistry.artistry.entity.Users;
import lombok.Data;
import java.util.List;
@Data
public class Profile {

    private String bio;

    private String url;

    private String nickname;

    private String interests;

    private int followingCount;

    private int followerCount;

    private String reputationGraph;

    private int totalLikesCount;

    private List<Post> myPosts;

    private List<ScrappedPost> scrappedPosts;


    public Profile(Users  user){
        this.bio = user.getBio();
        this.url = user.getUrl();
        this.nickname = user.getNickname();
        this.interests = user.getInterests();
        //강의 듣고 다시 설정하기
        this.followerCount = user.getFollowerCount();
        this.followingCount = user.getFollowingCount();
        this.reputationGraph = user.getReputationGraph();
        this.totalLikesCount = user.getTotalLikesCount();
        this.myPosts = user.getPosts();
        this.scrappedPosts = user.getScrappedPosts();

    }
}

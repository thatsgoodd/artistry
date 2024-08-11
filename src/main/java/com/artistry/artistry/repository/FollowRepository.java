package com.artistry.artistry.repository;

import com.artistry.artistry.model.Follow;
import com.artistry.artistry.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    List<Follow> findByFollower(AppUser follower);
    List<Follow> findByFollowee(AppUser followee);
}


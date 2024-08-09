package com.artistry.artistry.repository;

import com.artistry.artistry.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users, String> {

    Optional<Users> findByNickname(String nickname);

    Optional<Users> findByEmail(String email);

    Optional<Users> findByVerificationToken(String verificationToken);
}

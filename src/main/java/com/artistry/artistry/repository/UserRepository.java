package com.artistry.artistry.repository;

import com.artistry.artistry.entity.Users;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, String> {

    @NonNull
    Optional<Users> findByEmail(@NonNull String email);
    @NonNull
    Optional<Users> findById(@NonNull String id);
    @NonNull
    Optional<Users> findByNameAndEmail(@NonNull String name,@NonNull String email);
    // 이름, 이메일로 아이디 찾기
    @NonNull
    Optional<Users> findByIdAndNameAndEmail(@NonNull String id,@NonNull String name,@NonNull String email);
    // 이름, 이메일, 아이디로 비밀번호 찾기
}


package com.artistry.artistry.repository;

import com.artistry.artistry.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByUsername(String username);
    Optional<AppUser> findByEmail(String email);
    Optional<AppUser> findByNameAndEmail(String name, String email);
    boolean existsByUsername(String username);
}

package com.artistry.artistry.service;

import com.artistry.artistry.dto.ProfileDTO;
import com.artistry.artistry.dto.ProfileUpdateDTO;
import com.artistry.artistry.entity.Users;
import com.artistry.artistry.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Users updateProfile(String userId, ProfileUpdateDTO updateDTO) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (updateDTO.getName() != null) {
            user.setName(updateDTO.getName());
        }
        if (updateDTO.getBio() != null) {
            user.setBio(updateDTO.getBio());
        }
        if (updateDTO.getInterests() != null) {
            user.setInterests(updateDTO.getInterests());
        }

        return userRepository.save(user);
    }

    public ProfileDTO getProfile(String userId) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return new ProfileDTO(user);
    }

    @Transactional
    public Users registerUser(Users user) {
        // 이메일 인증 상태를 기본적으로 비활성화 상태로 설정
        user.setVerified(false);
        return userRepository.save(user);
    }

    public Users findByUsername(String username) {
        return userRepository.findByNickname(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Users findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Transactional
    public boolean verifyEmail(String token) {
        // 이메일 인증 토큰 검증 로직을 구현
        Optional<Users> optionalUser = userRepository.findByVerificationToken(token);

        if (optionalUser.isPresent()) {
            Users user = optionalUser.get();
            user.setVerified(true); // 인증 완료 상태로 업데이트
            user.setVerificationToken(null); // 인증 토큰 제거
            userRepository.save(user);
            return true;
        } else {
            return false; // 유효하지 않은 토큰
        }
    }
}

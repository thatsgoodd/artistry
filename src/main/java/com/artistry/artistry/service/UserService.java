package com.artistry.artistry.service;

import com.artistry.artistry.dto.UserRegistrationRequest;
import com.artistry.artistry.entity.Users;
import com.artistry.artistry.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JavaMailSender mailSender; // 이메일 전송 서비스

    public boolean registerUser(UserRegistrationRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return false;
        }

        // UUID를 이용한 인증 토큰 생성
        String token = UUID.randomUUID().toString();

        Users user = Users.builder()
                .id(request.getId())
                .email(request.getEmail())
                .nickname(request.getNickname())
                .name(request.getName())
                .password(request.getPassword())
                .bio(request.getBio())
                .url(request.getUrl())
                .livingPlace(request.getLivingPlace())
                .interests(request.getInterests())
                .verificationToken(token) // 추가된 부분
                .build();

        userRepository.save(user);
        sendVerificationEmail(request.getEmail(), token);
        return true;
    }

    public boolean authenticateUser(String email, String password) {
        Optional<Users> user = userRepository.findByEmail(email);
        return user.isPresent() && user.get().getPassword().equals(password);
    }

    public Optional<Users> findUserByNameAndEmail(String name, String email) {
        return userRepository.findByNameAndEmail(name, email);
    }

    public boolean validateUserForPasswordReset(String id, String name, String email) {
        return userRepository.findByIdAndNameAndEmail(id, name, email).isPresent();
    }

    public boolean resetPassword(String id, String newPassword) {
        Optional<Users> user = userRepository.findById(id);
        if (user.isPresent()) {
            Users existingUser = user.get();
            existingUser.setPassword(newPassword);
            userRepository.save(existingUser);
            return true;
        }
        return false;
    }

    public boolean verifyEmail(String token) {
        Optional<Users> user = userRepository.findByVerificationToken(token);
        if (user.isPresent()) {
            Users existingUser = user.get();
            existingUser.setVerificationToken(null); // 인증 완료 후 토큰 제거
            existingUser.setVerified(true); // 인증 완료 상태로 변경
            userRepository.save(existingUser);
            return true;
        }
        return false;
    }

    public boolean resendVerificationEmail(String email) {
        Optional<Users> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            String token = UUID.randomUUID().toString();
            Users existingUser = user.get();
            existingUser.setVerificationToken(token);
            userRepository.save(existingUser);
            sendVerificationEmail(email, token);
            return true;
        }
        return false;
    }

    private void sendVerificationEmail(String email, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Email Verification");
        message.setText("Please click the following link to verify your email address:\n" +
                "http://localhost:8081/api/auth/verify?token=" + token);
        mailSender.send(message);
    }
}

package com.artistry.artistry.config;

import com.artistry.artistry.entity.Users;
import com.artistry.artistry.repository.UserRepository;
import com.artistry.artistry.security.UserAccount;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService implements UserDetailsService {

    private final UserRepository userRepository;
    // 사용자 인증 처리

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        Optional<Users> user = userRepository.findById(userId);
        // id로 사용자 조회
        if (user.isEmpty()) {
            throw new UsernameNotFoundException(userId);
            // 존재하지 않으면 예외를 던짐
        }
        return new UserAccount(user.get());
        // UserAccount 객체로 사용자를 반환
    }
}

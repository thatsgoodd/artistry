package com.artistry.artistry.service;

import com.artistry.artistry.model.AppUser;
import com.artistry.artistry.model.InterestCategory;
import com.artistry.artistry.repository.AppUserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AppUserService {

    private final AppUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // 하나의 생성자만 유지
    public AppUserService(AppUserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    /**
     * 비밀번호를 암호화합니다.
     * @param password 암호화할 비밀번호
     * @return 암호화된 비밀번호
     */
    public String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    /**
     * 사용자명이 존재하는지 확인합니다.
     * @param username 확인할 사용자명
     * @return 사용자명이 존재하면 true, 그렇지 않으면 false
     */
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    /**
     * 사용자를 등록합니다. 이메일과 사용자명이 중복되지 않음을 확인한 후 비밀번호를 암호화하여 저장합니다.
     * @param user 등록할 사용자 정보
     * @return 등록 성공 시 true, 실패 시 false
     */
    public boolean registerUser(AppUser user) {
        // 이메일 중복 체크
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return false; // 이미 존재하는 이메일
        }

        // 사용자명 중복 체크
        if (userRepository.existsByUsername(user.getUsername())) {
            return false; // 이미 존재하는 사용자명
        }

        // 비밀번호 암호화
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // 사용자 저장
        userRepository.save(user);
        return true;
    }

    /**
     * 사용자명을 통해 사용자를 찾습니다.
     * @param username 찾을 사용자명
     * @return 사용자 정보가 포함된 Optional 객체
     */
    public Optional<AppUser> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    /**
     * 이메일을 통해 사용자를 찾습니다.
     * @param email 찾을 이메일
     * @return 사용자 정보가 포함된 Optional 객체
     */
    public Optional<AppUser> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    /**
     * 이름과 이메일을 통해 사용자를 찾습니다.
     * @param name 찾을 이름
     * @param email 찾을 이메일
     * @return 사용자 정보가 포함된 Optional 객체
     */
    public Optional<AppUser> findByNameAndEmail(String name, String email) {
        return userRepository.findByNameAndEmail(name, email);
    }

    /**
     * 비밀번호를 업데이트합니다. 비밀번호는 암호화되어 저장됩니다.
     * @param user 업데이트할 사용자
     * @param newPassword 새 비밀번호
     */
    public void updatePassword(AppUser user, String newPassword) {
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    /**
     * 비밀번호와 비밀번호 확인이 일치하는지 확인합니다.
     * @param password 비밀번호
     * @param confirmPassword 확인할 비밀번호
     * @return 두 비밀번호가 일치하면 true, 그렇지 않으면 false
     */
    public boolean validatePassword(String password, String confirmPassword) {
        return password.equals(confirmPassword);
    }

    /**
     * 사용자 정보를 업데이트합니다.
     * @param user 업데이트할 사용자
     */
    public void updateUser(AppUser user) {
        userRepository.save(user);
    }

    /**
     * ID를 통해 사용자를 찾습니다.
     * @param id 찾을 ID
     * @return 사용자 정보가 포함된 Optional 객체
     */
    public Optional<AppUser> findById(Long id) {
        return userRepository.findById(id);
    }

    public void addInterestToUser(Long userId, InterestCategory interest) {
        Optional<AppUser> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            AppUser user = optionalUser.get();
            user.addInterest(interest);
            userRepository.save(user);
        }
    }

    public void removeInterestFromUser(Long userId, InterestCategory interest) {
        Optional<AppUser> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            AppUser user = optionalUser.get();
            user.removeInterest(interest);
            userRepository.save(user);
        }
    }
}

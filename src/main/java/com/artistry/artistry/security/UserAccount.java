package com.artistry.artistry.security;

import com.artistry.artistry.entity.Users;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.Collections;

public class UserAccount implements UserDetails {

    private final Users user;

    public UserAccount(Users user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return String.valueOf(user.getId());
    }
    // long 타입의 사용자 id를 양식을 지키기 위해 String으로 변환하여 사용

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    // 계정 만료 여부를 설정

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    // 계정 잠김 여부를 설정

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    // 자격 증명 만료 여부를 설정

    @Override
    public boolean isEnabled() {
        return user.isVerified();
    }
    // 이메일 인증 여부를 기준으로 계정이 활성화되었는지를 반환함
}

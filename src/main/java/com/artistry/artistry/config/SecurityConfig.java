package com.artistry.artistry.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.rememberme.InMemoryTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UserDetailsService userDetailsService;
    // 사용자 인증 정보 로드

    public SecurityConfig(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }
    //userDetailsService를 받아 userDetailService 필드를 초기화

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authz -> authz
                                .requestMatchers("/", "/login", "/check-email", "/check-email-token", "/email-login", "/check-email-login",
                                        "/login-link", "/sign-up").permitAll()
                                //인증 없이 접근 가능
                                .requestMatchers(HttpMethod.GET, "/profile/*").permitAll()
                                //GET 메서드를 사용하는 /profile/*경로는 인증 없이 접근 가능
                                .requestMatchers("/css/**", "/js/**", "/images/**").permitAll()
                                //인증 없이 접근 가능
                                .anyRequest().authenticated()
                        //나머지 모든 요청은 인증 필요
                )
                .formLogin(form -> form
                                .loginPage("/login").permitAll()
                                .defaultSuccessUrl("/")
                                .failureUrl("/login")
                        // 다음에 다시 보기
                )
                // '/login/에 인증 없이 접근 가능
                // 로그인 성공 후 / 경로로 리디렉션
                .logout(logout -> logout
                                .logoutSuccessUrl("/")
                                .invalidateHttpSession(true)
                        // 로그아웃 후 전체 세션 삭제
                )
                // 로그아웃 성공 후 / 경로로 리디렉션
                .rememberMe(rememberMe -> rememberMe
                                .userDetailsService(userDetailsService)
                                .tokenRepository(tokenRepository())
                        // 사용자 세부 정보 로드, 토큰 저장소 설정
                );


        return http.build();
    }

    @Bean
    public PersistentTokenRepository tokenRepository() {
        return new InMemoryTokenRepositoryImpl();
        // 메모리에 토큰을 저장
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring()
                .requestMatchers("/images/**", "/favicon.ico", "/node_modules/**");
    }
    // 특정 경로를 무시하도록 설정

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
    // 비밀번호 인코딩, 검증


}
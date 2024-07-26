package com.artistry.artistry.service;

import com.artistry.artistry.entity.Users;
import com.artistry.artistry.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EmailService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String userId, String to, String subject, String text) {
        Optional<Users> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            Users user = userOpt.get();
            // 사용자 설정에서 이메일 서버 정보를 가져옵니다.
            String host = user.getMailHost();
            int port = user.getMailPort();
            String username = user.getMailUsername();
            String password = user.getMailPassword();

            // 이메일 서버 설정을 동적으로 변경합니다.
            JavaMailSenderImpl mailSenderImpl = new JavaMailSenderImpl();
            mailSenderImpl.setHost(host);
            mailSenderImpl.setPort(port);
            mailSenderImpl.setUsername(username);
            mailSenderImpl.setPassword(password);
            mailSenderImpl.getJavaMailProperties().put("mail.transport.protocol", "smtp");
            mailSenderImpl.getJavaMailProperties().put("mail.smtp.auth", "true");
            mailSenderImpl.getJavaMailProperties().put("mail.smtp.starttls.enable", "true");

            // 이메일 전송
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);

            mailSenderImpl.send(message);
        }
    }
}


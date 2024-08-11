package com.artistry.artistry.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;
import java.util.UUID;

@Service
public class VerificationService {

    private final Map<String, String> verificationCodes = new HashMap<>();

    public String generateVerificationCode(String email) {
        String code = UUID.randomUUID().toString().substring(0, 8); // 8자리 인증번호 생성
        verificationCodes.put(email, code);
        startVerificationCodeExpiryTimer(email);
        return code;
    }

    public boolean verifyCode(String email, String code) {
        String storedCode = verificationCodes.get(email);
        if (storedCode != null && storedCode.equals(code)) {
            verificationCodes.remove(email);
            return true;
        }
        return false;
    }

    private void startVerificationCodeExpiryTimer(final String email) {
        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                verificationCodes.remove(email);
            }
        }, 5 * 60 * 1000); // 3분 후에 만료
    }
}

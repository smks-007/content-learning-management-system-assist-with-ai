package com.clms.util;

import org.springframework.stereotype.Component;
import java.security.SecureRandom;

@Component
public class RandomTokenGenerator {
    private static final String HEX_CHARS = "0123456789abcdef";
    private static final SecureRandom RANDOM = new SecureRandom();
    
    public String generateToken(int length) {
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(HEX_CHARS.charAt(RANDOM.nextInt(HEX_CHARS.length())));
        }
        return sb.toString();
    }
    
    public String generateToken() { return generateToken(64); }
}

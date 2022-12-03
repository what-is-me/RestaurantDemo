package org.database.restaurant.tools;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordEncoder {
    private static final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    public static String encoderPassword(String password) {
        return bCryptPasswordEncoder.encode(password);
    }
}

package org.database.restaurant;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class EncodeTest {


    private static BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    public static String encoderPassword(String password) {
        return bCryptPasswordEncoder.encode(password);
    }

    public static void main(String[] args) {
        String password = "admin";
        String pwd = encoderPassword(password);
        System.out.println(pwd);
    }

}

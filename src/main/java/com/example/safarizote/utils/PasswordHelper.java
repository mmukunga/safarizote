package com.example.safarizote.utils;

import java.security.SecureRandom;
import java.util.Random;

public class PasswordHelper {
    public static String generatePassword(int length) {
        String symbols = "abcdefghijklmnopqrstuvwxyzABCDEFGJKLMNPRSTUVWXYZ0123456789";
        // minimum length of 6
        if (length < 4) {
            length = 6;
        }

        final char[] allAllowed = symbols.toCharArray();

        // Use cryptographically secure random number generator
        Random random = new SecureRandom();

        StringBuilder password = new StringBuilder();

        for (int i = 0; i < length; i++) {
            password.append(allAllowed[random.nextInt(allAllowed.length)]);
        }

        return password.toString();

    }

}
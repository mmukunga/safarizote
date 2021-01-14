package com.example.safarizote.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;

import com.example.utils.EmailService;

import java.io.IOException;

@Component
public class EmailLoader implements CommandLineRunner {

    @Autowired
    private EmailService emailClient;

    @Override
    public void run(String... args) {
        System.out.println("Sending Email...");
        try {
            emailClient.sendEmail();
            emailClient.sendEmailWithAttachment();

        } catch (MessagingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        System.out.println("Done");

    }
}
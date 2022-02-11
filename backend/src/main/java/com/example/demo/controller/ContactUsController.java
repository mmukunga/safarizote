package com.example.demo.controller;

import java.time.Instant;
import java.util.List;

import com.example.demo.model.ContactUs;
import com.example.demo.repository.ContactUsRepository;
import com.example.demo.utils.JavaEmailClient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContactUsController {
    @Autowired
    private ContactUsRepository repository;

    @Autowired
    private JavaEmailClient emailSender;

    @GetMapping("/api/contactMessages")
    public ResponseEntity<List<ContactUs>> contactMessages() {
        List<ContactUs> contactMessages = repository.findAll();
        return ResponseEntity.ok().body(contactMessages);
    }

    @PostMapping(value = "/api/contactUs")
    public ResponseEntity<ContactUs> contactUs(@RequestBody ContactUs contact) {
        String subject = (contact.getUsername() != null)
                ? contact.getUsername()
                : "General User message. No Special topic";
        String message = "from:" + contact.getMessage() +
                "to: mkunsim@gmail.com" +
                "subject: Contact Form Submission" +
                "html: <p>Name:" + contact.getUsername() + "</p>" +
                "<p>Subject:" + subject + "</p>" +
                "<p>Message:" + contact.getMessage() + "</p>";

        ContactUs contactUs = ContactUs.builder()
                .username(contact.getUsername())
                .email(contact.getEmail())
                .phone(contact.getPhone())
                .gender(contact.getGender())
                .message(message)
                .date(Instant.now())
                .build();

        try {
            emailSender.contactUs(contactUs);
        } catch (Exception e) {
            e.printStackTrace();
        }
        repository.save(contactUs);
        return ResponseEntity.ok().body(contactUs);
    }
}
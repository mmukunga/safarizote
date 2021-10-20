package com.example.safarizote.controller;

import java.util.List;

import com.example.safarizote.model.Email;
import com.example.safarizote.repository.EmailRepository;
import com.example.safarizote.utils.IEmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailController { 
  @Autowired
  private EmailRepository repository;

    @Autowired
	private IEmailService emailService;

    @GetMapping("/api/email")
    public ResponseEntity<List<Email>> emails() {
        List<Email> emails = repository.findAll();
        return new ResponseEntity<>(emails, HttpStatus.OK);
    }

    @GetMapping("/api/sendEmail")
    public ResponseEntity<Email> sendEmail(@RequestBody Email email) {
        try {
            emailService.sendEmail(email);
        } catch (Exception e) {
            e.printStackTrace();
        }

        repository.save(email);
        return new ResponseEntity<>(email, HttpStatus.OK);
    }
}
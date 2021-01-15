package com.example.safarizote.controller;

import java.util.Date;
import java.util.List;

import com.example.safarizote.model.Email;
import com.example.safarizote.repository.EmailRepository;
import com.example.safarizote.utils.IEmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailController { 
  @Autowired
  private EmailRepository repository;

    @Autowired
	private IEmailService emailService;

    @RequestMapping(value="/api/email",  method={RequestMethod.GET})
    public ResponseEntity<List<Email>> emails() {
        System.out.println("Email, the time at the server is now " + new Date());
        List<Email> emails = repository.findAll();
        System.out.println("Email, the time at the server is now " + new Date());
        System.out.println("Emails() End OK!");
        return new ResponseEntity<>(emails, HttpStatus.OK);
    }

    @RequestMapping(value="/api/sendEmail",  method={RequestMethod.POST})
    public ResponseEntity<Email> sendEmail(@RequestBody Email email) {
        System.out.println("Email, the time at the server is now " + new Date());
        System.out.println("Email " + email);
        emailService.sendEmail(email);
        System.out.println("Emails() Send End OK!");
        repository.save(email);
        return new ResponseEntity<>(email, HttpStatus.OK);
    }
}
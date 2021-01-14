package com.example.safarizote.controller;

import java.util.Date;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.safarizote.model.Email;
import com.example.safarizote.repository.EmailRepository;
import com.example.utils.EmailService;

@RestController
public class EmailController { 
  @Autowired
  private EmailRepository repository;

    private EmailService emailService;

    @Autowired
    @Qualifier("emailService")
    public void setService(EmailService service) {
        this.emailService = service;
    }

    @RequestMapping(value="/api/email",  method={RequestMethod.GET})
    public ResponseEntity<List<Email>> findAll() {
        System.out.println("Hello, the time at the server is now " + new Date());
        List<Email> visits = repository.findAll();
        System.out.println("Hello, the time at the server is now " + new Date());
        System.out.println("findSafaris() End OK!");
        return new ResponseEntity<>(visits, HttpStatus.OK);
    }

    @RequestMapping(value="/api/sendMessage",  method={RequestMethod.POST})
    public void sendEmail(@RequestBody Email visit) {
        System.out.println("Hello, the time at the server is now " + new Date());
        emailService.sendEmail();
        System.out.println("findSafaris() End OK!");
        repository.save(visit);
    }
}
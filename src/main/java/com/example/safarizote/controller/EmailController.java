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
    public ResponseEntity<List<Email>> findAll() {
        System.out.println("Hello, the time at the server is now " + new Date());
        List<Email> visits = repository.findAll();
        System.out.println("Hello, the time at the server is now " + new Date());
        System.out.println("findSafaris() End OK!");
        return new ResponseEntity<>(visits, HttpStatus.OK);
    }

    @RequestMapping(value="/api/sendMessage",  method={RequestMethod.POST})
    public void sendEmail(@RequestBody Email email) {
        System.out.println("Hello, the time at the server is now " + new Date());
        System.out.println("Email " + email);
        emailService.sendEmail(email);
        System.out.println("findSafaris() End OK!");
        repository.save(email);
    }
}
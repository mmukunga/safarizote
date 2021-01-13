package com.example.safarizote.controller;

import java.util.Date;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.safarizote.model.ContactUs;
import com.example.safarizote.repository.ContactUsRepository;

@RestController
public class ContactUsController { 
  @Autowired
  private ContactUsRepository repository;

    @RequestMapping(value = "/api/contactUs",  method={RequestMethod.GET})
    public ResponseEntity<List<ContactUs>> findAll() {
        System.out.println("Hello, the time at the server is now " + new Date());
        List<ContactUs> visits = repository.findAll();
        System.out.println("Hello, the time at the server is now " + new Date());
        System.out.println("findSafaris() End OK!");
        return new ResponseEntity<>(visits, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/sendMessage",  method={RequestMethod.POST})
    public void save(@RequestBody ContactUs visit) {
        repository.save(visit);
    }
}
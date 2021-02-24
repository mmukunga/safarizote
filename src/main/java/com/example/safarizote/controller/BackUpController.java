package com.example.safarizote.controller;

import java.util.Date;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.safarizote.model.BackUp;
import com.example.safarizote.repository.BackUpRepository;

@RestController
public class BackUpController { 
  @Autowired
  private BackUpRepository repository;

    @RequestMapping(value = "/api/backUp",  method={RequestMethod.GET})
    public ResponseEntity<List<BackUp>> findAll() {
        System.out.println("BackUp.findAll() , the time at the server is now " + new Date());
        List<BackUp> backUps = repository.findAll();
        System.out.println("BackUp.findAll() , the time at the server is now " + new Date());

        // New Enhanced For loop
        System.out.println("\n==============> 1. New Enhanced For loop Example..");
        for (BackUp temp : backUps) {
            System.out.println(temp);
        }
        System.out.println("\n==============> 2. New Enhanced For loop Example..");
        System.out.println("BackUp.findAll()  End OK!");
        return new ResponseEntity<>(backUps, HttpStatus.OK);
    }
}
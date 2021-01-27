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

import com.example.safarizote.model.UserAuth;
import com.example.safarizote.repository.SignInRepository;

@RestController
public class SignInController { 
  @Autowired
  private SignInRepository repository;

    @RequestMapping(value = "/api/findAll",  method={RequestMethod.GET})
    public ResponseEntity<List<UserAuth>> findAll() {
        System.out.println("Login, the time at the server is now " + new Date());
        List<UserAuth> users = repository.findAll();
        System.out.println("Login, the time at the server is now " + new Date());
        System.out.println("findAll() End OK!");
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/login",  method={RequestMethod.POST})
    public ResponseEntity<UserAuth> logIn(@RequestBody UserAuth userAuth) {
        UserAuth result = null;
        System.out.println("\n==============> 1. New Enhanced For loop Example..");
        List<UserAuth> users = repository.findAll();
        System.out.println("\n==============> 2. New Enhanced For loop Example..");
        for (UserAuth temp : users) {
            System.out.println("SignInRepository logIn:= " + temp);
            if (temp.getEmail().equals(userAuth.getEmail()) &&
               (temp.getPassword().equals(userAuth.getPassword())) ){
                   result = temp;
               }
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
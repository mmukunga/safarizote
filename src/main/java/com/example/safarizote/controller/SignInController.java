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
        List<UserAuth> users = repository.findAll();
        System.out.println("Login, the time at the server is now " + new Date());
        System.out.println("findAll() End OK!");
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/login",  method={RequestMethod.POST})
    public ResponseEntity<UserAuth> logIn(@RequestBody UserAuth userAuth) {
        UserAuth authedUser = null;
        List<UserAuth> users = repository.findAll();
        for (UserAuth tempUser : users) {
            System.out.println("SignInRepository FROM USER:= " + tempUser);
            System.out.println("SignInRepository FROM DB:= " + userAuth);
            System.out.println("COMPARE1:= " + tempUser.getEmail() + " <> " + userAuth.getEmail());
            System.out.println("COMPARE2:= " + tempUser.getPassword() + " <> " + userAuth.getPassword());

            if (tempUser.getEmail().equals(userAuth.getEmail()) &&
                tempUser.getPassword().equals(userAuth.getPassword()) ) {
                authedUser = tempUser;
                System.out.println("SignInRepository USER FOUND!!:= " + tempUser);
                break;
            }
        }
        System.out.println("SignInRepository END USER!:= " + authedUser);
        System.out.println("SignInRepository END OK!!");
        return new ResponseEntity<>(authedUser, HttpStatus.OK);
    }
}
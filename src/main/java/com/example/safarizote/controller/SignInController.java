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
        System.out.println("\n==============> 1. .. " + userAuth);
        UserAuth foundUser = null;
        List<UserAuth> users = repository.findAll();
        System.out.println("\n==============> 2. USERS SIZE:=.." + users.size());
        for (UserAuth temp : users) {
            System.out.println("SignInRepository FROM USER:= " + temp);
            System.out.println("SignInRepository FROM DB:= " + userAuth);
            System.out.println("============================");
            System.out.println("COMPARE1:= " + temp.getEmail() + " <> " + userAuth.getEmail());
            System.out.println("COMPARE2:= " + temp.getPassword() + " <> " + userAuth.getPassword());
            System.out.println("============================");
            if (temp.getEmail().equals(userAuth.getEmail())) {
                foundUser = temp;
                System.out.println("SignInRepository USER FOUND!!:= " + temp);
                break;
            }
            /*
            if (temp.getEmail().equals(userAuth.getEmail()) &&
               (temp.getPassword().equals(userAuth.getPassword())) ) {
                  System.out.println("SignInRepository logIn FOUND!!:= " + temp);
                  return new ResponseEntity<>(temp, HttpStatus.OK);
               }*/
        }
        
        System.out.println("SignInRepository END OK!!");
        return new ResponseEntity<>(foundUser, HttpStatus.OK);
    }
}
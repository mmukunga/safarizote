package com.example.demo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.model.UserAuth;
import com.example.demo.repository.UserAuthRepository;

@RestController
public class UserAuthController {
  @Autowired
  private UserAuthRepository repository;

  
  String secretKey = "MTIzNDU2Nzg=";

  @GetMapping("/api/allUsers")
  public ResponseEntity<List<UserAuth>> findAll() {
    List<UserAuth> users = repository.findAll();
    return ResponseEntity.ok().body(users);
  }

  @PostMapping("/api/signIn")
  public ResponseEntity<UserAuth> signIn(@RequestBody UserAuth userAuth) {
    UserAuth entity = repository.findByEmail(userAuth.getEmail());

    if (entity == null) {
      userAuth.setToken("You are not allowed!! ");
      return new ResponseEntity<>(userAuth, HttpStatus.OK);
    }

    System.out.println("Entity.. OK!!!");
    entity.setToken("You successfully logged in");
    return ResponseEntity.ok().body(entity);
  }  
 
}
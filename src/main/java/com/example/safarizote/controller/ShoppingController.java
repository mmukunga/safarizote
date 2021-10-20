package com.example.safarizote.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.safarizote.model.Shopping;
import com.example.safarizote.repository.ShoppingRepository;

@RestController
public class ShoppingController { 
  @Autowired
  private ShoppingRepository repository;

  @GetMapping("/api/shopping")
  public ResponseEntity<List<Shopping>> shopping(){
    List<Shopping> sourceSet = repository.findAll();
    return new ResponseEntity<>(sourceSet, HttpStatus.OK);
  }
}
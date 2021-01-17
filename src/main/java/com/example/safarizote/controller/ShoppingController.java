package com.example.safarizote.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.safarizote.model.Shopping;
import com.example.safarizote.repository.ShoppingRepository;

@RestController
public class ShoppingController { 
  @Autowired
  private ShoppingRepository repository;

  @RequestMapping(value = "/api/shopping",  method={RequestMethod.GET})
  public ResponseEntity<List<Shopping>> shopping(){
    System.out.println("1. SHOPPING");
    List<Shopping> sourceSet = repository.findAll();
    System.out.println("2. SHOPPING");
    System.out.println("==============> 1. Simple For loop Example.");
    for (int i = 0; i < sourceSet.size(); i++) {
        System.out.println(sourceSet.get(i));
    }
    return new ResponseEntity<>(sourceSet, HttpStatus.OK);
  }
}